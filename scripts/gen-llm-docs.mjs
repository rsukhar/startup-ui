// Generates the agent-readable docs shipped inside the `startup-ui` npm package, so AI coding
// agents can read version-pinned component specs straight from node_modules/startup-ui/llms/.
// Source of truth: the VitePress component docs (docs/pages/components/**/*.md).
//
// Run via `npm run gen:llm` (wired as a `prebuild` step) or directly: `node scripts/gen-llm-docs.mjs`.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { discoverComponentPages, buildLlmsTxt, cleanMarkdown } from './llm-shared.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const docsRoot = path.join(repoRoot, 'docs');
const outRoot = path.join(repoRoot, 'packages', 'startup-ui', 'llms');

const componentPages = discoverComponentPages(docsRoot);

// Rebuild the output dir from scratch so removed pages don't linger.
fs.rmSync(outRoot, { recursive: true, force: true });
fs.mkdirSync(outRoot, { recursive: true });

for (const p of componentPages) {
    const dest = path.join(outRoot, 'components', p.category, `${p.name}.md`);
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, cleanMarkdown(p.src));
}

// Offline index with paths relative to the package's llms/ folder.
const index = buildLlmsTxt(componentPages, null, (route) =>
    '.' + route.replace('/pages/components', '/components') + '.md',
);
fs.writeFileSync(path.join(outRoot, 'llms.txt'), index);

console.log(
    `[gen-llm-docs] wrote ${componentPages.length} component specs + llms.txt → ${path.relative(repoRoot, outRoot)}`,
);
