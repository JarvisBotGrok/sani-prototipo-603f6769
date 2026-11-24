(()=>{const g=document.querySelector('.ug');if(!g)return;
const tr=g.querySelector('.ug-track'),sl=[...g.querySelectorAll('.ug-slide')],th=[...g.querySelectorAll('.ug-thumbs button')],
pv=g.querySelector('.ug-prev'),nx=g.querySelector('.ug-next'),ct=g.querySelector('.ug-count');let i=0;
function go(n){i=Math.max(0,Math.min(sl.length-1,n));tr.style.transform=`translateX(-${i*100}%)`;
th.forEach((b,k)=>b.setAttribute('aria-current',k===i));pv.disabled=i===0;nx.disabled=i===sl.length-1;ct.textContent=`${i+1}/${sl.length}`;
sl.forEach((s,k)=>{s.setAttribute('aria-hidden',k!==i);const v=s.querySelector('video');if(v&&k!==i)v.pause()});}
pv.onclick=()=>go(i-1);nx.onclick=()=>go(i+1);th.forEach((b,k)=>b.onclick=()=>go(k));
g.addEventListener('keydown',e=>{if(e.key==='ArrowLeft')go(i-1);if(e.key==='ArrowRight')go(i+1)});
let x0=null;const st=g.querySelector('.ug-stage');
st.addEventListener('pointerdown',e=>{x0=e.clientX});st.addEventListener('pointerup',e=>{if(x0===null)return;const d=e.clientX-x0;if(Math.abs(d)>40)go(i+(d<0?1:-1));x0=null});
// vídeo: se o arquivo existir, troca o espaço reservado pelo player
const v=g.querySelector('video[data-src]');if(v){fetch(v.dataset.src,{method:'HEAD'}).then(r=>{if(r.ok){v.src=v.dataset.src;v.hidden=false;if(v.textTracks[0])v.textTracks[0].mode='showing';g.querySelector('.ug-vph').remove()}}).catch(()=>{})}
go(0)})();
