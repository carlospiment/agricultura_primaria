/* ==========================================================================
   AGRICULTURA DE PRIMARIA - JAVASCRIPT CONTROLLER
   Autor: Ingeniero Carlos Pimentel
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const views = document.querySelectorAll('.view-section');
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const floatingIndexBtn = document.getElementById('floatingIndexBtn');

  // Auto-guardado de respuestas en LocalStorage
  const formInputs = document.querySelectorAll('input[type="text"], textarea');
  formInputs.forEach(input => {
    if (input.id) {
      const savedVal = localStorage.getItem('meduca_agr_' + input.id);
      if (savedVal) input.value = savedVal;
      input.addEventListener('input', () => {
        localStorage.setItem('meduca_agr_' + input.id, input.value);
      });
    }
  });

  function openMobileMenu() {
    if (navMenu) {
      navMenu.scrollTop = 0;
      navMenu.classList.add('mobile-open');
    }
    if (mobileOverlay) mobileOverlay.classList.add('active');
    if (mobileToggle) {
      mobileToggle.setAttribute('aria-label', 'Cerrar menú');
      const icon = mobileToggle.querySelector('i');
      if (icon) icon.className = 'fa-solid fa-xmark';
    }
  }

  function closeMobileMenu() {
    if (navMenu) navMenu.classList.remove('mobile-open');
    if (mobileOverlay) mobileOverlay.classList.remove('active');
    if (mobileToggle) {
      mobileToggle.setAttribute('aria-label', 'Abrir menú');
      const icon = mobileToggle.querySelector('i');
      if (icon) icon.className = 'fa-solid fa-bars';
    }
  }

  // Navigation router function
  function navigateTo(targetId) {
    if (!targetId) targetId = 'inicio';
    
    // Hide all views
    const allViews = document.querySelectorAll('.view-section');
    allViews.forEach(view => {
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
    closeMobileMenu();
  }

  // Handle Hash Changes in URL
  function handleHashChange() {
    const hash = window.location.hash.replace('#', '');
    navigateTo(hash || 'inicio');
  }

  // Listen for hashchange and popstate events
  window.addEventListener('hashchange', handleHashChange);
  window.addEventListener('popstate', handleHashChange);

  // Mobile Accordion and Click listener
  document.addEventListener('click', (e) => {
    // Check if clicking a nav-link on mobile that has a dropdown menu
    const isMobile = window.innerWidth <= 900;
    const parentNavItem = e.target.closest('.nav-item');
    const navLinkHeader = e.target.closest('.nav-link');

    if (isMobile && parentNavItem && navLinkHeader && parentNavItem.querySelector('.dropdown-menu')) {
      // Toggle dropdown accordion on mobile
      const dropdownMenu = parentNavItem.querySelector('.dropdown-menu');
      if (dropdownMenu) {
        if (!parentNavItem.classList.contains('dropdown-open')) {
          e.preventDefault();
          e.stopPropagation();

          // Close other dropdowns
          document.querySelectorAll('.nav-item').forEach(item => {
            if (item !== parentNavItem) item.classList.remove('dropdown-open');
          });

          parentNavItem.classList.add('dropdown-open');
          return;
        } else {
          parentNavItem.classList.remove('dropdown-open');
        }
      }
    }

    const targetLink = e.target.closest('[data-target]');
    if (targetLink) {
      const targetId = targetLink.getAttribute('data-target');
      if (targetId) {
        if (window.location.hash !== '#' + targetId) {
          window.location.hash = targetId;
        }
        navigateTo(targetId);
      }
    }
  });

  // Mobile drawer toggle
  if (mobileToggle) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (navMenu && navMenu.classList.contains('mobile-open')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (floatingIndexBtn) {
    floatingIndexBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (navMenu.classList.contains('mobile-open')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (mobileOverlay) {
    mobileOverlay.addEventListener('click', () => {
      closeMobileMenu();
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
   EVALUACIÓN AUTOMÁTICA DE COMPRENSIÓN LECTORA - CUARTO GRADO ÁREA 1
   ========================================================================== */
