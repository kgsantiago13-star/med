const { chromium } = require('playwright');
(async()=>{
 const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium'});
 const p=await b.newPage({viewport:{width:1100,height:900}});
 const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
 await p.goto('file://'+require('path').resolve('out.html'));
 const r=await p.evaluate(()=>{
  const out={dist:[0,0,0,0],n:0,problems:[],lens:[],fl:0,mcq:0,flash:0,app:0,longest:0};
  SL.forEach(s=>(s.items||[]).forEach((it,ix)=>{
    const id=s.id+'#'+ix;
    if(it.k==='flash'){out.flash++;if(!it.a||!it.q)out.problems.push(id+' flash empty');return;}
    out.mcq++;out.dist[it.a]++;
    if(it.o.length!==4)out.problems.push(id+' opts '+it.o.length);
    if(!(it.a>=0&&it.a<4))out.problems.push(id+' bad a');
    if(new Set(it.o).size!==4)out.problems.push(id+' dup opts');
    Object.keys(it.w||{}).forEach(k=>{if(+k===it.a)out.problems.push(id+' w includes correct');if(+k>3)out.problems.push(id+' w key');});
    const L=it.o.map(x=>x.replace(/<[^>]+>/g,'').length);
    const mx=Math.max(...L); if(L[it.a]===mx&&L.filter(x=>x===mx).length===1&&mx>L.slice().sort((a,b)=>b-a)[1]*1.5)out.longest++;
    if(/^A |^A \d|patient|child|newborn|baby|man |woman|researcher|student|technician|climber|runner|boy|girl|sailor|infant|smoker|protein is/.test(it.q))out.app++;
    if(it.f)out.fl++;
  }));
  return out;
 });
 console.log(JSON.stringify(r));
 console.log('errors',JSON.stringify(errs));
 await b.close();
})();
