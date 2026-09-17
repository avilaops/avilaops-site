import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(process.argv[2] || path.join(scriptDir, '../out'));
const manifestPath = process.argv[3] && !process.argv[3].startsWith('--') ? process.argv[3] : path.join(scriptDir, 'page-previews.json');
const apply = process.argv.includes('--apply');
const rows = JSON.parse(fs.readFileSync(manifestPath, 'utf8').replace(/^\uFEFF/, ''));
const oldImage = 'https://avilaops.com/og-default.png';
const changes = [];
for (const row of rows) {
  const route = new URL(row.url).pathname.replace(/^\/+|\/+$/g, '');
  const directory = path.resolve(root, route);
  if (directory !== root && !directory.startsWith(root + path.sep)) throw new Error('Invalid page path');
  const imageFile = path.join(root, new URL(row.image).pathname);
  if (!fs.existsSync(imageFile)) throw new Error(`Missing image: ${imageFile}`);
  const htmlFile = path.join(directory, 'index.html');
  const html = fs.readFileSync(htmlFile, 'utf8');
  if (!html.includes(oldImage) && !html.includes(row.image)) throw new Error(`Unexpected metadata: ${htmlFile}`);
  for (const item of fs.readdirSync(directory, { withFileTypes: true })) {
    if (!item.isFile() || !/\.(html|txt|rsc)$/.test(item.name)) continue;
    const filename = path.join(directory, item.name);
    const before = fs.readFileSync(filename, 'utf8');
    const after = before.replaceAll(oldImage, row.image);
    if (before !== after) changes.push({ filename, after });
  }
}
if (apply) {
  for (const change of changes) {
    const temporary = change.filename + '.preview-tmp';
    fs.writeFileSync(temporary, change.after);
    fs.renameSync(temporary, change.filename);
  }
}
console.log(JSON.stringify({ pages: rows.length, files: changes.length, applied: apply, root }));
