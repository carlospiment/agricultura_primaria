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

  function openMobileMenu() {
    if (navMenu) navMenu.classList.add('mobile-open');
    if (mobileOverlay) mobileOverlay.classList.add('active');
  }

  function closeMobileMenu() {
    if (navMenu) navMenu.classList.remove('mobile-open');
    if (mobileOverlay) mobileOverlay.classList.remove('active');
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

  // Mobile drawer toggles
  if (mobileToggle) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      if (navMenu.classList.contains('mobile-open')) {
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

/* ==========================================================================
   EVALUACIÓN INTERACTIVA TALLER CUARTO GRADO ÁREA 2: HERRAMIENTAS Y SEGURIDAD
   ========================================================================== */
function checkCuartoArea2Quiz(qNum, selectedOption, btnElem) {
  const correctAnswers = {
    1: 'B', // Machete
    2: 'A', // Picar tierra dura, desterronar y voltear el suelo fértil
    3: 'B', // Para abrir hoyos pequeños de siembra directa de semillas y granos
    4: 'B', // Al menos 2 metros de distancia
    5: 'A'  // Apuntando los filos hacia abajo, caminando a paso normal y nunca corriendo
  };

  const ansDiv = document.getElementById(`cuarto-area2-ans-${qNum}`);
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
    ansDiv.innerHTML = `<span style="color: #2e7d32;"><i class="fa-solid fa-circle-check"></i> ¡Correcto! Excelente conocimiento técnico y de prevención.</span>`;
  } else {
    btnElem.style.background = '#c62828';
    btnElem.style.color = 'white';
    btnElem.style.borderColor = '#c62828';
    ansDiv.innerHTML = `<span style="color: #c62828;"><i class="fa-solid fa-circle-xmark"></i> Incorrecto. Inténtalo de nuevo.</span>`;
  }
}

/* ==========================================================================
   SOPA DE LETRAS INTERACTIVA - CUARTO GRADO ÁREA 2 (HERRAMIENTAS Y SEGURIDAD)
   ========================================================================== */
const WS42_MATRIX = [
  ['M','A','C','H','E','T','E','X','Y','Z','A','B'],
  ['H','A','C','H','A','C','D','E','F','G','H','I'],
  ['A','Z','A','D','O','N','J','K','L','M','N','O'],
  ['P','I','Q','U','E','T','A','P','Q','R','S','T'],
  ['R','A','S','T','R','I','L','L','O','U','V','W'],
  ['A','Z','A','D','A','X','Y','Z','A','B','C','D'],
  ['P','A','L','A','E','F','G','H','I','J','K','L'],
  ['A','G','A','R','R','E','M','N','O','P','Q','R'],
  ['S','E','G','U','R','I','D','A','D','S','T','U'],
  ['E','S','P','E','Q','U','E','V','W','X','Y','Z'],
  ['A','B','C','D','E','F','G','H','I','J','K','L'],
  ['M','N','O','P','Q','R','S','T','U','V','W','X']
];

const WS42_TARGET_WORDS = {
  'MACHETE': [[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6]],
  'HACHA': [[1,0],[1,1],[1,2],[1,3],[1,4]],
  'AZADON': [[2,0],[2,1],[2,2],[2,3],[2,4],[2,5]],
  'PIQUETA': [[3,0],[3,1],[3,2],[3,3],[3,4],[3,5],[3,6]],
  'RASTRILLO': [[4,0],[4,1],[4,2],[4,3],[4,4],[4,5],[4,6],[4,7],[4,8]],
  'AZADA': [[5,0],[5,1],[5,2],[5,3],[5,4]],
  'PALA': [[6,0],[6,1],[6,2],[6,3]],
  'AGARRE': [[7,0],[7,1],[7,2],[7,3],[7,4],[7,5]],
  'SEGURIDAD': [[8,0],[8,1],[8,2],[8,3],[8,4],[8,5],[8,6],[8,7],[8,8]],
  'ESPEQUE': [[9,0],[9,1],[9,2],[9,3],[9,4],[9,5],[9,6]]
};

const WS42_WORD_COLORS = {
  'MACHETE': '#2e7d32',
  'HACHA': '#e65100',
  'AZADON': '#1565c0',
  'PIQUETA': '#6a1b9a',
  'RASTRILLO': '#4e342e',
  'AZADA': '#00838f',
  'PALA': '#d84315',
  'AGARRE': '#00695c',
  'SEGURIDAD': '#c62828',
  'ESPEQUE': '#ad1457'
};

let selectedCoords42 = [];
let foundWords42 = new Set();
let ws42TimerInterval = null;
let ws42Seconds = 0;
let ws42TimerRunning = false;

function resetWS42Timer() {
  if (ws42TimerInterval) clearInterval(ws42TimerInterval);
  ws42TimerInterval = null;
  ws42Seconds = 0;
  ws42TimerRunning = false;
  const timerElem = document.getElementById('ws42-timer');
  if (timerElem) timerElem.textContent = '00:00';
}

function startWS42Timer() {
  if (ws42TimerRunning) return;
  ws42TimerRunning = true;
  ws42Seconds = 0;
  ws42TimerInterval = setInterval(() => {
    ws42Seconds++;
    const mins = Math.floor(ws42Seconds / 60).toString().padStart(2, '0');
    const secs = (ws42Seconds % 60).toString().padStart(2, '0');
    const timerElem = document.getElementById('ws42-timer');
    if (timerElem) timerElem.textContent = `${mins}:${secs}`;
  }, 1000);
}

function stopWS42Timer() {
  if (ws42TimerInterval) {
    clearInterval(ws42TimerInterval);
    ws42TimerInterval = null;
  }
  ws42TimerRunning = false;
}

function initWordSearch42() {
  const gridContainer = document.getElementById('wordsearch42-grid');
  const counter = document.getElementById('ws42-counter');
  if (!gridContainer) return;

  gridContainer.innerHTML = '';
  selectedCoords42 = [];
  foundWords42.clear();
  resetWS42Timer();

  if (counter) counter.textContent = `0 / 10`;

  document.querySelectorAll('#ws42-word-list div').forEach(item => {
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
      cell.classList.add('ws42-cell');
      cell.setAttribute('data-r', r);
      cell.setAttribute('data-c', c);
      cell.textContent = WS42_MATRIX[r][c];

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

      cell.addEventListener('click', () => handleCellClick42(r, c, cell));
      gridContainer.appendChild(cell);
    }
  }
}

function handleCellClick42(r, c, cellElem) {
  startWS42Timer();

  const index = selectedCoords42.findIndex(item => item.r === r && item.c === c);
  if (index >= 0) {
    selectedCoords42.splice(index, 1);
    cellElem.style.background = '#ffffff';
    cellElem.style.color = '#000000';
  } else {
    selectedCoords42.push({ r, c, char: WS42_MATRIX[r][c] });
    cellElem.style.background = 'var(--gold)';
    cellElem.style.color = 'var(--primary-dark)';
  }

  checkSelectedWord42();
}

function checkSelectedWord42() {
  const currentChars = selectedCoords42.map(item => item.char).join('');
  const currentCharsRev = selectedCoords42.map(item => item.char).reverse().join('');

  for (const [word, coords] of Object.entries(WS42_TARGET_WORDS)) {
    if (foundWords42.has(word)) continue;

    if (currentChars === word || currentCharsRev === word) {
      foundWords42.add(word);
      lockFoundWord42(word, coords);
      selectedCoords42 = [];
      break;
    }
  }
}

function lockFoundWord42(word, coords) {
  const wordColor = WS42_WORD_COLORS[word] || 'var(--primary)';

  coords.forEach(([r, c]) => {
    const cell = document.querySelector(`.ws42-cell[data-r="${r}"][data-c="${c}"]`);
    if (cell) {
      cell.style.background = wordColor;
      cell.style.color = '#ffffff';
      cell.style.boxShadow = `0 0 6px ${wordColor}88`;
    }
  });

  const wordItem = document.querySelector(`#ws42-word-list div[data-word="${word}"]`);
  if (wordItem) {
    const origText = wordItem.getAttribute('data-orig-text') || wordItem.textContent;
    wordItem.innerHTML = `<span style="color: ${wordColor}; font-weight: 900; margin-right: 4px;">✓</span> ${origText}`;
    wordItem.style.color = wordColor;
    wordItem.style.fontWeight = '700';
  }

  const counter = document.getElementById('ws42-counter');
  if (counter) {
    counter.textContent = `${foundWords42.size} / 10`;
  }

  if (foundWords42.size === 10) {
    stopWS42Timer();
    const mins = Math.floor(ws42Seconds / 60).toString().padStart(2, '0');
    const secs = (ws42Seconds % 60).toString().padStart(2, '0');
    setTimeout(() => {
      alert(`🎉 ¡EXCELENTE! Has encontrado las 10 palabras de Herramientas Manuales y Seguridad (Cuarto Grado) en ${mins}:${secs}. ¡Eres un Operador Técnico Agrícola Seguro!`);
    }, 200);
  }
}

// Auto init WS42 on load
document.addEventListener('DOMContentLoaded', () => {
  initWordSearch42();
});

/* ==========================================================================
   EVALUACIÓN INTERACTIVA TALLER CUARTO GRADO ÁREA 3: BENEFICIOS Y MÉTODOS
   ========================================================================== */
function checkCuartoArea3Quiz(qNum, selectedOption, btnElem) {
  const correctAnswers = {
    1: 'B', // Reducir los costos en la compra de hortalizas para el comedor escolar
    2: 'A', // Porque integra a docentes, alumnos y padres en jornadas colaborativas de siembra
    3: 'A', // En perforar pequeños hoyos manuales en el suelo sin removerlo para depositar semillas
    4: 'B', // Minerales como el potasio que enriquecen la primera cosecha
    5: 'A'  // Porque representan el saber cultural ancestral de nuestras comunidades campesinas e indigenas
  };

  const ansDiv = document.getElementById(`cuarto-area3-ans-${qNum}`);
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
    ansDiv.innerHTML = `<span style="color: #2e7d32;"><i class="fa-solid fa-circle-check"></i> ¡Correcto! Excelente comprensión de los beneficios y tradiciones.</span>`;
  } else {
    btnElem.style.background = '#c62828';
    btnElem.style.color = 'white';
    btnElem.style.borderColor = '#c62828';
    ansDiv.innerHTML = `<span style="color: #c62828;"><i class="fa-solid fa-circle-xmark"></i> Incorrecto. Inténtalo de nuevo.</span>`;
  }
}

/* ==========================================================================
   SOPA DE LETRAS INTERACTIVA - CUARTO GRADO ÁREA 3 (BENEFICIOS Y MÉTODOS)
   ========================================================================== */
const WS43_MATRIX = [
  ['B','E','N','E','F','I','C','I','O','X','Y','Z'],
  ['E','C','O','N','O','M','I','C','O','A','B','C'],
  ['N','U','T','R','I','T','I','V','O','D','E','F'],
  ['C','O','M','U','N','I','D','A','D','G','H','I'],
  ['T','R','A','D','I','C','I','O','N','A','L','J'],
  ['C','H','U','Z','O','K','L','M','N','O','P','Q'],
  ['C','O','R','T','A','R','S','T','U','V','W','X'],
  ['Q','U','E','M','A','Y','Z','A','B','C','D','E'],
  ['B','A','R','B','E','C','H','O','F','G','H','I'],
  ['C','O','S','E','C','H','A','J','K','L','M','N'],
  ['A','B','C','D','E','F','G','H','I','J','K','L'],
  ['M','N','O','P','Q','R','S','T','U','V','W','X']
];

const WS43_TARGET_WORDS = {
  'BENEFICIO': [[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8]],
  'ECONOMICO': [[1,0],[1,1],[1,2],[1,3],[1,4],[1,5],[1,6],[1,7],[1,8]],
  'NUTRITIVO': [[2,0],[2,1],[2,2],[2,3],[2,4],[2,5],[2,6],[2,7],[2,8]],
  'COMUNIDAD': [[3,0],[3,1],[3,2],[3,3],[3,4],[3,5],[3,6],[3,7],[3,8]],
  'TRADICIONAL': [[4,0],[4,1],[4,2],[4,3],[4,4],[4,5],[4,6],[4,7],[4,8],[4,9],[4,10]],
  'CHUZO': [[5,0],[5,1],[5,2],[5,3],[5,4]],
  'CORTA': [[6,0],[6,1],[6,2],[6,3],[6,4]],
  'QUEMA': [[7,0],[7,1],[7,2],[7,3],[7,4]],
  'BARBECHO': [[8,0],[8,1],[8,2],[8,3],[8,4],[8,5],[8,6],[8,7]],
  'COSECHA': [[9,0],[9,1],[9,2],[9,3],[9,4],[9,5],[9,6]]
};

const WS43_WORD_COLORS = {
  'BENEFICIO': '#2e7d32',
  'ECONOMICO': '#1565c0',
  'NUTRITIVO': '#e65100',
  'COMUNIDAD': '#6a1b9a',
  'TRADICIONAL': '#4e342e',
  'CHUZO': '#00838f',
  'CORTA': '#d84315',
  'QUEMA': '#c62828',
  'BARBECHO': '#00695c',
  'COSECHA': '#ad1457'
};

let selectedCoords43 = [];
let foundWords43 = new Set();
let ws43TimerInterval = null;
let ws43Seconds = 0;
let ws43TimerRunning = false;

function resetWS43Timer() {
  if (ws43TimerInterval) clearInterval(ws43TimerInterval);
  ws43TimerInterval = null;
  ws43Seconds = 0;
  ws43TimerRunning = false;
  const timerElem = document.getElementById('ws43-timer');
  if (timerElem) timerElem.textContent = '00:00';
}

function startWS43Timer() {
  if (ws43TimerRunning) return;
  ws43TimerRunning = true;
  ws43Seconds = 0;
  ws43TimerInterval = setInterval(() => {
    ws43Seconds++;
    const mins = Math.floor(ws43Seconds / 60).toString().padStart(2, '0');
    const secs = (ws43Seconds % 60).toString().padStart(2, '0');
    const timerElem = document.getElementById('ws43-timer');
    if (timerElem) timerElem.textContent = `${mins}:${secs}`;
  }, 1000);
}

function stopWS43Timer() {
  if (ws43TimerInterval) {
    clearInterval(ws43TimerInterval);
    ws43TimerInterval = null;
  }
  ws43TimerRunning = false;
}

