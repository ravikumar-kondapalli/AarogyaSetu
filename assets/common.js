/* =========================================================
   AarogyaSetu — shared data, store & UI helpers
   Used by app.html, register.html and admin.html.
   State lives in localStorage, so pages open in different
   tabs stay in sync (book in the app → see it in admin).
   ========================================================= */
const $  = (s, el=document) => el.querySelector(s);
const $$ = (s, el=document) => [...el.querySelectorAll(s)];
const icons = () => { if (window.lucide) lucide.createIcons(); };
const inr = n => (n < 0 ? '−₹' : '₹') + Math.abs(Math.round(n)).toLocaleString('en-IN');
const fmtTime = mins => { const h = Math.floor(mins/60)%24, m = Math.round(mins%60); return `${((h+11)%12)+1}:${String(m).padStart(2,'0')} ${h>=12?'PM':'AM'}`; };
const nowStr = () => new Date().toLocaleTimeString('en-IN',{hour:'numeric',minute:'2-digit'});
const ago = ts => { const m = Math.max(0, Math.round((Date.now()-ts)/60000)); return m<1?'just now':m<60?`${m} min ago`:`${Math.round(m/60)} hr ago`; };
function km(a,b){ const R=6371,r=Math.PI/180,dLa=(b.lat-a.lat)*r,dLo=(b.lng-a.lng)*r; const x=Math.sin(dLa/2)**2+Math.cos(a.lat*r)*Math.cos(b.lat*r)*Math.sin(dLo/2)**2; return Math.max(1.8, 2*R*Math.asin(Math.sqrt(x))*1.4); }
const etaMin = d => Math.round(d/17*60)+4;   // ~17 km/h Hyderabad average + buffer
const DEMO_OTP = '4821';