function evaluarComprensionLectoraCuartoArea1() {
  const q1 = (document.getElementById('cuarto-reading-q1')?.value || '').toLowerCase().trim();
  const q2 = (document.getElementById('cuarto-reading-q2')?.value || '').toLowerCase().trim();
  const q3 = (document.getElementById('cuarto-reading-q3')?.value || '').toLowerCase().trim();
  const q4 = (document.getElementById('cuarto-reading-q4')?.value || '').toLowerCase().trim();

  const card = document.getElementById('cuarto-eval-result-card');
  const badge = document.getElementById('cuarto-eval-score-badge');
  const content = document.getElementById('cuarto-eval-details-content');

  if (!card || !badge || !content) return;

  if (!q1 && !q2 && !q3 && !q4) {
    alert('Por favor, responde al menos una pregunta antes de enviar tu evaluación.');
    return;
  }

  let score = 0;
  let feedback = [];

  // Pregunta 1: Rosa (erguida), Hiedra (trepadora), Helecho (colgante), Menta (rastrera)
  if ((q1.includes('rosa') && q1.includes('erguida')) &&
      (q1.includes('hiedra') && q1.includes('trepadora')) &&
      (q1.includes('helecho') && q1.includes('colgante')) &&
      (q1.includes('menta') && q1.includes('rastrera'))) {
    score += 25;
    feedback.push('<div style="margin-bottom: 10px; padding: 10px; background: #f1f8e9; border-radius: 6px; border-left: 4px solid #4caf50;">✅ <strong>Pregunta 1 (25/25 pts):</strong> ¡Excelente! Identificaste correctamente las 4 plantas y sus hábitos de crecimiento (Rosa - Erguida, Hiedra - Trepadora, Helecho - Colgante, Menta - Rastrera).</div>');
  } else if (q1.includes('rosa') || q1.includes('hiedra') || q1.includes('helecho') || q1.includes('menta')) {
    score += 15;
    feedback.push('<div style="margin-bottom: 10px; padding: 10px; background: #fff8e1; border-radius: 6px; border-left: 4px solid #ffb300;">🟡 <strong>Pregunta 1 (15/25 pts):</strong> Mencionaste algunas plantas. Asegúrate de incluir las cuatro y su hábito: Rosa (erguida), Hiedra (trepadora), Helecho (colgante) y Menta (rastrera).</div>');
  } else {
    feedback.push('<div style="margin-bottom: 10px; padding: 10px; background: #ffebee; border-radius: 6px; border-left: 4px solid #e53935;">❌ <strong>Pregunta 1 (0/25 pts):</strong> Las plantas son Rosa (Erguida), Hiedra (Trepadora), Helecho (Colgante) y Menta (Rastrera).</div>');
  }

  // Pregunta 2: Funciones (estética, cubrir pared, aire, cubrir suelo)
  if ((q2.includes('hermosa') || q2.includes('estética') || q2.includes('estetica') || q2.includes('flor') || q2.includes('erguida')) &&
      (q2.includes('pared') || q2.includes('muro')) &&
      (q2.includes('suelo') || q2.includes('tierra') || q2.includes('seque'))) {
    score += 25;
    feedback.push('<div style="margin-bottom: 10px; padding: 10px; background: #f1f8e9; border-radius: 6px; border-left: 4px solid #4caf50;">✅ <strong>Pregunta 2 (25/25 pts):</strong> ¡Muy bien! Reconociste las funciones estéticas y ambientales de cada especie en el jardín.</div>');
  } else if (q2.includes('pared') || q2.includes('suelo') || q2.includes('jardín') || q2.includes('flores')) {
    score += 15;
    feedback.push('<div style="margin-bottom: 10px; padding: 10px; background: #fff8e1; border-radius: 6px; border-left: 4px solid #ffb300;">🟡 <strong>Pregunta 2 (15/25 pts):</strong> Buen intento. Detalla cómo la Rosa embellece, la Hiedra cubre muros, el Helecho adorna el aire y la Menta protege el suelo.</div>');
  } else {
    feedback.push('<div style="margin-bottom: 10px; padding: 10px; background: #ffebee; border-radius: 6px; border-left: 4px solid #e53935;">❌ <strong>Pregunta 2 (0/25 pts):</strong> Respuesta a revisar. Cada planta cumple una función: estética en flores, cubrimiento de muros, adorno flotante o protección del suelo.</div>');
  }

  // Pregunta 3: Biodiversidad / Ecosistema / Ninguna es más importante
  if (q3.includes('biodiversidad') || q3.includes('ecosistema') || q3.includes('importante') || q3.includes('junto') || q3.includes('equipo') || q3.includes('magia') || q3.includes('diferente')) {
    score += 25;
    feedback.push('<div style="margin-bottom: 10px; padding: 10px; background: #f1f8e9; border-radius: 6px; border-left: 4px solid #4caf50;">✅ <strong>Pregunta 3 (25/25 pts):</strong> ¡Gran análisis de pensamiento crítico! Comprendiste que la biodiversidad y la combinación de hábitos hacen funcionar al ecosistema.</div>');
  } else if (q3.length > 5) {
    score += 15;
    feedback.push('<div style="margin-bottom: 10px; padding: 10px; background: #fff8e1; border-radius: 6px; border-left: 4px solid #ffb300;">🟡 <strong>Pregunta 3 (15/25 pts):</strong> Buen razonamiento. Recuerda mencionar que la <strong>biodiversidad</strong> hace que el ecosistema funcione.</div>');
  } else {
    feedback.push('<div style="margin-bottom: 10px; padding: 10px; background: #ffebee; border-radius: 6px; border-left: 4px solid #e53935;">❌ <strong>Pregunta 3 (0/25 pts):</strong> El Viejo Roble enseñó que todas las plantas son igual de importantes y la biodiversidad hace funcionar el ecosistema.</div>');
  }

  // Pregunta 4: Diseño del jardín combinando hábitos de crecimiento
  if (q4.includes('combinar') || q4.includes('hábito') || q4.includes('habito') || q4.includes('trepadora') || q4.includes('rastrera') || q4.includes('erguida') || q4.includes('jardín') || q4.includes('jardin') || q4.includes('escuela')) {
    score += 25;
    feedback.push('<div style="margin-bottom: 10px; padding: 10px; background: #f1f8e9; border-radius: 6px; border-left: 4px solid #4caf50;">✅ <strong>Pregunta 4 (25/25 pts):</strong> ¡Excelente aplicación práctica! Usar diferentes hábitos de crecimiento aprovecha el espacio vertical, aéreo y del suelo en la escuela.</div>');
  } else if (q4.length > 5) {
    score += 15;
    feedback.push('<div style="margin-bottom: 10px; padding: 10px; background: #fff8e1; border-radius: 6px; border-left: 4px solid #ffb300;">🟡 <strong>Pregunta 4 (15/25 pts):</strong> Mencionaste el jardín. Explica cómo combinarías plantas erguidas, trepadoras, colgantes y rastreras en tu escuela.</div>');
  } else {
    feedback.push('<div style="margin-bottom: 10px; padding: 10px; background: #ffebee; border-radius: 6px; border-left: 4px solid #e53935;">❌ <strong>Pregunta 4 (0/25 pts):</strong> Un buen diseño integra plantas erguidas, trepadoras, colgantes y rastreras para embellecer todos los espacios.</div>');
  }

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
    summaryHeader = '<div style="background: #2e7d32; color: white; padding: 12px 16px; border-radius: 6px; margin-bottom: 16px; font-weight: 700;">🌟 ¡Felicidades! Has alcanzado la máxima calificación en Comprensión Lectora y Pensamiento Crítico.</div>';
  } else if (score >= 60) {
    summaryHeader = '<div style="background: #f57c00; color: white; padding: 12px 16px; border-radius: 6px; margin-bottom: 16px; font-weight: 700;">👍 ¡Buen trabajo! Revisa las recomendaciones para enriquecer tus respuestas.</div>';
  } else {
    summaryHeader = '<div style="background: #d32f2f; color: white; padding: 12px 16px; border-radius: 6px; margin-bottom: 16px; font-weight: 700;">📖 Te sugerimos releer "El Consejo del Viejo Roble" y responder nuevamente.</div>';
  }

  content.innerHTML = summaryHeader + feedback.join('');
  card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/* ==========================================================================
   EVALUACIÓN AUTOMÁTICA DE COMPRENSIÓN LECTORA - QUINTO GRADO ÁREA 1
   ========================================================================== */
