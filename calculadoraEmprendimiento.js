/**
 * Calculadora y Simulador de Emprendimiento Agropecuario Escolar
 * Programa de Agricultura - Sexto Grado (MEDUCA 2026 - Área 3)
 */
(function() {
  'use strict';

  const PRESETS = {
    tomate: {
      nombre: 'Tomate Perita (Bancal Escolar 1)',
      semillas: 3.50,
      abono: 4.00,
      otros: 2.50,
      unidad: 'libras',
      cosecha: 40,
      margen: 35
    },
    culantro: {
      nombre: 'Culantro Coyote Criollo',
      semillas: 1.50,
      abono: 2.50,
      otros: 1.00,
      unidad: 'atados',
      cosecha: 50,
      margen: 40
    },
    pimenton: {
      nombre: 'Pimentón Verde Criollo',
      semillas: 3.00,
      abono: 4.50,
      otros: 2.00,
      unidad: 'libras',
      cosecha: 35,
      margen: 30
    },
    lechuga: {
      nombre: 'Lechuga de Bancal Escolar',
      semillas: 2.00,
      abono: 3.50,
      otros: 2.50,
      unidad: 'unidades',
      cosecha: 25,
      margen: 35
    }
  };

  function initCalculadora() {
    const inputNombre = document.getElementById('calcNombreCultivo');
    const inputSemillas = document.getElementById('calcGastoSemillas');
    const inputAbono = document.getElementById('calcGastoAbono');
    const inputOtros = document.getElementById('calcGastoOtros');
    const selectUnidad = document.getElementById('calcUnidadMedida');
    const inputCosecha = document.getElementById('calcCosechaTotal');
    const sliderMargen = document.getElementById('calcMargenSlider');
    const displayMargen = document.getElementById('calcMargenDisplay');
    const displayCosecha = document.getElementById('calcCosechaDisplay');

    if (!inputNombre || !inputSemillas || !sliderMargen) return;

    function escapeHTML(str) {
      return str.replace(/[&<>'"]/g, tag => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;'
      }[tag] || tag));
    }

    function calcular() {
      const nombre = inputNombre.value.trim() || 'Cultivo Escolar';
      const semillas = Math.max(0, parseFloat(inputSemillas.value) || 0);
      const abono = Math.max(0, parseFloat(inputAbono.value) || 0);
      const otros = Math.max(0, parseFloat(inputOtros.value) || 0);
      const unidad = selectUnidad.value;
      const cosechaTotal = Math.max(1, parseFloat(inputCosecha.value) || 1);
      const margen = parseInt(sliderMargen.value, 10) || 30;

      if (displayMargen) displayMargen.textContent = margen + '%';
      if (displayCosecha) displayCosecha.textContent = cosechaTotal + ' ' + unidad;

      const gastoTotal = semillas + abono + otros;
      const mermaFactor = 0.95; // 5% de merma normal poscosecha en clasificación de calidad
      const cosechaAprovechable = Math.max(0.1, cosechaTotal * mermaFactor);
      const costoUnitario = gastoTotal > 0 ? (gastoTotal / cosechaAprovechable) : 0;
      const precioVenta = costoUnitario * (1 + (margen / 100));
      const ingresosTotales = cosechaAprovechable * precioVenta;
      const gananciaNeta = ingresosTotales - gastoTotal;

      const unidadSingular = unidad.endsWith('s') ? unidad.slice(0, -1) : unidad;

      // Actualizar UI
      const resCostoTotal = document.getElementById('resCostoTotal');
      const resCostoUnitario = document.getElementById('resCostoUnitario');
      const resSubCostoUnitario = document.getElementById('resSubCostoUnitario');
      const resPrecioVenta = document.getElementById('resPrecioVenta');
      const resSubPrecioVenta = document.getElementById('resSubPrecioVenta');
      const resGananciaNeta = document.getElementById('resGananciaNeta');
      const resBadge = document.getElementById('resBadgeRentabilidad');
      const resExplicacion = document.getElementById('resExplicacionDidactica');

      if (resCostoTotal) resCostoTotal.textContent = '$' + gastoTotal.toFixed(2);
      if (resCostoUnitario) resCostoUnitario.textContent = '$' + costoUnitario.toFixed(2);
      if (resSubCostoUnitario) resSubCostoUnitario.textContent = 'Por ' + unidadSingular + ' aprovechable';
      if (resPrecioVenta) resPrecioVenta.textContent = '$' + precioVenta.toFixed(2);
      if (resSubPrecioVenta) resSubPrecioVenta.textContent = 'Precio justo sugerido';

      if (resGananciaNeta) {
        resGananciaNeta.textContent = (gananciaNeta >= 0 ? '+$' : '-$') + Math.abs(gananciaNeta).toFixed(2);
      }

      if (resBadge) {
        if (gananciaNeta >= 5) {
          resBadge.textContent = '🌟 Proyecto Muy Rentable';
          resBadge.style.background = '#dcfce7';
          resBadge.style.color = '#15803d';
          resBadge.style.borderColor = '#86efac';
        } else if (gananciaNeta > 0) {
          resBadge.textContent = '🌱 Proyecto Sostenible';
          resBadge.style.background = '#fef9c3';
          resBadge.style.color = '#854d0e';
          resBadge.style.borderColor = '#fde047';
        } else {
          resBadge.textContent = '⚠️ Revisar Costos';
          resBadge.style.background = '#fee2e2';
          resBadge.style.color = '#b91c1c';
          resBadge.style.borderColor = '#fca5a5';
        }
      }

      if (resExplicacion) {
        resExplicacion.innerHTML = 'Al cosechar <strong>' + cosechaTotal + ' ' + unidad + '</strong> de <em>' + escapeHTML(nombre) + '</em> (aprox. <strong>' + cosechaAprovechable.toFixed(1) + '</strong> aprovechables tras control de calidad), vender a <strong>$' + precioVenta.toFixed(2) + ' por ' + unidadSingular + '</strong> permite cubrir la inversión total de <strong>$' + gastoTotal.toFixed(2) + '</strong> y generar <strong>+$' + gananciaNeta.toFixed(2) + ' netos</strong> para el fondo del huerto escolar.';
      }
    }

    // Escuchar cambios en los inputs
    [inputNombre, inputSemillas, inputAbono, inputOtros, selectUnidad, inputCosecha, sliderMargen].forEach(input => {
      input.addEventListener('input', calcular);
      input.addEventListener('change', calcular);
    });

    // Conectar botones de presets
    const presetButtons = document.querySelectorAll('.btn-cultivo-preset');
    presetButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        presetButtons.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const tipo = this.getAttribute('data-cultivo');
        if (PRESETS[tipo]) {
          const p = PRESETS[tipo];
          inputNombre.value = p.nombre;
          inputSemillas.value = p.semillas.toFixed(2);
          inputAbono.value = p.abono.toFixed(2);
          inputOtros.value = p.otros.toFixed(2);
          selectUnidad.value = p.unidad;
          inputCosecha.value = p.cosecha;
          sliderMargen.value = p.margen;
        }
        calcular();
      });
    });

    // Botón copiar ficha
    const btnCopiar = document.getElementById('btnCopiarFicha');
    const msgFeedback = document.getElementById('calcMsgFeedback');
    if (btnCopiar) {
      btnCopiar.addEventListener('click', () => {
        const nombre = inputNombre.value;
        const total = document.getElementById('resCostoTotal').textContent;
        const unitario = document.getElementById('resCostoUnitario').textContent;
        const precio = document.getElementById('resPrecioVenta').textContent;
        const ganancia = document.getElementById('resGananciaNeta').textContent;
        const cosecha = inputCosecha.value + ' ' + selectUnidad.value;

        const texto = `FICHA DE EMPRENDIMIENTO AGROESCOLAR (MEDUCA 2026 - 6.° GRADO)
Cultivo: ${nombre}
Producción estimada: ${cosecha}
Inversión total en insumos: ${total}
Costo unitario de producción: ${unitario}
Precio de venta sugerido: ${precio}
Ganancia neta proyectada para el huerto: ${ganancia}
Estado: Proyecto Sostenible y Rentable`;

        navigator.clipboard.writeText(texto).then(() => {
          if (msgFeedback) {
            msgFeedback.style.display = 'block';
            setTimeout(() => { msgFeedback.style.display = 'none'; }, 4000);
          }
        }).catch(() => {
          alert(texto);
        });
      });
    }

    // Botón reset
    const btnReset = document.getElementById('btnResetCalc');
    if (btnReset) {
      btnReset.addEventListener('click', () => {
        const tomateBtn = document.querySelector('.btn-cultivo-preset[data-cultivo="tomate"]');
        if (tomateBtn) tomateBtn.click();
      });
    }

    // Cálculo inicial
    calcular();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCalculadora);
  } else {
    initCalculadora();
  }
})();