/* ---------------- Hyderabad mock data ---------------- */
const AREAS = [
  {id:'jubilee',      name:'Jubilee Hills', pins:['500033','500096'], lat:17.4325, lng:78.4073, addr:'Plot 42, Road No. 10, Jubilee Hills'},
  {id:'banjara',      name:'Banjara Hills', pins:['500034'],          lat:17.4156, lng:78.4347, addr:'8-2-293/82, Road No. 3, Banjara Hills'},
  {id:'gachibowli',   name:'Gachibowli',    pins:['500032','500046'], lat:17.4401, lng:78.3489, addr:'Flat 302, Sri Sai Residency, Indira Nagar, Gachibowli'},
  {id:'hitec',        name:'HITEC City',    pins:['500081'],          lat:17.4474, lng:78.3762, addr:'Villa 7, Kavuri Hills Phase 2, Madhapur'},
  {id:'kondapur',     name:'Kondapur',      pins:['500084'],          lat:17.4615, lng:78.3570, addr:'H.No 2-48/5, Botanical Garden Rd, Kondapur'},
  {id:'secunderabad', name:'Secunderabad',  pins:['500003','500026'], lat:17.4399, lng:78.4983, addr:'12-3-45, Sardar Patel Rd, Secunderabad'},
  {id:'somajiguda',   name:'Somajiguda',    pins:['500082'],          lat:17.4239, lng:78.4597, addr:'6-3-1090/A, Raj Bhavan Rd, Somajiguda'},
];
const HOSPITALS = [
  {id:'apollo-jh',   name:'Apollo Hospitals',  branch:'Jubilee Hills', lat:17.4153, lng:78.4105, gate:'Main Gate 1 – OPD Drop Bay',        parking:'Basement P1',        load:78, depts:['Cardiology','Orthopaedics','Neurology','Oncology','Nephrology','General Medicine']},
  {id:'yashoda-som', name:'Yashoda Hospitals', branch:'Somajiguda',    lat:17.4233, lng:78.4607, gate:'Main Gate 2 – Emergency/OPD Drop',  parking:'Visitor Parking P2', load:84, depts:['Cardiology','Pulmonology','Endocrinology','Nephrology','Orthopaedics','General Medicine']},
  {id:'yashoda-sec', name:'Yashoda Hospitals', branch:'Secunderabad',  lat:17.4410, lng:78.5015, gate:'Gate 1 – OPD Drop (Alexander Rd)',  parking:'Multi-level P3',     load:66, depts:['Cardiology','Orthopaedics','Neurology','Gastroenterology','General Medicine']},
  {id:'aig-gb',      name:'AIG Hospitals',     branch:'Gachibowli',    lat:17.4433, lng:78.3637, gate:'Tower A Porch – OPD Drop Gate 3',   parking:'Basement B2',        load:91, depts:['Gastroenterology','Hepatology','Endoscopy','Cardiology','Oncology','Pulmonology']},
  {id:'kims-sec',    name:'KIMS Hospitals',    branch:'Secunderabad',  lat:17.4382, lng:78.4885, gate:'Minister Rd Gate – OPD Drop',       parking:'Surface Lot A',      load:72, depts:['Cardiology','Neurology','Nephrology','Orthopaedics','Pulmonology']},
  {id:'kims-kpr',    name:'KIMS Hospitals',    branch:'Kondapur',      lat:17.4630, lng:78.3640, gate:'Main Porch – Wheelchair Ramp Bay',  parking:'Basement P1',        load:58, depts:['Orthopaedics','Cardiology','Gynaecology','Paediatrics','General Medicine']},
  {id:'care-bh',     name:'CARE Hospitals',    branch:'Banjara Hills', lat:17.4124, lng:78.4486, gate:'Road No. 1 Gate – OPD Drop',        parking:'Visitor Lot B',      load:69, depts:['Cardiology','Neurology','Orthopaedics','Urology','General Medicine']},
];
const PACKAGES = {
  ride:      {id:'ride',      name:'Pickup & Drop Only',          short:'Pickup & Drop',  icon:'car',         base:349,  perKm:18, desc:'Verified driver from your door to the hospital gate and back.', incl:['Police-verified driver','Up to 3 hrs free waiting','Live trip sharing with family']},
  companion: {id:'companion', name:'In-Hospital Care Companion',  short:'Care Companion', icon:'stethoscope', base:999,  perKm:0,  desc:'A trained medical attendant meets the patient at the hospital (4 hrs).', incl:['OP registration & queue handling','Escort to labs, scans & pharmacy','Reports uploaded for family']},
  full:      {id:'full',      name:'Full Door-to-Door Concierge', short:'Full Concierge', icon:'route',       base:1499, perKm:16, desc:'Pickup, in-hospital companion and safe drop — fully managed.', incl:['Driver + medical attendant','OTP handovers at every step','Step-by-step WhatsApp updates'], tag:'Most booked'},
};
const NEEDS = [
  {id:'wheelchair', name:'Wheelchair assistance',     icon:'accessibility',  price:199, ride:true},
  {id:'elderly',    name:'Elderly care (60+)',        icon:'heart-handshake',price:249, ride:true},
  {id:'radiology',  name:'Radiology / scan escort',   icon:'scan-line',      price:299, sub:'MRI · CT · X-ray · USG'},
  {id:'lab',        name:'Lab tests & sample escort', icon:'flask-conical',  price:149},
  {id:'pharmacy',   name:'Pharmacy pickup & billing', icon:'pill',           price:99},
  {id:'postop',     name:'Post-op discharge support', icon:'bed',            price:499, sub:'Discharge summary · TPA desk'},
];
const DRIVER    = {name:'Srinivas Goud', first:'Srinivas', plate:'TS 09 UB 4521', vehicle:'Maruti Ertiga · wheelchair-ready', rating:4.92};
const ATTENDANT = {name:'Rahul Reddy', first:'Rahul', title:'Medical Intern', role:'Medical Intern (MBBS)', college:'Gandhi Medical College', rating:4.95};
const DOCTORS = {Gastroenterology:'Dr. K. Sudheer', Hepatology:'Dr. N. Vasavi', Cardiology:'Dr. S. Mohan Rao', Orthopaedics:'Dr. P. Raghavendra', Neurology:'Dr. Farhana Begum', Nephrology:'Dr. V. Anand Kumar', Pulmonology:'Dr. M. Shiva Prasad', Endocrinology:'Dr. Lakshmi Prasanna', Oncology:'Dr. R. Harish', 'General Medicine':'Dr. G. Srikanth', Endoscopy:'Dr. A. Kiran', Urology:'Dr. Imtiaz Ahmed', Gynaecology:'Dr. Swathi Reddy', Paediatrics:'Dr. B. Nagaraju'};
const DEMO_BOOKING = {
  id:'ASH-HYD-24817', area:'gachibowli', pin:'500032', address:AREAS[2].addr, hospital:'aig-gb', pkg:'full',
  needs:['elderly','lab','radiology','pharmacy'], vehicle:'sedan',
  patient:{name:'Venkateswara Rao Chilukuri', age:68, gender:'M', phone:'98490 •••41', lang:'Telugu'},
  dept:'Gastroenterology', doctor:'Dr. K. Sudheer', date:'Today', time:'10:30 AM', booker:'Karthik Chilukuri (son)', total:2486, demo:true
};
const DEMO_NOTES = [
  {tone:'red',   label:'Allergy',       text:'Sulfa drugs — skin rash (2019).'},
  {tone:'amber', label:'Blood thinner', text:'On Clopidogrel after angioplasty (2023). Ask lab to apply pressure 5 min after blood draw.'},
  {tone:'amber', label:'MRI safety',    text:'Coronary stent — MRI-conditional card is in his wallet. Show it to Radiology before MRCP.'},
  {tone:'slate', label:'History',       text:'Type 2 diabetes (12 yrs), hypertension. Referred for raised liver enzymes.'},
  {tone:'slate', label:'Fasting',       text:'Nil by mouth since 10 PM for LFT & MRCP. Offer breakfast only after the scan.'},
  {tone:'slate', label:'Communication', text:'Prefers Telugu. Hearing aid in left ear — speak from his right side.'},
  {tone:'slate', label:'Family',        text:'Son Karthik (works at HITEC City) wants a WhatsApp update after every step.'},
];
const hosp = id => HOSPITALS.find(h=>h.id===id);
const area = id => AREAS.find(a=>a.id===id);
const hName = h => `${h.name.split(' ')[0]} ${h.branch}`;

