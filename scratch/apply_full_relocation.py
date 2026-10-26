import sys, os
sys.path.append(os.path.abspath('scratch'))
from generate_animated_svg import get_svg_content

inline_svg = get_svg_content(is_inline=True)

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Remover infografía del inicio de tab-npk
top_start_marker = '<!-- Infografía Científica del Ciclo de Nutrición y Absorción Radicular -->'
top_end_marker = '<!-- Selector de Grupos Científicos -->'

idx_top1 = html.find(top_start_marker)
idx_top2 = html.find(top_end_marker)

print(f"Top markers: {idx_top1}, {idx_top2}")
if idx_top1 == -1 or idx_top2 == -1:
    print("Error: Top markers not found!")
    sys.exit(1)

# Eliminar el bloque de arriba
html = html[:idx_top1] + html[idx_top2:]
print("Top infographic block removed from index.html!")

# 2. Reemplazar la guía estática al final de tab-npk por la Infografía Dinámica y Animada
end_start_marker = '<!-- Guía Científica: Vías Fisiológicas de Absorción y Origen Geológico Natural -->'
end_finish_marker = '<!-- PESTAÑA 2: SEMÁFORO DE pH -->'

idx_end1 = html.find(end_start_marker)
idx_end2 = html.find(end_finish_marker)

print(f"End markers: {idx_end1}, {idx_end2}")
if idx_end1 == -1 or idx_end2 == -1:
    print("Error: End markers not found!")
    sys.exit(1)

infografia_dinamica_card = f'''<!-- Infografía Científica Dinámica y Animada (Al Final de la Sección de Nutrientes) -->
          <div style="margin-top: 24px; background: #ffffff; border: 1.5px solid var(--border-color); border-radius: var(--radius-sm); padding: 22px; box-shadow: 0 4px 14px rgba(0,0,0,0.06);">
            
            <!-- Encabezado de la Infografía y Controles Dinámicos -->
            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-bottom: 16px; border-bottom: 1px solid var(--border-color); padding-bottom: 14px;">
              <div>
                <strong style="color: var(--primary-dark); font-size: 1.15rem; display: flex; align-items: center; gap: 10px;">
                  <i class="fa-solid fa-diagram-project" style="color: #16a34a;"></i> Infografía Científica Animada: Ciclo Completo de Nutrición y Absorción Radicular
                </strong>
                <span style="font-size: 0.84rem; color: var(--text-muted); display: block; margin-top: 3px;">
                  Observa en tiempo real con animaciones vectoriales el viaje mineral desde la roca madre y la atmósfera hasta los tejidos celulares.
                </span>
              </div>
              <span style="font-size: 0.78rem; background: rgba(22, 163, 74, 0.12); color: #16a34a; border: 1.5px solid rgba(22, 163, 74, 0.3); padding: 4px 12px; border-radius: var(--radius-pill); font-weight: 800;">
                <i class="fa-solid fa-play"></i> Simulación Biofísica Activa
              </span>
            </div>

            <!-- Barra de Modos de Exploración Interactiva -->
            <div style="display: flex; gap: 8px; flex-wrap: wrap; align-items: center; margin-bottom: 16px; background: var(--warm-bg); padding: 10px 14px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
              <span style="font-size: 0.8rem; font-weight: 800; color: var(--primary-dark); margin-right: 4px;">
                Modo de Visualización:
              </span>
              <button type="button" class="btn-infografia-modo active" data-modo="todo">✨ Ver Todo el Ciclo</button>
              <button type="button" class="btn-infografia-modo" data-modo="masas">🌊 Flujo de Masas (NO₃⁻, Ca²⁺, Mg²⁺)</button>
              <button type="button" class="btn-infografia-modo" data-modo="difusion">🧲 Difusión (P, K, Fe, Zn)</button>
              <button type="button" class="btn-infografia-modo" data-modo="roca">🏔️ Meteorización de Rocas</button>
              <button type="button" class="btn-infografia-modo" data-modo="hojas">🍃 Fotosíntesis y Estomas (CO₂)</button>
              <button type="button" class="btn-infografia-modo" id="btnPausarInfografia" style="margin-left: auto; border-color: #f59e0b; color: #b45309; background: #fff;">⏸️ Pausar</button>
            </div>

            <!-- Contenedor del Diagrama SVG Animado -->
            <div style="position: relative; overflow: hidden; border-radius: 8px; border: 1.5px solid var(--border-color); background: #f8fafc; box-shadow: inset 0 2px 6px rgba(0,0,0,0.03);">
              {inline_svg}
            </div>

            <!-- Barra Dinámica de Explicación en Tiempo Real -->
            <div id="infografiaModoTexto" style="margin-top: 14px; background: var(--warm-bg); border-left: 4px solid var(--primary); padding: 12px 16px; border-radius: 4px; border: 1px solid var(--border-color);">
              <strong id="infoModoTitulo" style="color: var(--primary-dark); font-size: 0.92rem; display: block; margin-bottom: 3px;">
                ✨ Ciclo Completo de Nutrición Vegetal
              </strong>
              <p id="infoModoDesc" style="font-size: 0.84rem; color: var(--text-muted); line-height: 1.55; margin: 0;">
                Los minerales de la roca madre se meteorizan hacia la solución del suelo; las raíces absorben agua e iones por Flujo de Masas y Difusión; el xilema los eleva a las hojas, donde junto con la luz solar y el CO₂ atmosférico se sintetizan glucosa, proteínas y estructuras celulares.
              </p>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 12px; flex-wrap: wrap; gap: 8px; font-size: 0.78rem; color: var(--text-muted);">
              <span>🔍 <strong>Ruta fisiológica:</strong> 1) Roca Madre y Atmósfera ➔ 2) Solución del Suelo ➔ 3) Flujo de Masas / Difusión ➔ 4) Xilema ➔ 5) Estructuras Moleculares</span>
              <a href="assets/images/infografia-nutricion-suelo.svg" target="_blank" rel="noopener noreferrer" style="color: #0284c7; font-weight: 700; text-decoration: none;">
                <i class="fa-solid fa-up-right-from-square"></i> Abrir infografía SVG en archivo independiente
              </a>
            </div>

          </div>

        </div>

        '''

html = html[:idx_end1] + infografia_dinamica_card + html[idx_end2:]

with open('index.html', 'w', encoding='utf-8', newline='') as f:
    f.write(html)

print("index.html successfully updated with dynamic animated infographic at the end!")