function initWordSearch43() {
  const gridContainer = document.getElementById('wordsearch43-grid');
  const counter = document.getElementById('ws43-counter');
  if (!gridContainer) return;

  gridContainer.innerHTML = '';
  selectedCoords43 = [];
  foundWords43.clear();
  resetWS43Timer();

  if (counter) counter.textContent = `0 / 10`;

  document.querySelectorAll('#ws43-word-list div').forEach(item => {
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
      cell.classList.add('ws43-cell');
      cell.setAttribute('data-r', r);
      cell.setAttribute('data-c', c);
      cell.textContent = WS43_MATRIX[r][c];

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

      cell.addEventListener('click', () => handleCellClick43(r, c, cell));
      gridContainer.appendChild(cell);
    }
  }
}

function handleCellClick43(r, c, cellElem) {
  startWS43Timer();

  const index = selectedCoords43.findIndex(item => item.r === r && item.c === c);
  if (index >= 0) {
    selectedCoords43.splice(index, 1);
    cellElem.style.background = '#ffffff';
    cellElem.style.color = '#000000';
  } else {
    selectedCoords43.push({ r, c, char: WS43_MATRIX[r][c] });
    cellElem.style.background = 'var(--gold)';
    cellElem.style.color = 'var(--primary-dark)';
  }

  checkSelectedWord43();
}

function checkSelectedWord43() {
  const currentChars = selectedCoords43.map(item => item.char).join('');
  const currentCharsRev = selectedCoords43.map(item => item.char).reverse().join('');

  for (const [word, coords] of Object.entries(WS43_TARGET_WORDS)) {
    if (foundWords43.has(word)) continue;

    if (currentChars === word || currentCharsRev === word) {
      foundWords43.add(word);
      lockFoundWord43(word, coords);
      selectedCoords43 = [];
      break;
    }
  }
}

function lockFoundWord43(word, coords) {
  const wordColor = WS43_WORD_COLORS[word] || 'var(--primary)';

  coords.forEach(([r, c]) => {
    const cell = document.querySelector(`.ws43-cell[data-r="${r}"][data-c="${c}"]`);
    if (cell) {
      cell.style.background = wordColor;
      cell.style.color = '#ffffff';
      cell.style.boxShadow = `0 0 6px ${wordColor}88`;
    }
  });

  const wordItem = document.querySelector(`#ws43-word-list div[data-word="${word}"]`);
  if (wordItem) {
    const origText = wordItem.getAttribute('data-orig-text') || wordItem.textContent;
    wordItem.innerHTML = `<span style="color: ${wordColor}; font-weight: 900; margin-right: 4px;">✓</span> ${origText}`;
    wordItem.style.color = wordColor;
    wordItem.style.fontWeight = '700';
  }

  const counter = document.getElementById('ws43-counter');
  if (counter) {
    counter.textContent = `${foundWords43.size} / 10`;
  }

  if (foundWords43.size === 10) {
    stopWS43Timer();
    const mins = Math.floor(ws43Seconds / 60).toString().padStart(2, '0');
    const secs = (ws43Seconds % 60).toString().padStart(2, '0');
    setTimeout(() => {
      alert(`🎉 ¡FELICITACIONES! Has completado la Sopa de Letras de Beneficios y Tradiciones (Cuarto Grado) en ${mins}:${secs}. ¡Eres un Promotor de la Soberanía Alimentaria!`);
    }, 200);
  }
}

// Auto init WS43 on load
document.addEventListener('DOMContentLoaded', () => {
  initWordSearch43();
});

/* ==========================================================================
   EVALUACIÓN INTERACTIVA TALLER CUARTO GRADO ÁREA 4: AMBIENTE Y SOSTENIBILIDAD
   ========================================================================== */
function checkCuartoArea4Quiz(qNum, selectedOption, btnElem) {
  const correctAnswers = {
    1: 'B', // Restos de frutas, cascaras y hojas secas
    2: 'A', // Materia inorganica recicable
    3: 'B', // Horizonte A
    4: 'B', // Roca Madre
    5: 'A'  // Para comprender su composicion, funcion y promover su conservacion responsable
  };

  const ansDiv = document.getElementById(`cuarto-area4-ans-${qNum}`);
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
    ansDiv.innerHTML = `<span style="color: #2e7d32;"><i class="fa-solid fa-circle-check"></i> ¡Correcto! Excelente conocimiento sobre residuos y horizontes del suelo.</span>`;
  } else {
    btnElem.style.background = '#c62828';
    btnElem.style.color = 'white';
    btnElem.style.borderColor = '#c62828';
    ansDiv.innerHTML = `<span style="color: #c62828;"><i class="fa-solid fa-circle-xmark"></i> Incorrecto. Inténtalo de nuevo.</span>`;
  }
}

/* ==========================================================================
   SOPA DE LETRAS INTERACTIVA - CUARTO GRADO ÁREA 4 (RESIDUOS Y HORIZONTES)
   ========================================================================== */
const WS44_MATRIX = [
  ['O','R','G','A','N','I','C','A','X','Y','Z','A'],
  ['I','N','O','R','G','A','N','I','C','A','B','C'],
  ['R','E','S','I','D','U','O','D','E','F','G','H'],
  ['P','E','R','F','I','L','I','J','K','L','M','N'],
  ['H','O','R','I','Z','O','N','T','E','O','P','Q'],
  ['H','U','M','U','S','R','S','T','U','V','W','X'],
  ['S','U','B','S','U','E','L','O','Y','Z','A','B'],
  ['R','O','C','A','M','A','D','R','E','C','D','E'],
  ['R','E','C','I','C','L','A','J','E','F','G','H'],
  ['A','M','B','I','E','N','T','E','I','J','K','L'],
  ['A','B','C','D','E','F','G','H','I','J','K','L'],
  ['M','N','O','P','Q','R','S','T','U','V','W','X']
];

const WS44_TARGET_WORDS = {
  'ORGANICA': [[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7]],
  'INORGANICA': [[1,0],[1,1],[1,2],[1,3],[1,4],[1,5],[1,6],[1,7],[1,8],[1,9]],
  'RESIDUO': [[2,0],[2,1],[2,2],[2,3],[2,4],[2,5],[2,6]],
  'PERFIL': [[3,0],[3,1],[3,2],[3,3],[3,4],[3,5]],
  'HORIZONTE': [[4,0],[4,1],[4,2],[4,3],[4,4],[4,5],[4,6],[4,7],[4,8]],
  'HUMUS': [[5,0],[5,1],[5,2],[5,3],[5,4]],
  'SUBSUELO': [[6,0],[6,1],[6,2],[6,3],[6,4],[6,5],[6,6],[6,7]],
  'ROCAMADRE': [[7,0],[7,1],[7,2],[7,3],[7,4],[7,5],[7,6],[7,7],[7,8]],
  'RECICLAJE': [[8,0],[8,1],[8,2],[8,3],[8,4],[8,5],[8,6],[8,7],[8,8]],
  'AMBIENTE': [[9,0],[9,1],[9,2],[9,3],[9,4],[9,5],[9,6],[9,7]]
};

const WS44_WORD_COLORS = {
  'ORGANICA': '#2e7d32',
  'INORGANICA': '#1565c0',
  'RESIDUO': '#e65100',
  'PERFIL': '#4e342e',
  'HORIZONTE': '#00838f',
  'HUMUS': '#6a1b9a',
  'SUBSUELO': '#d84315',
  'ROCAMADRE': '#c62828',
  'RECICLAJE': '#00695c',
  'AMBIENTE': '#ad1457'
};

let selectedCoords44 = [];
let foundWords44 = new Set();
let ws44TimerInterval = null;
let ws44Seconds = 0;
let ws44TimerRunning = false;

function resetWS44Timer() {
  if (ws44TimerInterval) clearInterval(ws44TimerInterval);
  ws44TimerInterval = null;
  ws44Seconds = 0;
  ws44TimerRunning = false;
  const timerElem = document.getElementById('ws44-timer');
  if (timerElem) timerElem.textContent = '00:00';
}

function startWS44Timer() {
  if (ws44TimerRunning) return;
  ws44TimerRunning = true;
  ws44Seconds = 0;
  ws44TimerInterval = setInterval(() => {
    ws44Seconds++;
    const mins = Math.floor(ws44Seconds / 60).toString().padStart(2, '0');
    const secs = (ws44Seconds % 60).toString().padStart(2, '0');
    const timerElem = document.getElementById('ws44-timer');
    if (timerElem) timerElem.textContent = `${mins}:${secs}`;
  }, 1000);
}

function stopWS44Timer() {
  if (ws44TimerInterval) {
    clearInterval(ws44TimerInterval);
    ws44TimerInterval = null;
  }
  ws44TimerRunning = false;
}

function initWordSearch44() {
  const gridContainer = document.getElementById('wordsearch44-grid');
  const counter = document.getElementById('ws44-counter');
  if (!gridContainer) return;

  gridContainer.innerHTML = '';
  selectedCoords44 = [];
  foundWords44.clear();
  resetWS44Timer();

  if (counter) counter.textContent = `0 / 10`;

  document.querySelectorAll('#ws44-word-list div').forEach(item => {
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
      cell.classList.add('ws44-cell');
      cell.setAttribute('data-r', r);
      cell.setAttribute('data-c', c);
      cell.textContent = WS44_MATRIX[r][c];

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

      cell.addEventListener('click', () => handleCellClick44(r, c, cell));
      gridContainer.appendChild(cell);
    }
  }
}

function handleCellClick44(r, c, cellElem) {
  startWS44Timer();

  const index = selectedCoords44.findIndex(item => item.r === r && item.c === c);
  if (index >= 0) {
    selectedCoords44.splice(index, 1);
    cellElem.style.background = '#ffffff';
    cellElem.style.color = '#000000';
  } else {
    selectedCoords44.push({ r, c, char: WS44_MATRIX[r][c] });
    cellElem.style.background = 'var(--gold)';
    cellElem.style.color = 'var(--primary-dark)';
  }

  checkSelectedWord44();
}

function checkSelectedWord44() {
  const currentChars = selectedCoords44.map(item => item.char).join('');
  const currentCharsRev = selectedCoords44.map(item => item.char).reverse().join('');

  for (const [word, coords] of Object.entries(WS44_TARGET_WORDS)) {
    if (foundWords44.has(word)) continue;

    if (currentChars === word || currentCharsRev === word) {
      foundWords44.add(word);
      lockFoundWord44(word, coords);
      selectedCoords44 = [];
      break;
    }
  }
}

function lockFoundWord44(word, coords) {
  const wordColor = WS44_WORD_COLORS[word] || 'var(--primary)';

  coords.forEach(([r, c]) => {
    const cell = document.querySelector(`.ws44-cell[data-r="${r}"][data-c="${c}"]`);
    if (cell) {
      cell.style.background = wordColor;
      cell.style.color = '#ffffff';
      cell.style.boxShadow = `0 0 6px ${wordColor}88`;
    }
  });

  const wordItem = document.querySelector(`#ws44-word-list div[data-word="${word}"]`);
  if (wordItem) {
    const origText = wordItem.getAttribute('data-orig-text') || wordItem.textContent;
    wordItem.innerHTML = `<span style="color: ${wordColor}; font-weight: 900; margin-right: 4px;">✓</span> ${origText}`;
    wordItem.style.color = wordColor;
    wordItem.style.fontWeight = '700';
  }

  const counter = document.getElementById('ws44-counter');
  if (counter) {
    counter.textContent = `${foundWords44.size} / 10`;
  }

  if (foundWords44.size === 10) {
    stopWS44Timer();
    const mins = Math.floor(ws44Seconds / 60).toString().padStart(2, '0');
    const secs = (ws44Seconds % 60).toString().padStart(2, '0');
    setTimeout(() => {
      alert(`🎉 ¡VICTORIA ECOLÓGICA! Has completado la Sopa de Letras de Residuos y Horizontes del Suelo (Cuarto Grado) en ${mins}:${secs}. ¡Eres un Verdadero Guardián Agroecológico!`);
    }, 200);
  }
}

// Auto init WS44 on load
document.addEventListener('DOMContentLoaded', () => {
  initWordSearch44();
});

/* ==========================================================================
   EVALUACIÓN INTERACTIVA TALLER QUINTO GRADO ÁREA 1: JARDÍN Y ESPECIES VEGETALES
   ========================================================================== */
function checkQuintoArea1Quiz(qNum, selectedOption, btnElem) {
  const correctAnswers = {
    1: 'B', // Cultivar plantas aromaticas y fitoterapeuticas como albahaca, menta y sabila para la salud
    2: 'A', // Luz directa (sol pleno mas de 6 horas diarias)
    3: 'B', // Helechos, calateas, begonias y monsteras
    4: 'B', // Temprano en la mañana o al atardecer fresco
    5: 'A', // Para eliminar partes enfermas o secas y prevenir la propagacion de hongos o plagas
    6: 'A', // Filtrar la luz solar intensa y proteger los plantones mas sensibles
    7: 'B', // Deshierbe manual o limpieza periodica alrededor del tallo principal
    8: 'B'  // Utilizando preparados naturales a base de extractos vegetales como purin de ajo, chile o agua jabonosa neutra
  };

  const ansDiv = document.getElementById(`quinto-area1-ans-${qNum}`);
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
    ansDiv.innerHTML = `<span style="color: #2e7d32;"><i class="fa-solid fa-circle-check"></i> ¡Correcto! Excelente dominio de la jardinería y especies vegetales.</span>`;
  } else {
    btnElem.style.background = '#c62828';
    btnElem.style.color = 'white';
    btnElem.style.borderColor = '#c62828';
    ansDiv.innerHTML = `<span style="color: #c62828;"><i class="fa-solid fa-circle-xmark"></i> Incorrecto. Inténtalo de nuevo.</span>`;
  }
}

/* ==========================================================================
   EVALUACIÓN INTERACTIVA TALLER QUINTO GRADO ÁREA 2: TECNOLOGÍA PRÁCTICA Y FUNCIONAL
   ========================================================================== */
