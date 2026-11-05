// Regenerate the six public print cards with production-origin QR links.
// Browser assets are served from the local build; no production mutation occurs.
import {chromium} from '@playwright/test';
import {readFile,mkdir} from 'node:fs/promises';
import {resolve} from 'node:path';
const origin='https://street-whisperer-welcome-kit.vercel.app';
await mkdir('public/kits',{recursive:true});
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_PATH||'/tmp/chromium',args:['--no-sandbox','--disable-dev-shm-usage'],headless:true});
const page=await browser.newPage();
await page.route(origin+'/**',async route=>{const path=new URL(route.request().url()).pathname;const file=resolve('dist',path==='/'?'index.html':path.slice(1));const type=path.endsWith('.css')?'text/css':path.endsWith('.js')?'application/javascript':'text/html';await route.fulfill({status:200,contentType:type,body:await readFile(file)});});
await page.goto(origin);await page.locator('#qr svg').waitFor();
for(const city of ['paris','lyon','geneve'])for(const lang of ['fr','en']){await page.locator('#city').selectOption(city);await page.locator('#guestLang').selectOption(lang);await page.locator('#studio button').click();await page.pdf({path:`public/kits/welcome-${city}-${lang}.pdf`,format:'A4',printBackground:true,preferCSSPageSize:true});}
await browser.close();console.log('Six print cards generated with production-origin QR links.');
