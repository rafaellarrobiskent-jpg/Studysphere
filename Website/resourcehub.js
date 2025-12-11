/* Persistent arrays in localStorage */
const NOTES_KEY = "rs_notes_v1";
const GENIE_KEY = "rs_genie_v1";
const EVENTS_KEY = "rs_events_v1";

/* read or initialize */
let notes = JSON.parse(localStorage.getItem(NOTES_KEY)) || [];
let genie = JSON.parse(localStorage.getItem(GENIE_KEY)) || [];
let events = JSON.parse(localStorage.getItem(EVENTS_KEY)) || [];

/* DOM refs */
const notesList = document.getElementById("notesList");
const genieList = document.getElementById("genieList");
const eventList = document.getElementById("eventList");

const notesInput = document.getElementById("notesInput");
const genieInput = document.getElementById("genieInput");
const eventInput = document.getElementById("eventInput");
const eventDate = document.getElementById("eventDate");

/* Initialize render */
renderAll();

/* ---------- NOTES ---------- */
document.getElementById("notesAddBtn").addEventListener("click", addNote);
notesInput && notesInput.addEventListener("keypress", (e)=>{ if(e.key==="Enter") addNote(); });

function addNote(){
  const val = (notesInput.value || "").trim();
  if(!val) return;
  const item = { id: Date.now(), text: val };
  notes.unshift(item);
  save(NOTES_KEY, notes);
  notesInput.value = "";
  renderNotes();
}

function renderNotes(){
  notesList.innerHTML = "";
  if(notes.length === 0){
    notesList.innerHTML = `<tr><td colspan="2" style="color:var(--text-secondary);padding:12px">No notes yet.</td></tr>`;
    return;
  }
  notes.forEach(n=>{
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><i class="fa-solid fa-note-sticky"></i> ${escapeHtml(n.text)}</td>
      <td><button class="trash-btn" data-id="${n.id}"><i class="fa-solid fa-trash"></i></button></td>
    `;
    notesList.appendChild(tr);
  });
  // attach delete handlers
  notesList.querySelectorAll(".trash-btn").forEach(btn=>{
    btn.addEventListener("click", ()=> {
      const id = Number(btn.getAttribute("data-id"));
      notes = notes.filter(x=> x.id !== id);
      save(NOTES_KEY, notes);
      renderNotes();
    });
  });
}

/* ---------- GENIE ---------- */
document.getElementById("genieAddBtn").addEventListener("click", addGenie);
genieInput && genieInput.addEventListener("keypress", (e)=>{ if(e.key==="Enter") addGenie(); });

function addGenie(){
  const topic = (genieInput.value || "").trim();
  if(!topic) return;
  const suggestions = [
    `Recommended resource for ${topic}: Crash Course YouTube playlist.`,
    `Study method for ${topic}: Pomodoro + active recall.`,
    `Create 10 flashcards for ${topic} using StudyGenie.`,
    `Practice quizzes for ${topic}: search "practice ${topic} exercises".`,
    `Quick summary tip: Outline key concepts of ${topic} and rehearse.`
  ];
  const random = suggestions[Math.floor(Math.random()*suggestions.length)];
  const item = { id: Date.now(), text: random };
  genie.unshift(item);
  save(GENIE_KEY, genie);
  genieInput.value = "";
  renderGenie();
}

function renderGenie(){
  genieList.innerHTML = "";
  if(genie.length === 0){
    genieList.innerHTML = `<tr><td colspan="2" style="color:var(--text-secondary);padding:12px">No suggestions yet.</td></tr>`;
    return;
  }
  genie.forEach(g=>{
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><i class="fa-solid fa-wand-magic-sparkles"></i> ${escapeHtml(g.text)}</td>
      <td><button class="trash-btn" data-id="${g.id}"><i class="fa-solid fa-trash"></i></button></td>
    `;
    genieList.appendChild(tr);
  });
  // delete handlers
  genieList.querySelectorAll(".trash-btn").forEach(btn=>{
    btn.addEventListener("click", ()=> {
      const id = Number(btn.getAttribute("data-id"));
      genie = genie.filter(x=> x.id !== id);
      save(GENIE_KEY, genie);
      renderGenie();
    });
  });
}

/* ---------- EVENTS ---------- */
document.getElementById("eventAddBtn").addEventListener("click", addEvent);
eventInput && eventInput.addEventListener("keypress", (e)=>{ if(e.key==="Enter") addEvent(); });

function addEvent(){
  const name = (eventInput.value || "").trim();
  const date = (eventDate.value || "").trim();
  if(!name || !date) return;
  const item = { id: Date.now(), name, date };
  events.unshift(item);
  save(EVENTS_KEY, events);
  eventInput.value = "";
  eventDate.value = "";
  renderEvents();
}

function renderEvents(){
  eventList.innerHTML = "";
  if(events.length === 0){
    eventList.innerHTML = `<tr><td colspan="3" style="color:var(--text-secondary);padding:12px">No events scheduled.</td></tr>`;
    return;
  }
  events.forEach(ev=>{
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td><i class="fa-solid fa-calendar-day"></i> ${escapeHtml(ev.name)}</td>
      <td>${escapeHtml(ev.date)}</td>
      <td><button class="trash-btn" data-id="${ev.id}"><i class="fa-solid fa-trash"></i></button></td>
    `;
    eventList.appendChild(tr);
  });
  // delete handlers
  eventList.querySelectorAll(".trash-btn").forEach(btn=>{
    btn.addEventListener("click", ()=> {
      const id = Number(btn.getAttribute("data-id"));
      events = events.filter(x=> x.id !== id);
      save(EVENTS_KEY, events);
      renderEvents();
    });
  });
}

/* ---------- helpers ---------- */
function renderAll(){
  renderNotes();
  renderGenie();
  renderEvents();
}

function save(key, data){
  localStorage.setItem(key, JSON.stringify(data));
}

/* minimal HTML-escape helper */
function escapeHtml(s){
  return String(s).replace(/[&<>"']/g, function(m){
    return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]);
  });
}