/* ---------------- Trip engine: milestones per booking ---------------- */
const _msCache = {};
function buildMilestones(b){
  if (_msCache[b.id]) return _msCache[b.id];
  const H = hosp(b.hospital), A = area(b.area), P = b.pkg;
  const ride = P!=='companion', comp = P!=='ride';
  const needs = new Set(b.needs), eta = etaMin(km(A,H));
  const token = 10 + (b.id.charCodeAt(b.id.length-1) % 30), room = 100 + (b.id.charCodeAt(b.id.length-2) % 90);
  const ms = []; const add = o => ms.push(Object.assign({dur:6, pos:null}, o));
  const att = `${ATTENDANT.title} ${ATTENDANT.first}`;
  add({key:'confirmed', owner:'system', icon:'badge-check', title:'Booking confirmed', detail:`${b.id} · ${PACKAGES[P].name}`, dur:0, pos:0});
  if (ride){
    add({key:'assigned', owner:'system', icon:'user-check', title:`Driver assigned — ${DRIVER.name}`, detail:`${DRIVER.plate} · ${DRIVER.vehicle}`, dur:2});
    add({key:'enroute',  owner:'driver', icon:'navigation', title:`Driver en route to ${A.name}`, detail:'Live location shared with family', action:'Start trip to pickup', dur:3});
    add({key:'arrived',  owner:'driver', icon:'map-pin', title:`Driver arrived at ${A.name}`, detail:b.address, action:'Arrived at pickup', dur:14, pos:0});
    add({key:'onboard',  owner:'driver', icon:'key-round', title:'Patient onboard · OTP verified', detail: needs.has('wheelchair')?'Wheelchair locked with ramp & 4-point belts':'Seatbelt & comfort check done', action:'Verify pickup OTP', otp:true, dur:7, pos:0.04});
    add({key:'reached',  owner:'driver', icon:'hospital', title:`Reached ${H.name}, ${H.branch}`, detail:H.gate, action:'Reached drop gate', dur:eta, pos:1});
  }
  if (comp){
    add({key:'handover', owner:'attendant', icon:'hand-heart', title:`Handover to ${att}`, detail: ride?`Driver → attendant OTP handover at ${H.gate}`:`Attendant receives patient at ${H.gate}`, action: ride?'Receive patient (driver OTP)':'Receive patient at gate', otp:true, dur:ride?3:0, pos:1});
    add({key:'registration', owner:'attendant', icon:'clipboard-list', title:'OP registration & token issued', detail:`${b.dept} · Token ${token} · Ground floor reception`, action:'Sign off registration', dur:12});
    if (needs.has('lab')) add({key:'lab', owner:'attendant', icon:'flask-conical', title:'Blood samples collected', detail:'Central Lab, Ground floor · fasting samples', action:'Sign off lab collection', dur:16});
    add({key:'consult', owner:'attendant', icon:'stethoscope', title:`Consultation — ${b.doctor}`, detail:`${b.dept} OPD · Room ${room} · advice noted for family`, action:'Sign off consultation', dur:38});
    if (needs.has('radiology')) add({key:'scan', owner:'attendant', icon:'scan-line', title:`${att} escorting to MRI Room 4`, detail:'Radiology, Block B · metal-safety screening done', action:'Sign off scan escort', dur:42});
    if (needs.has('postop')) add({key:'discharge', owner:'attendant', icon:'bed', title:'Discharge summary & TPA clearance', detail:'Insurance desk, 1st floor · summary copy collected', action:'Sign off discharge', dur:45});
    add({key:'pharmacy', owner:'attendant', icon:'pill', title:'Pharmacy billing & medicines collected', detail:'Prescription cross-checked · UPI receipt shared', action:'Sign off pharmacy', dur:18});
    add({key:'reports', owner:'attendant', icon:'file-text', title:'Reports & prescription uploaded', detail:'Now visible to family in the app', action:'Upload & sign off', dur:6});
  }
  if (ride){
    if (comp) add({key:'handback', owner:'attendant', icon:'arrow-right-left', title:`Patient handed back to ${DRIVER.first}`, detail:`${H.gate} · return OTP verified`, action:'Hand back to driver (OTP)', otp:true, dur:8, pos:1});
    else add({key:'wait', owner:'driver', icon:'circle-parking', title:`Waiting at ${H.parking}`, detail:'Patient inside hospital (3 hrs free waiting)', action:'Patient back at gate', dur:95, pos:1});
    add({key:'dropoff', owner:'driver', icon:'route', title:'Drop-off initiated', detail:`Returning to ${A.name}`, action:'Start return trip', dur:4, pos:0.9});
    add({key:'home', owner:'driver', icon:'house', title:'Reached home safely', detail:'Family notified on WhatsApp · trip closed', action:'Complete drop-off', dur:eta, pos:0});
  } else {
    add({key:'complete', owner:'attendant', icon:'circle-check', title:'Visit complete', detail:'Patient escorted to family / hospital exit', action:'Close visit', dur:5});
  }
  return (_msCache[b.id] = ms);
}
function newTrip(b, preDone){
  const t = {b, done:0, times:[], clock:8*60+35}, ms = buildMilestones(b);
  for (let i=0; i<preDone; i++){ t.clock += ms[i].dur; t.times[i] = t.clock; t.done++; }
  return t;
}

