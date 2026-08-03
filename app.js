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
    if (navMenu) {
      navMenu.scrollTop = 0;
      navMenu.classList.add('mobile-open');
    }
    if (mobileOverlay) mobileOverlay.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
   UNIVERSAL WORD SEARCH ENGINE (Drag & Swipe + Tap-to-Select)
   ========================================================================== */
function createWordSearchEngine(cfg) {
  const {
    gridId,
    counterId,
    timerId,
    wordListId,
    matrix,
    targetWords,
    wordColors,
    timerObj,
    winAlertMessage
  } = cfg;

  const gridContainer = document.getElementById(gridId);
  const counterElem = document.getElementById(counterId);
  const timerElem = document.getElementById(timerId);
  const wordListElem = document.getElementById(wordListId);

  if (!gridContainer) return;

  gridContainer.innerHTML = '';
  gridContainer.style.touchAction = 'none';
  gridContainer.style.userSelect = 'none';
  gridContainer.style.webkitUserSelect = 'none';

  const rows = matrix.length;
  const cols = matrix[0].length;

  const foundWords = new Set();
  const lockedCells = new Map();

  let isSelecting = false;
  let startCell = null;
  let currentSelection = [];

  function resetTimer() {
    if (timerObj.interval) clearInterval(timerObj.interval);
    timerObj.interval = null;
    timerObj.seconds = 0;
    timerObj.running = false;
    if (timerElem) timerElem.textContent = '00:00';
  }

  function startTimer() {
    if (timerObj.running) return;
    timerObj.running = true;
    timerObj.seconds = 0;
    timerObj.interval = setInterval(() => {
      timerObj.seconds++;
      const mins = Math.floor(timerObj.seconds / 60).toString().padStart(2, '0');
      const secs = (timerObj.seconds % 60).toString().padStart(2, '0');
      if (timerElem) timerElem.textContent = `${mins}:${secs}`;
    }, 1000);
  }

  function stopTimer() {
    if (timerObj.interval) {
      clearInterval(timerObj.interval);
      timerObj.interval = null;
    }
    timerObj.running = false;
  }

  resetTimer();
  const totalWords = Object.keys(targetWords).length;
  if (counterElem) counterElem.textContent = `0 / ${totalWords}`;

  if (wordListElem) {
    wordListElem.querySelectorAll('div').forEach(item => {
      if (!item.getAttribute('data-orig-text')) {
        item.setAttribute('data-orig-text', item.textContent);
      }
      item.textContent = item.getAttribute('data-orig-text');
      item.style.textDecoration = 'none';
      item.style.opacity = '1';
      item.style.color = 'var(--text-main)';
      item.style.fontWeight = '600';
    });
  }

  function getLineCells(r1, c1, r2, c2) {
    const dr = r2 - r1;
    const dc = c2 - c1;
    const absR = Math.abs(dr);
    const absC = Math.abs(dc);

    if (dr !== 0 && dc !== 0 && absR !== absC) {
      return null;
    }

    const stepR = dr === 0 ? 0 : dr / absR;
    const stepC = dc === 0 ? 0 : dc / absC;
    const steps = Math.max(absR, absC);

    const cells = [];
    for (let i = 0; i <= steps; i++) {
      cells.push({ r: r1 + i * stepR, c: c1 + i * stepC });
    }
    return cells;
  }

  function renderBoard() {
    const activeSet = new Set(currentSelection.map(item => `${item.r},${item.c}`));

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const key = `${r},${c}`;
        const cellElem = gridContainer.querySelector(`.ws-cell[data-r="${r}"][data-c="${c}"]`);
        if (!cellElem) continue;

        if (activeSet.has(key)) {
          cellElem.style.background = 'var(--gold)';
          cellElem.style.color = 'var(--primary-dark)';
          cellElem.style.transform = 'scale(1.05)';
        } else if (lockedCells.has(key)) {
          const color = lockedCells.get(key);
          cellElem.style.background = color;
          cellElem.style.color = '#ffffff';
          cellElem.style.transform = 'none';
          cellElem.style.boxShadow = `0 0 6px ${color}88`;
        } else {
          cellElem.style.background = '#ffffff';
          cellElem.style.color = '#000000';
          cellElem.style.transform = 'none';
          cellElem.style.boxShadow = 'none';
        }
      }
    }
  }

  function getCellFromPoint(x, y) {
    const elem = document.elementFromPoint(x, y);
    if (!elem) return null;
    const cell = elem.closest('.ws-cell');
    if (!cell || !gridContainer.contains(cell)) return null;
    const r = parseInt(cell.getAttribute('data-r'), 10);
    const c = parseInt(cell.getAttribute('data-c'), 10);
    return { r, c };
  }

  function checkSelectionMatch() {
    if (currentSelection.length === 0) return false;

    const chars = currentSelection.map(item => matrix[item.r][item.c]).join('');
    const charsRev = currentSelection.map(item => matrix[item.r][item.c]).reverse().join('');

    for (const [word, coords] of Object.entries(targetWords)) {
      if (foundWords.has(word)) continue;

      if (chars === word || charsRev === word) {
        foundWords.add(word);
        const color = wordColors[word] || 'var(--primary)';

        coords.forEach(([r, c]) => {
          lockedCells.set(`${r},${c}`, color);
        });

        if (wordListElem) {
          const wordItem = wordListElem.querySelector(`div[data-word="${word}"]`);
          if (wordItem) {
            const origText = wordItem.getAttribute('data-orig-text') || wordItem.textContent;
            wordItem.innerHTML = `<span style="color: ${color}; font-weight: 900; margin-right: 4px;">✓</span> ${origText}`;
            wordItem.style.color = color;
            wordItem.style.fontWeight = '700';
          }
        }

        if (counterElem) {
          counterElem.textContent = `${foundWords.size} / ${totalWords}`;
        }

        if (foundWords.size === totalWords) {
          stopTimer();
          const mins = Math.floor(timerObj.seconds / 60).toString().padStart(2, '0');
          const secs = (timerObj.seconds % 60).toString().padStart(2, '0');
          const msg = winAlertMessage
            ? winAlertMessage.replace('{mins}', mins).replace('{secs}', secs)
            : `🎉 ¡ENHORABUENA! Has completado la Sopa de Letras en ${mins}:${secs}.`;
          setTimeout(() => alert(msg), 200);
        }

        return true;
      }
    }
    return false;
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cell = document.createElement('div');
      cell.classList.add('ws-cell');
      cell.setAttribute('data-r', r);
      cell.setAttribute('data-c', c);
      cell.textContent = matrix[r][c];

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
      cell.style.userSelect = 'none';
      cell.style.webkitUserSelect = 'none';

      gridContainer.appendChild(cell);
    }
  }

  gridContainer.addEventListener('pointerdown', (e) => {
    startTimer();
    const cell = getCellFromPoint(e.clientX, e.clientY);
    if (!cell) return;

    isSelecting = true;
    if (!startCell) {
      startCell = cell;
      currentSelection = [cell];
    } else {
      const line = getLineCells(startCell.r, startCell.c, cell.r, cell.c);
      if (line) {
        currentSelection = line;
      } else {
        startCell = cell;
        currentSelection = [cell];
      }
    }
    renderBoard();
  });

  gridContainer.addEventListener('pointermove', (e) => {
    if (!isSelecting || !startCell) return;
    const cell = getCellFromPoint(e.clientX, e.clientY);
    if (!cell) return;

    const line = getLineCells(startCell.r, startCell.c, cell.r, cell.c);
    if (line) {
      currentSelection = line;
      renderBoard();
    }
  });

  const handlePointerUp = () => {
    if (!isSelecting) return;
    isSelecting = false;

    const matched = checkSelectionMatch();
    if (matched) {
      startCell = null;
      currentSelection = [];
    } else {
      if (currentSelection.length > 1) {
        startCell = null;
        currentSelection = [];
      }
    }
    renderBoard();
  };

  gridContainer.addEventListener('pointerup', handlePointerUp);
  gridContainer.addEventListener('pointercancel', handlePointerUp);
}

