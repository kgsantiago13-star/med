'use strict';
/* ---------- data registries ---------- */
var SEC=[
 {id:'0',short:'Start',name:'Start here: plan and how to use',min:5,fast:5},
 {id:'1.1.1',short:'1.1.1',name:'Basic Cellular Biology and Genetics',min:30,fast:16},
 {id:'1.1.2',short:'1.1.2',name:'Chemistry Essentials for Biochemistry',min:35,fast:18},
 {id:'1.2',short:'1.2',name:'Water, pH, Buffers, Nucleic Acids',min:60,fast:32},
 {id:'1.3',short:'1.3',name:'Amino Acids and Protein Structure',min:65,fast:35},
 {id:'1.4.1',short:'1.4.1',name:'Carbohydrate Chemistry',min:20,fast:11},
 {id:'1.4.2',short:'1.4.2',name:'Lipid Chemistry',min:25,fast:13},
 {id:'1.5',short:'1.5',name:'Enzymes and Enzyme Kinetics',min:50,fast:28},
 {id:'1.6',short:'1.6',name:'Hemoglobin, Collagen, Elastin, ECM',min:50,fast:27},
 {id:'R',short:'Review',name:'Cumulative review',min:20,fast:16}
];
var SECMAP={}; SEC.forEach(function(s){SECMAP[s.id]=s;});
var LO={}, SL=[], IMG=window.IMG||{};
function add(sec,o){o.sec=sec;o.tier=o.tier||'core';o.type=o.type||'concept';SL.push(o);return o;}

/* ---------- authoring helpers ---------- */
function UL(a){return '<ul>'+a.map(function(x){return '<li>'+x+'</li>';}).join('')+'</ul>';}
function OL(a){return '<ol>'+a.map(function(x){return '<li>'+x+'</li>';}).join('')+'</ol>';}
function P(x,c){return '<p'+(c?' class="'+c+'"':'')+'>'+x+'</p>';}
function LEAD(x){return '<p class="lead">'+x+'</p>';}
function TB(head,rows,cls){
  var h='<div class="tw"><table class="t'+(cls?' '+cls:'')+'"><thead><tr>'+head.map(function(x){return '<th>'+x+'</th>';}).join('')+'</tr></thead><tbody>';
  rows.forEach(function(r){h+='<tr>'+r.map(function(x){return '<td>'+x+'</td>';}).join('')+'</tr>';});
  return h+'</tbody></table></div>';
}
function NOTE(lead,html){return '<div class="addnote"><b>'+lead+'</b> '+html+'</div>';}
function ERR(lead,html){return '<div class="addnote err"><b>'+lead+'</b> '+html+'</div>';}
function MEMO(name,parts,note,added){
  var h='<div class="memo'+(added?' added':'')+'"><div class="mh">'+(added?'Added memory aid (not in your trans)':'Trans mnemonic (original wording)')+'</div><div class="mn">'+name+'</div>';
  if(parts&&parts.length){h+='<div class="mp">'+parts.map(function(p){return '<div><span class="l">'+p[0]+'</span> '+p[1]+'</div>';}).join('')+'</div>';}
  if(note){h+='<div class="mp" style="margin-top:6px">'+note+'</div>';}
  return h+'</div>';
}
function FIG(id,cap){return '<figure class="fig"><img data-src="'+id+'" alt="'+(cap||'')+'"><figcaption>'+(cap||'')+' <span style="opacity:.8">(from your trans)</span></figcaption></figure>';}
function FIGS(a){return '<div class="figrow">'+a.join('')+'</div>';}
function XTRA(title,html){return '<details class="extra"><summary>'+(title||'Extra detail (optional, skip if short on time)')+'</summary>'+html+'</details>';}
function GRID(boxes){return '<div class="grid">'+boxes.map(function(b){return '<div class="box '+(b.c||'')+'"><h4>'+b.h+'</h4>'+b.html+'</div>';}).join('')+'</div>';}
function SVG(inner,w,h){return '<div class="svgbox"><svg viewBox="0 0 '+w+' '+h+'" width="'+w+'" xmlns="http://www.w3.org/2000/svg" role="img">'+inner+'</svg></div>';}
function DEC(q,opts,p){
  var h='<details class="dec"><summary>Exam-style question from your shifting quiz. Try it, then tap to see how to read it.</summary><div class="dq">'+q;
  if(opts){h+='<ol type="A">'+opts.map(function(o){return '<li>'+o+'</li>';}).join('')+'</ol>';}
  h+='</div><div class="dg">'+
   '<div><b>What it really asks</b>'+p.asks+'</div>'+
   '<div><b>Clue words</b>'+p.clues+'</div>'+
   '<div><b>Reason it out</b>'+p.reason+'</div>'+
   '<div><b>Tempting wrong answer</b>'+p.trap+'</div></div></details>';
  return h;
}
function STEPS(a){return '<div class="ui-text" style="display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin:8px 0 12px">'+a.map(function(x,i){return (i?'<span style="color:var(--eosin-deep);font-weight:700">→</span>':'')+'<span class="box" style="padding:6px 10px;font-size:13.5px">'+x+'</span>';}).join('')+'</div>';}

