function toggle(btn, id) {
  const open = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', !open);
  document.getElementById(id).classList.toggle('open', !open);
}

function toggle2(btn, id) {
  const open = btn.getAttribute('aria-expanded') === 'true';
  btn.setAttribute('aria-expanded', !open);
  document.getElementById(id).classList.toggle('open', !open);
}

function toggleMenu() {
  const menu = document.getElementById('menu');
  const btn = document.getElementById('toggle-menu');
  const isOpen = menu.style.display !== 'none';
  menu.style.display = isOpen ? 'none' : 'block';
  btn.textContent = isOpen ? '☰ Menu' : '✕ Fermer';
}