/* ---------------- Shared store (localStorage) ---------------- */
const KEY = 'aarogyasetu_store_v1';
function defaultState(){
  const now = Date.now(), m = x => now - x*60000;
  return {
    v:1,
    trip: newTrip(DEMO_BOOKING, 4),
    stats:{active:47, trainees:312, drivers:138},
    myApps:[],
    queue:[
      {id:'TR-1041', type:'trainee', name:'Sravani Kondapalli', sub:'B.Sc Nursing (Final yr) · Govt. College of Nursing, Hyderabad', idno:'TSNMC/STU/2023/7781', docs:['College ID card','Bonafide certificate','Aadhaar (masked)','BLS certificate'], flags:[], ts:m(8), langs:'Telugu, English', status:'pending'},
      {id:'DR-2207', type:'driver',  name:'Mohammed Imran', sub:'TS 07 FK 8834 · Toyota Innova Crysta', idno:'DL TS0720190045521', docs:['Driving licence','RC','Commercial insurance','Police clearance certificate'], flags:[], ts:m(14), langs:'Urdu, Hindi, Telugu', status:'pending'},
      {id:'TR-1042', type:'trainee', name:'Ayesha Fatima', sub:'MBBS Intern · Osmania Medical College', idno:'TSMC/INT/2025/03977', docs:['College ID card','Council ID','Aadhaar (masked)'], flags:['BLS certificate not uploaded'], ts:m(31), langs:'Urdu, Hindi, English', status:'pending'},
      {id:'DR-2208', type:'driver',  name:'Venkatesh Yadav', sub:'TS 08 EH 2210 · Force Traveller (WAV)', idno:'DL TS0820170033190', docs:['Driving licence','RC','Commercial insurance','PUC & fitness'], flags:['Police clearance pending — Rachakonda'], ts:m(52), langs:'Telugu, Hindi', status:'pending'},
      {id:'TR-1043', type:'trainee', name:'Mohd. Faizan', sub:'BPT (3rd yr) · Deccan College of Medical Sciences', idno:'TSPMB/AH/2024/1182', docs:['College ID card','Bonafide certificate','First-aid certificate'], flags:[], ts:m(64), langs:'Dakhini, Hindi, English', status:'pending'},
      {id:'DR-2206', type:'driver',  name:'Anil Kumar Goud', sub:'TG 09 AB 1077 · Maruti Dzire', idno:'DL TS0920210012345', docs:['Driving licence','RC','Commercial insurance','Police clearance certificate','PUC & fitness'], flags:[], ts:m(118), langs:'Telugu', status:'pending'},
    ],
    feed:[
      {ts:m(3),  t:'', text:'Partner hospital <b>KIMS Kondapur</b> came online · gate API connected', icon:'hospital', tone:'teal'},
      {ts:m(9),  t:'', text:'<b>Mohammed Imran</b> uploaded police clearance (Hyderabad City Police)', icon:'file-check-2', tone:'amber'},
      {ts:m(20), t:'', text:'<b>ASH-HYD-24817</b> · Booking confirmed (Karthik C., HITEC City)', icon:'badge-check', tone:'teal'},
    ],
  };
}
let S = load();
function load(){
  try { const s = JSON.parse(localStorage.getItem(KEY)); if (s && s.v===1 && s.trip) return s; } catch(e){}
  const d = defaultState(); try { localStorage.setItem(KEY, JSON.stringify(d)); } catch(e){}
  return d;
}
function save(){ try { localStorage.setItem(KEY, JSON.stringify(S)); } catch(e){} }
const _listeners = [];
function onState(fn){ _listeners.push(fn); }
function emit(){ save(); _listeners.forEach(f=>f('local')); }
window.addEventListener('storage', e => { if (e.key===KEY){ S = load(); _listeners.forEach(f=>f('remote')); } });
function resetDemo(){ try { localStorage.removeItem(KEY); } catch(e){} S = load(); _listeners.forEach(f=>f('local')); toast('Demo data reset','info'); }

