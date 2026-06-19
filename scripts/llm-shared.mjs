// Shared helpers for generating LLM/agent docs from the VitePress component docs.
// Single source of truth: docs/pages/**/*.md → both the npm-package specs (packages/startup-ui/llms)
// and the docs-site artifacts (/llms.txt, /llms-full.txt, per-page .md).
import fs from 'node:fs';
import path from 'node:path';

export const SITE = 'https://startup-ui.ru';

export const SUMMARY =
    'Vue 3 UI component library for IT startups (great with Laravel + InertiaJS). ' +
    'Every component is prefixed with `S` (SButton, SInput, …) and strictly typed — read prop/emit/slot types from the .d.ts. ' +
    'FontAwesome and InertiaJS are optional, injected once via app.use(StartupUI, { icon, router, link }). ' +
    'Component docs below are written in Russian; the default runtime locale is English (switchable via configureStartupUi).';

// Category folder → display label / order for grouping component pages.
export const CATEGORY_LABELS = {
    forms: 'Forms',
    data: 'Data',
    interfaces: 'Interfaces',
    template: 'Layout & template',
};

/**
 * The docs' demo model emits each example as two adjacent code fences of the same language:
 * a full, self-contained SFC followed by a short template-only repeat. For agent consumption that
 * duplication is noise, so we keep the first (full) fence and drop the immediately-following
 * same-language one. (Adjacent same-language fences only ever come from that demo pair here.)
 */
