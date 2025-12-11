// Goal Tracker (flip-card style) - localStorage backed
const goalsGrid = document.getElementById('goalsGrid');
const goalInput = document.getElementById('goalInput');
const addBtn = document.getElementById('addGoalBtn');

let goals = JSON.parse(localStorage.getItem('goals')) || [];
renderGoals();

addBtn.addEventListener('click', addGoal);
goalInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') addGoal(); });

function saveGoals() {
  localStorage.setItem('goals', JSON.stringify(goals));
}

function addGoal() {
  const title = (goalInput.value || '').trim();
  if (!title) return;
  goals.push({ title, progress: 0 });
  goalInput.value = '';
  saveGoals();
  renderGoals();
}

function deleteGoal(index) {
  if (!confirm('Delete this goal?')) return;
  goals.splice(index,1);
  saveGoals();
  renderGoals();
}

function saveProgress(index, value) {
  goals[index].progress = parseInt(value);
  saveGoals();
  renderGoals();
}

// handle slider UI updates without saving (live percentage)
function updateSliderDisplay(sliderEl, percentEl) {
  percentEl.textContent = sliderEl.value + '%';
}

// Render
function renderGoals() {
  goalsGrid.innerHTML = '';
  goals.forEach((g, i) => {
    const card = document.createElement('div');
    card.className = 'flash-card';

    card.innerHTML = `
      <div class="flash-inner">
        <div class="flash-front">
          <div class="front-title">${escapeHtml(g.title)}</div>
        </div>

        <div class="flash-back">
          <div style="width:100%;">
            <div style="display:flex; justify-content:space-between; align-items:center;">
              <strong style="color:var(--text-primary)">${escapeHtml(g.title)}</strong>
              <span class="progress-percent">${g.progress}%</span>
            </div>
            <div class="progress-row">
              <input type="range" min="0" max="100" value="${g.progress}" class="progress-input" />
            </div>
            <div class="card-controls">
              <button class="save-btn">Save</button>
              <button class="delete-btn">Delete</button>
            </div>
          </div>
        </div>
      </div>
    `;

    // click to flip (but not when clicking controls)
    card.addEventListener('click', (ev) => {
      const isControl = ev.target.closest('button') || ev.target.closest('input[type="range"]');
      if (isControl) return; // don't flip when interacting with controls
      card.classList.toggle('flipped');
    });

    // wire buttons & slider
    const slider = card.querySelector('.progress-input');
    const percentEl = card.querySelector('.progress-percent');
    const saveBtn = card.querySelector('.save-btn');
    const delBtn = card.querySelector('.delete-btn');

    // live update percent display while sliding
    slider.addEventListener('input', () => updateSliderDisplay(slider, percentEl));

    // save progress (commits to storage)
    saveBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      saveProgress(i, slider.value);
    });

    // delete goal
    delBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      deleteGoal(i);
    });

    goalsGrid.appendChild(card);
  });
}

// small helper to avoid XSS when injecting titles
function escapeHtml(unsafe) {
  return unsafe.replace(/[&<>"']/g, (m) => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'
  }[m]));
}