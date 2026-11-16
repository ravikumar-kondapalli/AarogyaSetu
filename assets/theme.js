/* AarogyaSetu — shared design tokens (load right after the Tailwind CDN script) */
tailwind.config = {
  theme: { extend: {
    colors: {
      brand: {50:'#F0FDFA',100:'#CCFBF1',200:'#99F6E4',300:'#5EEAD4',500:'#14B8A6',600:'#0D9488',700:'#0F766E',800:'#115E59',900:'#134E4A'},
      warm:  {50:'#FFFBEB',100:'#FEF3C7',200:'#FDE68A',500:'#F59E0B',600:'#D97706',700:'#B45309'},
      canvas:'#F8FAFC'
    },
    fontFamily: { sans:['"Plus Jakarta Sans"','system-ui','sans-serif'] }
  } }
};
(function(){
  try { if (localStorage.getItem('as_big')==='1') document.documentElement.classList.add('big'); } catch(e){}
  const css = `
  html{font-size:16px;-webkit-tap-highlight-color:transparent}
  html.big{font-size:18px}
  body{font-family:'Plus Jakarta Sans',system-ui,sans-serif}
  .te{font-family:'Noto Sans Telugu',sans-serif}
  .lucide{width:1.25em;height:1.25em;flex-shrink:0}
  .lucide.ico-sm{width:1em;height:1em}
  .pulse-amber{animation:pa 1.6s infinite}
  .pulse-teal{animation:pt 1.6s infinite}
  @keyframes pa{0%{box-shadow:0 0 0 0 rgba(217,119,6,.55)}70%{box-shadow:0 0 0 12px rgba(217,119,6,0)}100%{box-shadow:0 0 0 0 rgba(217,119,6,0)}}
  @keyframes pt{0%{box-shadow:0 0 0 0 rgba(15,118,110,.5)}70%{box-shadow:0 0 0 12px rgba(15,118,110,0)}100%{box-shadow:0 0 0 0 rgba(15,118,110,0)}}
  .fade-in{animation:fi .25s ease}
  @keyframes fi{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
  .sheet-in{animation:si .28s cubic-bezier(.2,.8,.2,1)}
  @keyframes si{from{transform:translateY(40px);opacity:.4}to{transform:none;opacity:1}}
  .scroll-thin::-webkit-scrollbar{width:6px;height:6px}
  .scroll-thin::-webkit-scrollbar-thumb{background:#CBD5E1;border-radius:9px}
  .no-scrollbar::-webkit-scrollbar{display:none}.no-scrollbar{scrollbar-width:none}
  .plate{font-family:ui-monospace,'Courier New',monospace;letter-spacing:.08em}
  .switch{width:3.25rem;height:1.85rem;border-radius:999px;background:#CBD5E1;position:relative;transition:background .2s;flex-shrink:0}
  .switch::after{content:'';position:absolute;top:.2rem;left:.2rem;width:1.45rem;height:1.45rem;border-radius:999px;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.25);transition:transform .2s}
  .switch[aria-checked="true"]{background:#0F766E}
  .switch[aria-checked="true"]::after{transform:translateX(1.4rem)}
  .switch:disabled{opacity:.4;cursor:not-allowed}
  .road{stroke:#E2E8F0;stroke-width:10;fill:none;stroke-linecap:round}
  :focus-visible{outline:3px solid #5EEAD4;outline-offset:2px}
  .otp-box{width:3.4rem;height:3.6rem;text-align:center;font-size:1.5rem;font-weight:700}
  .safe-b{padding-bottom:max(.5rem, env(safe-area-inset-bottom))}`;
  const tw = `
  .badge-ok{@apply inline-flex items-center gap-1 rounded-full bg-brand-50 text-brand-800 border border-brand-100 px-2.5 py-1 text-xs font-bold;}
  .badge-slate{@apply inline-flex items-center gap-1 rounded-full bg-slate-100 text-slate-700 px-2.5 py-1 text-xs font-bold;}
  .badge-warn{@apply inline-flex items-center gap-1 rounded-full bg-warm-50 text-warm-700 border border-warm-200 px-2.5 py-1 text-xs font-bold;}
  .badge-red{@apply inline-flex items-center gap-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200 px-2.5 py-1 text-xs font-bold;}
  .inp{@apply w-full rounded-xl border border-slate-300 bg-white px-4 py-3.5 text-base text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-brand-100 focus:border-brand-600;}
  .lbl{@apply block text-sm font-bold text-slate-700 mb-1.5;}
  .btn-primary{@apply inline-flex items-center justify-center gap-2 rounded-2xl bg-brand-700 text-white font-bold px-5 py-3.5 min-h-[52px] hover:bg-brand-800 active:scale-[.98] transition disabled:bg-slate-300 disabled:cursor-not-allowed;}
  .btn-ghost{@apply inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-white text-slate-700 font-bold px-4 py-3 min-h-[48px] hover:bg-slate-50 active:scale-[.98] transition disabled:opacity-40;}
  .btn-amber{@apply inline-flex items-center justify-center gap-2 rounded-2xl bg-warm-600 text-white font-bold px-5 py-3.5 min-h-[52px] hover:bg-warm-700 active:scale-[.98] transition;}
  .chip{@apply inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-sm font-semibold text-slate-700 hover:border-brand-600 transition min-h-[44px] cursor-pointer select-none;}
  .chip.on{@apply border-brand-700 bg-brand-50 text-brand-800 ring-2 ring-brand-100;}
  .card-opt{@apply w-full text-left rounded-2xl border-2 border-slate-200 bg-white p-4 hover:border-brand-500 transition;}
  .card-opt.on{@apply border-brand-700 bg-brand-50/60 ring-4 ring-brand-100;}
  .panel{@apply bg-white rounded-3xl border border-slate-200 p-4 sm:p-5 shadow-sm;}
  .h2{@apply font-extrabold text-lg text-slate-900;}
  .navbtn{@apply flex flex-col items-center justify-center gap-1 py-2 text-[11px] font-bold text-slate-500 min-h-[60px] relative;}
  .navbtn.active{@apply text-brand-700;}`;
  const a = document.createElement('style'); a.textContent = css; document.head.appendChild(a);
  const b = document.createElement('style'); b.setAttribute('type','text/tailwindcss'); b.textContent = tw; document.head.appendChild(b);
})();