function evaluarComprensionLectoraQuintoArea1() {
  const q1 = (document.getElementById('quinto-reading-q1')?.value || '').toLowerCase().trim();
  const q2 = (document.getElementById('quinto-reading-q2')?.value || '').toLowerCase().trim();
  const q3 = (document.getElementById('quinto-reading-q3')?.value || '').toLowerCase().trim();
  const q4 = (document.getElementById('quinto-reading-q4')?.value || '').toLowerCase().trim();

  const card = document.getElementById('quinto-eval-result-card');
  const badge = document.getElementById('quinto-eval-score-badge');
  const content = document.getElementById('quinto-eval-details-content');

  if (!card || !badge || !content) return;

  if (!q1 && !q2 && !q3 && !q4) {
    alert('Por favor, responde al menos una pregunta antes de enviar tu evaluación.');
    return;
  }

  let score = 0;
  let feedback = [];

  // Pregunta 1: Tomate (Alimenticio), Menta (Medicinal), Helecho (Botánico)
  if ((q1.includes('tomate') && (q1.includes('alimenticio') || q1.includes('alimento'))) &&
      (q1.includes('menta') && (q1.includes('medicinal') || q1.includes('medicina'))) &&
      (q1.includes('helecho') && (q1.includes('botánico') || q1.includes('botanico')))) {
    score += 25;
    feedback.push('<div style="margin-bottom: 10px; padding: 10px; background: #f1f8e9; border-radius: 6px; border-left: 4px solid #4caf50;">✅ <strong>Pregunta 1 (25/25 pts):</strong> ¡Excelente! Identificaste correctamente las tres plantas y sus tipos de jardín (Tomate - Alimenticio, Menta - Medicinal, Helecho - Botánico).</div>');
  } else if (q1.includes('tomate') || q1.includes('menta') || q1.includes('helecho')) {
    score += 15;
    feedback.push('<div style="margin-bottom: 10px; padding: 10px; background: #fff8e1; border-radius: 6px; border-left: 4px solid #ffb300;">🟡 <strong>Pregunta 1 (15/25 pts):</strong> Mencionaste algunas plantas. Asegúrate de incluir las tres: Tomate (Alimenticio), Menta (Medicinal) y Helecho (Botánico).</div>');
  } else {
    feedback.push('<div style="margin-bottom: 10px; padding: 10px; background: #ffebee; border-radius: 6px; border-left: 4px solid #e53935;">❌ <strong>Pregunta 1 (0/25 pts):</strong> Las tres plantas son el Tomate (Jardín Alimenticio), Menta (Jardín Medicinal) y Helecho (Jardín Botánico).</div>');
  }

  // Pregunta 2: Luz directa (Tomate), Semisombra (Menta), Sombra (Helecho)
  if ((q2.includes('tomate') || q2.includes('directa') || q2.includes('sol')) &&
      (q2.includes('menta') || q2.includes('semisombra')) &&
      (q2.includes('helecho') || q2.includes('sombra'))) {
    score += 25;
    feedback.push('<div style="margin-bottom: 10px; padding: 10px; background: #f1f8e9; border-radius: 6px; border-left: 4px solid #4caf50;">✅ <strong>Pregunta 2 (25/25 pts):</strong> ¡Muy bien! Reconociste las necesidades lumínicas: Tomate (luz directa/sol pleno), Menta (semisombra) y Helecho (sombra).</div>');
  } else if (q2.includes('luz') || q2.includes('sol') || q2.includes('sombra')) {
    score += 15;
    feedback.push('<div style="margin-bottom: 10px; padding: 10px; background: #fff8e1; border-radius: 6px; border-left: 4px solid #ffb300;">🟡 <strong>Pregunta 2 (15/25 pts):</strong> Recuerda detallar: Tomate necesita luz directa, Menta prefiere semisombra y Helecho requiere sombra.</div>');
  } else {
    feedback.push('<div style="margin-bottom: 10px; padding: 10px; background: #ffebee; border-radius: 6px; border-left: 4px solid #e53935;">❌ <strong>Pregunta 2 (0/25 pts):</strong> Respuesta a revisar. Tomate = Luz directa, Menta = Semisombra, Helecho = Sombra.</div>');
  }

  // Pregunta 3: Ninguna es más importante / Alimento, medicina y conocimiento / Biodiversidad
  if (q3.includes('alimento') || q3.includes('medicina') || q3.includes('conocimiento') || q3.includes('biodiversidad') || q3.includes('propósito') || q3.includes('proposito') || q3.includes('importante') || q3.includes('función') || q3.includes('funcion')) {
    score += 25;
    feedback.push('<div style="margin-bottom: 10px; padding: 10px; background: #f1f8e9; border-radius: 6px; border-left: 4px solid #4caf50;">✅ <strong>Pregunta 3 (25/25 pts):</strong> ¡Gran análisis de pensamiento crítico! Comprendiste que la escuela necesita alimento, medicina y conocimiento para proteger nuestra biodiversidad.</div>');
  } else if (q3.length > 5) {
    score += 15;
    feedback.push('<div style="margin-bottom: 10px; padding: 10px; background: #fff8e1; border-radius: 6px; border-left: 4px solid #ffb300;">🟡 <strong>Pregunta 3 (15/25 pts):</strong> Buen razonamiento. Recuerda incluir que la escuela necesita alimento, medicina y conocimiento.</div>');
  } else {
    feedback.push('<div style="margin-bottom: 10px; padding: 10px; background: #ffebee; border-radius: 6px; border-left: 4px solid #e53935;">❌ <strong>Pregunta 3 (0/25 pts):</strong> El Gran Árbol enseña que todas las plantas son valiosas porque aportan alimento, medicina y conservación de la biodiversidad.</div>');
  }

  // Pregunta 4: Mallas de sombra / parcelas correctas / ubicación adecuada
  if (q4.includes('malla') || q4.includes('sombra') || q4.includes('parcela') || q4.includes('ubicar') || q4.includes('lugar') || q4.includes('proteger')) {
    score += 25;
    feedback.push('<div style="margin-bottom: 10px; padding: 10px; background: #f1f8e9; border-radius: 6px; border-left: 4px solid #4caf50;">✅ <strong>Pregunta 4 (25/25 pts):</strong> ¡Excelente aplicación práctica! El uso de mallas de sombra y la correcta ubicación en parcelas aseguran que cada especie cumpla su propósito vital.</div>');
  } else if (q4.length > 5) {
    score += 15;
    feedback.push('<div style="margin-bottom: 10px; padding: 10px; background: #fff8e1; border-radius: 6px; border-left: 4px solid #ffb300;">🟡 <strong>Pregunta 4 (15/25 pts):</strong> Mencionaste la protección. Destaca el uso de <strong>mallas de sombra</strong> y la ubicación en las parcelas correctas.</div>');
  } else {
    feedback.push('<div style="margin-bottom: 10px; padding: 10px; background: #ffebee; border-radius: 6px; border-left: 4px solid #e53935;">❌ <strong>Pregunta 4 (0/25 pts):</strong> La solución consiste en aprender a usar <strong>mallas de sombra</strong> y ubicar las plantas en sus parcelas correspondientes.</div>');
  }

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
    summaryHeader = '<div style="background: #2e7d32; color: white; padding: 12px 16px; border-radius: 6px; margin-bottom: 16px; font-weight: 700;">🌟 ¡Felicidades! Has alcanzado la máxima calificación en Comprensión Lectora y Pensamiento Crítico.</div>';
  } else if (score >= 60) {
    summaryHeader = '<div style="background: #f57c00; color: white; padding: 12px 16px; border-radius: 6px; margin-bottom: 16px; font-weight: 700;">👍 ¡Buen trabajo! Revisa las recomendaciones para enriquecer tus respuestas.</div>';
  } else {
    summaryHeader = '<div style="background: #d32f2f; color: white; padding: 12px 16px; border-radius: 6px; margin-bottom: 16px; font-weight: 700;">📖 Te sugerimos releer "El Consejo del Gran Árbol" y responder nuevamente.</div>';
  }

  content.innerHTML = summaryHeader + feedback.join('');
  card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/* ==========================================================================
   EVALUACIÓN AUTOMÁTICA DE COMPRENSIÓN LECTORA - SEXTO GRADO ÁREA 1
   ========================================================================== */
