import io
import sys

# Leer index.html con UTF-8
with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

start_marker = '<!-- Herramienta Interactiva: El Laboratorio del Suelo (NPK y pH) -->'
end_marker = '</section>\n\n    <!-- SEXTO SUBPAGES (ÁREA 1 to 4) -->'

idx_start = html.find(start_marker)
idx_end = html.find(end_marker)

print(f"idx_start: {idx_start}, idx_end: {idx_end}")

if idx_start == -1 or idx_end == -1:
    print("Markers not found!")
    sys.exit(1)

# Extraer el bloque actual para verificar
current_block = html[idx_start:idx_end]
print(f"Current block length: {len(current_block)}")

new_block = '''<!-- Herramienta Interactiva: El Laboratorio del Suelo (NPK y pH) -->
      <div class="semantic-card-standard mt-36" id="laboratorio-suelo-sexto" style="margin-top: 36px; padding: 28px 30px; border-radius: var(--radius-md); box-shadow: var(--shadow-sm); border: 1px solid var(--border-color); background: #ffffff;">
        
        <!-- Encabezado del Laboratorio -->
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px; margin-bottom: 22px; padding-bottom: 16px; border-bottom: 1px solid var(--border-color);">
          <div>
            <div style="display: inline-flex; align-items: center; gap: 8px; background: rgba(2, 132, 199, 0.15); color: #0369a1; padding: 4px 12px; border-radius: var(--radius-pill); font-size: 0.8rem; font-weight: 700; margin-bottom: 8px; border: 1px solid rgba(2, 132, 199, 0.35);">
              <i class="fa-solid fa-flask"></i> Edafología y Nutrición Vegetal • Área 4 (MEDUCA 2026)
            </div>
            <h3 style="font-family: var(--font-heading); font-size: 1.7rem; color: var(--primary-dark); display: flex; align-items: center; gap: 10px; margin: 0;">
              <i class="fa-solid fa-atom" style="color: #0284c7;"></i> El Laboratorio del Suelo: Nutrientes Esenciales y Semáforo de pH
            </h3>
          </div>
          <div class="tabs-suelo-nav">
            <button type="button" class="tab-suelo-btn active" data-tab="tab-npk">🌱 Tabla Científica de Nutrientes</button>
            <button type="button" class="tab-suelo-btn" data-tab="tab-ph">🧪 Semáforo de pH</button>
            <button type="button" class="tab-suelo-btn" data-tab="tab-diagnostico">🔍 Diagnóstico de Hojas</button>
          </div>
        </div>

        <p style="color: var(--text-muted); font-size: 0.98rem; line-height: 1.6; margin-bottom: 24px;">
          Explora la nutrición vegetal con rigor científico: clasificaciones agronómicas (FAO / IPNI / USDA), absorción iónica, fuentes orgánicas para el huerto escolar y la influencia determinante del pH del suelo. Selecciona las pestañas para experimentar:
        </p>

        <!-- PESTAÑA 1: NUTRIENTES Y GRUPOS CIENTÍFICOS -->
        <div id="tab-npk" class="tab-suelo-panel" style="display: block;">
          
          <!-- Selector de Grupos Científicos -->
          <div style="margin-bottom: 18px;">
            <span style="font-size: 0.82rem; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; display: block; margin-bottom: 8px;">
              Selecciona una Clasificación Científica de Nutrientes:
            </span>
            <div class="grupos-suelo-nav" style="display: flex; gap: 8px; flex-wrap: wrap;">
              <button type="button" class="btn-grupo-suelo active" data-grupo="primarios">
                🌱 Macronutrientes Primarios (N - P - K)
              </button>
              <button type="button" class="btn-grupo-suelo" data-grupo="secundarios">
                🧱 Macronutrientes Secundarios (Ca - Mg - S)
              </button>
              <button type="button" class="btn-grupo-suelo" data-grupo="micros">
                🔬 Micronutrientes (Fe - Zn - Mn - B - Cu - Mo)
              </button>
              <button type="button" class="btn-grupo-suelo" data-grupo="estructurales">
                💨 No Minerales / Estructurales (C - H - O)
              </button>
              <button type="button" class="btn-grupo-suelo" data-grupo="beneficos">
                ✨ Elementos Benéficos (Si - Co)
              </button>
            </div>
          </div>

          <!-- Banner Informativo del Grupo Seleccionado -->
          <div id="grupoInfoBanner"></div>

          <!-- Cuadrícula Dinámica de Elementos del Grupo -->
          <div id="sueloElementosGrid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 12px; margin-bottom: 20px;"></div>

          <!-- Contenedor Dinámico de la Ficha Técnica del Elemento Seleccionado -->
          <div id="nutrienteDetalleBox"></div>

          <!-- Cuadro de Fundamentación Científica y Pedagógica -->
          <div style="margin-top: 20px; background: var(--warm-bg); border: 1px solid var(--border-color); border-radius: var(--radius-sm); padding: 16px 20px; display: flex; align-items: flex-start; gap: 14px;">
            <div style="font-size: 1.6rem; color: var(--primary-light); flex-shrink: 0; line-height: 1;">
              🏛️
            </div>
            <div>
              <strong style="color: var(--primary-dark); font-size: 0.95rem; display: block; margin-bottom: 4px;">
                Criterios de Esencialidad Científica (Arnon & Stout, 1939 • Marschner, 2012):
              </strong>
              <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.6; margin: 0;">
                Para que un nutriente sea considerado <em>esencial</em>: <strong>1)</strong> La planta no puede completar su ciclo vital (vegetativo y reproductivo) en su ausencia; <strong>2)</strong> Su rol biológico no puede ser reemplazado por ningún otro elemento; <strong>3)</strong> Participa directamente en el metabolismo o forma parte de un compuesto vital de la planta. Los <strong>Elementos Benéficos</strong> (como el Silicio y Cobalto) no son estrictamente vitales para todas las plantas, pero mejoran sustancialmente su arquitectura celular, resistencia a plagas y fijación biológica de nitrógeno.
              </p>
            </div>
          </div>

        </div>

        <!-- PESTAÑA 2: SEMÁFORO DE pH -->
        <div id="tab-ph" class="tab-suelo-panel" style="display: none;">
          
          <div style="background: var(--warm-bg); padding: 24px; border-radius: var(--radius-sm); border: 1px solid var(--border-color); margin-bottom: 20px;">
            
            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 14px; margin-bottom: 20px;">
              <div>
                <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700; text-transform: uppercase; letter-spacing: 0.5px;">Reacción Química del Suelo:</span>
                <div style="display: flex; align-items: baseline; gap: 8px;">
                  <span id="displayPhNumero" style="font-size: 2.8rem; font-weight: 900; line-height: 1; font-family: var(--font-heading); color: #16a34a;">6.5</span>
                  <span id="badgePhNivel" style="font-size: 0.82rem; font-weight: 800; padding: 4px 12px; border-radius: var(--radius-pill); border: 1px solid #16a34a; background: #dcfce7; color: #16a34a;">
                    Óptimo — Máxima Fertilidad
                  </span>
                </div>
              </div>

              <!-- Botones Rápidos de Presets de pH -->
              <div style="display: flex; gap: 6px; flex-wrap: wrap;">
                <button type="button" class="btn-quick-ph" data-ph="4.8" style="padding: 6px 12px; border-radius: var(--radius-pill); border: 1px solid #fca5a5; background: #fee2e2; color: #991b1b; font-size: 0.78rem; font-weight: 700; cursor: pointer;">🔴 Suelo Ácido (4.8)</button>
                <button type="button" class="btn-quick-ph" data-ph="6.5" style="padding: 6px 12px; border-radius: var(--radius-pill); border: 1px solid #86efac; background: #dcfce7; color: #166534; font-size: 0.78rem; font-weight: 700; cursor: pointer;">🟢 Suelo Ideal (6.5)</button>
                <button type="button" class="btn-quick-ph" data-ph="8.0" style="padding: 6px 12px; border-radius: var(--radius-pill); border: 1px solid #c4b5fd; background: #ede9fe; color: #5b21b6; font-size: 0.78rem; font-weight: 700; cursor: pointer;">🔵 Suelo Alcalino (8.0)</button>
              </div>
            </div>

            <!-- Slider Interactivo de Escala de pH -->
            <div style="margin-bottom: 24px;">
              <input type="range" id="sliderPhValue" min="4.0" max="9.0" step="0.1" value="6.5" style="width: 100%; accent-color: #16a34a; height: 10px; cursor: pointer;">
              <div style="display: flex; justify-content: space-between; font-size: 0.75rem; font-weight: 700; margin-top: 6px;">
                <span style="color: #dc2626;">4.0 (Muy Ácido)</span>
                <span style="color: #ea580c;">5.5 (Ácido)</span>
                <span style="color: #16a34a; background: #dcfce7; padding: 2px 8px; border-radius: 4px;">6.5 (Ideal Escolar)</span>
                <span style="color: #0d9488;">7.0 (Neutro)</span>
                <span style="color: #7c3aed;">9.0 (Muy Alcalino)</span>
              </div>
            </div>

            <!-- Probeta Virtual y Diagnóstico de Fertilidad -->
            <div style="display: grid; grid-template-columns: 80px 1fr; gap: 20px; align-items: center;">
              
              <!-- Probeta / Tubo de Ensayo Virtual -->
              <div style="width: 44px; height: 120px; border: 3px solid #64748b; border-top: none; border-radius: 0 0 20px 20px; position: relative; margin: 0 auto; background: #f8fafc; overflow: hidden; box-shadow: inset 0 2px 6px rgba(0,0,0,0.1);">
                <div id="phTuboLiquido" style="position: absolute; bottom: 0; left: 0; right: 0; height: 60%; background: #22c55e; transition: all 0.3s ease; opacity: 0.85;"></div>
                <div style="position: absolute; top: 10px; left: 6px; font-size: 0.65rem; color: #94a3b8; font-weight: 700;">pH</div>
              </div>

              <!-- Diagnóstico Químico y Recomendación Agronómica -->
              <div>
                <p id="phDescText" style="font-size: 0.92rem; color: var(--text-main); line-height: 1.55; margin-bottom: 10px;">
                  ¡El rango ideal para el 90% de las hortalizas escolares (tomate, pepino, pimentón, culantro)! Todos los nutrientes N-P-K y micronutrientes se absorben con máxima facilidad.
                </p>
                <div style="background: #ffffff; padding: 10px 14px; border-radius: 6px; border: 1px solid var(--border-color); margin-bottom: 8px;">
                  <strong style="color: var(--primary-dark); font-size: 0.82rem; display: block; margin-bottom: 2px;">
                    🛠️ Acción Agronómica Recomendada:
                  </strong>
                  <span id="phAccionText" style="font-size: 0.82rem; color: var(--text-muted);">
                    ¡Mantén este equilibrio con compost orgánico periódico!
                  </span>
                </div>
                <div id="phNutrientesBar" style="font-size: 0.78rem; font-weight: 700; color: #15803d;">
                  Disponibilidad Nutricional: N (100%) • P (100%) • K (100%) • Ca (100%) • Mg (100%)
                </div>
              </div>

            </div>

          </div>

        </div>

        <!-- PESTAÑA 3: DIAGNÓSTICO VISUAL DE HOJAS -->
        <div id="tab-diagnostico" class="tab-suelo-panel" style="display: none;">
          
          <div style="background: var(--warm-bg); padding: 20px; border-radius: var(--radius-sm); border: 1px solid var(--border-color); margin-bottom: 16px;">
            <strong style="color: var(--primary-dark); font-size: 0.95rem; display: block; margin-bottom: 6px;">
              🍃 Identificador Rápido de Síntomas Nutricionales
            </strong>
            <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 14px;">
              Selecciona el síntoma visual que observas en las hojas o frutos de tus cultivos para conocer qué elemento falta y cómo remediarlo orgánicamente:
            </p>

            <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px;">
              <button type="button" class="btn-diag-sintoma active" data-sintoma="amarillo" style="padding: 8px 14px; border-radius: var(--radius-pill); border: 1px solid var(--border-color); background: #ffffff; color: var(--text-main); font-size: 0.82rem; font-weight: 600; cursor: pointer;">🟡 Hojas Viejas Amarillas (N)</button>
              <button type="button" class="btn-diag-sintoma" data-sintoma="purpura" style="padding: 8px 14px; border-radius: var(--radius-pill); border: 1px solid var(--border-color); background: #ffffff; color: var(--text-main); font-size: 0.82rem; font-weight: 600; cursor: pointer;">🟣 Hojas Púrpuras (P)</button>
              <button type="button" class="btn-diag-sintoma" data-sintoma="quemado" style="padding: 8px 14px; border-radius: var(--radius-pill); border: 1px solid var(--border-color); background: #ffffff; color: var(--text-main); font-size: 0.82rem; font-weight: 600; cursor: pointer;">🔥 Puntas Quemadas (K)</button>
              <button type="button" class="btn-diag-sintoma" data-sintoma="intervenal_vieja" style="padding: 8px 14px; border-radius: var(--radius-pill); border: 1px solid var(--border-color); background: #ffffff; color: var(--text-main); font-size: 0.82rem; font-weight: 600; cursor: pointer;">🌿 Clorosis Intervenal Hojas Viejas (Mg)</button>
              <button type="button" class="btn-diag-sintoma" data-sintoma="manchas" style="padding: 8px 14px; border-radius: var(--radius-pill); border: 1px solid var(--border-color); background: #ffffff; color: var(--text-main); font-size: 0.82rem; font-weight: 600; cursor: pointer;">🟢 Nervios Verdes / Brotes Amarillos (Fe)</button>
              <button type="button" class="btn-diag-sintoma" data-sintoma="podredumbre" style="padding: 8px 14px; border-radius: var(--radius-pill); border: 1px solid var(--border-color); background: #ffffff; color: var(--text-main); font-size: 0.82rem; font-weight: 600; cursor: pointer;">🍅 Fruto con Podredumbre Apical (Ca)</button>
              <button type="button" class="btn-diag-sintoma" data-sintoma="quebradizo" style="padding: 8px 14px; border-radius: var(--radius-pill); border: 1px solid var(--border-color); background: #ffffff; color: var(--text-main); font-size: 0.82rem; font-weight: 600; cursor: pointer;">🛡️ Tallos Débiles y Ataque de Hongos (Si)</button>
            </div>

            <!-- Caja Dinámica con el Diagnóstico y Solución -->
            <div id="diagResultadoBox">
              <div style="background: #ffffff; border-left: 4px solid #ca8a04; padding: 14px 18px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; flex-wrap: wrap;">
                  <strong style="color: var(--primary-dark); font-size: 0.95rem;">Clorosis General en Hojas Viejas (Amarillamiento de Abajo hacia Arriba)</strong>
                  <span style="font-size: 0.75rem; background: #ca8a04; color: white; padding: 2px 10px; border-radius: var(--radius-pill); font-weight: 700;">
                    Deficiencia de N (Móvil)
                  </span>
                </div>
                <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0; line-height: 1.5;">
                  <strong>Solución Agroecológica de 6.°:</strong> Aplica té de compost maduro o abono con estiércol fermentado. El nitrógeno es móvil y la planta lo transportó a las hojas nuevas.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>'''

new_html = html[:idx_start] + new_block + '\n    ' + html[idx_end:]

with open('index.html', 'w', encoding='utf-8', newline='') as f:
    f.write(new_html)

print("index.html updated successfully!")
