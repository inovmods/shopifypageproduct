import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const jsonlPath = path.join(
  process.env.USERPROFILE || '',
  '.cursor',
  'projects',
  'c-assets-blueprint',
  'agent-transcripts',
  '76c2b04e-2cde-4538-abb0-e5ae087e010a',
  '76c2b04e-2cde-4538-abb0-e5ae087e010a.jsonl'
);

const lines = fs.readFileSync(jsonlPath, 'utf8').split(/\r?\n/).filter(Boolean);
let body = null;
for (const line of lines) {
  const o = JSON.parse(line);
  if (o.role !== 'user') continue;
  const c = o.message?.content?.[0];
  if (!c || c.type !== 'text') continue;
  const t = c.text || '';
  if (!t.includes('{% assign p = product %}')) continue;
  const start = t.indexOf('{% assign p = product %}');
  let end = t.indexOf('</user_query>');
  if (end < 0) end = t.length;
  body = t.slice(start, end).trim();
  break;
}
if (!body) throw new Error('Could not extract KP block from transcript');

// support_email
body = body.replace(
  /(\{% assign img_10 = [^%]+%\})\s*\n/,
  "$1\n\n{% assign support_email = shop.email %}\n\n"
);

// root + cart sections
body = body.replace(
  /<div class="kp" data-kp-root>/,
  '<div class="kp" data-kp-root data-k-cart-sections="cart-drawer,cart-icon-bubble">'
);

// main ATC before sticky trigger
const atc =
  '\n          <div style="margin-top:14px;">\n            <button class="k-btn primary" type="button" data-k-add>Add 2 bikinis to cart</button>\n          </div>\n\n          ';
body = body.replace(
  /(\s*)<div id="k-sticky-trigger"/,
  atc + '$1<div id="k-sticky-trigger"'
);

// replace trailing script (after variants json)
const scriptPath = path.join(root, 'snippets', 'kualley-kp-inline-script.liquid');
let snip = fs.readFileSync(scriptPath, 'utf8');
const si = snip.indexOf('<script>');
const sj = snip.lastIndexOf('</script>') + '</script>'.length;
const newScript = snip.slice(si, sj);

const marker = '<script type="application/json" data-k-variants>';
const mi = body.indexOf(marker);
if (mi < 0) throw new Error('variants marker not found');
const afterVariants = body.indexOf('</script>', mi);
if (afterVariants < 0) throw new Error('variants closing not found');
const afterVariantsEnd = body.indexOf('\n', afterVariants + '</script>'.length);
const restStart = body.indexOf('<script>', afterVariants);
if (restStart < 0) throw new Error('main script not found');
const closingDiv = body.lastIndexOf('</div>');
if (closingDiv < 0) throw new Error('final </div> not found');
const beforeScript = body.slice(0, restStart).trimEnd();
const afterOldScript = body.slice(closingDiv);
// afterOldScript should be </div> only - but we need to remove old script between restStart and closingDiv
const oldScriptEnd = body.lastIndexOf('</script>');
if (oldScriptEnd < 0 || oldScriptEnd < restStart) throw new Error('script end not found');
const tail = body.slice(oldScriptEnd + '</script>'.length).trimStart();
// tail should be </div>
body = beforeScript + '\n\n  ' + newScript.replace(/\n/g, '\n  ') + '\n\n' + tail;

const outPath = path.join(root, 'snippets', 'kualley-kp-complete-block.liquid');
fs.writeFileSync(outPath, body, 'utf8');
console.log('Wrote', outPath, 'bytes', body.length);
