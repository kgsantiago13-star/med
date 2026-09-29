const { chromium } = require('playwright');
(async()=>{
  const file=process.argv[2]||'out.html';
  const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'}).catch(async e=>chromium.launch());
  const p=await b.newPage({viewport:{width:1100,height:900}});
  const errs=[];p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});p.on('pageerror',e=>errs.push('PAGEERR '+e.message));
  await p.goto('file://'+require('path').resolve(file));
  await p.waitForTimeout(500);
  const rep=await p.evaluate(()=>QA());
  console.log(JSON.stringify(rep,null,1));
  // step through every slide in full mode
  const n=await p.evaluate(()=>PLAN.vis.length);
  let bad=[];
  for(let i=0;i<n;i++){
    await p.evaluate((i)=>{go(i)},i);
    const r=await p.evaluate(()=>{const c=document.getElementById('card');const imgs=[...c.querySelectorAll('img')];return {t:c.querySelector('h2').textContent,h:c.scrollHeight,broken:imgs.filter(im=>!im.complete||im.naturalWidth===0).length,raw:/<b>|<\/|\$\{/.test(c.textContent)}});
    if(r.broken||r.raw)bad.push([i,r]);
  }
  console.log('slides',n,'bad',JSON.stringify(bad));
  console.log('errors',JSON.stringify(errs));
  if(process.argv[3]){await p.evaluate(()=>go(+0));await p.screenshot({path:process.argv[3]+'_0.png'});
    const idx=+process.argv[4]||3;await p.evaluate((i)=>go(i),idx);await p.screenshot({path:process.argv[3]+'_'+idx+'.png',fullPage:true});}
  await b.close();
})();
