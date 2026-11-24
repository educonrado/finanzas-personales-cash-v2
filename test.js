const C=require('./core.js'),a=require('assert');
const mk=(n,o={})=>({id:C.slug(n),name:n,initial:0,include:true,archived:false,created:'2026-01-01T00:00:00Z',countedAt:null,...o});
const st=()=>({v:3,accounts:[mk('Banco'),mk('Efectivo'),mk('Poliza',{include:false,initial:1550000})],categories:[{id:'comida',name:'Comida',type:'expense'},{id:'varios',name:'Varios',type:'expense'},{id:'sueldo',name:'Sueldo',type:'income'}],txs:[],lastAcc:'banco',filter:'all'});
const tx=(s,o)=>s.txs.push({id:'t'+s.txs.length,ts:new Date(2026,10,10,12,s.txs.length).toISOString(),desc:'x',cat:null,to:null,...o});
// dinero
a.equal(C.toCents('12,5'),1250);a.equal(C.toCents('.5'),50);a.equal(C.toCents('1.250'),null);a.equal(C.signed('-3,05'),-305);
a.equal(C.fmt(123456),'$1.234,56');a.equal(C.fmt(-5),'−$0,05');
let s=st(),before=JSON.stringify(s);
// parse puro y reglas
let p=C.parse('350 cena #gym',s);a.equal(p.amount,35000);a.equal(p.cat,'gym');a.ok(p.newCat);a.equal(JSON.stringify(s),before);
a.equal(C.parse('+1200 sueldo #sueldo @efectivo',s).acc,'efectivo');
p=C.parse('>efectivo 50',s);a.equal(p.type,'transfer');a.equal(p.acc,'banco');a.equal(p.to,'efectivo');
a.ok(C.parse('>banco 5',s).error);a.ok(C.parse('>nada 5',s).error);a.ok(C.parse('hola',s).error);a.ok(C.parse('0 x',s).error);
s.lastAcc='efectivo';a.equal(C.parse('5 x',s).acc,'efectivo');s.filter='banco';a.equal(C.parse('5 x',s).acc,'banco');s.filter='all';
// saldos y total (póliza no suma)
tx(s,{type:'income',amount:100000,acc:'banco'});tx(s,{type:'expense',amount:3505,acc:'banco'});
a.equal(C.total(s),96495);a.equal(C.balances(s).poliza,1550000);
tx(s,{type:'transfer',amount:20000,acc:'banco',to:'efectivo'});a.equal(C.total(s),96495);
tx(s,{type:'transfer',amount:10000,acc:'banco',to:'poliza'});a.equal(C.total(s),86495);
tx(s,{type:'income',amount:999,acc:'poliza'});a.equal(C.total(s),86495);a.equal(C.balances(s).poliza,1550000+10000+999);
const tl=C.timeline(s,'all');a.equal(tl[0].noSuma,true);a.equal(tl[0].bal,86495);a.equal(tl[1].bal,86495);a.equal(tl.at(-1).bal,100000);
a.equal(C.timeline(s,'poliza')[0].bal,1560999);
// contar
a.equal(C.countDiff(s,'efectivo',19160),-840);a.equal(C.countDiff(s,'efectivo',20000),0);
// resumen: transferencias fuera; póliza dentro
const r=C.summary(s,'income',2026,10);a.equal(r.total,100999);a.equal(C.summary(s,'expense',2026,10).total,3505);
a.equal(C.summary(s,'expense',2026,10).rows[0].cat,'');
// importación
const v=C.validate(JSON.parse(JSON.stringify(s)));a.equal(v.skipped,0);s.txs.push({id:'bad',type:'x'});a.equal(C.validate(JSON.parse(JSON.stringify(s))).skipped,1);
a.equal(C.validate({v:2}),null);
// centavos exactos
const q=st();for(let i=0;i<1000;i++)tx(q,{type:'expense',amount:10,acc:'banco'});a.equal(C.balances(q).banco,-10000);
console.log('TODAS LAS PRUEBAS OK');
// atajos y tokens ambiguos
{const s=st();
 for(const t of ['5 x @','5 x #','5 x @banco @efectivo','5 x #a #b','5 x #---','>banco','+ @ 5']) a.ok(C.parse(t,s).error,'debe fallar: '+t);
 a.ok(C.parse('5 x @banco',s).ok);a.ok(C.parse('5 x #comida',s).ok);a.equal(C.parse('>efectivo 5 #nada',s).cat,null);
 a.equal(C.validate({v:3,accounts:[{id:'-',name:'x'},{id:'banco'}],categories:[{id:'---',type:'expense'},{id:'ok',type:'expense'}],txs:[]}).st.categories.length,1);
 console.log('PRUEBAS DE TOKENS OK');}
a.equal(C.plain(500000),'5000,00');a.equal(C.toCents(C.plain(123456)),123456);a.equal(C.signed(C.plain(-1250)),-1250);a.equal(C.plain(5),'0,05');
console.log('PRUEBAS DE MONTO OK');
