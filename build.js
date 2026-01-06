import {
  mkdirSync,
  readFileSync,
  writeFileSync,
  cpSync,
  copyFileSync,
  existsSync,
  rmSync,
} from 'node:fs';

function replaceBlock(html, name, replacement) {
  const re = new RegExp(
    `<!-- BUILD:${name} -->[\\s\\S]*?<!-- \\/BUILD:${name} -->`,
    'g'
  );

  const next = html.replace(
    re,
    `<!-- BUILD:${name} -->\n${replacement}\n<!-- /BUILD:${name} -->`
  );

  if (next === html) {
    throw new Error(`No se encontró el bloque BUILD:${name} en index.html`);
  }
  return next;
}
rmSync('dist', { recursive: true, force: true });

mkdirSync('dist', { recursive: true });

const indexHtml = readFileSync('index.html', 'utf8');
const headerHtml = readFileSync('partials/header.html', 'utf8').trim();
const footerHtml = readFileSync('partials/footer.html', 'utf8').trim();

let out = indexHtml;
out = replaceBlock(out, 'HEADER', headerHtml);
out = replaceBlock(out, 'FOOTER', footerHtml);

writeFileSync('dist/index.html', out, 'utf8');
cpSync('css', 'dist/css', { recursive: true });
cpSync('js', 'dist/js', { recursive: true });
cpSync('assets', 'dist/assets', { recursive: true });

cpSync('partials', 'dist/partials', { recursive: true });

if (existsSync('CNAME')) copyFileSync('CNAME', 'dist/CNAME');

console.log('OK: dist/index.html generado con header/footer');
//
