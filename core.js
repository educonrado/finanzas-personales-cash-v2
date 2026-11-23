(function(g){
const MAX=99999999999;
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const toCents=s=>{s=String(s).trim().replace(/^\$/,'');const m=s.match(/^(\d+)(?:[.,](\d{1,2}))?$|^[.,](\d{1,2})$/);if(!m)return null;return +(m[1]||0)*100+ +((m[2]||m[3]||'').padEnd(2,'0')||0)};
const signed=s=>{s=String(s).trim();const n=s[0]==='-';const v=toCents(n?s.slice(1):s);return v==null?null:n?-v:v};
const fmt=c=>{const a=Math.abs(c);return(c<0?'−':'')+'$'+String(Math.floor(a/100)).replace(/\B(?=(\d{3})+(?!\d))/g,'.')+','+String(a%100).padStart(2,'0')};
const slug=s=>String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9_-]+/g,'-').replace(/^-+|-+$/g,'').slice(0,30);
const uid=(list,name)=>{const b=slug(name)||'x';let id=b,i=2;while(list.some(x=>x.id===id))id=b+'-'+i++;return id};
const act=st=>st.accounts.filter(a=>!a.archived);
const delta=(t,id)=>t.type==='transfer'?(id===t.acc?-t.amount:id===t.to?t.amount:0):t.acc!==id?0:t.type==='income'?t.amount:-t.amount;
const balances=st=>{const b={};st.accounts.forEach(a=>b[a.id]=a.initial);st.txs.forEach(t=>{if(b[t.acc]!==undefined)b[t.acc]+=delta(t,t.acc);if(t.to&&b[t.to]!==undefined)b[t.to]+=delta(t,t.to)});return b};
const total=st=>{const b=balances(st);return act(st).filter(a=>a.include).reduce((s,a)=>s+b[a.id],0)};
function parse(raw,st){
 let t=raw.trim();if(!t)return{error:'Escribe un monto y una descripción'};
 const type=t[0]==='+'?'income':t[0]==='>'?'transfer':'expense';if(type!=='expense')t=t.slice(1).trim();
 const A=act(st),find=k=>A.find(a=>a.id===slug(k)||slug(a.name)===slug(k));let to=null;
 if(type==='transfer'){const m=t.match(/^\S+/),d=m&&find(m[0]);if(!d)return{error:'Elige una cuenta destino. Ej: >efectivo 50',tokErr:1};to=d.id;t=t.slice(m[0].length).trim()}
 let acc=null;const ams=[...t.matchAll(/@([^\s#@>]*)/g)];
 if(ams.length>1)return{error:'Solo una cuenta por movimiento',tokErr:1};
 if(ams.length){const am=ams[0];if(!am[1])return{error:'Elige una cuenta después de @',tokErr:1};const a=find(am[1]);if(!a)return{error:'La cuenta @'+am[1]+' no existe',tokErr:1};acc=a.id;t=t.replace(am[0],' ')}
 acc=acc||(st.filter!=='all'&&find(st.filter)?st.filter:null)||(find(st.lastAcc)?st.lastAcc:A[0].id);
 let cat=null,newCat=null;const cms=[...t.matchAll(/#([^\s#@>]*)/g)];
 if(cms.length>1)return{error:'Solo una categoría por movimiento',tokErr:1};
 if(cms.length){const cm=cms[0];if(!cm[1])return{error:'Elige una categoría después de #',tokErr:1};t=t.replace(cm[0],' ');
  if(type!=='transfer'){const id=slug(cm[1]);if(!id)return{error:'La categoría necesita letras o números',tokErr:1};if(st.categories.some(c=>c.type===type&&c.id===id))cat=id;else{cat=id;newCat={id,name:id[0].toUpperCase()+id.slice(1),type}}}}
 const m=t.match(/(?:^|\s)\$?(\d+(?:[.,]\d{1,2})?|[.,]\d{1,2})(?=\s|$)/);
 if(!m)return{error:'No se detectó un monto. Ej: 500 comida'};
 const amount=toCents(m[1]);if(!amount)return{error:'El monto mínimo es $0,01'};if(amount>MAX)return{error:'El monto excede el límite'};
 let desc=t.replace(m[0],' ').replace(/\s+/g,' ').trim().slice(0,80);
 if(!desc){const c=cat&&(newCat||st.categories.find(c=>c.type===type&&c.id===cat));desc=type==='transfer'?'Transferencia':c?c.name:type==='income'?'Ingreso':'Gasto'}
 if(type==='transfer'&&to===acc)return{error:'Origen y destino deben ser distintos'};
 return{ok:1,type,amount,desc,acc,to,cat,newCat};
}
function timeline(st,f){
 const A=act(st),inc=A.filter(a=>a.include).map(a=>a.id),all=f==='all';
 const txs=[...st.txs].sort((a,b)=>a.ts<b.ts?-1:a.ts>b.ts?1:0);
 let run=all?A.filter(a=>a.include).reduce((s,a)=>s+a.initial,0):(st.accounts.find(a=>a.id===f)||{initial:0}).initial;const out=[];
 txs.forEach(t=>{if(!all&&t.acc!==f&&t.to!==f)return;
  const d=all?inc.reduce((s,id)=>s+delta(t,id),0):delta(t,f);run+=d;
  out.push({...t,d,bal:run,noSuma:all&&!inc.includes(t.acc)&&!inc.includes(t.to)})});
 return out.reverse();
}
const countDiff=(st,id,real)=>real-balances(st)[id];
function summary(st,type,y,m,acc){const o={};let total=0;
 st.txs.forEach(t=>{if(t.type!==type||(acc&&acc!=='all'&&t.acc!==acc))return;const d=new Date(t.ts);if(d.getFullYear()!==y||d.getMonth()!==m)return;
  const k=st.categories.some(c=>c.type===type&&c.id===t.cat)?t.cat:'';o[k]=(o[k]||0)+t.amount;total+=t.amount});
 return{total,rows:Object.entries(o).map(([cat,v])=>({cat,v})).sort((a,b)=>b.v-a.v)}}
const net=(st,cat,y,m)=>st.txs.reduce((s,t)=>{const d=new Date(t.ts);return t.cat!==cat||t.type==='transfer'||d.getFullYear()!==y||d.getMonth()!==m?s:s+(t.type==='income'?t.amount:-t.amount)},0);
function validate(d){
 if(!d||d.v!==3||!Array.isArray(d.accounts)||!Array.isArray(d.categories)||!Array.isArray(d.txs))return null;
 const ok=s=>typeof s==='string'&&/^[a-z0-9_-]{1,40}$/.test(s)&&/[a-z0-9]/.test(s),dt=x=>x&&!isNaN(new Date(x));
 const accounts=d.accounts.filter(a=>a&&ok(a.id)).map(a=>({id:a.id,name:String(a.name||a.id).slice(0,24),initial:Number.isInteger(a.initial)?a.initial:0,include:a.include!==false,archived:!!a.archived,created:dt(a.created)?a.created:new Date().toISOString(),countedAt:dt(a.countedAt)?a.countedAt:null}));
 if(!accounts.length)return null;const ids=new Set(accounts.map(a=>a.id));
 const categories=d.categories.filter(c=>c&&ok(c.id)&&['expense','income'].includes(c.type)).map(c=>({id:c.id,name:String(c.name||c.id).slice(0,24),type:c.type}));
 const txs=d.txs.filter(t=>t&&ok(t.id)&&['income','expense','transfer'].includes(t.type)&&Number.isInteger(t.amount)&&t.amount>=1&&t.amount<=MAX&&dt(t.ts)&&ids.has(t.acc)&&(t.type!=='transfer'||(ids.has(t.to)&&t.to!==t.acc))).map(t=>({id:t.id,ts:new Date(t.ts).toISOString(),type:t.type,amount:t.amount,desc:String(t.desc||'Sin descripción').slice(0,80),acc:t.acc,to:t.type==='transfer'?t.to:null,cat:ok(t.cat)?t.cat:null}));
 return{st:{v:3,accounts,categories,txs,lastAcc:ids.has(d.lastAcc)?d.lastAcc:accounts[0].id,filter:'all'},skipped:d.txs.length-txs.length}}
g.Core={esc,toCents,signed,fmt,slug,uid,act,delta,balances,total,parse,timeline,countDiff,summary,net,validate,MAX};
if(typeof module!=='undefined')module.exports=g.Core;
})(typeof window!=='undefined'?window:globalThis);