/* ---------- state ---------- */
var KEY='bcmLE1v2';
var state={mode:'full',pos:0,q:{}};
function load(){try{var s=JSON.parse(localStorage.getItem(KEY)||'null');if(s){state.mode=s.mode==='fast'?'fast':'full';state.pos=s.pos|0;state.q=s.q||{};}}catch(e){}}
function save(){try{localStorage.setItem(KEY,JSON.stringify(state));}catch(e){}}
function itemsFor(s){
  var it=s.items||[];
  if(state.mode==='full')return it.map(function(x,i){return {x:x,i:i};});
  var f=[];it.forEach(function(x,i){if(x.f)f.push({x:x,i:i});});
  if(!f.length)f=it.slice(0,2).map(function(x,i){return {x:x,i:i};});
  return f;
}
function visible(){return SL.filter(function(s){return state.mode==='full'||s.tier==='must';});}
function weight(s){
  if(s.w)return s.w;
  if(s.type==='recall')return Math.max(1.5,0.9*itemsFor(s).length);
  if(s.type==='table'||s.type==='memo')return 1.3;
  return 1;
}
var PLAN=null;
function plan(){
  var vis=visible(),tot={},per=[];
  vis.forEach(function(s){tot[s.sec]=(tot[s.sec]||0)+weight(s);});
  vis.forEach(function(s){var m=state.mode==='full'?SECMAP[s.sec].min:SECMAP[s.sec].fast;per.push(m*weight(s)/tot[s.sec]);});
  PLAN={vis:vis,per:per,tot:tot};
  return PLAN;
}
function txt(s){if(!s._t){var d=document.createElement('div');d.innerHTML=(s.title||'')+' '+(s.html||'')+' '+(s.items||[]).map(function(i){return (i.q||'')+' '+(i.a||'');}).join(' ');s._t=(d.textContent||'').toLowerCase();}return s._t;}