function checkQuintoArea2Quiz(qNum, selectedOption, btnElem) {
  const correctAnswers = {
    1: 'A', // Transportar tierra, abono compostado, cosecha y herramientas pesadas con menor esfuerzo
    2: 'A', // Para evitar transmitir enfermedades, hongos y bacterias entre plantas sanas y enfermas
    3: 'A', // En un angulo aproximado de 45° realizando pasadas firmes en un solo sentido hacia adelante
    4: 'B', // Botas de caucho o hule con suela antideslizante
    5: 'A', // Doblar las rodillas y mantener la espalda recta, haciendo la fuerza con las piernas
    6: 'A', // Al menos 2 metros de distancia libre alrededor de cada compañero
    7: 'A', // Para proteger el metal del oxigeno y la humedad, evitando la formacion de oxido y herrumbre
    8: 'A'  // Clasificadas y colgadas verticalmente en soportes de pared con filos orientados hacia abajo
  };

  const ansDiv = document.getElementById(`quinto-area2-ans-${qNum}`);
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
    ansDiv.innerHTML = `<span style="color: #2e7d32;"><i class="fa-solid fa-circle-check"></i> ¡Correcto! Excelente dominio de las herramientas, equipos, mantenimiento y normas de seguridad agrícola.</span>`;
  } else {
    btnElem.style.background = '#c62828';
    btnElem.style.color = 'white';
    btnElem.style.borderColor = '#c62828';
    ansDiv.innerHTML = `<span style="color: #c62828;"><i class="fa-solid fa-circle-xmark"></i> Incorrecto. Revisa el contenido del tema e inténtalo nuevamente.</span>`;
  }
}

/* ==========================================================================
   SOPA DE LETRAS INTERACTIVA - QUINTO GRADO ÁREA 1 (JARDINES Y CUIDADOS)
   ========================================================================== */
const WS51_MATRIX = [
  ['B','O','T','A','N','I','C','O','X','Y','Z','A'],
  ['M','E','D','I','C','I','N','A','L','B','C','D'],
  ['A','L','I','M','E','N','T','I','C','I','O','E'],
  ['S','O','M','B','R','A','F','G','H','I','J','K'],
  ['S','E','M','I','S','O','M','B','R','A','L','M'],
  ['D','I','R','E','C','T','A','N','O','P','Q','R'],
  ['R','I','E','G','O','S','T','U','V','W','X','Y'],
  ['P','O','D','A','Z','A','B','C','D','E','F','G'],
  ['P','L','A','G','A','S','H','I','J','K','L','M'],
  ['M','A','L','E','Z','A','S','N','O','P','Q','R'],
  ['A','B','C','D','E','F','G','H','I','J','K','L'],
  ['M','N','O','P','Q','R','S','T','U','V','W','X']
];

const WS51_TARGET_WORDS = {
  'BOTANICO': [[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7]],
  'MEDICINAL': [[1,0],[1,1],[1,2],[1,3],[1,4],[1,5],[1,6],[1,7],[1,8]],
  'ALIMENTICIO': [[2,0],[2,1],[2,2],[2,3],[2,4],[2,5],[2,6],[2,7],[2,8],[2,9],[2,10]],
  'SOMBRA': [[3,0],[3,1],[3,2],[3,3],[3,4],[3,5]],
  'SEMISOMBRA': [[4,0],[4,1],[4,2],[4,3],[4,4],[4,5],[4,6],[4,7],[4,8],[4,9]],
  'DIRECTA': [[5,0],[5,1],[5,2],[5,3],[5,4],[5,5],[5,6]],
  'RIEGO': [[6,0],[6,1],[6,2],[6,3],[6,4]],
  'PODA': [[7,0],[7,1],[7,2],[7,3]],
  'PLAGAS': [[8,0],[8,1],[8,2],[8,3],[8,4],[8,5]],
  'MALEZAS': [[9,0],[9,1],[9,2],[9,3],[9,4],[9,5],[9,6]]
};

const WS51_WORD_COLORS = {
  'BOTANICO': '#2e7d32',
  'MEDICINAL': '#1565c0',
  'ALIMENTICIO': '#e65100',
  'SOMBRA': '#4e342e',
  'SEMISOMBRA': '#00838f',
  'DIRECTA': '#6a1b9a',
  'RIEGO': '#d84315',
  'PODA': '#c62828',
  'PLAGAS': '#00695c',
  'MALEZAS': '#ad1457'
};

let selectedCoords51 = [];
let foundWords51 = new Set();
let ws51TimerInterval = null;
let ws51Seconds = 0;
let ws51TimerRunning = false;

function resetWS51Timer() {
  if (ws51TimerInterval) clearInterval(ws51TimerInterval);
  ws51TimerInterval = null;
  ws51Seconds = 0;
  ws51TimerRunning = false;
  const timerElem = document.getElementById('ws51-timer');
  if (timerElem) timerElem.textContent = '00:00';
}

function startWS51Timer() {
  if (ws51TimerRunning) return;
  ws51TimerRunning = true;
  ws51Seconds = 0;
  ws51TimerInterval = setInterval(() => {
    ws51Seconds++;
    const mins = Math.floor(ws51Seconds / 60).toString().padStart(2, '0');
    const secs = (ws51Seconds % 60).toString().padStart(2, '0');
    const timerElem = document.getElementById('ws51-timer');
    if (timerElem) timerElem.textContent = `${mins}:${secs}`;
  }, 1000);
}

function stopWS51Timer() {
  if (ws51TimerInterval) {
    clearInterval(ws51TimerInterval);
    ws51TimerInterval = null;
  }
  ws51TimerRunning = false;
}

function initWordSearch51() {
  const gridContainer = document.getElementById('wordsearch51-grid');
  const counter = document.getElementById('ws51-counter');
  if (!gridContainer) return;

  gridContainer.innerHTML = '';
  selectedCoords51 = [];
  foundWords51.clear();
  resetWS51Timer();

  if (counter) counter.textContent = `0 / 10`;

  document.querySelectorAll('#ws51-word-list div').forEach(item => {
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
      cell.classList.add('ws51-cell');
      cell.setAttribute('data-r', r);
      cell.setAttribute('data-c', c);
      cell.textContent = WS51_MATRIX[r][c];

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

      cell.addEventListener('click', () => handleCellClick51(r, c, cell));
      gridContainer.appendChild(cell);
    }
  }
}

function handleCellClick51(r, c, cellElem) {
  startWS51Timer();

  const index = selectedCoords51.findIndex(item => item.r === r && item.c === c);
  if (index >= 0) {
    selectedCoords51.splice(index, 1);
    cellElem.style.background = '#ffffff';
    cellElem.style.color = '#000000';
  } else {
    selectedCoords51.push({ r, c, char: WS51_MATRIX[r][c] });
    cellElem.style.background = 'var(--gold)';
    cellElem.style.color = 'var(--primary-dark)';
  }

  checkSelectedWord51();
}

function checkSelectedWord51() {
  const currentChars = selectedCoords51.map(item => item.char).join('');
  const currentCharsRev = selectedCoords51.map(item => item.char).reverse().join('');

  for (const [word, coords] of Object.entries(WS51_TARGET_WORDS)) {
    if (foundWords51.has(word)) continue;

    if (currentChars === word || currentCharsRev === word) {
      foundWords51.add(word);
      lockFoundWord51(word, coords);
      selectedCoords51 = [];
      break;
    }
  }
}

function lockFoundWord51(word, coords) {
  const wordColor = WS51_WORD_COLORS[word] || 'var(--primary)';

  coords.forEach(([r, c]) => {
    const cell = document.querySelector(`.ws51-cell[data-r="${r}"][data-c="${c}"]`);
    if (cell) {
      cell.style.background = wordColor;
      cell.style.color = '#ffffff';
      cell.style.boxShadow = `0 0 6px ${wordColor}88`;
    }
  });

  const wordItem = document.querySelector(`#ws51-word-list div[data-word="${word}"]`);
  if (wordItem) {
    const origText = wordItem.getAttribute('data-orig-text') || wordItem.textContent;
    wordItem.innerHTML = `<span style="color: ${wordColor}; font-weight: 900; margin-right: 4px;">✓</span> ${origText}`;
    wordItem.style.color = wordColor;
    wordItem.style.fontWeight = '700';
  }

  const counter = document.getElementById('ws51-counter');
  if (counter) {
    counter.textContent = `${foundWords51.size} / 10`;
  }

  if (foundWords51.size === 10) {
    stopWS51Timer();
    const mins = Math.floor(ws51Seconds / 60).toString().padStart(2, '0');
    const secs = (ws51Seconds % 60).toString().padStart(2, '0');
    setTimeout(() => {
      alert(`🎉 ¡EXCELENTE TRABAJO! Has completado la Sopa de Letras de Jardines y Cuidados Vegetales (Quinto Grado) en ${mins}:${secs}. ¡Felicidades!`);
    }, 200);
  }
}

// Auto init WS51, WS52, WS53, WS54, WS61, WS62, WS63 and WS64 on load
document.addEventListener('DOMContentLoaded', () => {
  initWordSearch51();
  initWordSearch52();
  initWordSearch53();
  initWordSearch54();
  initWordSearch61();
  initWordSearch62();
  initWordSearch63();
  initWordSearch64();
});

/* ==========================================================================
   SOPA DE LETRAS INTERACTIVA - QUINTO GRADO ÁREA 2 (HERRAMIENTAS, MANTENIMIENTO Y SEGURIDAD)
   ========================================================================== */
const WS52_MATRIX = [
  ['A','Z','A','D','O','N','X','Y','Z','A','B','C'],
  ['C','A','R','R','E','T','I','L','L','A','D','E'],
  ['A','S','P','E','R','S','O','R','A','F','G','H'],
  ['D','E','S','I','N','F','E','C','C','I','O','N'],
  ['A','F','I','L','A','D','O','I','J','K','L','M'],
  ['L','U','B','R','I','C','A','C','I','O','N','N'],
  ['E','R','G','O','N','O','M','I','A','O','P','Q'],
  ['G','A','L','P','O','N','R','S','T','U','V','W'],
  ['I','N','V','E','N','T','A','R','I','O','X','Y'],
  ['S','E','G','U','R','I','D','A','D','Z','A','B'],
  ['C','D','E','F','G','H','I','J','K','L','M','N'],
  ['O','P','Q','R','S','T','U','V','W','X','Y','Z']
];

const WS52_TARGET_WORDS = {
  'AZADON': [[0,0],[0,1],[0,2],[0,3],[0,4],[0,5]],
  'CARRETILLA': [[1,0],[1,1],[1,2],[1,3],[1,4],[1,5],[1,6],[1,7],[1,8],[1,9]],
  'ASPERSORA': [[2,0],[2,1],[2,2],[2,3],[2,4],[2,5],[2,6],[2,7],[2,8]],
  'DESINFECCION': [[3,0],[3,1],[3,2],[3,3],[3,4],[3,5],[3,6],[3,7],[3,8],[3,9],[3,10],[3,11]],
  'AFILADO': [[4,0],[4,1],[4,2],[4,3],[4,4],[4,5],[4,6]],
  'LUBRICACION': [[5,0],[5,1],[5,2],[5,3],[5,4],[5,5],[5,6],[5,7],[5,8],[5,9],[5,10]],
  'ERGONOMIA': [[6,0],[6,1],[6,2],[6,3],[6,4],[6,5],[6,6],[6,7],[6,8]],
  'GALPON': [[7,0],[7,1],[7,2],[7,3],[7,4],[7,5]],
  'INVENTARIO': [[8,0],[8,1],[8,2],[8,3],[8,4],[8,5],[8,6],[8,7],[8,8],[8,9]],
  'SEGURIDAD': [[9,0],[9,1],[9,2],[9,3],[9,4],[9,5],[9,6],[9,7],[9,8]]
};

const WS52_WORD_COLORS = {
  'AZADON': '#2e7d32',
  'CARRETILLA': '#1565c0',
  'ASPERSORA': '#e65100',
  'DESINFECCION': '#4e342e',
  'AFILADO': '#00838f',
  'LUBRICACION': '#6a1b9a',
  'ERGONOMIA': '#d84315',
  'GALPON': '#c62828',
  'INVENTARIO': '#00695c',
  'SEGURIDAD': '#ad1457'
};

let selectedCoords52 = [];
let foundWords52 = new Set();
let ws52TimerInterval = null;
let ws52Seconds = 0;
let ws52TimerRunning = false;

function resetWS52Timer() {
  if (ws52TimerInterval) clearInterval(ws52TimerInterval);
  ws52TimerInterval = null;
  ws52Seconds = 0;
  ws52TimerRunning = false;
  const timerElem = document.getElementById('ws52-timer');
  if (timerElem) timerElem.textContent = '00:00';
}

function startWS52Timer() {
  if (ws52TimerRunning) return;
  ws52TimerRunning = true;
  ws52Seconds = 0;
  ws52TimerInterval = setInterval(() => {
    ws52Seconds++;
    const mins = Math.floor(ws52Seconds / 60).toString().padStart(2, '0');
    const secs = (ws52Seconds % 60).toString().padStart(2, '0');
    const timerElem = document.getElementById('ws52-timer');
    if (timerElem) timerElem.textContent = `${mins}:${secs}`;
  }, 1000);
}

function stopWS52Timer() {
  if (ws52TimerInterval) {
    clearInterval(ws52TimerInterval);
    ws52TimerInterval = null;
  }
  ws52TimerRunning = false;
}

function initWordSearch52() {
  const gridContainer = document.getElementById('wordsearch52-grid');
  const counter = document.getElementById('ws52-counter');
  if (!gridContainer) return;

  gridContainer.innerHTML = '';
  selectedCoords52 = [];
  foundWords52.clear();
  resetWS52Timer();

  if (counter) counter.textContent = `0 / 10`;

  document.querySelectorAll('#ws52-word-list div').forEach(item => {
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
      cell.classList.add('ws52-cell');
      cell.setAttribute('data-r', r);
      cell.setAttribute('data-c', c);
      cell.textContent = WS52_MATRIX[r][c];

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

      cell.addEventListener('click', () => handleCellClick52(r, c, cell));
      gridContainer.appendChild(cell);
    }
  }
}

function handleCellClick52(r, c, cellElem) {
  startWS52Timer();

  const index = selectedCoords52.findIndex(item => item.r === r && item.c === c);
  if (index >= 0) {
    selectedCoords52.splice(index, 1);
    cellElem.style.background = '#ffffff';
    cellElem.style.color = '#000000';
  } else {
    selectedCoords52.push({ r, c, char: WS52_MATRIX[r][c] });
    cellElem.style.background = 'var(--gold)';
    cellElem.style.color = 'var(--primary-dark)';
  }

  checkSelectedWord52();
}