function evaluarComprensionLectoraSextoArea1() {
  const q1 = (document.getElementById('sexto-reading-q1')?.value || '').toLowerCase().trim();
  const q2 = (document.getElementById('sexto-reading-q2')?.value || '').toLowerCase().trim();
  const q3 = (document.getElementById('sexto-reading-q3')?.value || '').toLowerCase().trim();
  const q4 = (document.getElementById('sexto-reading-q4')?.value || '').toLowerCase().trim();

  const card = document.getElementById('sexto-eval-result-card');
  const badge = document.getElementById('sexto-eval-score-badge');
  const content = document.getElementById('sexto-eval-details-content');

  if (!card || !badge || !content) return;

  if (!q1 && !q2 && !q3 && !q4) {
    alert('Por favor, responde al menos una pregunta antes de enviar tu evaluación.');
    return;
  }

  let score = 0;
  let feedback = [];

  // Pregunta 1: Horas luz / exterior (Sol), Suelo esponjoso/drenaje/terreno (Lombriz)
  if ((q1.includes('sol') || q1.includes('luz')) && (q1.includes('lombriz') || q1.includes('suelo') || q1.includes('terreno') || q1.includes('drenaje') || q1.includes('roca'))) {
    score += 25;
    feedback.push('<div style="margin-bottom: 10px; padding: 10px; background: #f1f8e9; border-radius: 6px; border-left: 4px solid #4caf50;">✅ <strong>Pregunta 1 (25/25 pts):</strong> ¡Excelente! Identificaste los factores clave de planificación: las horas de luz recomendadas por el Sol y la necesidad de un suelo fértil con buen drenaje explicada por la Lombriz.</div>');
  } else if (q1.includes('sol') || q1.includes('lombriz') || q1.includes('luz') || q1.includes('suelo')) {
    score += 15;
    feedback.push('<div style="margin-bottom: 10px; padding: 10px; background: #fff8e1; border-radius: 6px; border-left: 4px solid #ffb300;">🟡 <strong>Pregunta 1 (15/25 pts):</strong> Mencionaste al Sol o a la Lombriz. Asegúrate de incluir tanto las horas luz como la calidad y drenaje del suelo.</div>');
  } else {
    feedback.push('<div style="margin-bottom: 10px; padding: 10px; background: #ffebee; border-radius: 6px; border-left: 4px solid #e53935;">❌ <strong>Pregunta 1 (0/25 pts):</strong> El Sol pedía horas luz en un jardín exterior, mientras que la Lombriz exigía suelo fértil con buen drenaje.</div>');
  }

  // Pregunta 2: Catarina / Control biológico / Manejo orgánico sin venenos
  if (q2.includes('catarina') || q2.includes('biológico') || q2.includes('biologico') || q2.includes('orgánico') || q2.includes('organico') || q2.includes('natural') || q2.includes('sin veneno') || q2.includes('comer')) {
    score += 25;
    feedback.push('<div style="margin-bottom: 10px; padding: 10px; background: #f1f8e9; border-radius: 6px; border-left: 4px solid #4caf50;">✅ <strong>Pregunta 2 (25/25 pts):</strong> ¡Muy bien! Comprendiste que la Catarina representa el control biológico y el manejo orgánico que protege el ecosistema sin usar químicos tóxicos.</div>');
  } else if (q2.length > 5) {
    score += 15;
    feedback.push('<div style="margin-bottom: 10px; padding: 10px; background: #fff8e1; border-radius: 6px; border-left: 4px solid #ffb300;">🟡 <strong>Pregunta 2 (15/25 pts):</strong> Buen intento. Recuerda mencionar que la Catarina realiza control biológico natural eliminando plagas sin químicos.</div>');
  } else {
    feedback.push('<div style="margin-bottom: 10px; padding: 10px; background: #ffebee; border-radius: 6px; border-left: 4px solid #e53935;">❌ <strong>Pregunta 2 (0/25 pts):</strong> La Catarina representa el manejo orgánico y el control biológico natural contra las plagas.</div>');
  }

  // Pregunta 3: Búho / Planificación integrada / Trabajo en equipo / Croquis
  if (q3.includes('búho') || q3.includes('buho') || q3.includes('equipo') || q3.includes('juntos') || q3.includes('integrado') || q3.includes('planific') || q3.includes('combinar') || q3.includes('diseño') || q3.includes('diseño')) {
    score += 25;
    feedback.push('<div style="margin-bottom: 10px; padding: 10px; background: #f1f8e9; border-radius: 6px; border-left: 4px solid #4caf50;">✅ <strong>Pregunta 3 (25/25 pts):</strong> ¡Gran análisis de pensamiento crítico! El Búho entendió que un diseño exitoso requiere integrar luz, suelo y defensa orgánica.</div>');
  } else if (q3.length > 5) {
    score += 15;
    feedback.push('<div style="margin-bottom: 10px; padding: 10px; background: #fff8e1; border-radius: 6px; border-left: 4px solid #ffb300;">🟡 <strong>Pregunta 3 (15/25 pts):</strong> Buen razonamiento. Destaca que la planificación requiere la colaboración de todos los elementos (luz, suelo, biodiversidad).</div>');
  } else {
    feedback.push('<div style="margin-bottom: 10px; padding: 10px; background: #ffebee; border-radius: 6px; border-left: 4px solid #e53935;">❌ <strong>Pregunta 3 (0/25 pts):</strong> El Búho Sabio enseñó que el diseño perfecto requiere unir la luz solar, el tipo de suelo y el control biológico.</div>');
  }

  // Pregunta 4: Croquis / Aplicación práctica en jardín escolar
  if (q4.includes('croquis') || q4.includes('planific') || q4.includes('luz') || q4.includes('suelo') || q4.includes('orgánico') || q4.includes('jardín') || q4.includes('jardin') || q4.includes('terreno')) {
    score += 25;
    feedback.push('<div style="margin-bottom: 10px; padding: 10px; background: #f1f8e9; border-radius: 6px; border-left: 4px solid #4caf50;">✅ <strong>Pregunta 4 (25/25 pts):</strong> ¡Excelente aplicación de ingeniería y planificación agrícola! Integrar el croquis, estudio de terreno y control de plagas garantiza un jardín sostenible.</div>');
  } else if (q4.length > 5) {
    score += 15;
    feedback.push('<div style="margin-bottom: 10px; padding: 10px; background: #fff8e1; border-radius: 6px; border-left: 4px solid #ffb300;">🟡 <strong>Pregunta 4 (15/25 pts):</strong> Mencionaste el jardín. Asegúrate de detallar cómo trazarías el croquis considerando horas luz, suelo y control orgánico.</div>');
  } else {
    feedback.push('<div style="margin-bottom: 10px; padding: 10px; background: #ffebee; border-radius: 6px; border-left: 4px solid #e53935;">❌ <strong>Pregunta 4 (0/25 pts):</strong> Para diseñar un jardín escolar debes medir el espacio, verificar horas luz, preparar el suelo y planear el control orgánico.</div>');
  }

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
    summaryHeader = '<div style="background: #2e7d32; color: white; padding: 12px 16px; border-radius: 6px; margin-bottom: 16px; font-weight: 700;">🌟 ¡Felicidades! Has alcanzado la máxima calificación en Comprensión Lectora y Pensamiento Crítico.</div>';
  } else if (score >= 60) {
    summaryHeader = '<div style="background: #f57c00; color: white; padding: 12px 16px; border-radius: 6px; margin-bottom: 16px; font-weight: 700;">👍 ¡Buen trabajo! Revisa las recomendaciones para enriquecer tus respuestas.</div>';
  } else {
    summaryHeader = '<div style="background: #d32f2f; color: white; padding: 12px 16px; border-radius: 6px; margin-bottom: 16px; font-weight: 700;">📖 Te sugerimos releer "El Concilio de la Semilla Dorada" y responder nuevamente.</div>';
  }

  content.innerHTML = summaryHeader + feedback.join('');
  card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

