/* ==========================================================================
   AGRICULTURA DE PRIMARIA - JAVASCRIPT CONTROLLER
   Autor: Ingeniero Carlos Pimentel
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const views = document.querySelectorAll('.view-section');
  const navLinks = document.querySelectorAll('.nav-link, .dropdown-link, [data-target]');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  // Navigation router function
  function navigateTo(targetId) {
    if (!targetId) targetId = 'inicio';
    
    // Hide all views
    views.forEach(view => {
      view.classList.remove('active');
    });

    // Find requested view element
    const activeView = document.getElementById(targetId) || document.getElementById('inicio');
    if (activeView) {
      activeView.classList.add('active');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Update Navbar Active state
    const currentBaseRoute = targetId.split('-')[0]; // e.g. 'tercero' from 'tercero-area1'
    
    document.querySelectorAll('.nav-link').forEach(link => {
      const linkRoute = link.getAttribute('data-target');
      if (linkRoute === currentBaseRoute || linkRoute === targetId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Close mobile menu if open
    if (navMenu.classList.contains('mobile-open')) {
      navMenu.classList.remove('mobile-open');
    }
  }

  // Handle Hash Changes in URL
  function handleHashChange() {
    const hash = window.location.hash.replace('#', '');
    navigateTo(hash || 'inicio');
  }

  // Listen for hashchange events
  window.addEventListener('hashchange', handleHashChange);

  // Click listeners for data-target links
  document.addEventListener('click', (e) => {
    const targetLink = e.target.closest('[data-target]');
    if (targetLink) {
      const targetId = targetLink.getAttribute('data-target');
      if (targetId) {
        window.location.hash = targetId;
      }
    }
  });

  // Mobile drawer toggle
  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-open');
    });
  }

  // Initial load navigation
  handleHashChange();
});

/* ==========================================================================
   EVALUACIÓN AUTOMÁTICA DE COMPRENSIÓN LECTORA
   ========================================================================== */