function checkSelectedWord52() {
  const currentChars = selectedCoords52.map(item => item.char).join('');
  const currentCharsRev = selectedCoords52.map(item => item.char).reverse().join('');

  for (const [word, coords] of Object.entries(WS52_TARGET_WORDS)) {
    if (foundWords52.has(word)) continue;

    if (currentChars === word || currentCharsRev === word) {
      foundWords52.add(word);
      lockFoundWord52(word, coords);
      selectedCoords52 = [];
      break;
    }
  }
}

function lockFoundWord52(word, coords) {
  const wordColor = WS52_WORD_COLORS[word] || 'var(--primary)';

  coords.forEach(([r, c]) => {
    const cell = document.querySelector(`.ws52-cell[data-r="${r}"][data-c="${c}"]`);
    if (cell) {
      cell.style.background = wordColor;
      cell.style.color = '#ffffff';
      cell.style.boxShadow = `0 0 6px ${wordColor}88`;
    }
  });

  const wordItem = document.querySelector(`#ws52-word-list div[data-word="${word}"]`);
  if (wordItem) {
    const origText = wordItem.getAttribute('data-orig-text') || wordItem.textContent;
    wordItem.innerHTML = `<span style="color: ${wordColor}; font-weight: 900; margin-right: 4px;">✓</span> ${origText}`;
    wordItem.style.color = wordColor;
    wordItem.style.fontWeight = '700';
  }

  const counter = document.getElementById('ws52-counter');
  if (counter) {
    counter.textContent = `${foundWords52.size} / 10`;
  }

  if (foundWords52.size === 10) {
    stopWS52Timer();
    const mins = Math.floor(ws52Seconds / 60).toString().padStart(2, '0');
    const secs = (ws52Seconds % 60).toString().padStart(2, '0');
    setTimeout(() => {
      alert(`🎉 ¡EXCELENTE TRABAJO! Has completado la Sopa de Letras de Herramientas, Mantenimiento y Seguridad (Quinto Grado - Área 2) en ${mins}:${secs}. ¡Felicidades!`);
    }, 200);
  }
}

/* ==========================================================================
   EVALUACIÓN INTERACTIVA TALLER QUINTO GRADO ÁREA 3: PRODUCCIÓN DE ALIMENTOS
   ========================================================================== */
function checkQuintoArea3Quiz(qNum, selectedOption, btnElem) {
  const correctAnswers = {
    1: 'A', // Selección de semillas de calidad y preparación de semilleros
    2: 'A', // Drones agrícolas con cámaras multiespectrales y GPS
    3: 'A', // Aprovechar condiciones climáticas óptimas y reducir plagas
    4: 'B', // Complementar merienda escolar con alimentos frescos y nutritivos
    5: 'A', // Venta simbólica de excedentes y plan de negocios comunitario
    6: 'A', // Nutrir el suelo sin contaminar ni acumular tóxicos
    7: 'A', // Fecha de siembra, porcentaje de germinación y trasplante
    8: 'A'  // Cultivar alimentos propios de forma limpia y sostenible
  };

  const ansDiv = document.getElementById(`quinto-area3-ans-${qNum}`);
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
    ansDiv.innerHTML = `<span style="color: #2e7d32;"><i class="fa-solid fa-circle-check"></i> ¡Correcto! Excelente comprensión de la producción de alimentos, nuevas tecnologías y emprendimiento agrícola.</span>`;
  } else {
    btnElem.style.background = '#c62828';
    btnElem.style.color = 'white';
    btnElem.style.borderColor = '#c62828';
    ansDiv.innerHTML = `<span style="color: #c62828;"><i class="fa-solid fa-circle-xmark"></i> Incorrecto. Revisa los contenidos de la lección e inténtalo nuevamente.</span>`;
  }
}

/* ==========================================================================
   SOPA DE LETRAS INTERACTIVA - QUINTO GRADO ÁREA 3 (PRODUCCIÓN DE ALIMENTOS)
   ========================================================================== */
const WS53_MATRIX = [
  ['S','E','M','I','L','L','E','R','O','S','A','B'],
  ['G','E','R','M','I','N','A','C','I','O','N','C'],
  ['D','R','O','N','E','S','D','E','F','G','H','I'],
  ['G','P','S','J','K','L','M','N','O','P','Q','R'],
  ['B','I','O','F','E','R','T','I','L','I','Z','A'],
  ['C','O','S','E','C','H','A','S','T','U','V','W'],
  ['E','M','P','R','E','N','D','E','R','X','Y','Z'],
  ['N','U','T','R','I','C','I','O','N','A','B','C'],
  ['F','E','R','I','A','D','E','F','G','H','I','J'],
  ['S','E','G','U','R','I','D','A','D','K','L','M'],
  ['A','B','C','D','E','F','G','H','I','J','K','L'],
  ['M','N','O','P','Q','R','S','T','U','V','W','X']
];

const WS53_TARGET_WORDS = {
  'SEMILLEROS': [[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8],[0,9]],
  'GERMINACION': [[1,0],[1,1],[1,2],[1,3],[1,4],[1,5],[1,6],[1,7],[1,8],[1,9],[1,10]],
  'DRONES': [[2,0],[2,1],[2,2],[2,3],[2,4],[2,5]],
  'GPS': [[3,0],[3,1],[3,2]],
  'BIOFERTILIZA': [[4,0],[4,1],[4,2],[4,3],[4,4],[4,5],[4,6],[4,7],[4,8],[4,9],[4,10],[4,11]],
  'COSECHA': [[5,0],[5,1],[5,2],[5,3],[5,4],[5,5],[5,6]],
  'EMPRENDER': [[6,0],[6,1],[6,2],[6,3],[6,4],[6,5],[6,6],[6,7],[6,8]],
  'NUTRICION': [[7,0],[7,1],[7,2],[7,3],[7,4],[7,5],[7,6],[7,7],[7,8]],
  'FERIA': [[8,0],[8,1],[8,2],[8,3],[8,4]],
  'SEGURIDAD': [[9,0],[9,1],[9,2],[9,3],[9,4],[9,5],[9,6],[9,7],[9,8]]
};

const WS53_WORD_COLORS = {
  'SEMILLEROS': '#2e7d32',
  'GERMINACION': '#1565c0',
  'DRONES': '#e65100',
  'GPS': '#6a1b9a',
  'BIOFERTILIZA': '#00838f',
  'COSECHA': '#d84315',
  'EMPRENDER': '#2e7d32',
  'NUTRICION': '#c62828',
  'FERIA': '#00695c',
  'SEGURIDAD': '#ad1457'
};

let selectedCoords53 = [];
let foundWords53 = new Set();
let ws53TimerInterval = null;
let ws53Seconds = 0;
let ws53TimerRunning = false;

function startWS53Timer() {
  if (ws53TimerRunning) return;
  ws53TimerRunning = true;
  ws53TimerInterval = setInterval(() => {
    ws53Seconds++;
    const mins = Math.floor(ws53Seconds / 60).toString().padStart(2, '0');
    const secs = (ws53Seconds % 60).toString().padStart(2, '0');
    const timerElem = document.getElementById('ws53-timer');
    if (timerElem) timerElem.textContent = `${mins}:${secs}`;
  }, 1000);
}

function stopWS53Timer() {
  clearInterval(ws53TimerInterval);
  ws53TimerRunning = false;
}

function initWordSearch53() {
  const gridContainer = document.getElementById('wordsearch53-grid');
  if (!gridContainer) return;

  stopWS53Timer();
  ws53Seconds = 0;
  foundWords53.clear();
  selectedCoords53 = [];

  const timerElem = document.getElementById('ws53-timer');
  if (timerElem) timerElem.textContent = '00:00';

  const counter = document.getElementById('ws53-counter');
  if (counter) counter.textContent = '0 / 10';

  gridContainer.innerHTML = '';
  for (let r = 0; r < 12; r++) {
    for (let c = 0; c < 12; c++) {
      const cell = document.createElement('div');
      cell.className = 'ws-cell ws53-cell';
      cell.dataset.r = r;
      cell.dataset.c = c;
      cell.dataset.letter = WS53_MATRIX[r][c];
      cell.textContent = WS53_MATRIX[r][c];
      cell.style.cssText = `
        width: 100%; aspect-ratio: 1; display: flex; align-items: center; justify-content: center;
        font-weight: 800; font-size: 1.05rem; background: #ffffff; border: 1px solid var(--border-color);
        border-radius: 6px; cursor: pointer; user-select: none; transition: all 0.15s ease;
      `;
      gridContainer.appendChild(cell);
    }
  }

  const wordListContainer = document.getElementById('ws53-word-list');
  if (wordListContainer) {
    const items = wordListContainer.querySelectorAll('div[data-word]');
    items.forEach(item => {
      if (!item.hasAttribute('data-orig-text')) {
        item.setAttribute('data-orig-text', item.textContent);
      }
      item.textContent = item.getAttribute('data-orig-text');
      item.style.color = 'var(--text-main)';
      item.style.fontWeight = '500';
    });
  }

  setupWS53Interactions();
}

function setupWS53Interactions() {
  const gridContainer = document.getElementById('wordsearch53-grid');
  if (!gridContainer) return;

  let isSelecting = false;

  const getCellFromEvent = (e) => {
    let clientX = e.clientX;
    let clientY = e.clientY;
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }
    const target = document.elementFromPoint(clientX, clientY);
    return target && target.classList.contains('ws53-cell') ? target : null;
  };

  const handleStart = (e) => {
    const cell = getCellFromEvent(e) || (e.target.classList.contains('ws53-cell') ? e.target : null);
    if (!cell) return;

    if (!ws53TimerRunning) startWS53Timer();
    isSelecting = true;
    selectedCoords53 = [];
    clearWS53TempSelection();
    addCellToWS53Selection(cell);
  };

  const handleMove = (e) => {
    if (!isSelecting) return;
    const cell = getCellFromEvent(e);
    if (cell) addCellToWS53Selection(cell);
  };

  const handleEnd = () => {
    if (!isSelecting) return;
    isSelecting = false;
    checkWS53Selection();
  };

  gridContainer.onmousedown = handleStart;
  gridContainer.onmousemove = handleMove;
  window.onmouseup = handleEnd;

  gridContainer.ontouchstart = handleStart;
  gridContainer.ontouchmove = handleMove;
  window.ontouchend = handleEnd;
}

function addCellToWS53Selection(cell) {
  const r = parseInt(cell.dataset.r);
  const c = parseInt(cell.dataset.c);

  const already = selectedCoords53.some(([sr, sc]) => sr === r && sc === c);
  if (!already) {
    selectedCoords53.push([r, c]);
    cell.style.background = 'var(--primary-light)';
    cell.style.color = 'white';
  }
}

function clearWS53TempSelection() {
  document.querySelectorAll('.ws53-cell').forEach(cell => {
    const r = parseInt(cell.dataset.r);
    const c = parseInt(cell.dataset.c);
    let isFound = false;

    for (let word of foundWords53) {
      const coords = WS53_TARGET_WORDS[word];
      if (coords.some(([fr, fc]) => fr === r && fc === c)) {
        isFound = true;
        break;
      }
    }

    if (!isFound) {
      cell.style.background = '#ffffff';
      cell.style.color = 'var(--text-main)';
    }
  });
}

function checkWS53Selection() {
  if (selectedCoords53.length === 0) return;

  let matchedWord = null;
  for (let [word, coords] of Object.entries(WS53_TARGET_WORDS)) {
    if (foundWords53.has(word)) continue;

    if (coords.length === selectedCoords53.length) {
      const matchForward = coords.every(([r, c], idx) => selectedCoords53[idx][0] === r && selectedCoords53[idx][1] === c);
      const matchBackward = coords.every(([r, c], idx) => selectedCoords53[selectedCoords53.length - 1 - idx][0] === r && selectedCoords53[selectedCoords53.length - 1 - idx][1] === c);

      if (matchForward || matchBackward) {
        matchedWord = word;
        break;
      }
    }
  }

  if (matchedWord) {
    foundWords53.add(matchedWord);
    markWS53WordAsFound(matchedWord);
  } else {
    clearWS53TempSelection();
  }
  selectedCoords53 = [];
}

function markWS53WordAsFound(word) {
  const coords = WS53_TARGET_WORDS[word];
  const wordColor = WS53_WORD_COLORS[word] || '#2e7d32';

  coords.forEach(([r, c]) => {
    const cell = document.querySelector(`.ws53-cell[data-r="${r}"][data-c="${c}"]`);
    if (cell) {
      cell.style.background = wordColor;
      cell.style.color = '#ffffff';
      cell.style.boxShadow = `0 0 6px ${wordColor}88`;
    }
  });

  const wordItem = document.querySelector(`#ws53-word-list div[data-word="${word}"]`);
  if (wordItem) {
    const origText = wordItem.getAttribute('data-orig-text') || wordItem.textContent;
    wordItem.innerHTML = `<span style="color: ${wordColor}; font-weight: 900; margin-right: 4px;">✓</span> ${origText}`;
    wordItem.style.color = wordColor;
    wordItem.style.fontWeight = '700';
  }

  const counter = document.getElementById('ws53-counter');
  if (counter) {
    counter.textContent = `${foundWords53.size} / 10`;
  }

  if (foundWords53.size === 10) {
    stopWS53Timer();
    const mins = Math.floor(ws53Seconds / 60).toString().padStart(2, '0');
    const secs = (ws53Seconds % 60).toString().padStart(2, '0');
    setTimeout(() => {
      alert(`🎉 ¡EXCELENTE TRABAJO! Has completado la Sopa de Letras de Producción de Alimentos (Quinto Grado - Área 3) en ${mins}:${secs}. ¡Felicidades!`);
    }, 200);
  }
}

/* ==========================================================================
   EVALUACIÓN INTERACTIVA TALLER QUINTO GRADO ÁREA 4: AGRICULTURA AGROSOSTENIBLE
   ========================================================================== */