/* ==========================================================================
   UNIVERSAL WORD SEARCH ENGINE (Drag & Swipe + Tap-to-Select)
   ========================================================================== */
/* wordSearchEngine logic moved to wordSearchEngine.js */

// Deferred Word Search Initialization using IntersectionObserver
document.addEventListener('DOMContentLoaded', () => {
  initThemeAndSearchControls();

  const wordSearchInits = {
    'tercero-area1': initWordSearch,
    'tercero-area2': initWordSearch2,
    'tercero-area3': initWordSearch3,
    'tercero-area4': initWordSearch4,
    'cuarto-area1': initWordSearch41,
    'cuarto-area2': initWordSearch42,
    'cuarto-area3': initWordSearch43,
    'cuarto-area4': initWordSearch44,
    'quinto-area1': initWordSearch51,
    'quinto-area2': initWordSearch52,
    'quinto-area3': initWordSearch53,
    'quinto-area4': initWordSearch54,
    'sexto-area1': initWordSearch61,
    'sexto-area2': initWordSearch62,
    'sexto-area3': initWordSearch63,
    'sexto-area4': initWordSearch64
  };

  const initializedSections = new Set();
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id;
        if (!initializedSections.has(sectionId)) {
          initializedSections.add(sectionId);
          if (wordSearchInits[sectionId]) {
            wordSearchInits[sectionId]();
          }
        }
      }
    });
  }, { rootMargin: '200px' });

  document.querySelectorAll('.view-section').forEach(section => {
    observer.observe(section);
  });
});