function collapseAdjacentFences(md) {
    const lines = md.split('\n');
    const fenceOpen = /^(`{3,})\s*([A-Za-z0-9-]*)\s*$/;
    const blocks = [];
    let i = 0;
    while (i < lines.length) {
        const m = lines[i].match(fenceOpen);
        if (m) {
            const ticks = m[1];
            const start = i++;
            while (i < lines.length && lines[i].trim() !== ticks) i++;
            blocks.push({ type: 'fence', lang: m[2] || '', lines: lines.slice(start, Math.min(i, lines.length - 1) + 1) });
            i++;
        } else {
            const start = i;
            while (i < lines.length && !fenceOpen.test(lines[i])) i++;
            blocks.push({ type: 'text', lines: lines.slice(start, i) });
        }
    }
    const out = [];
    for (const b of blocks) {
        if (b.type === 'fence' && b.lang) {
            let prevFence = null, onlyBlankBetween = true;
            for (let k = out.length - 1; k >= 0; k--) {
                if (out[k].type === 'text') {
                    if (out[k].lines.some((l) => l.trim() !== '')) { onlyBlankBetween = false; break; }
                    continue;
                }
                prevFence = out[k];
                break;
            }
            if (prevFence && onlyBlankBetween && prevFence.lang === b.lang) continue; // drop redundant repeat
        }
        out.push(b);
    }
    return out.flatMap((b) => b.lines).join('\n');
}

/**
 * Strip a leading YAML frontmatter block and VitePress container directives (:::demo / :::example /
 * the closing :::), collapse each demo's duplicated full+short code fences down to the full one, and
 * collapse runs of blank lines. Prose, code and inline HTML are kept, so the result is clean,
 * agent-friendly Markdown.
 */
export function cleanMarkdown(src) {
    let s = src.replace(/^﻿/, '');
    if (s.startsWith('---\n')) {
        const end = s.indexOf('\n---', 4);
        if (end !== -1) s = s.slice(s.indexOf('\n', end + 3) + 1);
    }
    const kept = [];
    for (const line of s.split('\n')) {
        if (/^:::/.test(line.trim())) continue; // drop container fences, keep their inner content
        kept.push(line);
    }
    return collapseAdjacentFences(kept.join('\n')).replace(/\n{3,}/g, '\n\n').trim() + '\n';
}

/** Title = first `# ` heading, falling back to the given name. */
export function extractTitle(src, fallback) {
    const m = src.match(/^#\s+(.+)$/m);
    return m ? m[1].trim() : fallback;
}

/** Description = first prose line after the title (skips headings, HTML, fences, containers). */
export function extractDescription(src) {
    let seenTitle = false;
    for (const raw of src.split('\n')) {
        const line = raw.trim();
        if (!seenTitle) {
            if (/^#\s+/.test(line)) seenTitle = true;
            continue;
        }
        if (!line) continue;
        if (/^[#<`]/.test(line) || line.startsWith(':::')) continue;
        return line.replace(/\s+/g, ' ');
    }
    return '';
}

/** Discover component doc pages: pages/components/<category>/<name>.md */
export function discoverComponentPages(docsRoot) {
    const base = path.join(docsRoot, 'pages', 'components');
    const pages = [];
    for (const category of fs.readdirSync(base)) {
        const catDir = path.join(base, category);
        if (!fs.statSync(catDir).isDirectory()) continue;
        for (const file of fs.readdirSync(catDir).sort()) {
            if (!file.endsWith('.md')) continue;
            const src = fs.readFileSync(path.join(catDir, file), 'utf8');
            const name = file.replace(/\.md$/, '');
            pages.push({
                category,
                name,
                route: `/pages/components/${category}/${name}`,
                title: extractTitle(src, name),
                description: extractDescription(src),
                src,
            });
        }
    }
    return pages;
}

/** A small curated set of guide pages for the "Optional" section / full concatenation. */
export function discoverGuidePages(docsRoot) {
    const wanted = [
        ['welcome/basics', 'about'],
        ['welcome/basics', 'installing'],
        ['welcome/basics', 'localization'],
        ['welcome/extras', 'llms'],
    ];
    const pages = [];
    for (const [dir, name] of wanted) {
        const fullPath = path.join(docsRoot, 'pages', dir, `${name}.md`);
        if (!fs.existsSync(fullPath)) continue;
        const src = fs.readFileSync(fullPath, 'utf8');
        pages.push({
            route: `/pages/${dir}/${name}`,
            title: extractTitle(src, name),
            description: extractDescription(src),
            src,
        });
    }
    return pages;
}

/**
 * Build a spec-shaped llms.txt (per llmstxt.org): H1, a blockquote summary, then H2 "file list"
 * sections of `[title](url): description`. `urlFor(route)` maps a page route to its link target
 * (absolute `.md` URL for the site, relative `.md` path for the npm bundle).
 */
// A page title may bundle several components ("SForm > SFormRow", "SCanvas + SFooter"); the
// `>` / `+` separators read ambiguously in an index, so normalize them to a plain comma.
function indexTitle(title) {
    return title.replace(/\s*[>+]\s*/g, ', ');
}

// Keep one-line descriptions consistently terminated.
function indexDescription(desc) {
    if (!desc) return '';
    return /[.!?…]$/.test(desc) ? desc : desc + '.';
}

function indexEntry(p, urlFor) {
    const desc = indexDescription(p.description);
    return `- [${indexTitle(p.title)}](${urlFor(p.route)})${desc ? ': ' + desc : ''}\n`;
}

export function buildLlmsTxt(componentPages, guidePages, urlFor) {
    const byCat = {};
    for (const p of componentPages) (byCat[p.category] ||= []).push(p);

    let out = `# Startup UI\n\n> ${SUMMARY}\n`;
    for (const [cat, label] of Object.entries(CATEGORY_LABELS)) {
        const list = byCat[cat];
        if (!list || !list.length) continue;
        out += `\n## ${label}\n\n`;
        for (const p of list) out += indexEntry(p, urlFor);
    }
    if (guidePages && guidePages.length) {
        out += `\n## Optional\n\n`;
        for (const p of guidePages) out += indexEntry(p, urlFor);
    }
    return out;
}

/** Build llms-full.txt: guides + all component specs concatenated (cleaned), with route markers. */
export function buildLlmsFull(componentPages, guidePages) {
    const parts = [`# Startup UI — full documentation\n\n> ${SUMMARY}`];
    for (const p of [...(guidePages || []), ...componentPages]) {
        parts.push(`\n\n---\n\n<!-- ${p.route} -->\n\n${cleanMarkdown(p.src)}`);
    }
    return parts.join('') + '\n';
}