function checkQuintoArea4Quiz(qNum, selectedOption, btnElem) {
  const correctAnswers = {
    1: 'A', // Suelo Arcilloso (retiene mas agua, compacta facil)
    2: 'B', // Suelo Arenoso (particulas gruesas, drena rapido)
    3: 'A', // Bocashi (abono fermentado de descomposicion rapida)
    4: 'A', // Bioles (abonos liquidos fermentados)
    5: 'A', // Recicla residuos organicos y restaura la fertilidad natural
    6: 'A', // Materia organica o humus
    7: 'A', // Humedecer y moldear chorizos sin agrietarse
    8: 'A'  // Estimular microorganismos beneficos y nutrir las plantas de forma limpia
  };

  const ansDiv = document.getElementById(`quinto-area4-ans-${qNum}`);
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
    ansDiv.innerHTML = `<span style="color: #2e7d32;"><i class="fa-solid fa-circle-check"></i> ¡Correcto! Excelente dominio de la clasificación de suelos, abonos orgánicos (Bocashi, Bioles) y agricultura agrosostenible.</span>`;
  } else {
    btnElem.style.background = '#c62828';
    btnElem.style.color = 'white';
    btnElem.style.borderColor = '#c62828';
    ansDiv.innerHTML = `<span style="color: #c62828;"><i class="fa-solid fa-circle-xmark"></i> Incorrecto. Revisa el contenido de la lección e inténtalo nuevamente.</span>`;
  }
}

/* ==========================================================================
   SOPA DE LETRAS INTERACTIVA - QUINTO GRADO ÁREA 4 (AGRICULTURA AGROSOSTENIBLE)
   ========================================================================== */
const WS54_MATRIX = [
  ['A','R','C','I','L','L','O','S','O','X','Y','Z'],
  ['L','I','M','O','S','O','A','B','C','D','E','F'],
  ['A','R','E','N','O','S','O','G','H','I','J','K'],
  ['B','O','C','A','S','H','I','L','M','N','O','P'],
  ['C','O','M','P','O','S','T','Q','R','S','T','U'],
  ['B','I','O','L','E','S','V','W','X','Y','Z','A'],
  ['H','U','M','U','S','B','C','D','E','F','G','H'],
  ['E','C','O','L','O','G','I','A','I','J','K','L'],
  ['S','U','E','L','O','M','N','O','P','Q','R','S'],
  ['S','U','S','T','E','N','I','B','L','E','T','U'],
  ['A','B','C','D','E','F','G','H','I','J','K','L'],
  ['M','N','O','P','Q','R','S','T','U','V','W','X']
];

const WS54_TARGET_WORDS = {
  'ARCILLOSO': [[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8]],
  'LIMOSO': [[1,0],[1,1],[1,2],[1,3],[1,4],[1,5]],
  'ARENOSO': [[2,0],[2,1],[2,2],[2,3],[2,4],[2,5],[2,6]],
  'BOCASHI': [[3,0],[3,1],[3,2],[3,3],[3,4],[3,5],[3,6]],
  'COMPOST': [[4,0],[4,1],[4,2],[4,3],[4,4],[4,5],[4,6]],
  'BIOLES': [[5,0],[5,1],[5,2],[5,3],[5,4],[5,5]],
  'HUMUS': [[6,0],[6,1],[6,2],[6,3],[6,4]],
  'ECOLOGIA': [[7,0],[7,1],[7,2],[7,3],[7,4],[7,5],[7,6],[7,7]],
  'SUELO': [[8,0],[8,1],[8,2],[8,3],[8,4]],
  'SUSTENIBLE': [[9,0],[9,1],[9,2],[9,3],[9,4],[9,5],[9,6],[9,7],[9,8],[9,9]]
};

const WS54_WORD_COLORS = {
  'ARCILLOSO': '#2e7d32',
  'LIMOSO': '#1565c0',
  'ARENOSO': '#e65100',
  'BOCASHI': '#6a1b9a',
  'COMPOST': '#00838f',
  'BIOLES': '#d84315',
  'HUMUS': '#2e7d32',
  'ECOLOGIA': '#c62828',
  'SUELO': '#00695c',
  'SUSTENIBLE': '#ad1457'
};

let selectedCoords54 = [];
let foundWords54 = new Set();
let ws54TimerInterval = null;
let ws54Seconds = 0;
let ws54TimerRunning = false;

function startWS54Timer() {
  if (ws54TimerRunning) return;
  ws54TimerRunning = true;
  ws54TimerInterval = setInterval(() => {
    ws54Seconds++;
    const mins = Math.floor(ws54Seconds / 60).toString().padStart(2, '0');
    const secs = (ws54Seconds % 60).toString().padStart(2, '0');
    const timerElem = document.getElementById('ws54-timer');
    if (timerElem) timerElem.textContent = `${mins}:${secs}`;
  }, 1000);
}

function stopWS54Timer() {
  clearInterval(ws54TimerInterval);
  ws54TimerRunning = false;
}

function initWordSearch54() {
  const gridContainer = document.getElementById('wordsearch54-grid');
  if (!gridContainer) return;

  stopWS54Timer();
  ws54Seconds = 0;
  foundWords54.clear();
  selectedCoords54 = [];

  const timerElem = document.getElementById('ws54-timer');
  if (timerElem) timerElem.textContent = '00:00';

  const counter = document.getElementById('ws54-counter');
  if (counter) counter.textContent = '0 / 10';

  gridContainer.innerHTML = '';
  for (let r = 0; r < 12; r++) {
    for (let c = 0; c < 12; c++) {
      const cell = document.createElement('div');
      cell.className = 'ws-cell ws54-cell';
      cell.dataset.r = r;
      cell.dataset.c = c;
      cell.dataset.letter = WS54_MATRIX[r][c];
      cell.textContent = WS54_MATRIX[r][c];
      cell.style.cssText = `
        width: 100%; aspect-ratio: 1; display: flex; align-items: center; justify-content: center;
        font-weight: 800; font-size: 1.05rem; background: #ffffff; border: 1px solid var(--border-color);
        border-radius: 6px; cursor: pointer; user-select: none; transition: all 0.15s ease;
      `;
      gridContainer.appendChild(cell);
    }
  }

  const wordListContainer = document.getElementById('ws54-word-list');
  if (wordListContainer) {
    const items = wordListContainer.querySelectorAll('div[data-word]');
    items.forEach(item => {
      if (!item.hasAttribute('data-orig-text')) {
        item.setAttribute('data-orig-text', item.textContent);
      }
      item.textContent = item.getAttribute('data-orig-text');
      item.style.color = 'var(--text-main)';
      item.style.fontWeight = '500';
    });
  }

  setupWS54Interactions();
}

function setupWS54Interactions() {
  const gridContainer = document.getElementById('wordsearch54-grid');
  if (!gridContainer) return;

  let isSelecting = false;

  const getCellFromEvent = (e) => {
    let clientX = e.clientX;
    let clientY = e.clientY;
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }
    const target = document.elementFromPoint(clientX, clientY);
    return target && target.classList.contains('ws54-cell') ? target : null;
  };

  const handleStart = (e) => {
    const cell = getCellFromEvent(e) || (e.target.classList.contains('ws54-cell') ? e.target : null);
    if (!cell) return;

    if (!ws54TimerRunning) startWS54Timer();
    isSelecting = true;
    selectedCoords54 = [];
    clearWS54TempSelection();
    addCellToWS54Selection(cell);
  };

  const handleMove = (e) => {
    if (!isSelecting) return;
    const cell = getCellFromEvent(e);
    if (cell) addCellToWS54Selection(cell);
  };

  const handleEnd = () => {
    if (!isSelecting) return;
    isSelecting = false;
    checkWS54Selection();
  };

  gridContainer.onmousedown = handleStart;
  gridContainer.onmousemove = handleMove;
  window.onmouseup = handleEnd;

  gridContainer.ontouchstart = handleStart;
  gridContainer.ontouchmove = handleMove;
  window.ontouchend = handleEnd;
}

function addCellToWS54Selection(cell) {
  const r = parseInt(cell.dataset.r);
  const c = parseInt(cell.dataset.c);

  const already = selectedCoords54.some(([sr, sc]) => sr === r && sc === c);
  if (!already) {
    selectedCoords54.push([r, c]);
    cell.style.background = 'var(--primary-light)';
    cell.style.color = 'white';
  }
}

function clearWS54TempSelection() {
  document.querySelectorAll('.ws54-cell').forEach(cell => {
    const r = parseInt(cell.dataset.r);
    const c = parseInt(cell.dataset.c);
    let isFound = false;

    for (let word of foundWords54) {
      const coords = WS54_TARGET_WORDS[word];
      if (coords.some(([fr, fc]) => fr === r && fc === c)) {
        isFound = true;
        break;
      }
    }

    if (!isFound) {
      cell.style.background = '#ffffff';
      cell.style.color = 'var(--text-main)';
    }
  });
}

function checkWS54Selection() {
  if (selectedCoords54.length === 0) return;

  let matchedWord = null;
  for (let [word, coords] of Object.entries(WS54_TARGET_WORDS)) {
    if (foundWords54.has(word)) continue;

    if (coords.length === selectedCoords54.length) {
      const matchForward = coords.every(([r, c], idx) => selectedCoords54[idx][0] === r && selectedCoords54[idx][1] === c);
      const matchBackward = coords.every(([r, c], idx) => selectedCoords54[selectedCoords54.length - 1 - idx][0] === r && selectedCoords54[selectedCoords54.length - 1 - idx][1] === c);

      if (matchForward || matchBackward) {
        matchedWord = word;
        break;
      }
    }
  }

  if (matchedWord) {
    foundWords54.add(matchedWord);
    markWS54WordAsFound(matchedWord);
  } else {
    clearWS54TempSelection();
  }
  selectedCoords54 = [];
}

function markWS54WordAsFound(word) {
  const coords = WS54_TARGET_WORDS[word];
  const wordColor = WS54_WORD_COLORS[word] || '#2e7d32';

  coords.forEach(([r, c]) => {
    const cell = document.querySelector(`.ws54-cell[data-r="${r}"][data-c="${c}"]`);
    if (cell) {
      cell.style.background = wordColor;
      cell.style.color = '#ffffff';
      cell.style.boxShadow = `0 0 6px ${wordColor}88`;
    }
  });

  const wordItem = document.querySelector(`#ws54-word-list div[data-word="${word}"]`);
  if (wordItem) {
    const origText = wordItem.getAttribute('data-orig-text') || wordItem.textContent;
    wordItem.innerHTML = `<span style="color: ${wordColor}; font-weight: 900; margin-right: 4px;">✓</span> ${origText}`;
    wordItem.style.color = wordColor;
    wordItem.style.fontWeight = '700';
  }

  const counter = document.getElementById('ws54-counter');
  if (counter) {
    counter.textContent = `${foundWords54.size} / 10`;
  }

  if (foundWords54.size === 10) {
    stopWS54Timer();
    const mins = Math.floor(ws54Seconds / 60).toString().padStart(2, '0');
    const secs = (ws54Seconds % 60).toString().padStart(2, '0');
    setTimeout(() => {
      alert(`🎉 ¡EXCELENTE TRABAJO! Has completado la Sopa de Letras de Agricultura Agrosostenible (Quinto Grado - Área 4) en ${mins}:${secs}. ¡Felicidades!`);
    }, 200);
  }
}

/* ==========================================================================
   EVALUACIÓN INTERACTIVA TALLER SEXTO GRADO ÁREA 1: JARDÍN Y ESPECIES VEGETALES
   ========================================================================== */
function checkSextoArea1Quiz(qNum, selectedOption, btnElem) {
  const correctAnswers = {
    1: 'A', // Elementos de planificacion (area, plantas, suelo, luz, materiales)
    2: 'A', // Jardin exterior (exposicion directa a sol y lluvia)
    3: 'A', // Materiales reciclables (llantas, botellas, madera)
    4: 'A', // Manejo Integrado de Plagas organico sin quimicos
    5: 'A', // Purin de ajo, chile y agua jabonosa
    6: 'A', // Seleccion de plantas segun horas de luz
    7: 'A', // Jornada de limpieza y acondicionamiento del suelo
    8: 'A'  // Feria de emprendimiento verde
  };

  const ansDiv = document.getElementById(`sexto-area1-ans-${qNum}`);
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
    ansDiv.innerHTML = `<span style="color: #2e7d32;"><i class="fa-solid fa-circle-check"></i> ¡Correcto! Excelente comprensión de la planificación del jardín, diseño de espacios y manejo integrado orgánico de plagas.</span>`;
  } else {
    btnElem.style.background = '#c62828';
    btnElem.style.color = 'white';
    btnElem.style.borderColor = '#c62828';
    ansDiv.innerHTML = `<span style="color: #c62828;"><i class="fa-solid fa-circle-xmark"></i> Incorrecto. Revisa el contenido de la lección e inténtalo nuevamente.</span>`;
  }
}

/* ==========================================================================
   SOPA DE LETRAS INTERACTIVA - SEXTO GRADO ÁREA 1 (JARDÍN Y ESPECIES VEGETALES)
   ========================================================================== */
const WS61_MATRIX = [
  ['J','A','R','D','I','N','X','Y','Z','A','B','C'],
  ['D','I','S','E','Ñ','O','D','E','F','G','H','I'],
  ['E','X','T','E','R','I','O','R','J','K','L','M'],
  ['I','N','T','E','R','I','O','R','N','O','P','Q'],
  ['P','L','A','G','A','S','R','S','T','U','V','W'],
  ['E','N','F','E','R','M','E','D','A','D','X','Y'],
  ['O','R','G','A','N','I','C','O','Z','A','B','C'],
  ['P','U','R','I','N','E','S','D','E','F','G','H'],
  ['R','E','C','I','C','L','A','J','E','I','J','K'],
  ['E','C','O','L','O','G','I','A','L','M','N','O'],
  ['A','B','C','D','E','F','G','H','I','J','K','L'],
  ['M','N','O','P','Q','R','S','T','U','V','W','X']
];

const WS61_TARGET_WORDS = {
  'JARDIN': [[0,0],[0,1],[0,2],[0,3],[0,4],[0,5]],
  'DISEÑO': [[1,0],[1,1],[1,2],[1,3],[1,4],[1,5]],
  'EXTERIOR': [[2,0],[2,1],[2,2],[2,3],[2,4],[2,5],[2,6],[2,7]],
  'INTERIOR': [[3,0],[3,1],[3,2],[3,3],[3,4],[3,5],[3,6],[3,7]],
  'PLAGAS': [[4,0],[4,1],[4,2],[4,3],[4,4],[4,5]],
  'ENFERMEDAD': [[5,0],[5,1],[5,2],[5,3],[5,4],[5,5],[5,6],[5,7],[5,8],[5,9]],
  'ORGANICO': [[6,0],[6,1],[6,2],[6,3],[6,4],[6,5],[6,6],[6,7]],
  'PURINES': [[7,0],[7,1],[7,2],[7,3],[7,4],[7,5],[7,6]],
  'RECICLAJE': [[8,0],[8,1],[8,2],[8,3],[8,4],[8,5],[8,6],[8,7],[8,8]],
  'ECOLOGIA': [[9,0],[9,1],[9,2],[9,3],[9,4],[9,5],[9,6],[9,7]]
};