/* ==========================================================================
   CONTROLES INTERACTIVOS DE BUSCADOR Y VOLVER ARRIBA
   ========================================================================== */
function initThemeAndSearchControls() {
  // Live Search Modal
  const searchOpenBtn = document.getElementById('searchOpenBtn');
  const searchModal = document.getElementById('searchModal');
  const searchCloseBtn = document.getElementById('searchCloseBtn');
  const searchInput = document.getElementById('searchInput');
  const searchResultsContainer = document.getElementById('searchResults');

  if (searchOpenBtn && searchModal && searchInput && searchResultsContainer) {
    searchOpenBtn.addEventListener('click', () => {
      searchModal.classList.add('active');
      searchModal.setAttribute('aria-hidden', 'false');
      setTimeout(() => searchInput.focus(), 150);
    });

    const closeSearch = () => {
      searchModal.classList.remove('active');
      searchModal.setAttribute('aria-hidden', 'true');
      searchInput.value = '';
      searchResultsContainer.innerHTML = '<div class="search-empty">Escribe al menos 2 caracteres para buscar en el programa de agricultura...</div>';
    };

    if (searchCloseBtn) searchCloseBtn.addEventListener('click', closeSearch);

    searchModal.addEventListener('click', (e) => {
      if (e.target === searchModal) closeSearch();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && searchModal.classList.contains('active')) {
        closeSearch();
      }
    });

    // Real-time Search Engine
    function escapeHTML(str) {
      if (!str) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    }

    searchInput.addEventListener('input', (e) => {
      const rawQuery = e.target.value.trim();
      const query = rawQuery.toLowerCase();
      if (query.length < 2) {
        searchResultsContainer.innerHTML = '<div class="search-empty">Escribe al menos 2 caracteres para buscar en el programa de agricultura...</div>';
        return;
      }

      const sections = document.querySelectorAll('.view-section');
      let matches = [];

      sections.forEach(section => {
        const secId = section.id;
        if (secId === 'inicio') return;

        const headings = section.querySelectorAll('h2, h3, h4');
        headings.forEach(h => {
          const text = h.textContent.trim();
          if (text.toLowerCase().includes(query)) {
            const parent = h.closest('.area-detail-card, .detail-section, .hero-card') || section;
            const paragraph = parent.querySelector('p');
            const snippet = paragraph ? paragraph.textContent.trim().substring(0, 110) + '...' : '';
            matches.push({
              title: text,
              target: secId,
              snippet: snippet
            });
          }
        });
      });

      if (matches.length === 0) {
        searchResultsContainer.innerHTML = `<div class="search-empty">No se encontraron resultados para "<strong>${escapeHTML(rawQuery)}</strong>". Prueba con palabras clave como <em>Lombriz, Edafología, Botánica, Suelos, Herramientas, Jardín</em>.</div>`;
      } else {
        searchResultsContainer.innerHTML = matches.slice(0, 10).map(m => `
          <div class="search-result-item" data-target="${escapeHTML(m.target)}">
            <i class="fa-solid fa-leaf search-icon"></i>
            <div>
              <strong class="search-title">${escapeHTML(m.title)}</strong>
              <p class="search-snippet">${escapeHTML(m.snippet)}</p>
            </div>
          </div>
        `).join('');

        searchResultsContainer.querySelectorAll('.search-result-item').forEach(item => {
          item.addEventListener('click', () => {
            const targetId = item.getAttribute('data-target');
            closeSearch();
            window.location.hash = targetId;
            const activeView = document.getElementById(targetId) || document.getElementById('inicio');
            if (activeView) {
              document.querySelectorAll('.view-section').forEach(v => v.classList.remove('active'));
              activeView.classList.add('active');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }
          });
        });
      }
    });
  }

  // Dedicated Scroll Controller for Back to Top Button
  const backToTopBtn = document.getElementById('backToTopBtn');

  function updateScrollControls() {
    const isScrolledDown = window.scrollY > 300;
    if (backToTopBtn) {
      if (isScrolledDown) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    }
  }

  let scrollTicking = false;
  const onScroll = () => {
    if (!scrollTicking) {
      window.requestAnimationFrame(() => {
        updateScrollControls();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  updateScrollControls();

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}



// ==========================================================================
// CONTROLADOR DEL MÓDULO INTERACTIVO DE MÉTODOS AGRÍCOLAS (QUINTO GRADO - ÁREA 3)
// ==========================================================================
window.toggleModuloMetodosQuinto = function() {
  const visor = document.getElementById('visorModuloMetodos');
  const chevron = document.getElementById('chevronBtnMetodos');
  const texto = document.getElementById('textoBtnMetodos');
  if (!visor) return;

  if (visor.style.display === 'none' || visor.style.display === '') {
    visor.style.display = 'block';
    if (texto) texto.textContent = 'Ocultar Guía y Bitácora';
    if (chevron) chevron.style.transform = 'rotate(180deg)';
    setTimeout(() => {
      visor.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 100);
  } else {
    visor.style.display = 'none';
    if (texto) texto.textContent = 'Ver Métodos y Bitácora';
    if (chevron) chevron.style.transform = 'rotate(0deg)';
  }
};

window.recargarIframeMetodos = function() {
  const iframe = document.getElementById('iframeMetodosQuinto');
  if (iframe) {
    iframe.src = iframe.src;
  }
};

window.toggleFullscreenMetodos = function() {
  const visor = document.getElementById('visorModuloMetodos');
  const icono = document.getElementById('iconoFullscreenMetodos');
  if (!document.fullscreenElement) {
    if (visor.requestFullscreen) {
      visor.requestFullscreen();
    } else if (visor.webkitRequestFullscreen) {
      visor.webkitRequestFullscreen();
    } else if (visor.msRequestFullscreen) {
      visor.msRequestFullscreen();
    }
    if (icono) {
      icono.classList.remove('fa-expand');
      icono.classList.add('fa-compress');
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    if (icono) {
      icono.classList.remove('fa-compress');
      icono.classList.add('fa-expand');
    }
  }
};

document.addEventListener('fullscreenchange', () => {
  const icono = document.getElementById('iconoFullscreenMetodos');
  if (!document.fullscreenElement && icono) {
    icono.classList.remove('fa-compress');
    icono.classList.add('fa-expand');
  }
});
