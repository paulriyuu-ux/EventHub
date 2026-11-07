const EVENTS=[
{id:1,name:"CodeSprint Hackathon",cat:"Tech",date:"2026-12-05T09:00",venue:"KIIT Convention Centre, Bhubaneswar",emoji:"💻",g:"#6c4cf1,#3a8dff",feat:1,desc:"24-hour hackathon to build innovative solutions with mentors and prizes."},
{id:2,name:"Rhythm Nights Live",cat:"Music",date:"2026-12-12T18:30",venue:"Kalinga Stadium, Bhubaneswar",emoji:"🎸",g:"#f14c8a,#ff9a3c",feat:1,desc:"An electrifying evening with top indie bands and DJs."},
{id:3,name:"AI & ML Workshop",cat:"Workshop",date:"2026-12-18T10:00",venue:"IIIT Bhubaneswar",emoji:"🤖",g:"#00b894,#00cec9",desc:"Hands-on introduction to machine learning with Python."},
{id:4,name:"Startup Pitch Summit",cat:"Business",date:"2027-01-09T11:00",venue:"Mayfair Convention, Bhubaneswar",emoji:"🚀",g:"#e17055,#fdcb6e",feat:1,desc:"Founders pitch to investors. Network with the startup ecosystem."},
{id:5,name:"Odissi Dance Festival",cat:"Culture",date:"2027-01-16T17:00",venue:"Rabindra Mandap, Bhubaneswar",emoji:"💃",g:"#a29bfe,#fd79a8",desc:"Celebrate classical Odissi with renowned performers."},
{id:6,name:"Web Design Bootcamp",cat:"Workshop",date:"2027-01-24T09:30",venue:"Online (Zoom)",emoji:"🎨",g:"#0984e3,#74b9ff",desc:"Learn responsive design, UI/UX and modern CSS in one day."},
{id:7,name:"Green Run Marathon",cat:"Sports",date:"2027-02-07T06:00",venue:"Janpath, Bhubaneswar",emoji:"🏃",g:"#27ae60,#a3e635",desc:"5K, 10K and half-marathon for a greener city."},
{id:8,name:"Cloud Tech Conference",cat:"Tech",date:"2027-02-20T09:00",venue:"Hotel Swosti, Bhubaneswar",emoji:"☁️",g:"#2d3a8c,#6c4cf1",desc:"Talks from industry leaders on cloud, DevOps and security."}
];
const $=s=>document.querySelector(s);
const fmt=d=>new Date(d).toLocaleString("en-IN",{day:"numeric",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"});
let cat="All";

/* storage helpers */
const load=()=>{try{return JSON.parse(localStorage.getItem("eh_regs"))||[]}catch(e){return[]}};
const save=a=>{try{localStorage.setItem("eh_regs",JSON.stringify(a))}catch(e){}};
let regs=load();

/* theme */
function setTheme(t){document.documentElement.dataset.theme=t;$("#theme").textContent=t==="dark"?"☀️":"🌙";try{localStorage.setItem("eh_theme",t)}catch(e){}}
let saved=null;try{saved=localStorage.getItem("eh_theme")}catch(e){}
setTheme(saved||(matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light"));
$("#theme").onclick=()=>setTheme(document.documentElement.dataset.theme==="dark"?"light":"dark");
$("#menu").onclick=()=>$("#nav").classList.toggle("open");
$("#nav").onclick=()=>$("#nav").classList.remove("open");

/* chips + cards */
const cats=["All",...new Set(EVENTS.map(e=>e.cat))];
$("#chips").innerHTML=cats.map(c=>`<button class="chip${c==="All"?" active":""}" data-c="${c}">${c}</button>`).join("");
$("#chips").onclick=e=>{const b=e.target.closest(".chip");if(!b)return;cat=b.dataset.c;document.querySelectorAll(".chip").forEach(x=>x.classList.toggle("active",x===b));render()};
$("#search").oninput=render;
function render(){
 const q=$("#search").value.trim().toLowerCase();
 const list=EVENTS.filter(e=>(cat==="All"||e.cat===cat)&&(e.name+e.venue+e.desc).toLowerCase().includes(q));
 $("#grid").innerHTML=list.map((e,i)=>`<article class="card" style="animation-delay:${i*70}ms">
  <div class="thumb" style="background:linear-gradient(135deg,${e.g})">${e.emoji}<span class="tag">${e.cat}</span>${e.feat?'<span class="feat">★ Featured</span>':""}</div>
  <div class="body"><h3>${e.name}</h3>
  <div class="meta">📅 ${fmt(e.date)}<br>📍 ${e.venue}</div><p>${e.desc}</p>
  <button class="btn" onclick="openEvent(${e.id})">View &amp; Register</button></div></article>`).join("");
 $("#empty").style.display=list.length?"none":"block";
}

/* countdown to next event */
const next=EVENTS.map(e=>({...e,t:new Date(e.date)})).filter(e=>e.t>Date.now()).sort((a,b)=>a.t-b.t)[0];
function tick(){
 if(!next)return;
 $("#nextLabel").textContent="Next up: "+next.name;
 let s=Math.max(0,Math.floor((next.t-Date.now())/1000));
 const v=[["Days",Math.floor(s/86400)],["Hours",Math.floor(s%86400/3600)],["Mins",Math.floor(s%3600/60)],["Secs",s%60]];
 $("#count").innerHTML=v.map(([l,n])=>`<div><b>${String(n).padStart(2,"0")}</b><small>${l}</small></div>`).join("");
}
tick();setInterval(tick,1000);

/* modal */
function openEvent(id){
 const e=EVENTS.find(x=>x.id===id);
 $("#modal").innerHTML=`<div class="m-head" style="background:linear-gradient(135deg,${e.g})">${e.emoji}<button class="close" onclick="closeModal()" aria-label="Close">✕</button></div>
 <div class="m-body" id="mb"><div class="info"><h2>${e.name}</h2><span class="tag" style="position:static;background:var(--brand)">${e.cat}</span>
  <ul><li>📅 ${fmt(e.date)}</li><li>📍 ${e.venue}</li><li>🎫 Free registration</li></ul><p class="meta">${e.desc} Join us for an unforgettable experience with great people, content and networking.</p></div>
 <form id="form" novalidate>
  <div class="field"><label for="fn">Full Name</label><input id="fn" autocomplete="name" placeholder="Your name"><span class="err"></span></div>
  <div class="field"><label for="fe">Email</label><input id="fe" type="email" autocomplete="email" placeholder="you@example.com"><span class="err"></span></div>
  <div class="field"><label for="fp">Phone</label><input id="fp" type="tel" autocomplete="tel" placeholder="10-digit mobile number"><span class="err"></span></div>
  <div class="field"><label for="fv">Event</label><select id="fv">${EVENTS.map(x=>`<option value="${x.id}"${x.id===id?" selected":""}>${x.name}</option>`).join("")}</select><span class="err"></span></div>
  <button class="btn" type="submit">Register Now</button>
 </form>`;
 $("#overlay").classList.add("open");document.body.style.overflow="hidden";
 $("#form").onsubmit=submitForm;
 ["fn","fe","fp"].forEach(k=>$("#"+k).addEventListener("input",()=>check(k)));
}
function closeModal(){$("#overlay").classList.remove("open");document.body.style.overflow=""}
$("#overlay").onclick=e=>{if(e.target.id==="overlay")closeModal()};
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal()});

/* validation */
const rules={
 fn:v=>/^[A-Za-z][A-Za-z .'-]{2,49}$/.test(v)?"":"Enter a valid name (min 3 letters).",
 fe:v=>/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v)?"":"Enter a valid email address.",
 fp:v=>/^[6-9]\d{9}$/.test(v.replace(/[\s-]/g,""))?"":"Enter a valid 10-digit Indian mobile number."
};
function check(k){
 const el=$("#"+k),m=rules[k](el.value.trim()),f=el.closest(".field");
 f.classList.toggle("bad",!!m);f.querySelector(".err").textContent=m;return !m;
}
function submitForm(ev){
 ev.preventDefault();
 const ok=["fn","fe","fp"].map(check).every(Boolean);
 if(!ok)return;
 const evId=+$("#fv").value,email=$("#fe").value.trim().toLowerCase();
 if(regs.some(r=>r.eventId===evId&&r.email===email)){
  const f=$("#fe").closest(".field");f.classList.add("bad");f.querySelector(".err").textContent="This email is already registered for this event.";return;
 }
 const r={id:"EH"+Date.now().toString().slice(-6),name:$("#fn").value.trim(),email,phone:$("#fp").value.replace(/[\s-]/g,""),eventId:evId};
 regs.push(r);save(regs);renderRegs();
 const e=EVENTS.find(x=>x.id===evId);
 $("#mb").innerHTML=`<div class="ok"><div class="tick">🎉</div><h3>Registration Successful!</h3>
 <p>Thank you, <b></b>. You’re registered for <b>${e.name}</b>.<br>Booking ID: <b>${r.id}</b></p>
 <button class="btn" onclick="closeModal()">Done</button></div>`;
 $("#mb .ok p b").textContent=r.name;
}

/* registrations */
function esc(s){const d=document.createElement("div");d.textContent=s;return d.innerHTML}
function renderRegs(){
 $("#regs").innerHTML=regs.length?regs.map(r=>{const e=EVENTS.find(x=>x.id===r.eventId);
  return `<div class="reg-item"><div><b>${e.emoji} ${e.name}</b><small>${esc(r.name)} · ${esc(r.email)} · ${esc(r.phone)} · ID ${r.id}</small></div>
  <button class="link-btn" onclick="cancelReg('${r.id}')">Cancel</button></div>`}).join(""):'<p class="meta">You haven’t registered for any events yet.</p>';
}
function cancelReg(id){regs=regs.filter(r=>r.id!==id);save(regs);renderRegs()}

render();renderRegs();