function evaluarComprensionLectora() {
  const q1 = (document.getElementById('reading-q1')?.value || '').toLowerCase().trim();
  const q2 = (document.getElementById('reading-q2')?.value || '').toLowerCase().trim();
  const q3 = (document.getElementById('reading-q3')?.value || '').toLowerCase().trim();
  const q4 = (document.getElementById('reading-q4')?.value || '').toLowerCase().trim();

  const card = document.getElementById('eval-result-card');
  const badge = document.getElementById('eval-score-badge');
  const content = document.getElementById('eval-details-content');

  if (!card || !badge || !content) return;

  if (!q1 && !q2 && !q3 && !q4) {
    alert('Por favor, responde al menos una pregunta antes de enviar tu evaluación.');
    return;
  }

  let score = 0;
  let feedback = [];

  // Pregunta 1: Lombriz / Edafología
  if (q1.includes('lombriz') && (q1.includes('agua') || q1.includes('aire') || q1.includes('tierra') || q1.includes('mezclar') || q1.includes('comida') || q1.includes('raíc') || q1.includes('nutri'))) {
    score += 25;
    feedback.push('<div style="margin-bottom: 10px; padding: 10px; background: #f1f8e9; border-radius: 6px; border-left: 4px solid #4caf50;">✅ <strong>Pregunta 1 (25/25 pts):</strong> ¡Excelente! Identificaste correctamente a la Lombriz como la experta en Edafología y su rol en mezclar aire y agua en la tierra.</div>');
  } else if (q1.includes('lombriz')) {
    score += 15;
    feedback.push('<div style="margin-bottom: 10px; padding: 10px; background: #fff8e1; border-radius: 6px; border-left: 4px solid #ffb300;">🟡 <strong>Pregunta 1 (15/25 pts):</strong> Mencionaste a la Lombriz. Recuerda complementar que su función es mezclar el agua y el aire en la tierra para nutrir las raíces.</div>');
  } else {
    feedback.push('<div style="margin-bottom: 10px; padding: 10px; background: #ffebee; border-radius: 6px; border-left: 4px solid #e53935;">❌ <strong>Pregunta 1 (0/25 pts):</strong> Respuesta incompleta. Recuerda que la experta en Edafología era la <strong>Lombriz con gafas</strong>.</div>');
  }

  // Pregunta 2: Climatología / Nube / Lluvia / Sol
  if ((q2.includes('clima') || q2.includes('nube')) && (q2.includes('lluvia') || q2.includes('sol') || q2.includes('brisa') || q2.includes('agua'))) {
    score += 25;
    feedback.push('<div style="margin-bottom: 10px; padding: 10px; background: #f1f8e9; border-radius: 6px; border-left: 4px solid #4caf50;">✅ <strong>Pregunta 2 (25/25 pts):</strong> ¡Excelente! Reconociste que la Nube representa la Climatología y que aporta la lluvia y el sol para el crecimiento vegetal.</div>');
  } else if (q2.includes('nube') || q2.includes('clima')) {
    score += 15;
    feedback.push('<div style="margin-bottom: 10px; padding: 10px; background: #fff8e1; border-radius: 6px; border-left: 4px solid #ffb300;">🟡 <strong>Pregunta 2 (15/25 pts):</strong> Identificaste la Nube o el Clima, pero debes incluir que aporta la lluvia y el sol necesarios para las plantas.</div>');
  } else {
    feedback.push('<div style="margin-bottom: 10px; padding: 10px; background: #ffebee; border-radius: 6px; border-left: 4px solid #e53935;">❌ <strong>Pregunta 2 (0/25 pts):</strong> Respuesta a revisar. La Nube representaba a la <strong>Climatología</strong> (lluvia y sol).</div>');
  }

  // Pregunta 3: Beneficio económico / vender mercado alimentos
  if ((q3.includes('vende') || q3.includes('vent') || q3.includes('mercado') || q3.includes('dinero') || q3.includes('comprar')) && (q3.includes('alimento') || q3.includes('comida') || q3.includes('flor'))) {
    score += 25;
    feedback.push('<div style="margin-bottom: 10px; padding: 10px; background: #f1f8e9; border-radius: 6px; border-left: 4px solid #4caf50;">✅ <strong>Pregunta 3 (25/25 pts):</strong> ¡Respuesta muy precisa! Comprendiste que la Abuela Sabia vendía flores en el mercado para comprar sus alimentos.</div>');
  } else if (q3.includes('vende') || q3.includes('mercado') || q3.includes('alimento')) {
    score += 15;
    feedback.push('<div style="margin-bottom: 10px; padding: 10px; background: #fff8e1; border-radius: 6px; border-left: 4px solid #ffb300;">🟡 <strong>Pregunta 3 (15/25 pts):</strong> Mencionaste la venta o los alimentos. Completa explicando que vendía las flores en el mercado para su sustento.</div>');
  } else {
    feedback.push('<div style="margin-bottom: 10px; padding: 10px; background: #ffebee; border-radius: 6px; border-left: 4px solid #e53935;">❌ <strong>Pregunta 3 (0/25 pts):</strong> El beneficio económico radicaba en <strong>vender las flores en el mercado</strong> para obtener sus alimentos.</div>');
  }

  // Pregunta 4: Lección de Leo / Gran equipo interdisciplinario
  if ((q4.includes('equipo') || q4.includes('unid') || q4.includes('junt') || q4.includes('tod')) && (q4.includes('suelo') || q4.includes('tierra') || q4.includes('clima') || q4.includes('planta') || q4.includes('botánic') || q4.includes('jardín'))) {
    score += 25;
    feedback.push('<div style="margin-bottom: 10px; padding: 10px; background: #f1f8e9; border-radius: 6px; border-left: 4px solid #4caf50;">✅ <strong>Pregunta 4 (25/25 pts):</strong> ¡Gran capacidad de análisis! Comprendiste que la jardinería es un gran trabajo en equipo entre el suelo, el clima y la botánica.</div>');
  } else if (q4.length > 8) {
    score += 15;
    feedback.push('<div style="margin-bottom: 10px; padding: 10px; background: #fff8e1; border-radius: 6px; border-left: 4px solid #ffb300;">🟡 <strong>Pregunta 4 (15/25 pts):</strong> Buen intento. Asegúrate de destacar que el secreto de la jardinería es el <strong>trabajo en equipo</strong> entre el suelo, clima y botánica.</div>');
  } else {
    feedback.push('<div style="margin-bottom: 10px; padding: 10px; background: #ffebee; border-radius: 6px; border-left: 4px solid #e53935;">❌ <strong>Pregunta 4 (0/25 pts):</strong> Leo aprendió que la jardinería es un <strong>gran equipo</strong> donde participan la tierra, el clima y el cuidado de las plantas.</div>');
  }

  // Mostrar tarjeta
  card.style.display = 'block';
  badge.textContent = `Puntaje: ${score} / 100`;

  if (score >= 80) {
    badge.style.background = '#2e7d32';
  } else if (score >= 50) {
    badge.style.background = '#f57c00';
  } else {
    badge.style.background = '#d32f2f';
  }

  let summaryHeader = '';
  if (score >= 90) {
    summaryHeader = '<div style="background: #2e7d32; color: white; padding: 12px 16px; border-radius: 6px; margin-bottom: 16px; font-weight: 700;">🌟 ¡Felicidades! Has obtenido la máxima calificación. ¡Eres un Experto Agrícola!</div>';
  } else if (score >= 60) {
    summaryHeader = '<div style="background: #f57c00; color: white; padding: 12px 16px; border-radius: 6px; margin-bottom: 16px; font-weight: 700;">👍 ¡Buen trabajo! Revisa las sugerencias para perfeccionar tus respuestas.</div>';
  } else {
    summaryHeader = '<div style="background: #d32f2f; color: white; padding: 12px 16px; border-radius: 6px; margin-bottom: 16px; font-weight: 700;">📖 Te invitamos a volver a leer "El Jardín Mágico de la Abuela Sabia" y reintentarlo.</div>';
  }

  content.innerHTML = summaryHeader + feedback.join('');
  card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/* ==========================================================================
   SOPA DE LETRAS INTERACTIVA CON COLORES, GANCHO (✓) Y RELOJ
   ========================================================================== */
const WS_MATRIX = [
  ['J','A','R','D','I','N','E','R','I','A','X','Y'],
  ['L','O','M','B','R','I','Z','X','Y','Z','L','P'],
  ['K','W','B','O','T','A','N','I','C','A','R','S'],
  ['M','N','O','P','Q','R','S','T','U','V','W','X'],
  ['Z','E','D','A','F','O','L','O','G','I','A','T'],
  ['A','B','C','D','E','F','G','H','I','J','K','L'],
  ['S','C','L','I','M','A','M','N','L','X','Y','H'],
  ['O','P','Q','R','S','T','U','V','I','W','X','U'],
  ['S','U','E','L','O','A','B','C','M','D','E','M'],
  ['F','G','H','I','J','K','L','M','O','N','P','U'],
  ['Q','R','A','R','E','N','A','X','Y','Z','W','S'],
  ['A','R','C','I','L','L','A','X','Y','Z','K','W']
];

const WS_TARGET_WORDS = {
  'JARDINERIA': [[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8],[0,9]],
  'LOMBRIZ': [[1,0],[1,1],[1,2],[1,3],[1,4],[1,5],[1,6]],
  'BOTANICA': [[2,2],[2,3],[2,4],[2,5],[2,6],[2,7],[2,8],[2,9]],
  'EDAFOLOGIA': [[4,1],[4,2],[4,3],[4,4],[4,5],[4,6],[4,7],[4,8],[4,9],[4,10]],
  'CLIMA': [[6,1],[6,2],[6,3],[6,4],[6,5]],
  'SUELO': [[8,0],[8,1],[8,2],[8,3],[8,4]],
  'ARENA': [[10,2],[10,3],[10,4],[10,5],[10,6]],
  'ARCILLA': [[11,0],[11,1],[11,2],[11,3],[11,4],[11,5],[11,6]],
  'LIMO': [[6,8],[7,8],[8,8],[9,8]],
  'HUMUS': [[6,11],[7,11],[8,11],[9,11],[10,11]]
};

const WS_WORD_COLORS = {
  'JARDINERIA': '#2e7d32',
  'LOMBRIZ': '#e65100',
  'BOTANICA': '#1565c0',
  'EDAFOLOGIA': '#6a1b9a',
  'CLIMA': '#00838f',
  'SUELO': '#4e342e',
  'ARENA': '#d84315',
  'LIMO': '#00695c',
  'ARCILLA': '#c62828',
  'HUMUS': '#ad1457'
};

let selectedCoords = [];
let foundWords = new Set();

let wsTimerInterval = null;
let wsSeconds = 0;
let wsTimerRunning = false;

function resetWSTimer() {
  if (wsTimerInterval) clearInterval(wsTimerInterval);
  wsTimerInterval = null;
  wsSeconds = 0;
  wsTimerRunning = false;
  const timerElem = document.getElementById('ws-timer');
  if (timerElem) timerElem.textContent = '00:00';
}

function startWSTimer() {
  if (wsTimerRunning) return;
  wsTimerRunning = true;
  wsSeconds = 0;
  wsTimerInterval = setInterval(() => {
    wsSeconds++;
    const mins = Math.floor(wsSeconds / 60).toString().padStart(2, '0');
    const secs = (wsSeconds % 60).toString().padStart(2, '0');
    const timerElem = document.getElementById('ws-timer');
    if (timerElem) timerElem.textContent = `${mins}:${secs}`;
  }, 1000);
}

function stopWSTimer() {
  if (wsTimerInterval) {
    clearInterval(wsTimerInterval);
    wsTimerInterval = null;
  }
  wsTimerRunning = false;
}

function initWordSearch() {
  const gridContainer = document.getElementById('wordsearch-grid');
  const counter = document.getElementById('ws-counter');
  if (!gridContainer) return;

  gridContainer.innerHTML = '';
  selectedCoords = [];
  foundWords.clear();
  resetWSTimer();

  if (counter) counter.textContent = `0 / 10`;

  // Reset word list UI and save original text
  document.querySelectorAll('#ws-word-list div').forEach(item => {
    if (!item.getAttribute('data-orig-text')) {
      item.setAttribute('data-orig-text', item.textContent);
    }
    item.textContent = item.getAttribute('data-orig-text');
    item.style.textDecoration = 'none';
    item.style.opacity = '1';
    item.style.color = 'var(--text-main)';
    item.style.fontWeight = '600';
  });

  // Render 12x12 grid
  for (let r = 0; r < 12; r++) {
    for (let c = 0; c < 12; c++) {
      const cell = document.createElement('div');
      cell.classList.add('ws-cell');
      cell.setAttribute('data-r', r);
      cell.setAttribute('data-c', c);
      cell.textContent = WS_MATRIX[r][c];

      cell.style.aspectRatio = '1';
      cell.style.display = 'flex';
      cell.style.alignItems = 'center';
      cell.style.justifyContent = 'center';
      cell.style.background = '#ffffff';
      cell.style.border = '1px solid var(--border-color)';
      cell.style.borderRadius = '4px';
      cell.style.fontWeight = '700';
      cell.style.fontSize = '0.9rem';
      cell.style.cursor = 'pointer';
      cell.style.transition = 'all 0.15s ease';

      cell.addEventListener('click', () => handleCellClick(r, c, cell));
      gridContainer.appendChild(cell);
    }
  }
}

function handleCellClick(r, c, cellElem) {
  // Start timer on first interaction
  startWSTimer();

  const index = selectedCoords.findIndex(item => item.r === r && item.c === c);
  if (index >= 0) {
    selectedCoords.splice(index, 1);
    cellElem.style.background = '#ffffff';
    cellElem.style.color = '#000000';
  } else {
    selectedCoords.push({ r, c, char: WS_MATRIX[r][c] });
    cellElem.style.background = 'var(--gold)';
    cellElem.style.color = 'var(--primary-dark)';
  }

  checkSelectedWord();
}

function checkSelectedWord() {
  const currentChars = selectedCoords.map(item => item.char).join('');
  const currentCharsRev = selectedCoords.map(item => item.char).reverse().join('');

  for (const [word, coords] of Object.entries(WS_TARGET_WORDS)) {
    if (foundWords.has(word)) continue;

    if (currentChars === word || currentCharsRev === word) {
      foundWords.add(word);
      lockFoundWord(word, coords);
      selectedCoords = [];
      break;
    }
  }
}

function lockFoundWord(word, coords) {
  const wordColor = WS_WORD_COLORS[word] || 'var(--primary)';

  // Lock cells UI with unique word color
  coords.forEach(([r, c]) => {
    const cell = document.querySelector(`.ws-cell[data-r="${r}"][data-c="${c}"]`);
    if (cell) {
      cell.style.background = wordColor;
      cell.style.color = '#ffffff';
      cell.style.boxShadow = `0 0 6px ${wordColor}88`;
    }
  });

  // Cross off & add checkmark (✓) in word list
  const wordItem = document.querySelector(`#ws-word-list div[data-word="${word}"]`);
  if (wordItem) {
    const origText = wordItem.getAttribute('data-orig-text') || wordItem.textContent;
    wordItem.innerHTML = `<span style="color: ${wordColor}; font-weight: 900; margin-right: 4px;">✓</span> ${origText}`;
    wordItem.style.color = wordColor;
    wordItem.style.fontWeight = '700';
  }

  const counter = document.getElementById('ws-counter');
  if (counter) {
    counter.textContent = `${foundWords.size} / 10`;
  }

  if (foundWords.size === 10) {
    stopWSTimer();
    const mins = Math.floor(wsSeconds / 60).toString().padStart(2, '0');
    const secs = (wsSeconds % 60).toString().padStart(2, '0');
    setTimeout(() => {
      alert(`🎉 ¡ENHORABUENA! Has encontrado las 10 palabras en un tiempo récord de ${mins}:${secs}. ¡Eres un Gran Científico Agrícola!`);
    }, 200);
  }
}

// Auto init on load
document.addEventListener('DOMContentLoaded', () => {
  initWordSearch();
});

/* ==========================================================================
   EVALUACIÓN INTERACTIVA TALLER ÁREA 2: HERRAMIENTAS
   ========================================================================== */
function checkToolQuiz(qNum, selectedOption, btnElem) {
  const correctAnswers = {
    1: 'B', // Trasplantador
    2: 'A', // Tijera de podar
    3: 'B', // Escobilla / Rastrillo
    4: 'B', // Aspersor
    5: 'B'  // Limpiarlas, secarlas y guardarlas
  };

  const ansDiv = document.getElementById(`tool-ans-${qNum}`);
  if (!ansDiv) return;

  const parent = btnElem.parentElement;
  parent.querySelectorAll('button').forEach(b => {
    b.style.background = 'white';
    b.style.color = 'black';
    b.style.borderColor = 'var(--border-color)';
  });

  if (selectedOption === correctAnswers[qNum]) {
    btnElem.style.background = '#2e7d32';
    btnElem.style.color = 'white';
    btnElem.style.borderColor = '#2e7d32';
    ansDiv.innerHTML = `<span style="color: #2e7d32;"><i class="fa-solid fa-circle-check"></i> ¡Correcto! Excelente identificación de la herramienta.</span>`;
  } else {
    btnElem.style.background = '#c62828';
    btnElem.style.color = 'white';
    btnElem.style.borderColor = '#c62828';
    ansDiv.innerHTML = `<span style="color: #c62828;"><i class="fa-solid fa-circle-xmark"></i> Incorrecto. Inténtalo de nuevo.</span>`;
  }
}

/* ==========================================================================
   SOPA DE LETRAS INTERACTIVA - ÁREA 2 (HERRAMIENTAS Y TECNOLOGÍA)
   ========================================================================== */
const WS2_MATRIX = [
  ['H','E','R','R','A','M','I','E','N','T','A','X'],
  ['T','I','J','E','R','A','X','Y','Z','K','L','M'],
  ['R','E','G','A','D','E','R','A','P','Q','R','S'],
  ['R','A','S','T','R','I','L','L','O','X','Y','Z'],
  ['P','A','L','O','N','X','Y','Z','W','A','B','C'],
  ['A','S','P','E','R','S','O','R','K','L','M','N'],
  ['M','A','N','G','U','E','R','A','X','Y','Z','W'],
  ['P','O','D','A','A','B','C','D','E','F','G','H'],
  ['T','R','A','S','P','L','A','N','T','E','X','Y'],
  ['S','E','G','U','R','I','D','A','D','X','Y','Z'],
  ['A','B','C','D','E','F','G','H','I','J','K','L'],
  ['M','N','O','P','Q','R','S','T','U','V','W','X']
];

const WS2_TARGET_WORDS = {
  'HERRAMIENTA': [[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8],[0,9],[0,10]],
  'TIJERA': [[1,0],[1,1],[1,2],[1,3],[1,4],[1,5]],
  'REGADERA': [[2,0],[2,1],[2,2],[2,3],[2,4],[2,5],[2,6],[2,7]],
  'RASTRILLO': [[3,0],[3,1],[3,2],[3,3],[3,4],[3,5],[3,6],[3,7],[3,8]],
  'PALON': [[4,0],[4,1],[4,2],[4,3],[4,4]],
  'ASPERSOR': [[5,0],[5,1],[5,2],[5,3],[5,4],[5,5],[5,6],[5,7]],
  'MANGUERA': [[6,0],[6,1],[6,2],[6,3],[6,4],[6,5],[6,6],[6,7]],
  'PODA': [[7,0],[7,1],[7,2],[7,3]],
  'TRASPLANTE': [[8,0],[8,1],[8,2],[8,3],[8,4],[8,5],[8,6],[8,7],[8,8],[8,9]],
  'SEGURIDAD': [[9,0],[9,1],[9,2],[9,3],[9,4],[9,5],[9,6],[9,7],[9,8]]
};

const WS2_WORD_COLORS = {
  'HERRAMIENTA': '#2e7d32',
  'TIJERA': '#e65100',
  'REGADERA': '#1565c0',
  'RASTRILLO': '#6a1b9a',
  'PALON': '#4e342e',
  'ASPERSOR': '#00838f',
  'MANGUERA': '#d84315',
  'PODA': '#00695c',
  'TRASPLANTE': '#c62828',
  'SEGURIDAD': '#ad1457'
};

let selectedCoords2 = [];
let foundWords2 = new Set();
let ws2TimerInterval = null;
let ws2Seconds = 0;
let ws2TimerRunning = false;

function resetWS2Timer() {
  if (ws2TimerInterval) clearInterval(ws2TimerInterval);
  ws2TimerInterval = null;
  ws2Seconds = 0;
  ws2TimerRunning = false;
  const timerElem = document.getElementById('ws2-timer');
  if (timerElem) timerElem.textContent = '00:00';
}

function startWS2Timer() {
  if (ws2TimerRunning) return;
  ws2TimerRunning = true;
  ws2Seconds = 0;
  ws2TimerInterval = setInterval(() => {
    ws2Seconds++;
    const mins = Math.floor(ws2Seconds / 60).toString().padStart(2, '0');
    const secs = (ws2Seconds % 60).toString().padStart(2, '0');
    const timerElem = document.getElementById('ws2-timer');
    if (timerElem) timerElem.textContent = `${mins}:${secs}`;
  }, 1000);
}

function stopWS2Timer() {
  if (ws2TimerInterval) {
    clearInterval(ws2TimerInterval);
    ws2TimerInterval = null;
  }
  ws2TimerRunning = false;
}

function initWordSearch2() {
  const gridContainer = document.getElementById('wordsearch2-grid');
  const counter = document.getElementById('ws2-counter');
  if (!gridContainer) return;

  gridContainer.innerHTML = '';
  selectedCoords2 = [];
  foundWords2.clear();
  resetWS2Timer();

  if (counter) counter.textContent = `0 / 10`;

  document.querySelectorAll('#ws2-word-list div').forEach(item => {
    if (!item.getAttribute('data-orig-text')) {
      item.setAttribute('data-orig-text', item.textContent);
    }
    item.textContent = item.getAttribute('data-orig-text');
    item.style.textDecoration = 'none';
    item.style.opacity = '1';
    item.style.color = 'var(--text-main)';
    item.style.fontWeight = '600';
  });

  for (let r = 0; r < 12; r++) {
    for (let c = 0; c < 12; c++) {
      const cell = document.createElement('div');
      cell.classList.add('ws2-cell');
      cell.setAttribute('data-r', r);
      cell.setAttribute('data-c', c);
      cell.textContent = WS2_MATRIX[r][c];

      cell.style.aspectRatio = '1';
      cell.style.display = 'flex';
      cell.style.alignItems = 'center';
      cell.style.justifyContent = 'center';
      cell.style.background = '#ffffff';
      cell.style.border = '1px solid var(--border-color)';
      cell.style.borderRadius = '4px';
      cell.style.fontWeight = '700';
      cell.style.fontSize = '0.9rem';
      cell.style.cursor = 'pointer';
      cell.style.transition = 'all 0.15s ease';

      cell.addEventListener('click', () => handleCellClick2(r, c, cell));
      gridContainer.appendChild(cell);
    }
  }
}

function handleCellClick2(r, c, cellElem) {
  startWS2Timer();

  const index = selectedCoords2.findIndex(item => item.r === r && item.c === c);
  if (index >= 0) {
    selectedCoords2.splice(index, 1);
    cellElem.style.background = '#ffffff';
    cellElem.style.color = '#000000';
  } else {
    selectedCoords2.push({ r, c, char: WS2_MATRIX[r][c] });
    cellElem.style.background = 'var(--gold)';
    cellElem.style.color = 'var(--primary-dark)';
  }

  checkSelectedWord2();
}

function checkSelectedWord2() {
  const currentChars = selectedCoords2.map(item => item.char).join('');
  const currentCharsRev = selectedCoords2.map(item => item.char).reverse().join('');

  for (const [word, coords] of Object.entries(WS2_TARGET_WORDS)) {
    if (foundWords2.has(word)) continue;

    if (currentChars === word || currentCharsRev === word) {
      foundWords2.add(word);
      lockFoundWord2(word, coords);
      selectedCoords2 = [];
      break;
    }
  }
}

function lockFoundWord2(word, coords) {
  const wordColor = WS2_WORD_COLORS[word] || 'var(--primary)';

  coords.forEach(([r, c]) => {
    const cell = document.querySelector(`.ws2-cell[data-r="${r}"][data-c="${c}"]`);
    if (cell) {
      cell.style.background = wordColor;
      cell.style.color = '#ffffff';
      cell.style.boxShadow = `0 0 6px ${wordColor}88`;
    }
  });

  const wordItem = document.querySelector(`#ws2-word-list div[data-word="${word}"]`);
  if (wordItem) {
    const origText = wordItem.getAttribute('data-orig-text') || wordItem.textContent;
    wordItem.innerHTML = `<span style="color: ${wordColor}; font-weight: 900; margin-right: 4px;">✓</span> ${origText}`;
    wordItem.style.color = wordColor;
    wordItem.style.fontWeight = '700';
  }

  const counter = document.getElementById('ws2-counter');
  if (counter) {
    counter.textContent = `${foundWords2.size} / 10`;
  }

  if (foundWords2.size === 10) {
    stopWS2Timer();
    const mins = Math.floor(ws2Seconds / 60).toString().padStart(2, '0');
    const secs = (ws2Seconds % 60).toString().padStart(2, '0');
    setTimeout(() => {
      alert(`🎉 ¡EXCELENTE TRABAJO! Has encontrado las 10 palabras de Herramientas y Tecnología en un tiempo récord de ${mins}:${secs}. ¡Eres un Maestro Tecnólogo del Campo!`);
    }, 200);
  }
}

// Auto init WS2 on load
document.addEventListener('DOMContentLoaded', () => {
  initWordSearch2();
});

/* ==========================================================================
   EVALUACIÓN INTERACTIVA TALLER ÁREA 3: PRODUCCIÓN DE ALIMENTOS
   ========================================================================== */
function checkArea3Quiz(qNum, selectedOption, btnElem) {
  const correctAnswers = {
    1: 'B', // Espacio pedagógico para cultivar alimentos saludables
    2: 'A', // Aportar vitaminas y minerales frescos a nuestra nutrición
    3: 'B', // Trabajo manual ancestral y compost
    4: 'B', // Optimizar el agua llegando directamente a las raíces
    5: 'A'  // Garantiza la producción de alimentos sanos y vida saludable
  };

  const ansDiv = document.getElementById(`area3-ans-${qNum}`);
  if (!ansDiv) return;

  const parent = btnElem.parentElement;
  parent.querySelectorAll('button').forEach(b => {
    b.style.background = 'white';
    b.style.color = 'black';
    b.style.borderColor = 'var(--border-color)';
  });

  if (selectedOption === correctAnswers[qNum]) {
    btnElem.style.background = '#2e7d32';
    btnElem.style.color = 'white';
    btnElem.style.borderColor = '#2e7d32';
    ansDiv.innerHTML = `<span style="color: #2e7d32;"><i class="fa-solid fa-circle-check"></i> ¡Correcto! Excelente comprensión sobre la producción alimentaria.</span>`;
  } else {
    btnElem.style.background = '#c62828';
    btnElem.style.color = 'white';
    btnElem.style.borderColor = '#c62828';
    ansDiv.innerHTML = `<span style="color: #c62828;"><i class="fa-solid fa-circle-xmark"></i> Incorrecto. Inténtalo de nuevo.</span>`;
  }
}

/* ==========================================================================
   SOPA DE LETRAS INTERACTIVA - ÁREA 3 (PRODUCCIÓN Y NUTRICIÓN)
   ========================================================================== */
const WS3_MATRIX = [
  ['H','U','E','R','T','O','X','Y','Z','A','B','C'],
  ['N','U','T','R','I','C','I','O','N','D','E','F'],
  ['S','A','L','U','D','G','H','I','J','K','L','M'],
  ['A','L','I','M','E','N','T','O','N','O','P','Q'],
  ['C','O','S','E','C','H','A','R','S','T','U','V'],
  ['S','I','E','M','B','R','A','W','X','Y','Z','A'],
  ['T','R','A','D','I','C','I','O','N','A','L','B'],
  ['M','O','D','E','R','N','O','C','D','E','F','G'],
  ['C','O','M','P','O','S','T','H','I','J','K','L'],
  ['V','E','R','D','U','R','A','M','N','O','P','Q'],
  ['A','B','C','D','E','F','G','H','I','J','K','L'],
  ['M','N','O','P','Q','R','S','T','U','V','W','X']
];

const WS3_TARGET_WORDS = {
  'HUERTO': [[0,0],[0,1],[0,2],[0,3],[0,4],[0,5]],
  'NUTRICION': [[1,0],[1,1],[1,2],[1,3],[1,4],[1,5],[1,6],[1,7],[1,8]],
  'SALUD': [[2,0],[2,1],[2,2],[2,3],[2,4]],
  'ALIMENTO': [[3,0],[3,1],[3,2],[3,3],[3,4],[3,5],[3,6],[3,7]],
  'COSECHA': [[4,0],[4,1],[4,2],[4,3],[4,4],[4,5],[4,6]],
  'SIEMBRA': [[5,0],[5,1],[5,2],[5,3],[5,4],[5,5],[5,6]],
  'TRADICIONAL': [[6,0],[6,1],[6,2],[6,3],[6,4],[6,5],[6,6],[6,7],[6,8],[6,9],[6,10]],
  'MODERNO': [[7,0],[7,1],[7,2],[7,3],[7,4],[7,5],[7,6]],
  'COMPOST': [[8,0],[8,1],[8,2],[8,3],[8,4],[8,5],[8,6]],
  'VERDURA': [[9,0],[9,1],[9,2],[9,3],[9,4],[9,5],[9,6]]
};

const WS3_WORD_COLORS = {
  'HUERTO': '#2e7d32',
  'NUTRICION': '#e65100',
  'SALUD': '#1565c0',
  'ALIMENTO': '#6a1b9a',
  'COSECHA': '#4e342e',
  'SIEMBRA': '#00838f',
  'TRADICIONAL': '#d84315',
  'MODERNO': '#00695c',
  'COMPOST': '#c62828',
  'VERDURA': '#ad1457'
};

let selectedCoords3 = [];
let foundWords3 = new Set();
let ws3TimerInterval = null;
let ws3Seconds = 0;
let ws3TimerRunning = false;

function resetWS3Timer() {
  if (ws3TimerInterval) clearInterval(ws3TimerInterval);
  ws3TimerInterval = null;
  ws3Seconds = 0;
  ws3TimerRunning = false;
  const timerElem = document.getElementById('ws3-timer');
  if (timerElem) timerElem.textContent = '00:00';
}

function startWS3Timer() {
  if (ws3TimerRunning) return;
  ws3TimerRunning = true;
  ws3Seconds = 0;
  ws3TimerInterval = setInterval(() => {
    ws3Seconds++;
    const mins = Math.floor(ws3Seconds / 60).toString().padStart(2, '0');
    const secs = (ws3Seconds % 60).toString().padStart(2, '0');
    const timerElem = document.getElementById('ws3-timer');
    if (timerElem) timerElem.textContent = `${mins}:${secs}`;
  }, 1000);
}

function stopWS3Timer() {
  if (ws3TimerInterval) {
    clearInterval(ws3TimerInterval);
    ws3TimerInterval = null;
  }
  ws3TimerRunning = false;
}

function initWordSearch3() {
  const gridContainer = document.getElementById('wordsearch3-grid');
  const counter = document.getElementById('ws3-counter');
  if (!gridContainer) return;

  gridContainer.innerHTML = '';
  selectedCoords3 = [];
  foundWords3.clear();
  resetWS3Timer();

  if (counter) counter.textContent = `0 / 10`;

  document.querySelectorAll('#ws3-word-list div').forEach(item => {
    if (!item.getAttribute('data-orig-text')) {
      item.setAttribute('data-orig-text', item.textContent);
    }
    item.textContent = item.getAttribute('data-orig-text');
    item.style.textDecoration = 'none';
    item.style.opacity = '1';
    item.style.color = 'var(--text-main)';
    item.style.fontWeight = '600';
  });

  for (let r = 0; r < 12; r++) {
    for (let c = 0; c < 12; c++) {
      const cell = document.createElement('div');
      cell.classList.add('ws3-cell');
      cell.setAttribute('data-r', r);
      cell.setAttribute('data-c', c);
      cell.textContent = WS3_MATRIX[r][c];

      cell.style.aspectRatio = '1';
      cell.style.display = 'flex';
      cell.style.alignItems = 'center';
      cell.style.justifyContent = 'center';
      cell.style.background = '#ffffff';
      cell.style.border = '1px solid var(--border-color)';
      cell.style.borderRadius = '4px';
      cell.style.fontWeight = '700';
      cell.style.fontSize = '0.9rem';
      cell.style.cursor = 'pointer';
      cell.style.transition = 'all 0.15s ease';

      cell.addEventListener('click', () => handleCellClick3(r, c, cell));
      gridContainer.appendChild(cell);
    }
  }
}

function handleCellClick3(r, c, cellElem) {
  startWS3Timer();

  const index = selectedCoords3.findIndex(item => item.r === r && item.c === c);
  if (index >= 0) {
    selectedCoords3.splice(index, 1);
    cellElem.style.background = '#ffffff';
    cellElem.style.color = '#000000';
  } else {
    selectedCoords3.push({ r, c, char: WS3_MATRIX[r][c] });
    cellElem.style.background = 'var(--gold)';
    cellElem.style.color = 'var(--primary-dark)';
  }

  checkSelectedWord3();
}

function checkSelectedWord3() {
  const currentChars = selectedCoords3.map(item => item.char).join('');
  const currentCharsRev = selectedCoords3.map(item => item.char).reverse().join('');

  for (const [word, coords] of Object.entries(WS3_TARGET_WORDS)) {
    if (foundWords3.has(word)) continue;

    if (currentChars === word || currentCharsRev === word) {
      foundWords3.add(word);
      lockFoundWord3(word, coords);
      selectedCoords3 = [];
      break;
    }
  }
}

function lockFoundWord3(word, coords) {
  const wordColor = WS3_WORD_COLORS[word] || 'var(--primary)';

  coords.forEach(([r, c]) => {
    const cell = document.querySelector(`.ws3-cell[data-r="${r}"][data-c="${c}"]`);
    if (cell) {
      cell.style.background = wordColor;
      cell.style.color = '#ffffff';
      cell.style.boxShadow = `0 0 6px ${wordColor}88`;
    }
  });

  const wordItem = document.querySelector(`#ws3-word-list div[data-word="${word}"]`);
  if (wordItem) {
    const origText = wordItem.getAttribute('data-orig-text') || wordItem.textContent;
    wordItem.innerHTML = `<span style="color: ${wordColor}; font-weight: 900; margin-right: 4px;">✓</span> ${origText}`;
    wordItem.style.color = wordColor;
    wordItem.style.fontWeight = '700';
  }

  const counter = document.getElementById('ws3-counter');
  if (counter) {
    counter.textContent = `${foundWords3.size} / 10`;
  }

  if (foundWords3.size === 10) {
    stopWS3Timer();
    const mins = Math.floor(ws3Seconds / 60).toString().padStart(2, '0');
    const secs = (ws3Seconds % 60).toString().padStart(2, '0');
    setTimeout(() => {
      alert(`🎉 ¡FELICITACIONES! Has completado las 10 palabras de Producción de Alimentos y Nutrición en ${mins}:${secs}. ¡Eres un Campeón de la Nutrición Agrícola!`);
    }, 200);
  }
}

// Auto init WS3 on load
document.addEventListener('DOMContentLoaded', () => {
  initWordSearch3();
});

/* ==========================================================================
   EVALUACIÓN INTERACTIVA TALLER ÁREA 4: AMBIENTE Y AGRICULTURA SOSTENIBLE
   ========================================================================== */
function checkArea4Quiz(qNum, selectedOption, btnElem) {
  const correctAnswers = {
    1: 'B', // Cultivar alimentos cuidando el suelo, agua y biodiversidad
    2: 'A', // Transportan el polen y permiten frutos y semillas
    3: 'B', // Agua, aire y seres vivos
    4: 'B', // Airear el terreno y transformar materia orgánica en humus
    5: 'A'  // Evitando tóxicos sintéticos y aplicando abonos orgánicos como compost
  };

  const ansDiv = document.getElementById(`area4-ans-${qNum}`);
  if (!ansDiv) return;

  const parent = btnElem.parentElement;
  parent.querySelectorAll('button').forEach(b => {
    b.style.background = 'white';
    b.style.color = 'black';
    b.style.borderColor = 'var(--border-color)';
  });

  if (selectedOption === correctAnswers[qNum]) {
    btnElem.style.background = '#2e7d32';
    btnElem.style.color = 'white';
    btnElem.style.borderColor = '#2e7d32';
    ansDiv.innerHTML = `<span style="color: #2e7d32;"><i class="fa-solid fa-circle-check"></i> ¡Correcto! Excelente guardián del medio ambiente y del suelo.</span>`;
  } else {
    btnElem.style.background = '#c62828';
    btnElem.style.color = 'white';
    btnElem.style.borderColor = '#c62828';
    ansDiv.innerHTML = `<span style="color: #c62828;"><i class="fa-solid fa-circle-xmark"></i> Incorrecto. Inténtalo de nuevo.</span>`;
  }
}

/* ==========================================================================
   SOPA DE LETRAS INTERACTIVA - ÁREA 4 (SOSTENIBILIDAD Y SUELO)
   ========================================================================== */
const WS4_MATRIX = [
  ['S','O','S','T','E','N','I','B','L','E','X','Y'],
  ['A','M','B','I','E','N','T','E','Z','A','B','C'],
  ['F','L','O','R','A','D','E','F','G','H','I','J'],
  ['F','A','U','N','A','K','L','M','N','O','P','Q'],
  ['S','U','E','L','O','R','S','T','U','V','W','X'],
  ['A','G','U','A','Y','Z','A','B','C','D','E','F'],
  ['A','I','R','E','G','H','I','J','K','L','M','N'],
  ['L','O','M','B','R','I','Z','O','P','Q','R','S'],
  ['H','U','M','U','S','T','U','V','W','X','Y','Z'],
  ['A','B','O','N','O','A','B','C','D','E','F','G'],
  ['A','B','C','D','E','F','G','H','I','J','K','L'],
  ['M','N','O','P','Q','R','S','T','U','V','W','X']
];

const WS4_TARGET_WORDS = {
  'SOSTENIBLE': [[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8],[0,9]],
  'AMBIENTE': [[1,0],[1,1],[1,2],[1,3],[1,4],[1,5],[1,6],[1,7]],
  'FLORA': [[2,0],[2,1],[2,2],[2,3],[2,4]],
  'FAUNA': [[3,0],[3,1],[3,2],[3,3],[3,4]],
  'SUELO': [[4,0],[4,1],[4,2],[4,3],[4,4]],
  'AGUA': [[5,0],[5,1],[5,2],[5,3]],
  'AIRE': [[6,0],[6,1],[6,2],[6,3]],
  'LOMBRIZ': [[7,0],[7,1],[7,2],[7,3],[7,4],[7,5],[7,6]],
  'HUMUS': [[8,0],[8,1],[8,2],[8,3],[8,4]],
  'ABONO': [[9,0],[9,1],[9,2],[9,3],[9,4]]
};

const WS4_WORD_COLORS = {
  'SOSTENIBLE': '#2e7d32',
  'AMBIENTE': '#e65100',
  'FLORA': '#1565c0',
  'FAUNA': '#6a1b9a',
  'SUELO': '#4e342e',
  'AGUA': '#00838f',
  'AIRE': '#d84315',
  'LOMBRIZ': '#00695c',
  'HUMUS': '#c62828',
  'ABONO': '#ad1457'
};

let selectedCoords4 = [];
let foundWords4 = new Set();
let ws4TimerInterval = null;
let ws4Seconds = 0;
let ws4TimerRunning = false;

function resetWS4Timer() {
  if (ws4TimerInterval) clearInterval(ws4TimerInterval);
  ws4TimerInterval = null;
  ws4Seconds = 0;
  ws4TimerRunning = false;
  const timerElem = document.getElementById('ws4-timer');
  if (timerElem) timerElem.textContent = '00:00';
}

function startWS4Timer() {
  if (ws4TimerRunning) return;
  ws4TimerRunning = true;
  ws4Seconds = 0;
  ws4TimerInterval = setInterval(() => {
    ws4Seconds++;
    const mins = Math.floor(ws4Seconds / 60).toString().padStart(2, '0');
    const secs = (ws4Seconds % 60).toString().padStart(2, '0');
    const timerElem = document.getElementById('ws4-timer');
    if (timerElem) timerElem.textContent = `${mins}:${secs}`;
  }, 1000);
}

function stopWS4Timer() {
  if (ws4TimerInterval) {
    clearInterval(ws4TimerInterval);
    ws4TimerInterval = null;
  }
  ws4TimerRunning = false;
}

function initWordSearch4() {
  const gridContainer = document.getElementById('wordsearch4-grid');
  const counter = document.getElementById('ws4-counter');
  if (!gridContainer) return;

  gridContainer.innerHTML = '';
  selectedCoords4 = [];
  foundWords4.clear();
  resetWS4Timer();

  if (counter) counter.textContent = `0 / 10`;

  document.querySelectorAll('#ws4-word-list div').forEach(item => {
    if (!item.getAttribute('data-orig-text')) {
      item.setAttribute('data-orig-text', item.textContent);
    }
    item.textContent = item.getAttribute('data-orig-text');
    item.style.textDecoration = 'none';
    item.style.opacity = '1';
    item.style.color = 'var(--text-main)';
    item.style.fontWeight = '600';
  });

  for (let r = 0; r < 12; r++) {
    for (let c = 0; c < 12; c++) {
      const cell = document.createElement('div');
      cell.classList.add('ws4-cell');
      cell.setAttribute('data-r', r);
      cell.setAttribute('data-c', c);
      cell.textContent = WS4_MATRIX[r][c];

      cell.style.aspectRatio = '1';
      cell.style.display = 'flex';
      cell.style.alignItems = 'center';
      cell.style.justifyContent = 'center';
      cell.style.background = '#ffffff';
      cell.style.border = '1px solid var(--border-color)';
      cell.style.borderRadius = '4px';
      cell.style.fontWeight = '700';
      cell.style.fontSize = '0.9rem';
      cell.style.cursor = 'pointer';
      cell.style.transition = 'all 0.15s ease';

      cell.addEventListener('click', () => handleCellClick4(r, c, cell));
      gridContainer.appendChild(cell);
    }
  }
}

function handleCellClick4(r, c, cellElem) {
  startWS4Timer();

  const index = selectedCoords4.findIndex(item => item.r === r && item.c === c);
  if (index >= 0) {
    selectedCoords4.splice(index, 1);
    cellElem.style.background = '#ffffff';
    cellElem.style.color = '#000000';
  } else {
    selectedCoords4.push({ r, c, char: WS4_MATRIX[r][c] });
    cellElem.style.background = 'var(--gold)';
    cellElem.style.color = 'var(--primary-dark)';
  }

  checkSelectedWord4();
}

function checkSelectedWord4() {
  const currentChars = selectedCoords4.map(item => item.char).join('');
  const currentCharsRev = selectedCoords4.map(item => item.char).reverse().join('');

  for (const [word, coords] of Object.entries(WS4_TARGET_WORDS)) {
    if (foundWords4.has(word)) continue;

    if (currentChars === word || currentCharsRev === word) {
      foundWords4.add(word);
      lockFoundWord4(word, coords);
      selectedCoords4 = [];
      break;
    }
  }
}

function lockFoundWord4(word, coords) {
  const wordColor = WS4_WORD_COLORS[word] || 'var(--primary)';

  coords.forEach(([r, c]) => {
    const cell = document.querySelector(`.ws4-cell[data-r="${r}"][data-c="${c}"]`);
    if (cell) {
      cell.style.background = wordColor;
      cell.style.color = '#ffffff';
      cell.style.boxShadow = `0 0 6px ${wordColor}88`;
    }
  });

  const wordItem = document.querySelector(`#ws4-word-list div[data-word="${word}"]`);
  if (wordItem) {
    const origText = wordItem.getAttribute('data-orig-text') || wordItem.textContent;
    wordItem.innerHTML = `<span style="color: ${wordColor}; font-weight: 900; margin-right: 4px;">✓</span> ${origText}`;
    wordItem.style.color = wordColor;
    wordItem.style.fontWeight = '700';
  }

  const counter = document.getElementById('ws4-counter');
  if (counter) {
    counter.textContent = `${foundWords4.size} / 10`;
  }

  if (foundWords4.size === 10) {
    stopWS4Timer();
    const mins = Math.floor(ws4Seconds / 60).toString().padStart(2, '0');
    const secs = (ws4Seconds % 60).toString().padStart(2, '0');
    setTimeout(() => {
      alert(`🎉 ¡MAGNÍFICO TRABAJO! Has encontrado las 10 palabras de Ambiente y Agricultura Sostenible en ${mins}:${secs}. ¡Eres un Protector Oficial de la Madre Tierra!`);
    }, 200);
  }
}

// Auto init WS4 on load
document.addEventListener('DOMContentLoaded', () => {
  initWordSearch4();
});

/* ==========================================================================
   EVALUACIÓN INTERACTIVA TALLER CUARTO GRADO ÁREA 1: JARDINES Y HÁBITOS
   ========================================================================== */
function checkCuartoArea1Quiz(qNum, selectedOption, btnElem) {
  const correctAnswers = {
    1: 'B', // Embellecer el entorno escolar y brindar bienestar emocional y ambiental
    2: 'A', // Vistosidad y relieve ornamental de sus hojas verdes o variegadas
    3: 'B', // Poseer tallos flexibles con zarcillos para sujetarse a muros o tutores
    4: 'B', // La grama y el maní forrajero que cubren el suelo
    5: 'A'  // Aprovechan espacios verticales cayendo suavemente desde maceteros elevados
  };

  const ansDiv = document.getElementById(`cuarto-area1-ans-${qNum}`);
  if (!ansDiv) return;

  const parent = btnElem.parentElement;
  parent.querySelectorAll('button').forEach(b => {
    b.style.background = 'white';
    b.style.color = 'black';
    b.style.borderColor = 'var(--border-color)';
  });

  if (selectedOption === correctAnswers[qNum]) {
    btnElem.style.background = '#2e7d32';
    btnElem.style.color = 'white';
    btnElem.style.borderColor = '#2e7d32';
    ansDiv.innerHTML = `<span style="color: #2e7d32;"><i class="fa-solid fa-circle-check"></i> ¡Correcto! Excelente dominio de la botánica ornamental.</span>`;
  } else {
    btnElem.style.background = '#c62828';
    btnElem.style.color = 'white';
    btnElem.style.borderColor = '#c62828';
    ansDiv.innerHTML = `<span style="color: #c62828;"><i class="fa-solid fa-circle-xmark"></i> Incorrecto. Inténtalo de nuevo.</span>`;
  }
}

/* ==========================================================================
   SOPA DE LETRAS INTERACTIVA - CUARTO GRADO ÁREA 1 (JARDINES Y HÁBITOS)
   ========================================================================== */
const WS41_MATRIX = [
  ['O','R','N','A','M','E','N','T','A','L','X','Y'],
  ['F','O','L','L','A','J','E','Z','A','B','C','D'],
  ['E','R','G','U','I','D','A','E','F','G','H','I'],
  ['T','R','E','P','A','D','O','R','A','J','K','L'],
  ['C','O','L','G','A','N','T','E','M','N','O','P'],
  ['R','A','S','T','R','E','R','A','Q','R','S','T'],
  ['Z','A','R','C','I','L','L','O','U','V','W','X'],
  ['F','L','O','R','E','S','Y','Z','A','B','C','D'],
  ['J','A','R','D','I','N','E','F','G','H','I','J'],
  ['P','A','I','S','A','J','E','K','L','M','N','O'],
  ['A','B','C','D','E','F','G','H','I','J','K','L'],
  ['M','N','O','P','Q','R','S','T','U','V','W','X']
];

const WS41_TARGET_WORDS = {
  'ORNAMENTAL': [[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8],[0,9]],
  'FOLLAJE': [[1,0],[1,1],[1,2],[1,3],[1,4],[1,5],[1,6]],
  'ERGUIDA': [[2,0],[2,1],[2,2],[2,3],[2,4],[2,5],[2,6]],
  'TREPADORA': [[3,0],[3,1],[3,2],[3,3],[3,4],[3,5],[3,6],[3,7],[3,8]],
  'COLGANTE': [[4,0],[4,1],[4,2],[4,3],[4,4],[4,5],[4,6],[4,7]],
  'RASTRERA': [[5,0],[5,1],[5,2],[5,3],[5,4],[5,5],[5,6],[5,7]],
  'ZARCILLO': [[6,0],[6,1],[6,2],[6,3],[6,4],[6,5],[6,6],[6,7]],
  'FLORES': [[7,0],[7,1],[7,2],[7,3],[7,4],[7,5]],
  'JARDIN': [[8,0],[8,1],[8,2],[8,3],[8,4],[8,5]],
  'PAISAJE': [[9,0],[9,1],[9,2],[9,3],[9,4],[9,5],[9,6]]
};

const WS41_WORD_COLORS = {
  'ORNAMENTAL': '#2e7d32',
  'FOLLAJE': '#e65100',
  'ERGUIDA': '#1565c0',
  'TREPADORA': '#6a1b9a',
  'COLGANTE': '#4e342e',
  'RASTRERA': '#00838f',
  'ZARCILLO': '#d84315',
  'FLORES': '#00695c',
  'JARDIN': '#c62828',
  'PAISAJE': '#ad1457'
};

let selectedCoords41 = [];
let foundWords41 = new Set();
let ws41TimerInterval = null;
let ws41Seconds = 0;
let ws41TimerRunning = false;

function resetWS41Timer() {
  if (ws41TimerInterval) clearInterval(ws41TimerInterval);
  ws41TimerInterval = null;
  ws41Seconds = 0;
  ws41TimerRunning = false;
  const timerElem = document.getElementById('ws41-timer');
  if (timerElem) timerElem.textContent = '00:00';
}

function startWS41Timer() {
  if (ws41TimerRunning) return;
  ws41TimerRunning = true;
  ws41Seconds = 0;
  ws41TimerInterval = setInterval(() => {
    ws41Seconds++;
    const mins = Math.floor(ws41Seconds / 60).toString().padStart(2, '0');
    const secs = (ws41Seconds % 60).toString().padStart(2, '0');
    const timerElem = document.getElementById('ws41-timer');
    if (timerElem) timerElem.textContent = `${mins}:${secs}`;
  }, 1000);
}

function stopWS41Timer() {
  if (ws41TimerInterval) {
    clearInterval(ws41TimerInterval);
    ws41TimerInterval = null;
  }
  ws41TimerRunning = false;
}

function initWordSearch41() {
  const gridContainer = document.getElementById('wordsearch41-grid');
  const counter = document.getElementById('ws41-counter');
  if (!gridContainer) return;

  gridContainer.innerHTML = '';
  selectedCoords41 = [];
  foundWords41.clear();
  resetWS41Timer();

  if (counter) counter.textContent = `0 / 10`;

  document.querySelectorAll('#ws41-word-list div').forEach(item => {
    if (!item.getAttribute('data-orig-text')) {
      item.setAttribute('data-orig-text', item.textContent);
    }
    item.textContent = item.getAttribute('data-orig-text');
    item.style.textDecoration = 'none';
    item.style.opacity = '1';
    item.style.color = 'var(--text-main)';
    item.style.fontWeight = '600';
  });

  for (let r = 0; r < 12; r++) {
    for (let c = 0; c < 12; c++) {
      const cell = document.createElement('div');
      cell.classList.add('ws41-cell');
      cell.setAttribute('data-r', r);
      cell.setAttribute('data-c', c);
      cell.textContent = WS41_MATRIX[r][c];

      cell.style.aspectRatio = '1';
      cell.style.display = 'flex';
      cell.style.alignItems = 'center';
      cell.style.justifyContent = 'center';
      cell.style.background = '#ffffff';
      cell.style.border = '1px solid var(--border-color)';
      cell.style.borderRadius = '4px';
      cell.style.fontWeight = '700';
      cell.style.fontSize = '0.9rem';
      cell.style.cursor = 'pointer';
      cell.style.transition = 'all 0.15s ease';

      cell.addEventListener('click', () => handleCellClick41(r, c, cell));
      gridContainer.appendChild(cell);
    }
  }
}

function handleCellClick41(r, c, cellElem) {
  startWS41Timer();

  const index = selectedCoords41.findIndex(item => item.r === r && item.c === c);
  if (index >= 0) {
    selectedCoords41.splice(index, 1);
    cellElem.style.background = '#ffffff';
    cellElem.style.color = '#000000';
  } else {
    selectedCoords41.push({ r, c, char: WS41_MATRIX[r][c] });
    cellElem.style.background = 'var(--gold)';
    cellElem.style.color = 'var(--primary-dark)';
  }

  checkSelectedWord41();
}

function checkSelectedWord41() {
  const currentChars = selectedCoords41.map(item => item.char).join('');
  const currentCharsRev = selectedCoords41.map(item => item.char).reverse().join('');

  for (const [word, coords] of Object.entries(WS41_TARGET_WORDS)) {
    if (foundWords41.has(word)) continue;

    if (currentChars === word || currentCharsRev === word) {
      foundWords41.add(word);
      lockFoundWord41(word, coords);
      selectedCoords41 = [];
      break;
    }
  }
}

function lockFoundWord41(word, coords) {
  const wordColor = WS41_WORD_COLORS[word] || 'var(--primary)';

  coords.forEach(([r, c]) => {
    const cell = document.querySelector(`.ws41-cell[data-r="${r}"][data-c="${c}"]`);
    if (cell) {
      cell.style.background = wordColor;
      cell.style.color = '#ffffff';
      cell.style.boxShadow = `0 0 6px ${wordColor}88`;
    }
  });

  const wordItem = document.querySelector(`#ws41-word-list div[data-word="${word}"]`);
  if (wordItem) {
    const origText = wordItem.getAttribute('data-orig-text') || wordItem.textContent;
    wordItem.innerHTML = `<span style="color: ${wordColor}; font-weight: 900; margin-right: 4px;">✓</span> ${origText}`;
    wordItem.style.color = wordColor;
    wordItem.style.fontWeight = '700';
  }

  const counter = document.getElementById('ws41-counter');
  if (counter) {
    counter.textContent = `${foundWords41.size} / 10`;
  }

  if (foundWords41.size === 10) {
    stopWS41Timer();
    const mins = Math.floor(ws41Seconds / 60).toString().padStart(2, '0');
    const secs = (ws41Seconds % 60).toString().padStart(2, '0');
    setTimeout(() => {
      alert(`🎉 ¡SOBRESALIENTE! Has completado la Sopa de Letras de Cuarto Grado (Área 1) en ${mins}:${secs}. ¡Eres un Paisajista Botánico Experto!`);
    }, 200);
  }
}

// Auto init WS41 on load
document.addEventListener('DOMContentLoaded', () => {
  initWordSearch41();
});
