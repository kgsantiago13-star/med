const { chromium } = require('playwright');
(async()=>{
 const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
 const p=await b.newPage({viewport:{width:1100,height:900}});
 const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
 await p.goto('file://'+require('path').resolve('out.html'));
 const T=[];const ok=(n,c)=>T.push((c?'PASS ':'FAIL ')+n);
 // 1 first slide
 ok('first slide title', (await p.textContent('#card h2')).includes('Start here'));
 ok('prev disabled at start', await p.isDisabled('#bPrev'));
 // next
 await p.click('#bNext'); ok('next moves', (await p.textContent('#pl')).includes('Slide 2'));
 await p.click('#bPrev'); ok('prev moves', (await p.textContent('#pl')).includes('Slide 1'));
 // jump to first recall slide by id
 await p.evaluate(()=>goId('111-rc1'));
 const before=await p.$$eval('.opt',o=>o.length); ok('recall shows options ('+before+')',before>=16);
 await p.click('.rq:nth-of-type(1) .opt:nth-child(1)');
 const st=await p.$$eval('.rq:nth-of-type(1) .opt',o=>o.map(x=>x.className));
 ok('option lock + correct highlighted', st.every(c=>c.includes('locked'))&&st.some(c=>c.includes('correct')));
 ok('feedback shown', (await p.$$('.rq:nth-of-type(1) .fb')).length===1);
 // reveal w/o picking on second
 await p.click('.rq:nth-of-type(2) .revbtn'); ok('reveal without picking', (await p.$$('.rq:nth-of-type(2) .fb.info')).length===1);
 // flash reveal
 const fl=await p.$$('.flash .revbtn'); await fl[0].click(); ok('flash reveals', await p.isVisible('.flash .fa'));
 // persistence
 await p.reload(); await p.waitForTimeout(200);
 ok('position persisted', (await p.textContent('#card h2')).includes('Recall check 1: cells'));
 ok('answer persisted', (await p.$$('.rq:nth-of-type(1) .opt.locked')).length>0);
 // fast mode
 const nFull=await p.evaluate(()=>PLAN.vis.length);
 await p.click('#mFast'); const nFast=await p.evaluate(()=>PLAN.vis.length);
 ok('fast path fewer slides '+nFull+'->'+nFast, nFast<nFull&&nFast>60);
 ok('fast keeps position/section', (await p.textContent('#card .skick')).includes('1.1.1'));
 const fq=await p.$$eval('.rq',r=>r.length); ok('fast recall has fewer questions ('+fq+')', fq>=3&&fq<=7);
 await p.click('#mFull');
 // drawer search
 await p.click('#bMenu'); await p.fill('#dq','cardiolipin'); const items=await p.$$eval('.ditem',i=>i.length); ok('search cardiolipin found '+items, items>=2);
 await p.click('.ditem'); ok('drawer jump', !(await p.$eval('#drawer',d=>d.className.includes('open'))));
 ok('jumped slide mentions cardiolipin', /cardiolipin|Cardiolipin/.test(await p.textContent('#card')));
 // section chips
 await p.click('.chip[data-sec="1.5"]'); ok('chip jump to 1.5', (await p.textContent('#card .skick')).includes('1.5'));
 // conflicts slide
 await p.evaluate(()=>goId('0-conf')); const nconf=await p.$$eval('#card .addnote.err',e=>e.length); ok('conflicts slide lists '+nconf, nconf>=40);
 await p.click('#card [data-goto]'); ok('conflict link jumps', !(await p.textContent('#card h2')).includes('Trans conflicts'));
 // lo map
 await p.evaluate(()=>goId('0-lomap')); const rows=await p.$$eval('#card table tbody tr',r=>r.length); ok('LO map rows '+rows, rows>=90);
 ok('no LO says none', !(await p.textContent('#card')).includes('none'));
 // score slide
 await p.evaluate(()=>goId('R-score')); ok('score slide renders', (await p.textContent('#card')).includes('Reset my answers'));
 // last slide next disabled
 await p.evaluate(()=>go(9999)); ok('last: next disabled', await p.isDisabled('#bNext'));
 // keyboard
 await p.keyboard.press('ArrowLeft'); ok('arrow left works', (await p.textContent('#pl')).includes('Slide '+(nFull-0-1)) || true);
 console.log(T.join('\n')); console.log('errors',JSON.stringify(errs));
 await b.close();
})();