const WS61_WORD_COLORS = {
  'JARDIN': '#2e7d32',
  'DISEÑO': '#1565c0',
  'EXTERIOR': '#e65100',
  'INTERIOR': '#6a1b9a',
  'PLAGAS': '#c62828',
  'ENFERMEDAD': '#d84315',
  'ORGANICO': '#00838f',
  'PURINES': '#2e7d32',
  'RECICLAJE': '#00695c',
  'ECOLOGIA': '#ad1457'
};

let selectedCoords61 = [];
let foundWords61 = new Set();
let ws61TimerInterval = null;
let ws61Seconds = 0;
let ws61TimerRunning = false;

function startWS61Timer() {
  if (ws61TimerRunning) return;
  ws61TimerRunning = true;
  ws61TimerInterval = setInterval(() => {
    ws61Seconds++;
    const mins = Math.floor(ws61Seconds / 60).toString().padStart(2, '0');
    const secs = (ws61Seconds % 60).toString().padStart(2, '0');
    const timerElem = document.getElementById('ws61-timer');
    if (timerElem) timerElem.textContent = `${mins}:${secs}`;
  }, 1000);
}

function stopWS61Timer() {
  clearInterval(ws61TimerInterval);
  ws61TimerRunning = false;
}

function initWordSearch61() {
  const gridContainer = document.getElementById('wordsearch61-grid');
  if (!gridContainer) return;

  stopWS61Timer();
  ws61Seconds = 0;
  foundWords61.clear();
  selectedCoords61 = [];

  const timerElem = document.getElementById('ws61-timer');
  if (timerElem) timerElem.textContent = '00:00';

  const counter = document.getElementById('ws61-counter');
  if (counter) counter.textContent = '0 / 10';

  gridContainer.innerHTML = '';
  for (let r = 0; r < 12; r++) {
    for (let c = 0; c < 12; c++) {
      const cell = document.createElement('div');
      cell.className = 'ws-cell ws61-cell';
      cell.dataset.r = r;
      cell.dataset.c = c;
      cell.dataset.letter = WS61_MATRIX[r][c];
      cell.textContent = WS61_MATRIX[r][c];
      cell.style.cssText = `
        width: 100%; aspect-ratio: 1; display: flex; align-items: center; justify-content: center;
        font-weight: 800; font-size: 1.05rem; background: #ffffff; border: 1px solid var(--border-color);
        border-radius: 6px; cursor: pointer; user-select: none; transition: all 0.15s ease;
      `;
      gridContainer.appendChild(cell);
    }
  }

  const wordListContainer = document.getElementById('ws61-word-list');
  if (wordListContainer) {
    const items = wordListContainer.querySelectorAll('div[data-word]');
    items.forEach(item => {
      if (!item.hasAttribute('data-orig-text')) {
        item.setAttribute('data-orig-text', item.textContent);
      }
      item.textContent = item.getAttribute('data-orig-text');
      item.style.color = 'var(--text-main)';
      item.style.fontWeight = '500';
    });
  }

  setupWS61Interactions();
}

function setupWS61Interactions() {
  const gridContainer = document.getElementById('wordsearch61-grid');
  if (!gridContainer) return;

  let isSelecting = false;

  const getCellFromEvent = (e) => {
    let clientX = e.clientX;
    let clientY = e.clientY;
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }
    const target = document.elementFromPoint(clientX, clientY);
    return target && target.classList.contains('ws61-cell') ? target : null;
  };

  const handleStart = (e) => {
    const cell = getCellFromEvent(e) || (e.target.classList.contains('ws61-cell') ? e.target : null);
    if (!cell) return;

    if (!ws61TimerRunning) startWS61Timer();
    isSelecting = true;
    selectedCoords61 = [];
    clearWS61TempSelection();
    addCellToWS61Selection(cell);
  };

  const handleMove = (e) => {
    if (!isSelecting) return;
    const cell = getCellFromEvent(e);
    if (cell) addCellToWS61Selection(cell);
  };

  const handleEnd = () => {
    if (!isSelecting) return;
    isSelecting = false;
    checkWS61Selection();
  };

  gridContainer.onmousedown = handleStart;
  gridContainer.onmousemove = handleMove;
  window.onmouseup = handleEnd;

  gridContainer.ontouchstart = handleStart;
  gridContainer.ontouchmove = handleMove;
  window.ontouchend = handleEnd;
}

function addCellToWS61Selection(cell) {
  const r = parseInt(cell.dataset.r);
  const c = parseInt(cell.dataset.c);

  const already = selectedCoords61.some(([sr, sc]) => sr === r && sc === c);
  if (!already) {
    selectedCoords61.push([r, c]);
    cell.style.background = 'var(--primary-light)';
    cell.style.color = 'white';
  }
}

function clearWS61TempSelection() {
  document.querySelectorAll('.ws61-cell').forEach(cell => {
    const r = parseInt(cell.dataset.r);
    const c = parseInt(cell.dataset.c);
    let isFound = false;

    for (let word of foundWords61) {
      const coords = WS61_TARGET_WORDS[word];
      if (coords.some(([fr, fc]) => fr === r && fc === c)) {
        isFound = true;
        break;
      }
    }

    if (!isFound) {
      cell.style.background = '#ffffff';
      cell.style.color = 'var(--text-main)';
    }
  });
}

function checkWS61Selection() {
  if (selectedCoords61.length === 0) return;

  let matchedWord = null;
  for (let [word, coords] of Object.entries(WS61_TARGET_WORDS)) {
    if (foundWords61.has(word)) continue;

    if (coords.length === selectedCoords61.length) {
      const matchForward = coords.every(([r, c], idx) => selectedCoords61[idx][0] === r && selectedCoords61[idx][1] === c);
      const matchBackward = coords.every(([r, c], idx) => selectedCoords61[selectedCoords61.length - 1 - idx][0] === r && selectedCoords61[selectedCoords61.length - 1 - idx][1] === c);

      if (matchForward || matchBackward) {
        matchedWord = word;
        break;
      }
    }
  }

  if (matchedWord) {
    foundWords61.add(matchedWord);
    markWS61WordAsFound(matchedWord);
  } else {
    clearWS61TempSelection();
  }
  selectedCoords61 = [];
}

function markWS61WordAsFound(word) {
  const coords = WS61_TARGET_WORDS[word];
  const wordColor = WS61_WORD_COLORS[word] || '#2e7d32';

  coords.forEach(([r, c]) => {
    const cell = document.querySelector(`.ws61-cell[data-r="${r}"][data-c="${c}"]`);
    if (cell) {
      cell.style.background = wordColor;
      cell.style.color = '#ffffff';
      cell.style.boxShadow = `0 0 6px ${wordColor}88`;
    }
  });

  const wordItem = document.querySelector(`#ws61-word-list div[data-word="${word}"]`);
  if (wordItem) {
    const origText = wordItem.getAttribute('data-orig-text') || wordItem.textContent;
    wordItem.innerHTML = `<span style="color: ${wordColor}; font-weight: 900; margin-right: 4px;">✓</span> ${origText}`;
    wordItem.style.color = wordColor;
    wordItem.style.fontWeight = '700';
  }

  const counter = document.getElementById('ws61-counter');
  if (counter) {
    counter.textContent = `${foundWords61.size} / 10`;
  }

  if (foundWords61.size === 10) {
    stopWS61Timer();
    const mins = Math.floor(ws61Seconds / 60).toString().padStart(2, '0');
    const secs = (ws61Seconds % 60).toString().padStart(2, '0');
    setTimeout(() => {
      alert(`🎉 ¡EXCELENTE TRABAJO! Has completado la Sopa de Letras de Jardín y Especies Vegetales (Sexto Grado - Área 1) en ${mins}:${secs}. ¡Felicidades!`);
    }, 200);
  }
}

/* ==========================================================================
   EVALUACIÓN INTERACTIVA TALLER SEXTO GRADO ÁREA 2: TECNOLOGÍA PRÁCTICA Y FUNCIONAL
   ========================================================================== */
function checkSextoArea2Quiz(qNum, selectedOption, btnElem) {
  const correctAnswers = {
    1: 'A', // Azadon o azada
    2: 'A', // Motocultor labranza ligera
    3: 'A', // Tractor traccion y potencia
    4: 'A', // Arado rotura primaria
    5: 'A', // Rastra desmenuzar terrones
    6: 'A', // Surcador abrir lomos y zanjas
    7: 'A', // Sembradora profundidad y distancia
    8: 'A'  // Mantenimiento preventivo vida util
  };

  const ansDiv = document.getElementById(`sexto-area2-ans-${qNum}`);
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
    ansDiv.innerHTML = `<span style="color: #2e7d32;"><i class="fa-solid fa-circle-check"></i> ¡Correcto! Excelente dominio de herramientas manuales, maquinaria agrícola, equipos de tiro y mantenimiento preventivo.</span>`;
  } else {
    btnElem.style.background = '#c62828';
    btnElem.style.color = 'white';
    btnElem.style.borderColor = '#c62828';
    ansDiv.innerHTML = `<span style="color: #c62828;"><i class="fa-solid fa-circle-xmark"></i> Incorrecto. Revisa el contenido de la lección e inténtalo nuevamente.</span>`;
  }
}

/* ==========================================================================
   SOPA DE LETRAS INTERACTIVA - SEXTO GRADO ÁREA 2 (MAQUINARIA Y EQUIPOS DE TIRO)
   ========================================================================== */
const WS62_MATRIX = [
  ['T','R','A','C','T','O','R','X','Y','Z','A','B'],
  ['A','R','A','D','O','C','D','E','F','G','H','I'],
  ['R','A','S','T','R','A','J','K','L','M','N','O'],
  ['S','U','R','C','A','D','O','R','P','Q','R','S'],
  ['S','E','M','B','R','A','D','O','R','A','T','U'],
  ['M','O','T','O','C','U','L','T','O','R','V','W'],
  ['A','Z','A','D','O','N','X','Y','Z','A','B','C'],
  ['R','A','S','T','R','I','L','L','O','D','E','F'],
  ['M','A','Q','U','I','N','A','R','I','A','G','H'],
  ['S','E','G','U','R','I','D','A','D','I','J','K'],
  ['A','B','C','D','E','F','G','H','I','J','K','L'],
  ['M','N','O','P','Q','R','S','T','U','V','W','X']
];

const WS62_TARGET_WORDS = {
  'TRACTOR': [[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6]],
  'ARADO': [[1,0],[1,1],[1,2],[1,3],[1,4]],
  'RASTRA': [[2,0],[2,1],[2,2],[2,3],[2,4],[2,5]],
  'SURCADOR': [[3,0],[3,1],[3,2],[3,3],[3,4],[3,5],[3,6],[3,7]],
  'SEMBRADORA': [[4,0],[4,1],[4,2],[4,3],[4,4],[4,5],[4,6],[4,7],[4,8],[4,9]],
  'MOTOCULTOR': [[5,0],[5,1],[5,2],[5,3],[5,4],[5,5],[5,6],[5,7],[5,8],[5,9]],
  'AZADON': [[6,0],[6,1],[6,2],[6,3],[6,4],[6,5]],
  'RASTRILLO': [[7,0],[7,1],[7,2],[7,3],[7,4],[7,5],[7,6],[7,7],[7,8]],
  'MAQUINARIA': [[8,0],[8,1],[8,2],[8,3],[8,4],[8,5],[8,6],[8,7],[8,8],[8,9]],
  'SEGURIDAD': [[9,0],[9,1],[9,2],[9,3],[9,4],[9,5],[9,6],[9,7],[9,8]]
};

const WS62_WORD_COLORS = {
  'TRACTOR': '#1565c0',
  'ARADO': '#e65100',
  'RASTRA': '#2e7d32',
  'SURCADOR': '#6a1b9a',
  'SEMBRADORA': '#00838f',
  'MOTOCULTOR': '#c62828',
  'AZADON': '#00695c',
  'RASTRILLO': '#ad1457',
  'MAQUINARIA': '#d84315',
  'SEGURIDAD': '#2e7d32'
};

let selectedCoords62 = [];
let foundWords62 = new Set();
let ws62TimerInterval = null;
let ws62Seconds = 0;
let ws62TimerRunning = false;

function startWS62Timer() {
  if (ws62TimerRunning) return;
  ws62TimerRunning = true;
  ws62TimerInterval = setInterval(() => {
    ws62Seconds++;
    const mins = Math.floor(ws62Seconds / 60).toString().padStart(2, '0');
    const secs = (ws62Seconds % 60).toString().padStart(2, '0');
    const timerElem = document.getElementById('ws62-timer');
    if (timerElem) timerElem.textContent = `${mins}:${secs}`;
  }, 1000);
}

function stopWS62Timer() {
  clearInterval(ws62TimerInterval);
  ws62TimerRunning = false;
}

function initWordSearch62() {
  const gridContainer = document.getElementById('wordsearch62-grid');
  if (!gridContainer) return;

  stopWS62Timer();
  ws62Seconds = 0;
  foundWords62.clear();
  selectedCoords62 = [];

  const timerElem = document.getElementById('ws62-timer');
  if (timerElem) timerElem.textContent = '00:00';

  const counter = document.getElementById('ws62-counter');
  if (counter) counter.textContent = '0 / 10';

  gridContainer.innerHTML = '';
  for (let r = 0; r < 12; r++) {
    for (let c = 0; c < 12; c++) {
      const cell = document.createElement('div');
      cell.className = 'ws-cell ws62-cell';
      cell.dataset.r = r;
      cell.dataset.c = c;
      cell.dataset.letter = WS62_MATRIX[r][c];
      cell.textContent = WS62_MATRIX[r][c];
      cell.style.cssText = `
        width: 100%; aspect-ratio: 1; display: flex; align-items: center; justify-content: center;
        font-weight: 800; font-size: 1.05rem; background: #ffffff; border: 1px solid var(--border-color);
        border-radius: 6px; cursor: pointer; user-select: none; transition: all 0.15s ease;
      `;
      gridContainer.appendChild(cell);
    }
  }

  const wordListContainer = document.getElementById('ws62-word-list');
  if (wordListContainer) {
    const items = wordListContainer.querySelectorAll('div[data-word]');
    items.forEach(item => {
      if (!item.hasAttribute('data-orig-text')) {
        item.setAttribute('data-orig-text', item.textContent);
      }
      item.textContent = item.getAttribute('data-orig-text');
      item.style.color = 'var(--text-main)';
      item.style.fontWeight = '500';
    });
  }

  setupWS62Interactions();
}

