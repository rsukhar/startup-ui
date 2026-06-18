import type MarkdownIt from 'markdown-it'

const LANG = 'vue'

// Matches both :::demo (live preview + code) and :::example (code-only) containers.
function isDemoOpen(tok: any): boolean {
    return !!tok && tok.nesting === 1 && /^(demo|example)(\s|$)/.test(tok.info.trim())
}

/**
 * Code panel for :::demo blocks. The short and full views are authored EXPLICITLY —
 * nothing is derived automatically:
 *  - one ```vue fence  → shown as-is (no short/full toggle)
 *  - two ```vue fences → 1st = full (also what the live preview runs), 2nd = short.
 *    The short is shown by default; the full appears under the toggle.
 * The two fences must be adjacent (only a blank line between them). The live preview is
 * compiled from the FIRST fence by demoblock's container plugin (untouched here).
 * Must be registered AFTER demoBlockPlugin.
 */
export function demoFullCodePlugin(md: MarkdownIt) {
    const prevFence = md.renderer.rules.fence!
    // The vue SFC grammar only colours the outer tags of bare template markup (no
    // <template>/<script> root) — nested lines stay uncoloured. Highlight bare markup
    // with the template grammar (vue-html); keep vue for full SFCs.
    const langFor = (code: string) =>
        /^\s*<template[\s>]/.test(code) || /<script[\s>]/.test(code) ? 'vue' : 'vue-html'
    const highlight = (code: string) =>
        `<div v-pre class="language-${LANG}">${(md as any).options.highlight?.(code, langFor(code), '') || ''}</div>`

    md.renderer.rules.fence = (tokens, idx, options, env, self) => {
        const token = tokens[idx]
        if (token.info.trim() !== LANG) return prevFence(tokens, idx, options, env, self)

        const prev = tokens[idx - 1]
        // Second fence of a demo (the explicit short) — consumed by the first fence below.
        if (prev?.type === 'fence' && isDemoOpen(tokens[idx - 2])) return ''

        if (isDemoOpen(prev)) {
            const m = prev.info.trim().match(/^demo\s*(.*)$/)
            const description = m && m[1] ? m[1] : ''
            const descBlock = description
                ? `<template #description><div>${md.renderInline(description)}</div></template>`
                : ''

            const full = token.content
            const next = tokens[idx + 1]
            const hasShort = next?.type === 'fence' && next.info.trim() === LANG

            if (hasShort) {
                // Default view = short (2nd fence); toggle reveals the full (1st fence, which also runs).
                return `${descBlock}<template #highlight>${highlight(next.content)}</template>`
                    + `<template #highlight-full>${highlight(full)}</template>`
            }
            // Single fence → shown as-is, no toggle.
            return `${descBlock}<template #highlight>${highlight(full)}</template>`
        }

        return prevFence(tokens, idx, options, env, self)
    }
}
