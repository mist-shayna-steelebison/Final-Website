// Mobile nav + footer year (shared on all pages)
(function () {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.getElementById('site-nav');
  const year = document.getElementById('year');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
    });
  }
  if (year) year.textContent = new Date().getFullYear();
})();

// HISTORY — filter & note toggle
(function () {
  const filters = document.querySelectorAll('.tl-filter');
  const items = document.querySelectorAll('.tl-item');
  if (!filters.length || !items.length) return;

  const setFilter = (era) => {
    items.forEach(li => {
      li.classList.toggle('muted', !(era === 'all' || li.dataset.era === era));
    });
    filters.forEach(btn => {
      btn.setAttribute('aria-pressed', String(btn.dataset.era === era || (era === 'all' && btn.dataset.era === 'all')));
    });
  };

  filters.forEach(btn => {
    btn.addEventListener('click', () => setFilter(btn.dataset.era));
  });

  // Click/Enter toggles note visibility
  items.forEach(li => {
    const note = li.querySelector('.tl-note');
    if (!note) return;
    note.hidden = true;
    const toggleNote = () => note.hidden = !note.hidden;
    li.addEventListener('click', toggleNote);
    li.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleNote(); }
    });
  });
})();

// CULTURE & FESTIVALS — section show/hide
(function () {
  const buttons = document.querySelectorAll('.cf-toggle');
  if (!buttons.length) return;
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetSel = btn.getAttribute('data-target');
      const section = document.querySelector(targetSel);
      if (!section) return;
      section.classList.toggle('is-hidden');
    });
  });
})();

// CUISINE & ARTS — click-to-reveal for keyboard/mobile (hover handled in CSS)
(function () {
  const cards = document.querySelectorAll('.reveal-card');
  if (!cards.length) return;
  cards.forEach(card => {
    card.addEventListener('click', () => card.classList.toggle('reveal-open'));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.classList.toggle('reveal-open'); }
    });
  });
})();

// SUMMARY — tab switcher + localStorage for reflection
(function () {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const panels = {
    summary: document.getElementById('tab-summary'),
    reflection: document.getElementById('tab-reflection'),
  };
  if (!tabBtns.length || !panels.summary || !panels.reflection) return;

  const showTab = (name) => {
    Object.keys(panels).forEach(k => {
      const isActive = k === name;
      panels[k].classList.toggle('is-hidden', !isActive);
      panels[k].setAttribute('aria-hidden', String(!isActive));
    });
    tabBtns.forEach(btn => {
      btn.setAttribute('aria-selected', String(btn.dataset.tab === name));
    });
  };

  tabBtns.forEach(btn => btn.addEventListener('click', () => showTab(btn.dataset.tab)));

  // Reflection save
  const textarea = document.getElementById('reflection');
  const saveBtn = document.getElementById('save-reflection');
  const status = document.getElementById('save-status');
  if (textarea && saveBtn && status) {
    // load saved
    const saved = localStorage.getItem('punjab_reflection');
    if (saved) textarea.value = saved;

    saveBtn.addEventListener('click', () => {
      localStorage.setItem('punjab_reflection', textarea.value.trim());
      status.textContent = 'Saved!';
      setTimeout(() => (status.textContent = ''), 1500);
    });
  }
})();// JavaScript Document