/* ==========================================================================
   SOPA DE LETRAS INTERACTIVA - TERCER GRADO ÁREA 1
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

const wsTimerObj = { interval: null, seconds: 0, running: false };

function initWordSearch() {
  createWordSearchEngine({
    gridId: 'wordsearch-grid',
    counterId: 'ws-counter',
    timerId: 'ws-timer',
    wordListId: 'ws-word-list',
    matrix: WS_MATRIX,
    targetWords: WS_TARGET_WORDS,
    wordColors: WS_WORD_COLORS,
    timerObj: wsTimerObj,
    winAlertMessage: '🎉 ¡ENHORABUENA! Has encontrado las 10 palabras en un tiempo récord de {mins}:{secs}. ¡Eres un Gran Científico Agrícola!'
  });
}

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

const ws2TimerObj = { interval: null, seconds: 0, running: false };

function initWordSearch2() {
  createWordSearchEngine({
    gridId: 'wordsearch2-grid',
    counterId: 'ws2-counter',
    timerId: 'ws2-timer',
    wordListId: 'ws2-word-list',
    matrix: WS2_MATRIX,
    targetWords: WS2_TARGET_WORDS,
    wordColors: WS2_WORD_COLORS,
    timerObj: ws2TimerObj,
    winAlertMessage: '🎉 ¡EXCELENTE TRABAJO! Has encontrado las 10 palabras de Herramientas y Tecnología en un tiempo récord de {mins}:{secs}. ¡Eres un Maestro Tecnólogo del Campo!'
  });
}

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

const ws3TimerObj = { interval: null, seconds: 0, running: false };

function initWordSearch3() {
  createWordSearchEngine({
    gridId: 'wordsearch3-grid',
    counterId: 'ws3-counter',
    timerId: 'ws3-timer',
    wordListId: 'ws3-word-list',
    matrix: WS3_MATRIX,
    targetWords: WS3_TARGET_WORDS,
    wordColors: WS3_WORD_COLORS,
    timerObj: ws3TimerObj,
    winAlertMessage: '🎉 ¡FELICITACIONES! Has completado las 10 palabras de Producción de Alimentos y Nutrición en {mins}:{secs}. ¡Eres un Campeón de la Nutrición Agrícola!'
  });
}

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

const ws4TimerObj = { interval: null, seconds: 0, running: false };

function initWordSearch4() {
  createWordSearchEngine({
    gridId: 'wordsearch4-grid',
    counterId: 'ws4-counter',
    timerId: 'ws4-timer',
    wordListId: 'ws4-word-list',
    matrix: WS4_MATRIX,
    targetWords: WS4_TARGET_WORDS,
    wordColors: WS4_WORD_COLORS,
    timerObj: ws4TimerObj,
    winAlertMessage: '🎉 ¡MAGNÍFICO TRABAJO! Has encontrado las 10 palabras de Ambiente y Agricultura Sostenible en {mins}:{secs}. ¡Eres un Protector Oficial de la Madre Tierra!'
  });
}

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

const ws41TimerObj = { interval: null, seconds: 0, running: false };

function initWordSearch41() {
  createWordSearchEngine({
    gridId: 'wordsearch41-grid',
    counterId: 'ws41-counter',
    timerId: 'ws41-timer',
    wordListId: 'ws41-word-list',
    matrix: WS41_MATRIX,
    targetWords: WS41_TARGET_WORDS,
    wordColors: WS41_WORD_COLORS,
    timerObj: ws41TimerObj,
    winAlertMessage: '🎉 ¡SOBRESALIENTE! Has completado la Sopa de Letras de Cuarto Grado (Área 1) en {mins}:{secs}. ¡Eres un Paisajista Botánico Experto!'
  });
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

const ws42TimerObj = { interval: null, seconds: 0, running: false };

function initWordSearch42() {
  createWordSearchEngine({
    gridId: 'wordsearch42-grid',
    counterId: 'ws42-counter',
    timerId: 'ws42-timer',
    wordListId: 'ws42-word-list',
    matrix: WS42_MATRIX,
    targetWords: WS42_TARGET_WORDS,
    wordColors: WS42_WORD_COLORS,
    timerObj: ws42TimerObj,
    winAlertMessage: '🎉 ¡EXCELENTE! Has encontrado las 10 palabras de Herramientas Manuales y Seguridad (Cuarto Grado) en {mins}:{secs}. ¡Eres un Operador Técnico Agrícola Seguro!'
  });
}

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

const ws43TimerObj = { interval: null, seconds: 0, running: false };

function initWordSearch43() {
  createWordSearchEngine({
    gridId: 'wordsearch43-grid',
    counterId: 'ws43-counter',
    timerId: 'ws43-timer',
    wordListId: 'ws43-word-list',
    matrix: WS43_MATRIX,
    targetWords: WS43_TARGET_WORDS,
    wordColors: WS43_WORD_COLORS,
    timerObj: ws43TimerObj,
    winAlertMessage: '🎉 ¡FELICITACIONES! Has completado la Sopa de Letras de Beneficios y Tradiciones (Cuarto Grado) en {mins}:{secs}. ¡Eres un Promotor de la Soberanía Alimentaria!'
  });
}

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

const ws44TimerObj = { interval: null, seconds: 0, running: false };

function initWordSearch44() {
  createWordSearchEngine({
    gridId: 'wordsearch44-grid',
    counterId: 'ws44-counter',
    timerId: 'ws44-timer',
    wordListId: 'ws44-word-list',
    matrix: WS44_MATRIX,
    targetWords: WS44_TARGET_WORDS,
    wordColors: WS44_WORD_COLORS,
    timerObj: ws44TimerObj,
    winAlertMessage: '🎉 ¡FABULOSO! Has completado la Sopa de Letras de Residuos Orgánicos e Inorgánicos y Perfil del Suelo (Cuarto Grado) en {mins}:{secs}. ¡Felicidades!'
  });
}

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

const ws51TimerObj = { interval: null, seconds: 0, running: false };

function initWordSearch51() {
  createWordSearchEngine({
    gridId: 'wordsearch51-grid',
    counterId: 'ws51-counter',
    timerId: 'ws51-timer',
    wordListId: 'ws51-word-list',
    matrix: WS51_MATRIX,
    targetWords: WS51_TARGET_WORDS,
    wordColors: WS51_WORD_COLORS,
    timerObj: ws51TimerObj,
    winAlertMessage: '🎉 ¡EXCELENTE TRABAJO! Has completado la Sopa de Letras de Jardines y Cuidados Vegetales (Quinto Grado) en {mins}:{secs}. ¡Felicidades!'
  });
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

const ws52TimerObj = { interval: null, seconds: 0, running: false };

function initWordSearch52() {
  createWordSearchEngine({
    gridId: 'wordsearch52-grid',
    counterId: 'ws52-counter',
    timerId: 'ws52-timer',
    wordListId: 'ws52-word-list',
    matrix: WS52_MATRIX,
    targetWords: WS52_TARGET_WORDS,
    wordColors: WS52_WORD_COLORS,
    timerObj: ws52TimerObj,
    winAlertMessage: '🎉 ¡EXCELENTE TRABAJO! Has completado la Sopa de Letras de Herramientas, Mantenimiento y Seguridad (Quinto Grado - Área 2) en {mins}:{secs}. ¡Felicidades!'
  });
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

const ws53TimerObj = { interval: null, seconds: 0, running: false };

function initWordSearch53() {
  createWordSearchEngine({
    gridId: 'wordsearch53-grid',
    counterId: 'ws53-counter',
    timerId: 'ws53-timer',
    wordListId: 'ws53-word-list',
    matrix: WS53_MATRIX,
    targetWords: WS53_TARGET_WORDS,
    wordColors: WS53_WORD_COLORS,
    timerObj: ws53TimerObj,
    winAlertMessage: '🎉 ¡EXCELENTE TRABAJO! Has completado la Sopa de Letras de Producción de Alimentos (Quinto Grado - Área 3) en {mins}:{secs}. ¡Felicidades!'
  });
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

const ws54TimerObj = { interval: null, seconds: 0, running: false };

function initWordSearch54() {
  createWordSearchEngine({
    gridId: 'wordsearch54-grid',
    counterId: 'ws54-counter',
    timerId: 'ws54-timer',
    wordListId: 'ws54-word-list',
    matrix: WS54_MATRIX,
    targetWords: WS54_TARGET_WORDS,
    wordColors: WS54_WORD_COLORS,
    timerObj: ws54TimerObj,
    winAlertMessage: '🎉 ¡EXCELENTE TRABAJO! Has completado la Sopa de Letras de Agricultura Agrosostenible (Quinto Grado - Área 4) en {mins}:{secs}. ¡Felicidades!'
  });
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

const ws61TimerObj = { interval: null, seconds: 0, running: false };

function initWordSearch61() {
  createWordSearchEngine({
    gridId: 'wordsearch61-grid',
    counterId: 'ws61-counter',
    timerId: 'ws61-timer',
    wordListId: 'ws61-word-list',
    matrix: WS61_MATRIX,
    targetWords: WS61_TARGET_WORDS,
    wordColors: WS61_WORD_COLORS,
    timerObj: ws61TimerObj,
    winAlertMessage: '🎉 ¡EXCELENTE TRABAJO! Has completado la Sopa de Letras de Jardín y Especies Vegetales (Sexto Grado - Área 1) en {mins}:{secs}. ¡Felicidades!'
  });
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

const ws62TimerObj = { interval: null, seconds: 0, running: false };

function initWordSearch62() {
  createWordSearchEngine({
    gridId: 'wordsearch62-grid',
    counterId: 'ws62-counter',
    timerId: 'ws62-timer',
    wordListId: 'ws62-word-list',
    matrix: WS62_MATRIX,
    targetWords: WS62_TARGET_WORDS,
    wordColors: WS62_WORD_COLORS,
    timerObj: ws62TimerObj,
    winAlertMessage: '🎉 ¡EXCELENTE TRABAJO! Has completado la Sopa de Letras de Maquinaria y Equipos de Tiro (Sexto Grado - Área 2) en {mins}:{secs}. ¡Felicidades!'
  });
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

const ws63TimerObj = { interval: null, seconds: 0, running: false };

function initWordSearch63() {
  createWordSearchEngine({
    gridId: 'wordsearch63-grid',
    counterId: 'ws63-counter',
    timerId: 'ws63-timer',
    wordListId: 'ws63-word-list',
    matrix: WS63_MATRIX,
    targetWords: WS63_TARGET_WORDS,
    wordColors: WS63_WORD_COLORS,
    timerObj: ws63TimerObj,
    winAlertMessage: '🎉 ¡EXCELENTE TRABAJO! Has completado la Sopa de Letras de Tecnologías Agrícolas (Sexto Grado - Área 3) en {mins}:{secs}. ¡Felicidades!'
  });
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

const ws64TimerObj = { interval: null, seconds: 0, running: false };

function initWordSearch64() {
  createWordSearchEngine({
    gridId: 'wordsearch64-grid',
    counterId: 'ws64-counter',
    timerId: 'ws64-timer',
    wordListId: 'ws64-word-list',
    matrix: WS64_MATRIX,
    targetWords: WS64_TARGET_WORDS,
    wordColors: WS64_WORD_COLORS,
    timerObj: ws64TimerObj,
    winAlertMessage: '🎉 ¡EXCELENTE TRABAJO! Has completado la Sopa de Letras de Agricultura Sostenible y Suelos (Sexto Grado - Área 4) en {mins}:{secs}. ¡Felicidades!'
  });
}

// Auto init all Word Searches on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  initWordSearch();
  initWordSearch2();
  initWordSearch3();
  initWordSearch4();
  initWordSearch41();
  initWordSearch42();
  initWordSearch43();
  initWordSearch44();
  initWordSearch51();
  initWordSearch52();
  initWordSearch53();
  initWordSearch54();
  initWordSearch61();
  initWordSearch62();
  initWordSearch63();
  initWordSearch64();
});

