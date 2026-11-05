import {chromium} from '@playwright/test';
import jsQR from 'jsqr';
import {PNG} from 'pngjs';
import {mkdir,writeFile} from 'node:fs/promises';
import assert from 'node:assert/strict';
const base=process.env.QA_BASE_URL||'https://street-whisperer-welcome-kit.vercel.app';
const out='qa-output';await mkdir(out,{recursive:true});
const browser=await chromium.launch({executablePath:'/tmp/chromium',args:['--no-sandbox','--disable-dev-shm-usage'],headless:true});
const context=await browser.newContext({viewport:{width:1440,height:1000},deviceScaleFactor:2,permissions:['clipboard-read','clipboard-write']});
const page=await context.newPage();let errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text());});
const response=await page.goto(base,{waitUntil:'networkidle'});assert.equal(response.status(),200);
await page.locator('#qr svg').waitFor();await page.screenshot({path:out+'/studio-desktop.png',fullPage:true});
const checks=[];
for(const city of ['paris','lyon','geneve','other'])for(const lang of ['fr','en']){
 await page.locator('#place').fill('');await page.locator('#city').selectOption(city);await page.locator('#guestLang').selectOption(lang);await page.locator('#studio button').click();
 const target=await page.locator('#open').getAttribute('href');const qrBuffer=await page.locator('#qr').screenshot();const png=PNG.sync.read(qrBuffer);const decoded=jsQR(new Uint8ClampedArray(png.data),png.width,png.height);assert.ok(decoded,`QR decodes: ${city} ${lang}`);assert.equal(decoded.data,target);
 if(city!=='other')await page.pdf({path:`${out}/welcome-${city}-${lang}.pdf`,format:'A4',printBackground:true,preferCSSPageSize:true});
 const guest=await context.newPage();guest.on('pageerror',e=>errors.push(e.message));await guest.goto(target,{waitUntil:'networkidle'});assert.equal(await guest.locator('html').getAttribute('lang'),lang);assert.equal(await guest.locator('#guest-route').isVisible(),city!=='other');assert.ok((await guest.locator('#ios').getAttribute('href')).includes('ct=welcome_kit_'+city));assert.ok((await guest.locator('#android').getAttribute('href')).includes('referrer='));await guest.close();checks.push({city,lang,qr_decoded:true,guest_page:true});
}
await page.locator('#city').selectOption('geneve');await page.locator('#guestLang').selectOption('en');await page.locator('#place').fill('Maison des voyageurs');await page.locator('#studio button').click();
await page.locator('#copy').click();assert.ok((await page.evaluate(()=>navigator.clipboard.readText())).includes('place=Maison'));
const downloadPromise=page.waitForEvent('download');await page.locator('#download').click();const download=await downloadPromise;await download.saveAs(out+'/example-qr.svg');
await page.setViewportSize({width:375,height:812});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'No mobile horizontal overflow');await page.screenshot({path:out+'/studio-mobile.png',fullPage:true});
const guestURL=await page.locator('#open').getAttribute('href');await page.goto(guestURL,{waitUntil:'networkidle'});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'No guest mobile horizontal overflow');await page.screenshot({path:out+'/guest-mobile.png',fullPage:true});await page.locator('#language').click();assert.equal(await page.locator('html').getAttribute('lang'),'fr');
await browser.close();assert.deepEqual(errors,[],'No console or runtime errors');const result={base,http_status:response.status(),journeys:checks,qr_codes_decoded:checks.length,pdfs_generated:6,clipboard_verified:true,svg_download_verified:true,mobile_width:375,horizontal_overflow:false,console_errors:errors};await writeFile(out+'/browser-verification.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result,null,2));