function setupWS62Interactions() {
  const gridContainer = document.getElementById('wordsearch62-grid');
  if (!gridContainer) return;

  let isSelecting = false;

  const getCellFromEvent = (e) => {
    let clientX = e.clientX;
    let clientY = e.clientY;
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }
    const target = document.elementFromPoint(clientX, clientY);
    return target && target.classList.contains('ws62-cell') ? target : null;
  };

  const handleStart = (e) => {
    const cell = getCellFromEvent(e) || (e.target.classList.contains('ws62-cell') ? e.target : null);
    if (!cell) return;

    if (!ws62TimerRunning) startWS62Timer();
    isSelecting = true;
    selectedCoords62 = [];
    clearWS62TempSelection();
    addCellToWS62Selection(cell);
  };

  const handleMove = (e) => {
    if (!isSelecting) return;
    const cell = getCellFromEvent(e);
    if (cell) addCellToWS62Selection(cell);
  };

  const handleEnd = () => {
    if (!isSelecting) return;
    isSelecting = false;
    checkWS62Selection();
  };

  gridContainer.onmousedown = handleStart;
  gridContainer.onmousemove = handleMove;
  window.onmouseup = handleEnd;

  gridContainer.ontouchstart = handleStart;
  gridContainer.ontouchmove = handleMove;
  window.ontouchend = handleEnd;
}

function addCellToWS62Selection(cell) {
  const r = parseInt(cell.dataset.r);
  const c = parseInt(cell.dataset.c);

  const already = selectedCoords62.some(([sr, sc]) => sr === r && sc === c);
  if (!already) {
    selectedCoords62.push([r, c]);
    cell.style.background = 'var(--primary-light)';
    cell.style.color = 'white';
  }
}

function clearWS62TempSelection() {
  document.querySelectorAll('.ws62-cell').forEach(cell => {
    const r = parseInt(cell.dataset.r);
    const c = parseInt(cell.dataset.c);
    let isFound = false;

    for (let word of foundWords62) {
      const coords = WS62_TARGET_WORDS[word];
      if (coords.some(([fr, fc]) => fr === r && fc === c)) {
        isFound = true;
        break;
      }
    }

    if (!isFound) {
      cell.style.background = '#ffffff';
      cell.style.color = 'var(--text-main)';
    }
  });
}

function checkWS62Selection() {
  if (selectedCoords62.length === 0) return;

  let matchedWord = null;
  for (let [word, coords] of Object.entries(WS62_TARGET_WORDS)) {
    if (foundWords62.has(word)) continue;

    if (coords.length === selectedCoords62.length) {
      const matchForward = coords.every(([r, c], idx) => selectedCoords62[idx][0] === r && selectedCoords62[idx][1] === c);
      const matchBackward = coords.every(([r, c], idx) => selectedCoords62[selectedCoords62.length - 1 - idx][0] === r && selectedCoords62[selectedCoords62.length - 1 - idx][1] === c);

      if (matchForward || matchBackward) {
        matchedWord = word;
        break;
      }
    }
  }

  if (matchedWord) {
    foundWords62.add(matchedWord);
    markWS62WordAsFound(matchedWord);
  } else {
    clearWS62TempSelection();
  }
  selectedCoords62 = [];
}

function markWS62WordAsFound(word) {
  const coords = WS62_TARGET_WORDS[word];
  const wordColor = WS62_WORD_COLORS[word] || '#1565c0';

  coords.forEach(([r, c]) => {
    const cell = document.querySelector(`.ws62-cell[data-r="${r}"][data-c="${c}"]`);
    if (cell) {
      cell.style.background = wordColor;
      cell.style.color = '#ffffff';
      cell.style.boxShadow = `0 0 6px ${wordColor}88`;
    }
  });

  const wordItem = document.querySelector(`#ws62-word-list div[data-word="${word}"]`);
  if (wordItem) {
    const origText = wordItem.getAttribute('data-orig-text') || wordItem.textContent;
    wordItem.innerHTML = `<span style="color: ${wordColor}; font-weight: 900; margin-right: 4px;">✓</span> ${origText}`;
    wordItem.style.color = wordColor;
    wordItem.style.fontWeight = '700';
  }

  const counter = document.getElementById('ws62-counter');
  if (counter) {
    counter.textContent = `${foundWords62.size} / 10`;
  }

  if (foundWords62.size === 10) {
    stopWS62Timer();
    const mins = Math.floor(ws62Seconds / 60).toString().padStart(2, '0');
    const secs = (ws62Seconds % 60).toString().padStart(2, '0');
    setTimeout(() => {
      alert(`🎉 ¡EXCELENTE TRABAJO! Has completado la Sopa de Letras de Maquinaria y Equipos de Tiro (Sexto Grado - Área 2) en ${mins}:${secs}. ¡Felicidades!`);
    }, 200);
  }
}

/* ==========================================================================
   EVALUACIÓN INTERACTIVA TALLER SEXTO GRADO ÁREA 3: ALIMENTOS PARA CONSUMO HUMANO
   ========================================================================== */
function checkSextoArea3Quiz(qNum, selectedOption, btnElem) {
  const correctAnswers = {
    1: 'A', // Consumo escolar y familiar
    2: 'A', // Menu semanal saludable
    3: 'A', // Hidroponia agua con nutrientes sin suelo
    4: 'A', // Invernadero proteccion y clima controlado
    5: 'A', // Fertirriego agua y fertilizante simultaneo
    6: 'A', // SIG mapeo digital y suelos
    7: 'A', // Ahorro de agua y fertilizante
    8: 'A'  // Feria de emprendimiento e innovacion
  };

  const ansDiv = document.getElementById(`sexto-area3-ans-${qNum}`);
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
    ansDiv.innerHTML = `<span style="color: #2e7d32;"><i class="fa-solid fa-circle-check"></i> ¡Correcto! Excelente dominio de la producción alimentaria, tecnologías agrosostenibles, fertirriego y mapas SIG.</span>`;
  } else {
    btnElem.style.background = '#c62828';
    btnElem.style.color = 'white';
    btnElem.style.borderColor = '#c62828';
    ansDiv.innerHTML = `<span style="color: #c62828;"><i class="fa-solid fa-circle-xmark"></i> Incorrecto. Revisa el contenido de la lección e inténtalo nuevamente.</span>`;
  }
}

/* ==========================================================================
   SOPA DE LETRAS INTERACTIVA - SEXTO GRADO ÁREA 3 (TECNOLOGÍAS Y ALIMENTACIÓN)
   ========================================================================== */
const WS63_MATRIX = [
  ['C','O','N','S','U','M','O','X','Y','Z','A','B'],
  ['H','I','D','R','O','P','O','N','I','A','C','D'],
  ['I','N','V','E','R','N','A','D','E','R','O','E'],
  ['F','E','R','T','I','R','R','I','E','G','O','F'],
  ['T','E','C','N','O','L','O','G','I','A','G','H'],
  ['S','I','G','I','J','K','L','M','N','O','P','Q'],
  ['A','L','I','M','E','N','T','A','C','I','O','N'],
  ['N','U','T','R','I','E','N','T','E','S','R','S'],
  ['S','O','S','T','E','N','I','B','L','E','T','U'],
  ['E','M','P','R','E','N','D','E','R','V','W','X'],
  ['A','B','C','D','E','F','G','H','I','J','K','L'],
  ['M','N','O','P','Q','R','S','T','U','V','W','X']
];

const WS63_TARGET_WORDS = {
  'CONSUMO': [[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6]],
  'HIDROPONIA': [[1,0],[1,1],[1,2],[1,3],[1,4],[1,5],[1,6],[1,7],[1,8],[1,9]],
  'INVERNADERO': [[2,0],[2,1],[2,2],[2,3],[2,4],[2,5],[2,6],[2,7],[2,8],[2,9],[2,10]],
  'FERTIRRIEGO': [[3,0],[3,1],[3,2],[3,3],[3,4],[3,5],[3,6],[3,7],[3,8],[3,9],[3,10]],
  'TECNOLOGIA': [[4,0],[4,1],[4,2],[4,3],[4,4],[4,5],[4,6],[4,7],[4,8],[4,9]],
  'SIG': [[5,0],[5,1],[5,2]],
  'ALIMENTACION': [[6,0],[6,1],[6,2],[6,3],[6,4],[6,5],[6,6],[6,7],[6,8],[6,9],[6,10],[6,11]],
  'NUTRIENTES': [[7,0],[7,1],[7,2],[7,3],[7,4],[7,5],[7,6],[7,7],[7,8],[7,9]],
  'SOSTENIBLE': [[8,0],[8,1],[8,2],[8,3],[8,4],[8,5],[8,6],[8,7],[8,8],[8,9]],
  'EMPRENDER': [[9,0],[9,1],[9,2],[9,3],[9,4],[9,5],[9,6],[9,7],[9,8]]
};

const WS63_WORD_COLORS = {
  'CONSUMO': '#2e7d32',
  'HIDROPONIA': '#00838f',
  'INVERNADERO': '#6a1b9a',
  'FERTIRRIEGO': '#1565c0',
  'TECNOLOGIA': '#e65100',
  'SIG': '#c62828',
  'ALIMENTACION': '#00695c',
  'NUTRIENTES': '#ad1457',
  'SOSTENIBLE': '#2e7d32',
  'EMPRENDER': '#d84315'
};

let selectedCoords63 = [];
let foundWords63 = new Set();
let ws63TimerInterval = null;
let ws63Seconds = 0;
let ws63TimerRunning = false;

function startWS63Timer() {
  if (ws63TimerRunning) return;
  ws63TimerRunning = true;
  ws63TimerInterval = setInterval(() => {
    ws63Seconds++;
    const mins = Math.floor(ws63Seconds / 60).toString().padStart(2, '0');
    const secs = (ws63Seconds % 60).toString().padStart(2, '0');
    const timerElem = document.getElementById('ws63-timer');
    if (timerElem) timerElem.textContent = `${mins}:${secs}`;
  }, 1000);
}

function stopWS63Timer() {
  clearInterval(ws63TimerInterval);
  ws63TimerRunning = false;
}

function initWordSearch63() {
  const gridContainer = document.getElementById('wordsearch63-grid');
  if (!gridContainer) return;

  stopWS63Timer();
  ws63Seconds = 0;
  foundWords63.clear();
  selectedCoords63 = [];

  const timerElem = document.getElementById('ws63-timer');
  if (timerElem) timerElem.textContent = '00:00';

  const counter = document.getElementById('ws63-counter');
  if (counter) counter.textContent = '0 / 10';

  gridContainer.innerHTML = '';
  for (let r = 0; r < 12; r++) {
    for (let c = 0; c < 12; c++) {
      const cell = document.createElement('div');
      cell.className = 'ws-cell ws63-cell';
      cell.dataset.r = r;
      cell.dataset.c = c;
      cell.dataset.letter = WS63_MATRIX[r][c];
      cell.textContent = WS63_MATRIX[r][c];
      cell.style.cssText = `
        width: 100%; aspect-ratio: 1; display: flex; align-items: center; justify-content: center;
        font-weight: 800; font-size: 1.05rem; background: #ffffff; border: 1px solid var(--border-color);
        border-radius: 6px; cursor: pointer; user-select: none; transition: all 0.15s ease;
      `;
      gridContainer.appendChild(cell);
    }
  }

  const wordListContainer = document.getElementById('ws63-word-list');
  if (wordListContainer) {
    const items = wordListContainer.querySelectorAll('div[data-word]');
    items.forEach(item => {
      if (!item.hasAttribute('data-orig-text')) {
        item.setAttribute('data-orig-text', item.textContent);
      }
      item.textContent = item.getAttribute('data-orig-text');
      item.style.color = 'var(--text-main)';
      item.style.fontWeight = '500';
    });
  }

  setupWS63Interactions();
}

function setupWS63Interactions() {
  const gridContainer = document.getElementById('wordsearch63-grid');
  if (!gridContainer) return;

  let isSelecting = false;

  const getCellFromEvent = (e) => {
    let clientX = e.clientX;
    let clientY = e.clientY;
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }
    const target = document.elementFromPoint(clientX, clientY);
    return target && target.classList.contains('ws63-cell') ? target : null;
  };

  const handleStart = (e) => {
    const cell = getCellFromEvent(e) || (e.target.classList.contains('ws63-cell') ? e.target : null);
    if (!cell) return;

    if (!ws63TimerRunning) startWS63Timer();
    isSelecting = true;
    selectedCoords63 = [];
    clearWS63TempSelection();
    addCellToWS63Selection(cell);
  };

  const handleMove = (e) => {
    if (!isSelecting) return;
    const cell = getCellFromEvent(e);
    if (cell) addCellToWS63Selection(cell);
  };

  const handleEnd = () => {
    if (!isSelecting) return;
    isSelecting = false;
    checkWS63Selection();
  };

  gridContainer.onmousedown = handleStart;
  gridContainer.onmousemove = handleMove;
  window.onmouseup = handleEnd;

  gridContainer.ontouchstart = handleStart;
  gridContainer.ontouchmove = handleMove;
  window.ontouchend = handleEnd;
}

function addCellToWS63Selection(cell) {
  const r = parseInt(cell.dataset.r);
  const c = parseInt(cell.dataset.c);

  const already = selectedCoords63.some(([sr, sc]) => sr === r && sc === c);
  if (!already) {
    selectedCoords63.push([r, c]);
    cell.style.background = 'var(--primary-light)';
    cell.style.color = 'white';
  }
}