function logEvent(text, icon='activity', tone='teal', doEmit=true){
  S.feed.unshift({ts:Date.now(), t:nowStr(), text, icon, tone});
  S.feed = S.feed.slice(0, 60);
  if (doEmit) emit();
}
const tripMs = () => S.trip ? buildMilestones(S.trip.b) : [];
const tripComplete = () => !S.trip || S.trip.done >= tripMs().length;
function advanceTrip(source='system'){
  const t = S.trip, ms = tripMs();
  if (!t || t.done >= ms.length) return null;
  const m = ms[t.done];
  t.clock += m.dur; t.times[t.done] = t.clock; t.done++;
  const who = m.owner==='driver' ? DRIVER.first : m.owner==='attendant' ? ATTENDANT.first : 'System';
  if (t.done >= ms.length) S.stats.active = Math.max(0, S.stats.active-1);
  logEvent(`<b>${t.b.id}</b> · ${m.title} <span class="text-slate-400">(${who})</span>`, m.icon, m.owner==='attendant'?'amber':'teal', false);
  emit();
  return m;
}

/* ---------------- UI chrome: toast, bottom sheet, OTP ---------------- */
document.body.insertAdjacentHTML('beforeend', `
  <div id="toastStack" class="fixed z-[6000] left-1/2 -translate-x-1/2 top-3 space-y-2 w-[min(94vw,420px)] pointer-events-none"></div>
  <div id="sheetRoot" class="fixed inset-0 z-[5000] hidden">
    <div class="absolute inset-0 bg-slate-900/50" onclick="closeSheet()"></div>
    <div class="absolute inset-x-0 bottom-0 sm:inset-0 sm:grid sm:place-items-center sm:p-4 pointer-events-none">
      <div id="sheetCard" class="pointer-events-auto relative w-full sm:max-w-lg mx-auto bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl p-5 pt-3 sm:p-6 max-h-[90dvh] overflow-y-auto sheet-in safe-b"></div>
    </div>
  </div>`);
