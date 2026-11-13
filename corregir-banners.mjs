import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const mainFile = path.join(root, 'src', 'main.jsx');
const cssFile = path.join(root, 'src', 'style.css');
const banners = ['banner-principal-pc.png', 'banner-principal-mobile.png'];

for (const file of [mainFile, cssFile, ...banners.map(name => path.join(root, 'public', 'assets', 'banners', name))]) {
  if (!fs.existsSync(file)) {
    console.error('FALTA ESTE ARCHIVO: ' + file);
    console.error('No se modifico nada. Comproba que copiaste estos dos archivos en la carpeta syx-tienda-online y que los banners estan en public/assets/banners.');
    process.exit(1);
  }
}

let source = fs.readFileSync(mainFile, 'utf8');
const marker = 'hero-banner-syx-png';
const newHero = `<section className="hero-banner-syx-png"><Link to="/catalogo?categoria=tv" className="syx-banner-link" aria-label="Ver televisores nuevos y Outlet"><picture><source media="(max-width: 650px)" srcSet="/assets/banners/banner-principal-mobile.png"/><img src="/assets/banners/banner-principal-pc.png" alt="Promociones de televisores SYX" fetchPriority="high"/></picture></Link></section>`;
if (!source.includes(marker)) {
  const originalHero = /<section className="hero">[\s\S]*?<\/section>/;
  if (!originalHero.test(source) || !source.includes('className="hero-tv"')) {
    console.error('No encontre la portada anterior esperada. No modifique el codigo para evitar romper la tienda.');
    process.exit(1);
  }
  fs.copyFileSync(mainFile, mainFile + '.bak-banner');
  source = source.replace(originalHero, newHero);
  fs.writeFileSync(mainFile, source, 'utf8');
}

let css = fs.readFileSync(cssFile, 'utf8');
if (!css.includes('.hero-banner-syx-png')) {
  fs.copyFileSync(cssFile, cssFile + '.bak-banner');
  css += '\n/* SYX: banners PNG PC y celular */\n.hero-banner-syx-png{background:#24113b;width:100%}.syx-banner-link{display:block;max-width:1920px;margin:0 auto;line-height:0}.syx-banner-link picture,.syx-banner-link img{display:block;width:100%}.syx-banner-link img{height:auto;object-fit:contain}\n';
  fs.writeFileSync(cssFile, css, 'utf8');
}

fs.writeFileSync(path.join(root, 'public', 'version.txt'), 'SYX BANNERS PNG CORREGIDOS\n', 'utf8');
console.log('CORRECCION LISTA: la portada ahora usa tus 2 banners PNG.');