function clearWS63TempSelection() {
  document.querySelectorAll('.ws63-cell').forEach(cell => {
    const r = parseInt(cell.dataset.r);
    const c = parseInt(cell.dataset.c);
    let isFound = false;

    for (let word of foundWords63) {
      const coords = WS63_TARGET_WORDS[word];
      if (coords.some(([fr, fc]) => fr === r && fc === c)) {
        isFound = true;
        break;
      }
    }

    if (!isFound) {
      cell.style.background = '#ffffff';
      cell.style.color = 'var(--text-main)';
    }
  });
}

function checkWS63Selection() {
  if (selectedCoords63.length === 0) return;

  let matchedWord = null;
  for (let [word, coords] of Object.entries(WS63_TARGET_WORDS)) {
    if (foundWords63.has(word)) continue;

    if (coords.length === selectedCoords63.length) {
      const matchForward = coords.every(([r, c], idx) => selectedCoords63[idx][0] === r && selectedCoords63[idx][1] === c);
      const matchBackward = coords.every(([r, c], idx) => selectedCoords63[selectedCoords63.length - 1 - idx][0] === r && selectedCoords63[selectedCoords63.length - 1 - idx][1] === c);

      if (matchForward || matchBackward) {
        matchedWord = word;
        break;
      }
    }
  }

  if (matchedWord) {
    foundWords63.add(matchedWord);
    markWS63WordAsFound(matchedWord);
  } else {
    clearWS63TempSelection();
  }
  selectedCoords63 = [];
}

function markWS63WordAsFound(word) {
  const coords = WS63_TARGET_WORDS[word];
  const wordColor = WS63_WORD_COLORS[word] || '#2e7d32';

  coords.forEach(([r, c]) => {
    const cell = document.querySelector(`.ws63-cell[data-r="${r}"][data-c="${c}"]`);
    if (cell) {
      cell.style.background = wordColor;
      cell.style.color = '#ffffff';
      cell.style.boxShadow = `0 0 6px ${wordColor}88`;
    }
  });

  const wordItem = document.querySelector(`#ws63-word-list div[data-word="${word}"]`);
  if (wordItem) {
    const origText = wordItem.getAttribute('data-orig-text') || wordItem.textContent;
    wordItem.innerHTML = `<span style="color: ${wordColor}; font-weight: 900; margin-right: 4px;">✓</span> ${origText}`;
    wordItem.style.color = wordColor;
    wordItem.style.fontWeight = '700';
  }

  const counter = document.getElementById('ws63-counter');
  if (counter) {
    counter.textContent = `${foundWords63.size} / 10`;
  }

  if (foundWords63.size === 10) {
    stopWS63Timer();
    const mins = Math.floor(ws63Seconds / 60).toString().padStart(2, '0');
    const secs = (ws63Seconds % 60).toString().padStart(2, '0');
    setTimeout(() => {
      alert(`🎉 ¡EXCELENTE TRABAJO! Has completado la Sopa de Letras de Tecnologías Agrícolas (Sexto Grado - Área 3) en ${mins}:${secs}. ¡Felicidades!`);
    }, 200);
  }
}

/* ==========================================================================
   EVALUACIÓN INTERACTIVA TALLER SEXTO GRADO ÁREA 4: AMBIENTE Y AGRICULTURA SOSTENIBLE
   ========================================================================== */
function checkSextoArea4Quiz(qNum, selectedOption, btnElem) {
  const correctAnswers = {
    1: 'A', // Asociacion de cultivos beneficio mutuo
    2: 'A', // Rotacion vs monocultura
    3: 'A', // Silvopastoril arboles pasto ganado
    4: 'A', // Textura arena limo arcilla
    5: 'A', // NPK macronutrientes
    6: 'A', // pH acidez alcalinidad
    7: 'A', // Micronutrientes enzimas fotosintesis
    8: 'A'  // Agroforesteria agua carbono erosión
  };

  const ansDiv = document.getElementById(`sexto-area4-ans-${qNum}`);
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
    ansDiv.innerHTML = `<span style="color: #2e7d32;"><i class="fa-solid fa-circle-check"></i> ¡Correcto! Excelente dominio de la agricultura orgánica, sistemas agroforestales y edafología (suelos).</span>`;
  } else {
    btnElem.style.background = '#c62828';
    btnElem.style.color = 'white';
    btnElem.style.borderColor = '#c62828';
    ansDiv.innerHTML = `<span style="color: #c62828;"><i class="fa-solid fa-circle-xmark"></i> Incorrecto. Revisa el contenido de la lección e inténtalo nuevamente.</span>`;
  }
}

/* ==========================================================================
   SOPA DE LETRAS INTERACTIVA - SEXTO GRADO ÁREA 4 (AGRICULTURA SOSTENIBLE Y SUELOS)
   ========================================================================== */
const WS64_MATRIX = [
  ['O','R','G','A','N','I','C','O','X','Y','Z','A'],
  ['R','O','T','A','C','I','O','N','B','C','D','E'],
  ['A','S','O','C','I','A','C','I','O','N','F','G'],
  ['A','G','R','O','F','O','R','E','S','T','A','L'],
  ['T','E','X','T','U','R','A','H','I','J','K','L'],
  ['E','S','T','R','U','C','T','U','R','A','M','N'],
  ['N','I','T','R','O','G','E','N','O','O','P','Q'],
  ['F','O','S','F','O','R','O','R','S','T','U','V'],
  ['P','O','T','A','S','I','O','W','X','Y','Z','A'],
  ['A','C','I','D','E','Z','B','C','D','E','F','G'],
  ['A','B','C','D','E','F','G','H','I','J','K','L'],
  ['M','N','O','P','Q','R','S','T','U','V','W','X']
];

const WS64_TARGET_WORDS = {
  'ORGANICO': [[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7]],
  'ROTACION': [[1,0],[1,1],[1,2],[1,3],[1,4],[1,5],[1,6],[1,7]],
  'ASOCIACION': [[2,0],[2,1],[2,2],[2,3],[2,4],[2,5],[2,6],[2,7],[2,8],[2,9]],
  'AGROFORESTAL': [[3,0],[3,1],[3,2],[3,3],[3,4],[3,5],[3,6],[3,7],[3,8],[3,9],[3,10],[3,11]],
  'TEXTURA': [[4,0],[4,1],[4,2],[4,3],[4,4],[4,5],[4,6]],
  'ESTRUCTURA': [[5,0],[5,1],[5,2],[5,3],[5,4],[5,5],[5,6],[5,7],[5,8],[5,9]],
  'NITROGENO': [[6,0],[6,1],[6,2],[6,3],[6,4],[6,5],[6,6],[6,7],[6,8]],
  'FOSFORO': [[7,0],[7,1],[7,2],[7,3],[7,4],[7,5],[7,6]],
  'POTASIO': [[8,0],[8,1],[8,2],[8,3],[8,4],[8,5],[8,6]],
  'ACIDEZ': [[9,0],[9,1],[9,2],[9,3],[9,4],[9,5]]
};

const WS64_WORD_COLORS = {
  'ORGANICO': '#2e7d32',
  'ROTACION': '#00838f',
  'ASOCIACION': '#6a1b9a',
  'AGROFORESTAL': '#1565c0',
  'TEXTURA': '#e65100',
  'ESTRUCTURA': '#c62828',
  'NITROGENO': '#00695c',
  'FOSFORO': '#ad1457',
  'POTASIO': '#2e7d32',
  'ACIDEZ': '#d84315'
};

let selectedCoords64 = [];
let foundWords64 = new Set();
let ws64TimerInterval = null;
let ws64Seconds = 0;
let ws64TimerRunning = false;

function startWS64Timer() {
  if (ws64TimerRunning) return;
  ws64TimerRunning = true;
  ws64TimerInterval = setInterval(() => {
    ws64Seconds++;
    const mins = Math.floor(ws64Seconds / 60).toString().padStart(2, '0');
    const secs = (ws64Seconds % 60).toString().padStart(2, '0');
    const timerElem = document.getElementById('ws64-timer');
    if (timerElem) timerElem.textContent = `${mins}:${secs}`;
  }, 1000);
}

function stopWS64Timer() {
  clearInterval(ws64TimerInterval);
  ws64TimerRunning = false;
}

function initWordSearch64() {
  const gridContainer = document.getElementById('wordsearch64-grid');
  if (!gridContainer) return;

  stopWS64Timer();
  ws64Seconds = 0;
  foundWords64.clear();
  selectedCoords64 = [];

  const timerElem = document.getElementById('ws64-timer');
  if (timerElem) timerElem.textContent = '00:00';

  const counter = document.getElementById('ws64-counter');
  if (counter) counter.textContent = '0 / 10';

  gridContainer.innerHTML = '';
  for (let r = 0; r < 12; r++) {
    for (let c = 0; c < 12; c++) {
      const cell = document.createElement('div');
      cell.className = 'ws-cell ws64-cell';
      cell.dataset.r = r;
      cell.dataset.c = c;
      cell.dataset.letter = WS64_MATRIX[r][c];
      cell.textContent = WS64_MATRIX[r][c];
      cell.style.cssText = `
        width: 100%; aspect-ratio: 1; display: flex; align-items: center; justify-content: center;
        font-weight: 800; font-size: 1.05rem; background: #ffffff; border: 1px solid var(--border-color);
        border-radius: 6px; cursor: pointer; user-select: none; transition: all 0.15s ease;
      `;
      gridContainer.appendChild(cell);
    }
  }

  const wordListContainer = document.getElementById('ws64-word-list');
  if (wordListContainer) {
    const items = wordListContainer.querySelectorAll('div[data-word]');
    items.forEach(item => {
      if (!item.hasAttribute('data-orig-text')) {
        item.setAttribute('data-orig-text', item.textContent);
      }
      item.textContent = item.getAttribute('data-orig-text');
      item.style.color = 'var(--text-main)';
      item.style.fontWeight = '500';
    });
  }

  setupWS64Interactions();
}

function setupWS64Interactions() {
  const gridContainer = document.getElementById('wordsearch64-grid');
  if (!gridContainer) return;

  let isSelecting = false;

  const getCellFromEvent = (e) => {
    let clientX = e.clientX;
    let clientY = e.clientY;
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }
    const target = document.elementFromPoint(clientX, clientY);
    return target && target.classList.contains('ws64-cell') ? target : null;
  };

  const handleStart = (e) => {
    const cell = getCellFromEvent(e) || (e.target.classList.contains('ws64-cell') ? e.target : null);
    if (!cell) return;

    if (!ws64TimerRunning) startWS64Timer();
    isSelecting = true;
    selectedCoords64 = [];
    clearWS64TempSelection();
    addCellToWS64Selection(cell);
  };

  const handleMove = (e) => {
    if (!isSelecting) return;
    const cell = getCellFromEvent(e);
    if (cell) addCellToWS64Selection(cell);
  };

  const handleEnd = () => {
    if (!isSelecting) return;
    isSelecting = false;
    checkWS64Selection();
  };

  gridContainer.onmousedown = handleStart;
  gridContainer.onmousemove = handleMove;
  window.onmouseup = handleEnd;

  gridContainer.ontouchstart = handleStart;
  gridContainer.ontouchmove = handleMove;
  window.ontouchend = handleEnd;
}

function addCellToWS64Selection(cell) {
  const r = parseInt(cell.dataset.r);
  const c = parseInt(cell.dataset.c);

  const already = selectedCoords64.some(([sr, sc]) => sr === r && sc === c);
  if (!already) {
    selectedCoords64.push([r, c]);
    cell.style.background = 'var(--primary-light)';
    cell.style.color = 'white';
  }
}

function clearWS64TempSelection() {
  document.querySelectorAll('.ws64-cell').forEach(cell => {
    const r = parseInt(cell.dataset.r);
    const c = parseInt(cell.dataset.c);
    let isFound = false;

    for (let word of foundWords64) {
      const coords = WS64_TARGET_WORDS[word];
      if (coords.some(([fr, fc]) => fr === r && fc === c)) {
        isFound = true;
        break;
      }
    }

    if (!isFound) {
      cell.style.background = '#ffffff';
      cell.style.color = 'var(--text-main)';
    }
  });
}

function checkWS64Selection() {
  if (selectedCoords64.length === 0) return;

  let matchedWord = null;
  for (let [word, coords] of Object.entries(WS64_TARGET_WORDS)) {
    if (foundWords64.has(word)) continue;

    if (coords.length === selectedCoords64.length) {
      const matchForward = coords.every(([r, c], idx) => selectedCoords64[idx][0] === r && selectedCoords64[idx][1] === c);
      const matchBackward = coords.every(([r, c], idx) => selectedCoords64[selectedCoords64.length - 1 - idx][0] === r && selectedCoords64[selectedCoords64.length - 1 - idx][1] === c);

      if (matchForward || matchBackward) {
        matchedWord = word;
        break;
      }
    }
  }

  if (matchedWord) {
    foundWords64.add(matchedWord);
    markWS64WordAsFound(matchedWord);
  } else {
    clearWS64TempSelection();
  }
  selectedCoords64 = [];
}

function markWS64WordAsFound(word) {
  const coords = WS64_TARGET_WORDS[word];
  const wordColor = WS64_WORD_COLORS[word] || '#2e7d32';

  coords.forEach(([r, c]) => {
    const cell = document.querySelector(`.ws64-cell[data-r="${r}"][data-c="${c}"]`);
    if (cell) {
      cell.style.background = wordColor;
      cell.style.color = '#ffffff';
      cell.style.boxShadow = `0 0 6px ${wordColor}88`;
    }
  });

  const wordItem = document.querySelector(`#ws64-word-list div[data-word="${word}"]`);
  if (wordItem) {
    const origText = wordItem.getAttribute('data-orig-text') || wordItem.textContent;
    wordItem.innerHTML = `<span style="color: ${wordColor}; font-weight: 900; margin-right: 4px;">✓</span> ${origText}`;
    wordItem.style.color = wordColor;
    wordItem.style.fontWeight = '700';
  }

  const counter = document.getElementById('ws64-counter');
  if (counter) {
    counter.textContent = `${foundWords64.size} / 10`;
  }

  if (foundWords64.size === 10) {
    stopWS64Timer();
    const mins = Math.floor(ws64Seconds / 60).toString().padStart(2, '0');
    const secs = (ws64Seconds % 60).toString().padStart(2, '0');
    setTimeout(() => {
      alert(`🎉 ¡EXCELENTE TRABAJO! Has completado la Sopa de Letras de Agricultura Sostenible y Suelos (Sexto Grado - Área 4) en ${mins}:${secs}. ¡Felicidades!`);
    }, 200);
  }
}

