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
