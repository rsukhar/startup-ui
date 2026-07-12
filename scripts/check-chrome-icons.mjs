// Guards against FontAwesome creeping back into component "chrome" — the built-in arrows, ×,
// calendar glyph, caret, burger, etc. Chrome MUST be inline SVG (see src/components/icons.ts) so the
// library renders fully without the host registering any FontAwesome icons. When chrome relies on FA
// and the host hasn't run library.add() for those icons, FA renders nothing and stays silent — the
// glyphs just vanish. This check makes that regression fail the build instead.
//
// Allowed (the explicit contract): icons the CONSUMER passes via the `icon` prop, rendered through
// the injected renderer bound to that prop — `<component :is="iconRenderer" :icon="icon" />`.
//
// Fails (exit 1) on, inside src/components/**/*.vue:
//   • a direct <FontAwesomeIcon> / <font-awesome-icon> tag;
//   • a hardcoded icon literal handed to a renderer: :icon="'…'" or :icon="[ … ]";
//   • a hardcoded FontAwesome renderer in the template: :is="'FontAwesomeIcon'".
//
// Run via `npm run lint:chrome-icons` (wired into prebuild, so build/publish fail on a regression);
// a real CI job can call the same script.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '..');
const componentsDir = path.join(repoRoot, 'packages', 'startup-ui', 'src', 'components');

const RULES = [
    { re: /<font-?awesome-?icon/i, msg: 'direct <FontAwesomeIcon> in chrome — use an inline SVG (src/components/icons.ts)' },
    { re: /:icon\s*=\s*"\s*'/, msg: 'hardcoded string icon name in chrome — use an inline SVG' },
    { re: /:icon\s*=\s*"\s*\[/, msg: 'hardcoded [pack, name] icon in chrome — use an inline SVG' },
    { re: /:is\s*=\s*"\s*['"]FontAwesomeIcon/, msg: 'hardcoded FontAwesome renderer in chrome — use an inline SVG' },
];

/** All *.vue files under the components dir. */
function collectVueFiles(dir) {
    const out = [];
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const p = path.join(dir, entry.name);
        if (entry.isDirectory()) out.push(...collectVueFiles(p));
        else if (entry.name.endsWith('.vue')) out.push(p);
    }
    return out;
}

const files = collectVueFiles(componentsDir);
const violations = [];

for (const file of files) {
    const lines = fs.readFileSync(file, 'utf8').split('\n');
    lines.forEach((line, i) => {
        for (const rule of RULES) {
            if (rule.re.test(line)) {
                violations.push({ file: path.relative(repoRoot, file), line: i + 1, msg: rule.msg, src: line.trim() });
            }
        }
    });
}

if (violations.length) {
    console.error('\n✗ chrome-icons check failed — FontAwesome must not be used in component chrome:\n');
    for (const v of violations) {
        console.error(`  ${v.file}:${v.line}  —  ${v.msg}`);
        console.error(`      ${v.src}`);
    }
    console.error(
        '\nChrome (arrows, ×, calendar, caret, …) must be inline SVG so the library needs no FontAwesome' +
        '\nregistration from the host. Add the glyph to src/components/icons.ts. Consumer icons via the' +
        '\n`icon` prop are fine: <component :is="iconRenderer" :icon="icon" />.\n',
    );
    process.exit(1);
}

console.log(`✓ chrome-icons check passed — scanned ${files.length} components, no FontAwesome in chrome.`);
