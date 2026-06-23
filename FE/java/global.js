function toggle(btn, id) {
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

function getMenuPrefix() {
  const parts = window.location.pathname.split('/').filter(p => p !== '');
  const idx = parts.indexOf('contenu');
  return idx === -1 ? '' : '../'.repeat(parts.length - idx - 1);
}

const MENU = [
  { id: 'sA', badge: 'A', label: 'Instruction générale', items: [
    ['contenu/A_instruction_generale/Roles_resp_CE.html', 'A1 — Rôles et responsabilités du chef d\'équipe'],
    ['contenu/A_instruction_generale/les_methode_peda.html', 'A2 — Les méthodes et les outils pédagogiques'],
  ]},
  { id: 'sB', badge: 'B', label: 'Instruction au tir au combat', items: [
    ['contenu/B_instruction_tir/glock_17.html', 'B1 — CATI Glock 17 : Bravo'],
    ['contenu/B_instruction_tir/at_4.html', 'B2 — CATI AT4 : Bravo'],
    ['contenu/B_instruction_tir/minimi.html', 'B3 — CATI MiniMi : Bravo'],
    ['contenu/B_instruction_tir/lg.html', 'B4 — CATI LG : Bravo'],
    ['contenu/B_instruction_tir/hk416.html', 'B5 — CATI HK416 : Delta Nuit'],
  ]},
  { id: 'sC', badge: 'C', label: 'Tactique', sub: [
    { id: 'sC1', label: 'C1 — Actes élémentaires du trinôme et commandement', items: [
      ['contenu/C_tactique/C1_actes_elementaires/se_deplacer.html', 'C11 — Se déplacer et ses ordres'],
      ['contenu/C_tactique/C1_actes_elementaires/s_arrete.html', 'C12 — S\'arrêter, tomber en garde et ses ordres'],
      ['contenu/C_tactique/C1_actes_elementaires/utiliser_ses_armes.html', 'C13 — Utiliser ses armes et ses ordres'],
    ]},
    { id: 'sC2', label: 'C2 — Actes missions du trinôme', items: [
      ['contenu/C_tactique/C2_missions/surveiller.html', 'C21 — Surveiller'],
      ['contenu/C_tactique/C2_missions/eclairer.html', 'C22 — Éclairer'],
      ['contenu/C_tactique/C2_missions/appuyer.html', 'C23 — Appuyer'],
      ['contenu/C_tactique/C2_missions/neutraliser_detruire.html', 'C24 — Neutraliser et détruire'],
      ['contenu/C_tactique/C2_missions/s_emparer_de.html', 'C25 — S\'emparer de et reconnaître un point'],
      ['contenu/C_tactique/C2_missions/assurer_la_liaison.html', 'C26 — Assurer la liaison'],
      ['contenu/C_tactique/C2_missions/fouiller.html', 'C27 — Fouiller'],
    ]},
    { id: 'sC3', label: 'C3 — Actes élémentaires en milieu urbain', items: [
      ['contenu/C_tactique/C3_actes_elementaires/investir_une_piece.html', 'C31 — Investir une pièce'],
      ['contenu/C_tactique/C3_actes_elementaires/prendre_un_escalier.html', 'C32 — Prendre un escalier'],
      ['contenu/C_tactique/C3_actes_elementaires/appui_mutuel.html', 'C33 — Passage en appui mutuel'],
    ]},
  ]},
  { id: 'sD', badge: 'D', label: 'Génie', items: [
    ['contenu/D_genie/identification.html', 'D1 — Identification des mines et réactions à adopter'],
    ['contenu/D_genie/v_check.html', 'D2 — Procédure du V-Check'],
    ['contenu/D_genie/0_5_25.html', 'D3 — Procédure du 0/5/25'],
  ]},
  { id: 'sE', badge: 'E', label: 'Transmission', items: [
    ['contenu/E_transmissions/postes_radios.html', 'E1 — Postes radios'],
    ['contenu/E_transmissions/procedure_complete.html', 'E2 — Procédures radio complète'],
    ['contenu/E_transmissions/procedure_simplifiee.html', 'E3 — Procédures radio simplifiée'],
  ]},
  { id: 'sF', badge: 'F', label: 'Topographie', items: [
    ['contenu/F_topographie/cartes.html', 'F1 — Cartes et symbologie'],
    ['contenu/F_topographie/coordonees.html', 'F2 — Prise et report de coordonnées'],
    ['contenu/F_topographie/boussole_et_outils.html', 'F3 — Utilisation de la boussole et navigation'],
    ['contenu/F_topographie/triangulation.html', 'F4 — Triangulation'],
    ['contenu/F_topographie/course_d_orientation.html', 'F5 — Course d\'orientation 5 km'],
  ]},
  { id: 'sG', badge: 'G', label: 'Entraînement physique', items: [
    ['contenu/G_entrainement_physique/parcours_obstacle.html', 'G1 — Parcours d\'obstacle'],
    ['contenu/G_entrainement_physique/aguerrissement.html', 'G2 — Parcours tactique d\'évasion : mission de nuit'],
  ]},
];

function buildSection(s, p) {
  const inner = s.sub
    ? s.sub.map(sub => `
        <div class="sub-item">
          <button class="sub2-btn" aria-expanded="false" onclick="toggle(this,'${sub.id}')">
            ${sub.label}<span class="chevron2">&#8964;</span>
          </button>
          <div class="sub3-list" id="${sub.id}">
            ${sub.items.map(([href, text]) => `<a href="${p}${href}">${text}</a>`).join('')}
          </div>
        </div>`).join('')
    : s.items.map(([href, text]) =>
        `<div class="sub-item"><a href="${p}${href}">${text}</a></div>`
      ).join('');

  return `
    <div class="section">
      <button class="section-btn" aria-expanded="false" onclick="toggle(this,'${s.id}')">
        <span class="label"><span class="badge">${s.badge}</span>${s.label}</span>
        <span class="chevron">&#8964;</span>
      </button>
      <div class="sub-list" id="${s.id}">${inner}</div>
    </div>`;
}

document.addEventListener('DOMContentLoaded', function () {
  const menu = document.getElementById('menu');
  if (menu) menu.innerHTML = MENU.map(s => buildSection(s, getMenuPrefix())).join('');
});
