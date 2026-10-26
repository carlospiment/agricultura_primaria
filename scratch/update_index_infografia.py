with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# 1. Eliminar (MEDUCA 2026) en la seccion
target_badge = '<i class="fa-solid fa-flask"></i> Edafología y Nutrición Vegetal • Área 4 (MEDUCA 2026)'
replacement_badge = '<i class="fa-solid fa-flask"></i> Edafología y Nutrición Vegetal • Área 4'

if target_badge in html:
    html = html.replace(target_badge, replacement_badge, 1)
    print("Badge MEDUCA 2026 successfully removed from index.html")
else:
    print("Warning: target_badge not found exactly!")

# 2. Insertar Infografía en el tab-npk
target_tab = '''        <!-- PESTAÑA 1: NUTRIENTES Y GRUPOS CIENTÍFICOS -->
        <div id="tab-npk" class="tab-suelo-panel" style="display: block;">'''

infografia_html = '''        <!-- PESTAÑA 1: NUTRIENTES Y GRUPOS CIENTÍFICOS -->
        <div id="tab-npk" class="tab-suelo-panel" style="display: block;">
          
          <!-- Infografía Científica del Ciclo de Nutrición y Absorción Radicular -->
          <div style="margin-bottom: 22px; background: #ffffff; border: 1px solid var(--border-color); border-radius: var(--radius-sm); padding: 18px; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; margin-bottom: 12px; border-bottom: 1px solid var(--border-color); padding-bottom: 10px;">
              <div>
                <strong style="color: var(--primary-dark); font-size: 1.05rem; display: flex; align-items: center; gap: 8px;">
                  <i class="fa-solid fa-image" style="color: #16a34a;"></i> Infografía Científica: El Ciclo de Nutrición y Vías de Absorción Radicular
                </strong>
                <span style="font-size: 0.82rem; color: var(--text-muted); display: block; margin-top: 2px;">
                  Diagrama del viaje mineral: desde la meteorización de la roca madre y la atmósfera hasta la asimilación molecular en la planta.
                </span>
              </div>
              <span style="font-size: 0.76rem; background: rgba(22, 163, 74, 0.1); color: #16a34a; border: 1px solid rgba(22, 163, 74, 0.3); padding: 3px 10px; border-radius: var(--radius-pill); font-weight: 800;">
                <i class="fa-solid fa-diagram-project"></i> Fisiología & Edafología
              </span>
            </div>

            <div style="position: relative; overflow: hidden; border-radius: 6px; border: 1px solid var(--border-color); background: #f8fafc;">
              <img src="assets/images/infografia-nutricion-suelo.svg" alt="Infografía del Ciclo de Nutrición Vegetal y Absorción Radicular" style="width: 100%; height: auto; display: block;" loading="lazy">
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px; flex-wrap: wrap; gap: 8px; font-size: 0.78rem; color: var(--text-muted);">
              <span>🔍 <strong>Secuencia biológica:</strong> 1) Roca Madre y Atmósfera ➔ 2) Solución del Suelo ➔ 3) Flujo de Masas / Difusión ➔ 4) Xilema ➔ 5) Estructuras Moleculares</span>
              <a href="assets/images/infografia-nutricion-suelo.svg" target="_blank" rel="noopener noreferrer" style="color: #0284c7; font-weight: 700; text-decoration: none;">
                <i class="fa-solid fa-up-right-from-square"></i> Abrir infografía en pestaña completa
              </a>
            </div>
          </div>'''

if target_tab in html:
    html = html.replace(target_tab, infografia_html, 1)
    print("Infografía successfully inserted into index.html")
else:
    print("Warning: target_tab not found exactly!")

with open('index.html', 'w', encoding='utf-8', newline='') as f:
    f.write(html)

print("index.html written successfully!")