/* ---------- rendering ---------- */
var card=document.getElementById('card');
function badgesFor(s){
  var h='';
  if(s.type==='concept'||s.type==='table'||s.type==='memo'||s.type==='decode'){
    h+='<span class="bdg '+(s.tier==='must'?'must':'core')+'">'+(s.tier==='must'?'★ Must-know':'● Core')+'</span>';
  }
  if(s.tm)h+='<span class="bdg tm">❗ Marked “Must Know” in your trans</span>';
  (s.lo||[]).forEach(function(n){h+='<span class="bdg lo">◎ LO '+n+'</span>';});
  if(s.added)h+='<span class="bdg add">Not in your trans</span>';
  return h?'<div class="badges">'+h+'</div>':'';
}
function mcqHTML(x,qid,n){
  var st=state.q[qid];
  var h='<div class="rq" data-q="'+qid+'"><div class="qn">'+(x.k==='flash'?'Quick recall ':'Question ')+n+(x.lo?' · LO '+x.lo:'')+'</div><p class="qt">'+x.q+'</p>';
  if(x.k==='flash'){
    h+='<div class="flash"><button class="revbtn" data-rev="1">Show answer</button><div class="fa" style="display:none"><div class="fb info">'+x.a+'</div></div></div></div>';
    return h;
  }
  h+='<div class="opts">';
  x.o.forEach(function(o,i){
    var cls='opt';
    if(st){cls+=' locked';if(i===x.a)cls+=' correct';else if(i===st.p)cls+=' wrong';}
    h+='<button class="'+cls+'" data-i="'+i+'"><span class="bd">'+'ABCD'.charAt(i)+'</span><span>'+o+'</span></button>';
  });
  h+='</div>';
  if(!st)h+='<button class="revbtn" data-rev="1" style="margin-top:8px">Reveal answer without picking</button>';
  h+='<div class="fbwrap">'+(st?fbHTML(x,st):'')+'</div></div>';
  return h;
}
function fbHTML(x,st){
  var ok=st.p===x.a, h='<div class="fb '+(st.p<0?'info':(ok?'ok':'no'))+'">';
  h+='<p><strong>'+(st.p<0?'Answer: '+'ABCD'.charAt(x.a)+'.':(ok?'Correct.':'Not quite. The answer is '+'ABCD'.charAt(x.a)+'.'))+'</strong></p>';
  h+='<p>'+x.why+'</p>';
  if(x.w){var keys=Object.keys(x.w);if(keys.length){h+='<ul>';keys.forEach(function(k){h+='<li><b>'+'ABCD'.charAt(+k)+':</b> '+x.w[k]+'</li>';});h+='</ul>';}}
  return h+'</div>';
}
function autoConf(){
  var out={};
  SL.forEach(function(s){
    if(!s.html)return;
    var re=/<div class="addnote err"><b>(.*?)<\/b>\s*([\s\S]*?)<\/div>/g,m;
    while((m=re.exec(s.html))){(out[s.sec]=out[s.sec]||[]).push({id:s.id,t:s.title,lead:m[1],body:m[2]});}
  });
  var h='<p class="small">Every place where your trans is wrong, unclear, or too loose to trust. Tap a title to jump to the slide. Each one is also shown in red on its own slide.</p>';
  SEC.forEach(function(sc){
    var a=out[sc.id];if(!a)return;
    h+='<div class="dsec" style="margin-top:14px">'+sc.short+' · '+sc.name+'</div>';
    a.forEach(function(e){h+='<div class="addnote err"><b>'+e.lead+'</b> '+e.body+' <a href="#" data-goto="'+e.id+'" style="color:var(--hema);font-weight:700">Go to slide: '+e.t+'</a></div>';});
  });
  return h;
}
function autoLO(){
  var h='<p class="small">Each learning objective (LO) is copied from your trans. The numbers show the slides that teach it. Tap one to jump.</p>';
  SEC.forEach(function(sc){
    var L=LO[sc.id];if(!L)return;
    h+='<div class="dsec" style="margin-top:14px">'+sc.short+' · '+sc.name+'</div>';
    var rows=L.map(function(t,i){
      var n=i+1,links=[];
      SL.forEach(function(s){if(s.sec===sc.id&&(s.lo||[]).indexOf(n)>=0){links.push('<a href="#" data-goto="'+s.id+'" style="color:var(--hema)">'+(s.title||s.id).replace(/</g,'&lt;')+'</a>');}
        if(s.sec===sc.id&&s.items){s.items.forEach(function(it){if(it.lo===n&&links.indexOf('Q')<0){}});}});
      return [String(n),t,links.length?links.join('; '):'<b style="color:var(--bad)">none</b>'];
    });
    h+=TB(['#','Learning objective (from your trans)','Taught on'],rows);
  });
  return h;
}
function autoScore(){
  var bySec={},tot=0,ok=0;
  Object.keys(state.q).forEach(function(k){var sl=SL.filter(function(x){return x.id===k.split('#')[0];})[0];var sc=sl?sl.sec:'?';var r=state.q[k];if(r.p<0)return;bySec[sc]=bySec[sc]||{n:0,ok:0};bySec[sc].n++;tot++;if(r.ok){bySec[sc].ok++;ok++;}});
  var h='<div class="stat"><div class="row"><b>All questions you committed to</b><b>'+ok+' / '+tot+'</b></div>';
  SEC.forEach(function(sc){var b=bySec[sc.id];if(b)h+='<div class="row"><span>'+sc.short+' '+sc.name+'</span><span>'+b.ok+' / '+b.n+'</span></div>';});
  h+='</div>';
  var miss=[];SL.forEach(function(s){if(!s.items)return;s.items.forEach(function(it,i){var r=state.q[s.id+'#'+i];if(r&&r.p>=0&&!r.ok)miss.push({s:s,i:i,it:it});});});
  h+='<h3 style="color:var(--hema-deep);margin:16px 0 6px">Questions to redo</h3>';
  if(!miss.length)h+='<p>'+(tot?'Nothing missed so far. Good work.':'You have not answered any question yet.')+'</p>';
  else{h+='<ul>';miss.forEach(function(m){h+='<li><a href="#" data-goto="'+m.s.id+'" style="color:var(--hema)">'+m.s.title+'</a>: '+m.it.q+'</li>';});h+='</ul>';}
  h+='<button class="pill" id="bReset" style="margin-top:8px">Reset my answers</button>';
  return h;
}
function slideHTML(s){
  var sc=SECMAP[s.sec],h='<div class="skick">'+sc.short+' · '+sc.name+'</div>'+badgesFor(s)+'<h2 class="st">'+s.title+'</h2><div class="body">';
  if(s.type==='recall'){
    var its=itemsFor(s);
    if(s.intro)h+=s.intro;
    its.forEach(function(o,k){h+=mcqHTML(o.x,s.id+'#'+o.i,k+1);});
  }else if(s.type==='lo'){h+=autoLO_sec(s);}
  else if(s.auto==='conf'){h+=autoConf();}
  else if(s.auto==='lo'){h+=autoLO();}
  else if(s.auto==='score'){h+=autoScore();}
  else{h+=(typeof s.html==='function'?s.html():s.html);}
  return h+'</div>';
}
function autoLO_sec(s){
  var L=LO[s.sec]||[],rows=L.map(function(t,i){
    var n=i+1,links=[];
    SL.forEach(function(x){if(x.sec===s.sec&&(x.lo||[]).indexOf(n)>=0&&x.type!=='lo'){links.push('<a href="#" data-goto="'+x.id+'" style="color:var(--hema)">'+(x.title||x.id)+'</a>');}});
    return [String(n),t,links.join('; ')||'<b style="color:var(--bad)">none</b>'];
  });
  return (s.intro||'<p class="small">These objectives are copied from your trans. Every one is taught on the slides listed. Tap a title to jump there.</p>')+TB(['#','Learning objective (from your trans)','Taught on slides'],rows);
}
var CUR=0;
function render(){
  var pl=plan(),vis=pl.vis;
  if(state.pos>=vis.length)state.pos=vis.length-1;if(state.pos<0)state.pos=0;
  CUR=state.pos;var s=vis[CUR];
  card.innerHTML=slideHTML(s);
  Array.prototype.forEach.call(card.querySelectorAll('img[data-src]'),function(im){var k=im.getAttribute('data-src');if(IMG[k])im.src=IMG[k];else{im.alt='(missing figure '+k+')';}});
  window.scrollTo({top:0,behavior:'auto'});
  var pct=vis.length>1?(CUR)/(vis.length-1)*100:0;
  document.getElementById('pfill').style.width=pct+'%';
  document.getElementById('pl').textContent='Slide '+(CUR+1)+' of '+vis.length+' · '+(state.mode==='full'?'Full path':'Fast path');
  var left=0;for(var i=CUR;i<vis.length;i++)left+=pl.per[i];
  var totm=pl.per.reduce(function(a,b){return a+b;},0);
  var hh=Math.floor(left/60),mm=Math.round(left%60);
  document.getElementById('pr').textContent='About '+(hh?hh+' h ':'')+mm+' min left of '+(Math.round(totm/6)/10)+' h';
  document.getElementById('cnt').textContent=s.sec==='0'?'':('Section '+SECMAP[s.sec].short);
  document.getElementById('bPrev').disabled=CUR===0;
  var nb=document.getElementById('bNext');nb.disabled=CUR===vis.length-1;nb.textContent=CUR===vis.length-2?'Last slide →':(CUR===vis.length-1?'Done':'Next →');
  chips();save();
}
function chips(){
  var pl=PLAN,nav=document.getElementById('secnav');
  if(!nav.children.length){
    SEC.forEach(function(sc){var b=document.createElement('button');b.className='chip';b.setAttribute('data-sec',sc.id);b.innerHTML='<b>'+sc.short+'</b><small></small><span class="mini"><i></i></span>';b.title=sc.name;nav.appendChild(b);});
  }
  var cs=SL_VIS_SEC();
  Array.prototype.forEach.call(nav.children,function(b){
    var id=b.getAttribute('data-sec'),info=cs[id]||{first:-1,last:-1};
    var m=state.mode==='full'?SECMAP[id].min:SECMAP[id].fast;
    b.querySelector('small').textContent=m+' min';
    var cur=pl.vis[CUR].sec===id;b.className='chip'+(cur?' on':'');
    var f=0;if(info.first>=0){f=CUR>info.last?1:(CUR<info.first?0:(CUR-info.first+1)/(info.last-info.first+1));}
    b.querySelector('i').style.width=(f*100)+'%';
    if(cur&&b.scrollIntoView){try{b.scrollIntoView({block:'nearest',inline:'center'});}catch(e){}}
  });
}
function SL_VIS_SEC(){var o={};PLAN.vis.forEach(function(s,i){var e=o[s.sec]=o[s.sec]||{first:i,last:i};e.last=i;});return o;}
function go(n){var v=plan().vis;state.pos=Math.max(0,Math.min(v.length-1,n));render();}
function goId(id){
  var v=visible(),i=v.findIndex(function(s){return s.id===id;});
  if(i<0){state.mode='full';syncMode();v=visible();i=v.findIndex(function(s){return s.id===id;});}
  if(i>=0)go(i);
}
function syncMode(){document.getElementById('mFull').className=state.mode==='full'?'on':'';document.getElementById('mFast').className=state.mode==='fast'?'on':'';}
function setMode(m){
  var cur=PLAN?PLAN.vis[CUR]:null;state.mode=m;syncMode();var v=visible();
  var i=cur?v.findIndex(function(s){return s.id===cur.id;}):-1;
  if(i<0&&cur){/* nearest following slide that is visible */var all=SL,ci=all.indexOf(cur);for(var k=ci;k<all.length&&i<0;k++){i=v.indexOf(all[k]);}if(i<0)i=v.length-1;}
  state.pos=Math.max(0,i);render();
}
/* ---------- drawer ---------- */
function drawer(){
  var q=(document.getElementById('dq').value||'').toLowerCase().trim(),vis=visible(),h='',cur=PLAN?PLAN.vis[CUR].id:'';
  SEC.forEach(function(sc){
    var list=vis.filter(function(s){return s.sec===sc.id&&(!q||txt(s).indexOf(q)>=0);});
    if(!list.length)return;
    h+='<div class="dsec">'+sc.short+' · '+sc.name+' · '+(state.mode==='full'?sc.min:sc.fast)+' min</div>';
    list.forEach(function(s){h+='<button class="ditem'+(s.id===cur?' cur':'')+'" data-goto="'+s.id+'">'+(s.tier==='must'&&s.type!=='recall'?'<span class="tag">★</span> ':'')+(s.type==='recall'?'✎ ':'')+s.title+'</button>';});
  });
  document.getElementById('dlist').innerHTML=h||'<p>No slide matches.</p>';
}
/* ---------- events ---------- */
function balanceAnswers(){
  var seed=20260929,seq=[];
  function rnd(){seed=(seed*1103515245+12345)&0x7fffffff;return seed/0x7fffffff;}
  SL.forEach(function(s){(s.items||[]).forEach(function(it){
    if(it.k==='flash'||it._sh)return;
    if(!seq.length){seq=[0,1,2,3];for(var i=3;i>0;i--){var j=Math.floor(rnd()*(i+1)),t=seq[i];seq[i]=seq[j];seq[j]=t;}}
    var target=seq.pop(),old=it.a,idx=[0,1,2,3].filter(function(x){return x!==old;});
    idx.splice(target,0,old);
    var newO=idx.map(function(x){return it.o[x];}),map={};
    idx.forEach(function(oldI,newI){map[oldI]=newI;});
    var nw={};Object.keys(it.w||{}).forEach(function(k){nw[map[+k]]=it.w[k];});
    it.o=newO;it.w=nw;it.a=target;it._sh=1;
  });});
}
function boot(){
  SL.forEach(function(s,i){if(!s.id)s.id=s.sec+'-'+(i+1);s.id=String(s.id);});
  balanceAnswers();
  load();syncMode();
  document.getElementById('mFull').onclick=function(){setMode('full');};
  document.getElementById('mFast').onclick=function(){setMode('fast');};
  document.getElementById('bPrev').onclick=function(){go(CUR-1);};
  document.getElementById('bNext').onclick=function(){go(CUR+1);};
  document.getElementById('bMenu').onclick=function(){drawer();document.getElementById('drawer').className='open';document.getElementById('dq').focus();};
  document.getElementById('bClose').onclick=function(){document.getElementById('drawer').className='';};
  document.getElementById('drawer').onclick=function(e){if(e.target.id==='drawer')document.getElementById('drawer').className='';};
  document.getElementById('dq').oninput=drawer;
  document.getElementById('dlist').onclick=function(e){var t=e.target.closest('[data-goto]');if(t){document.getElementById('drawer').className='';goId(t.getAttribute('data-goto'));}};
  document.getElementById('secnav').onclick=function(e){var b=e.target.closest('.chip');if(!b)return;var id=b.getAttribute('data-sec'),v=visible(),i=v.findIndex(function(s){return s.sec===id;});if(i>=0)go(i);};
  card.onclick=function(e){
    var g=e.target.closest('[data-goto]');if(g){e.preventDefault();goId(g.getAttribute('data-goto'));return;}
    if(e.target.id==='bReset'){state.q={};save();render();return;}
    var opt=e.target.closest('.opt'),rq=e.target.closest('.rq');
    if(opt&&rq&&!opt.classList.contains('locked')){answer(rq,+opt.getAttribute('data-i'));return;}
    var rv=e.target.closest('.revbtn');
    if(rv&&rq){
      if(rq.querySelector('.flash')){rq.querySelector('.fa').style.display='block';rv.style.display='none';}
      else answer(rq,-1);
    }
  };
  document.addEventListener('keydown',function(e){
    if(e.target&&(e.target.tagName==='INPUT'))return;
    if(e.key==='ArrowRight')go(CUR+1);else if(e.key==='ArrowLeft')go(CUR-1);
  });
  render();
}
function answer(rq,pick){
  var qid=rq.getAttribute('data-q'),parts=qid.split('#'),s=SL.filter(function(x){return x.id===parts[0];})[0],x=s.items[+parts[1]];
  state.q[qid]={p:pick,ok:pick===x.a};save();
  Array.prototype.forEach.call(rq.querySelectorAll('.opt'),function(b,i){b.classList.add('locked');if(i===x.a)b.classList.add('correct');else if(i===pick)b.classList.add('wrong');});
  var rb=rq.querySelector('.revbtn');if(rb)rb.style.display='none';
  rq.querySelector('.fbwrap').innerHTML=fbHTML(x,state.q[qid]);
}
/* ---------- QA hook ---------- */
window.QA=function(){
  var rep={sections:{},loGaps:[],slides:SL.length,mustSlides:SL.filter(function(s){return s.tier==='must';}).length,missingFigs:[],items:0,minFull:0,minFast:0};
  SEC.forEach(function(sc){rep.minFull+=sc.min;rep.minFast+=sc.fast;});
  SEC.forEach(function(sc){
    var a=SL.filter(function(s){return s.sec===sc.id;});
    rep.sections[sc.id]={slides:a.length,must:a.filter(function(s){return s.tier==='must';}).length,recallItems:a.reduce(function(n,s){return n+(s.items?s.items.length:0);},0)};
    rep.items+=rep.sections[sc.id].recallItems;
    (LO[sc.id]||[]).forEach(function(t,i){var n=i+1,c=a.filter(function(s){return (s.lo||[]).indexOf(n)>=0&&s.type!=='lo';}).length;var q=0;a.forEach(function(s){(s.items||[]).forEach(function(it){if(it.lo===n)q++;});});if(!c)rep.loGaps.push(sc.id+' LO'+n+' no slide');if(!q)rep.loGaps.push(sc.id+' LO'+n+' no question');});
  });
  SL.forEach(function(s){var h=typeof s.html==='function'?s.html():(s.html||'');var re=/data-src="([^"]+)"/g,m;while((m=re.exec(h))){if(!IMG[m[1]])rep.missingFigs.push(s.id+':'+m[1]);}});
  return rep;
};
