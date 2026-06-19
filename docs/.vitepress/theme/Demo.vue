<template>
    <div class="s-demo">
        <div v-if="preview" class="s-demo-preview">
            <slot />
        </div>
        <div v-if="$slots.description" class="s-demo-desc">
            <slot name="description" />
        </div>
        <div class="s-demo-code">
            <div class="s-demo-actions">
                <button
                    v-if="$slots['highlight-full']"
                    class="s-demo-btn"
                    type="button"
                    :title="showFull ? 'Показать краткий код' : 'Показать полный код'"
                    @click="showFull = !showFull"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                </button>
                <button
                    class="s-demo-btn"
                    type="button"
                    :title="copied ? 'Скопировано' : 'Скопировать код'"
                    @click="copyCode"
                >
                    <svg v-if="!copied" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                    <svg v-else xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </button>
            </div>
            <div v-show="!showFull" ref="shortEl" class="s-demo-codearea">
                <slot name="highlight" />
            </div>
            <div v-show="showFull" ref="fullEl" class="s-demo-codearea">
                <slot name="highlight-full" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Custom replacement for demoblock's Demo wrapper:
//  - bordered preview, code visible by default (no localized collapse control)
//  - short/full toggle (see demoFullCode.ts); own copy button
//  - preview=false → code-only panel (used by :::example for non-runnable snippets)
withDefaults(defineProps<{ customClass?: string; sourceCode?: string; preview?: boolean }>(), { preview: true })

const showFull = ref(false)
const copied = ref(false)
const shortEl = ref<HTMLElement>()
const fullEl = ref<HTMLElement>()

async function copyCode() {
    const el = showFull.value ? fullEl.value : shortEl.value
    const code = el?.querySelector('pre') ?? el
    const text = (code?.textContent ?? '').replace(/\n+$/, '')
    try {
        await navigator.clipboard.writeText(text)
        copied.value = true
        setTimeout(() => (copied.value = false), 1500)
    } catch {
        // clipboard may be unavailable (e.g. insecure context) — ignore
    }
}
</script>

<style scoped>
.s-demo {
    margin: var(--s-base-margin, 20px) 0 calc(2 * var(--s-base-margin, 20px));
    border: 1px solid var(--s-border, #d1d1d1);
    border-radius: var(--s-border-radius, 6px);
    overflow: hidden;
}

.s-demo-preview {
    display: flex;
    /* Column by default: components stack and take the full width (so things like SStat `wide`
       and SPagination right-alignment work without per-page overrides). Small inline components
       (SButton/SActionIcon/STag/SStatus) are switched back to a row in custom.css. */
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
    padding: 24px;
}

.s-demo-desc {
    padding: 12px 24px;
    border-top: 1px dashed var(--s-border, #d1d1d1);
    color: var(--s-text-light, #999);
    font-size: 0.9rem;
}

.s-demo-code {
    position: relative;
    border-top: 1px solid var(--s-border, #d1d1d1);
    /* collapse the stray whitespace text node demoblock leaves inside the dark code
       wrapper, so the code's bottom edge is flush with the block */
    font-size: 0;
}

/* Override the global standalone-code-block rule (custom.css) inside the demo:
   no bottom margin and square corners so the code is flush with the frame. */
.s-demo-codearea :deep(div[class*='language-']) {
    margin: 0 !important;
    border-radius: 0 !important;
}

.s-demo-actions {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 3;
    display: flex;
    gap: 6px;
    opacity: 0;
    transition: opacity 0.25s;
}

.s-demo-code:hover .s-demo-actions {
    opacity: 1;
}

.s-demo-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border: 1px solid var(--vp-c-divider, #3c3f44);
    border-radius: 4px;
    background-color: var(--vp-code-block-bg, #161618);
    color: var(--vp-c-text-2, #98989f);
    cursor: pointer;
    transition: color 0.25s, border-color 0.25s;
}

.s-demo-btn:hover {
    color: var(--s-primary, #f04f0a);
    border-color: var(--s-primary, #f04f0a);
}
</style>
