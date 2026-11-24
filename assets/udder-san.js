(()=>{const g=document.querySelector('.ug');if(!g)return;
const tr=g.querySelector('.ug-track'),sl=[...g.querySelectorAll('.ug-slide')],th=[...g.querySelectorAll('.ug-thumbs button')],
pv=g.querySelector('.ug-prev'),nx=g.querySelector('.ug-next'),ct=g.querySelector('.ug-count');let i=0,ready=false;
const rm=window.matchMedia('(prefers-reduced-motion: reduce)');
const v=g.querySelector('video[data-src]');
function auto(){if(!v||!ready||rm.matches)return;if(sl[i].contains(v)){v.muted=true;const p=v.play();if(p)p.catch(()=>{})}}
function go(n){i=Math.max(0,Math.min(sl.length-1,n));tr.style.transform=`translateX(-${i*100}%)`;
th.forEach((b,k)=>b.setAttribute('aria-current',k===i));pv.disabled=i===0;nx.disabled=i===sl.length-1;ct.textContent=`${i+1}/${sl.length}`;
sl.forEach((s,k)=>{const off=k!==i;s.setAttribute('aria-hidden',off);s.inert=off;const sv=s.querySelector('video');if(sv&&off)sv.pause()});auto();}
pv.onclick=()=>go(i-1);nx.onclick=()=>go(i+1);th.forEach((b,k)=>b.onclick=()=>go(k));
g.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')go(i-1);if(e.key==='ArrowRight')go(i+1)});
let x0=null;const st=g.querySelector('.ug-stage');
st.addEventListener('pointerdown',e=>{x0=e.clientX});st.addEventListener('pointerup',e=>{if(x0===null)return;const d=e.clientX-x0;if(Math.abs(d)>40)go(i+(d<0?1:-1));x0=null});
// vídeo: se o arquivo existir, troca o espaço reservado pelo player; autoplay mudo só sem prefers-reduced-motion
if(v){fetch(v.dataset.src,{method:'HEAD'}).then(r=>{if(r.ok){v.muted=true;v.src=v.dataset.src;v.hidden=false;
if(v.textTracks[0])v.textTracks[0].mode='showing';const ph=g.querySelector('.ug-vph');if(ph)ph.remove();ready=true;auto()}}).catch(()=>{})}
go(0)})();
