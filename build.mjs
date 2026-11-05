import { build } from 'esbuild';
import { mkdir, copyFile, writeFile, readFile, cp } from 'node:fs/promises';
await mkdir('dist', {recursive:true});
await build({entryPoints:['src/app.js'],bundle:true,minify:true,outfile:'dist/app.js',legalComments:'eof',banner:{js:'/*!\n'+await readFile('THIRD_PARTY_NOTICES.txt','utf8')+'*/'},target:['es2020']});
for (const f of ['index.html','welcome.html','styles.css']) await copyFile('src/'+f,'dist/'+f);
await writeFile('dist/robots.txt','User-agent: *\nAllow: /\nDisallow: /welcome.html\nSitemap: https://street-whisperer-welcome-kit.vercel.app/sitemap.xml\n');
await writeFile('dist/sitemap.xml','<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://street-whisperer-welcome-kit.vercel.app/</loc></url></urlset>');
await cp('public/kits','dist/kits',{recursive:true});
console.log('Built static studio + guest landing, without a backend.');