function toast(msg, type='ok'){
  const map = {ok:['bg-brand-700','circle-check'], info:['bg-slate-800','info'], warn:['bg-warm-600','triangle-alert'], err:['bg-rose-600','circle-x']};
  const [bg, ic] = map[type] || map.ok;
  const t = document.createElement('div');
  t.className = `${bg} text-white rounded-2xl shadow-xl px-4 py-3 flex items-start gap-3 fade-in`;
  t.innerHTML = `<i data-lucide="${ic}" class="mt-0.5"></i><p class="text-sm font-semibold leading-snug flex-1">${msg}</p>`;
  $('#toastStack').appendChild(t); icons();
  setTimeout(()=>{ t.style.transition='opacity .3s'; t.style.opacity='0'; setTimeout(()=>t.remove(),300); }, 3200);
}
function openSheet(html, wide=false){
  const c = $('#sheetCard');
  c.className = `pointer-events-auto relative w-full ${wide?'sm:max-w-2xl':'sm:max-w-lg'} mx-auto bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl p-5 pt-3 sm:p-6 max-h-[90dvh] overflow-y-auto sheet-in safe-b`;
  c.innerHTML = `<div class="w-12 h-1.5 rounded-full bg-slate-300 mx-auto mb-3 sm:hidden"></div>
    <button onclick="closeSheet()" class="absolute top-3 right-3 w-11 h-11 grid place-items-center rounded-full hover:bg-slate-100" aria-label="Close"><i data-lucide="x"></i></button>` + html;
  $('#sheetRoot').classList.remove('hidden'); icons();
}
function closeSheet(){ $('#sheetRoot').classList.add('hidden'); }
document.addEventListener('keydown', e => { if (e.key==='Escape') closeSheet(); });

function openOtp(title, sub, onOk){
  openSheet(`
    <div class="w-12 h-12 rounded-2xl bg-brand-50 text-brand-700 grid place-items-center mb-3"><i data-lucide="key-round"></i></div>
    <h3 class="text-xl font-extrabold text-slate-900 pr-10">${title}</h3>
    <p class="text-slate-600 mt-1">${sub}</p>
    <div class="flex gap-3 justify-center my-6" id="otpBoxes">${[0,1,2,3].map(()=>`<input inputmode="numeric" maxlength="1" class="otp-box inp !px-0">`).join('')}</div>
    <p class="text-center text-sm text-slate-500 mb-3">Demo OTP: <b class="text-slate-800 tracking-widest">${DEMO_OTP}</b></p>
    <p id="otpErr" class="hidden text-center text-sm font-bold text-rose-600 mb-3">Incorrect OTP. Please try again.</p>
    <button id="otpOk" class="btn-primary w-full"><i data-lucide="shield-check"></i>Verify &amp; confirm</button>`);
  const boxes = $$('#otpBoxes input');
  boxes.forEach((b,i)=>{
    b.addEventListener('input', ()=>{ b.value=b.value.replace(/\D/g,''); if (b.value && boxes[i+1]) boxes[i+1].focus(); });
    b.addEventListener('keydown', e=>{ if (e.key==='Backspace' && !b.value && boxes[i-1]) boxes[i-1].focus(); if (e.key==='Enter') $('#otpOk').click(); });
  });
  setTimeout(()=>boxes[0].focus(), 60);
  $('#otpOk').onclick = ()=>{
    if (boxes.map(b=>b.value).join('') === DEMO_OTP){ closeSheet(); onOk(); }
    else { $('#otpErr').classList.remove('hidden'); boxes.forEach(b=>b.value=''); boxes[0].focus(); }
  };
}
function toggleBigText(){
  const on = document.documentElement.classList.toggle('big');
  try { localStorage.setItem('as_big', on?'1':'0'); } catch(e){}
  toast(on ? 'Large text on' : 'Standard text size', 'info');
  return on;
}
function brandMark(size='w-10 h-10'){ return `<div class="${size} rounded-2xl bg-brand-700 text-white grid place-items-center shadow-md shrink-0"><i data-lucide="heart-pulse"></i></div>`; }
