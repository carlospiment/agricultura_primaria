import os

HTML_FILE = "index.html"

def update_html():
    with open(HTML_FILE, 'r', encoding='utf-8') as f:
        html = f.read()

    # 1. Añadir el botón en el Inicio
    btn_vocabulario = """<a class="btn-card" data-target="rubrica-vocabulario" style="display: flex; align-items: center; gap: 8px; font-size: 1rem; padding: 12px 24px;">
            <i class="fa-solid fa-book-open-reader"></i> Rúbrica: Vocabulario Ilustrado
          </a>"""
    
    btn_manualidades = """<a class="btn-card" data-target="rubrica-manualidades" style="display: flex; align-items: center; gap: 8px; font-size: 1rem; padding: 12px 24px;">
            <i class="fa-solid fa-scissors"></i> Rúbrica: Manualidades
          </a>"""
    
    # Reemplazar contenedor de un solo botón con flexbox para varios botones si no está ya agrupado
    if "rubrica-manualidades" not in html:
        # Wrap in a flex container if it's not
        html = html.replace(btn_vocabulario, f'<div style="display: flex; gap: 12px; flex-wrap: wrap;">\n            {btn_vocabulario}\n            {btn_manualidades}\n          </div>')
    
    # 2. Construir la sección de Rúbrica: Manualidades
    rubrica_manualidades_html = """
    <!-- ==================== PAGINA: RÚBRICA MANUALIDADES ==================== -->
    <section id="rubrica-manualidades" class="view-section">
      <div class="hero-section" style="padding: 60px 20px; text-align: center; background: var(--primary-dark); color: white;">
        <h1 style="font-family: var(--font-heading); font-size: 2.8rem; margin-bottom: 16px;">
          <i class="fa-solid fa-scissors" style="color: var(--gold); margin-right: 12px;"></i>
          Rúbrica de Evaluación
        </h1>
        <p style="font-size: 1.2rem; max-width: 800px; margin: 0 auto; opacity: 0.9;">
          Criterios de evaluación para la actividad: <strong>Manualidades</strong>
        </p>
      </div>

      <div style="max-width: 1200px; margin: 40px auto; padding: 0 20px;">
        <div class="semantic-card-standard">
          
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; flex-wrap: wrap; gap: 16px;">
            <h2 style="font-family: var(--font-heading); color: var(--primary-dark); font-size: 1.8rem;">
              Matriz de Valoración
            </h2>
            <button class="btn-primary" onclick="window.print()" style="display: flex; align-items: center; gap: 8px;">
              <i class="fa-solid fa-print"></i> Imprimir Rúbrica
            </button>
          </div>

          <div style="overflow-x: auto;">
            <table style="width: 100%; border-collapse: collapse; min-width: 900px; font-size: 0.95rem;">
              <thead>
                <tr style="background: var(--warm-bg); border-bottom: 2px solid var(--border-color);">
                  <th style="padding: 16px; text-align: left; font-weight: 700; color: var(--text-main); width: 8%;">Peso (%)</th>
                  <th style="padding: 16px; text-align: left; font-weight: 700; color: var(--text-main); width: 17%;">Criterios</th>
                  <th style="padding: 16px; text-align: left; font-weight: 700; color: var(--primary-light); width: 15%;">5 - Excelente</th>
                  <th style="padding: 16px; text-align: left; font-weight: 700; color: var(--accent); width: 15%;">4 - Bueno</th>
                  <th style="padding: 16px; text-align: left; font-weight: 700; color: #f57c00; width: 15%;">3 - Suficiente</th>
                  <th style="padding: 16px; text-align: left; font-weight: 700; color: #d32f2f; width: 15%;">2 - Insuficiente</th>
                  <th style="padding: 16px; text-align: left; font-weight: 700; color: #7f0000; width: 15%;">1 - Deficiente</th>
                </tr>
              </thead>
              <tbody>
                <tr style="border-bottom: 1px solid var(--border-color);">
                  <td style="padding: 16px; color: var(--text-muted);">30%</td>
                  <td style="padding: 16px; font-weight: 700; color: var(--text-main);">Destreza Técnica (Recortar y Pegar)</td>
                  <td style="padding: 16px;"><strong>6 pts (Excelente):</strong> Los recortes son exactos siguiendo los bordes. El pegado es impecable, sin manchas ni exceso de material.</td>
                  <td style="padding: 16px;"><strong>4.8 pts (Muy Bueno):</strong> Los recortes son mayormente precisos. El pegado es limpio con mínimas imperfecciones de pegamento.</td>
                  <td style="padding: 16px;"><strong>3.6 pts (Satisfactorio):</strong> Los recortes presentan algunas irregularidades. El pegado es funcional pero se observan manchas visibles.</td>
                  <td style="padding: 16px;"><strong>2.4 pts (En Proceso):</strong> Los recortes son descuidados. Existe un exceso notable de pegamento que afecta la estética.</td>
                  <td style="padding: 16px;"><strong>1.2 pts (Deficiente):</strong> Los recortes dañan la forma de las piezas. El pegado es descuidado y las piezas se desprenden.</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--border-color);">
                  <td style="padding: 16px; color: var(--text-muted);">25%</td>
                  <td style="padding: 16px; font-weight: 700; color: var(--text-main);">Creatividad y Diseño (Ilustrar y Letras)</td>
                  <td style="padding: 16px;"><strong>5 pts (Excelente):</strong> Dibujos originales y detallados. Las letras son altamente legibles con un diseño artístico excepcional.</td>
                  <td style="padding: 16px;"><strong>4 pts (Muy Bueno):</strong> Dibujos claros y expresivos. Las letras son legibles, bien formadas y presentan un buen diseño.</td>
                  <td style="padding: 16px;"><strong>3 pts (Satisfactorio):</strong> Dibujos básicos. Las letras son legibles, aunque se evidencia poco esfuerzo en su diseño o estilo.</td>
                  <td style="padding: 16px;"><strong>2 pts (En Proceso):</strong> Dibujos poco claros o inconclusos. Las letras son difíciles de leer o están desproporcionadas.</td>
                  <td style="padding: 16px;"><strong>1 pt (Deficiente):</strong> No incluye dibujos o son de baja calidad. Las letras son ilegibles o están ausentes.</td>
                </tr>
                <tr style="border-bottom: 1px solid var(--border-color);">
                  <td style="padding: 16px; color: var(--text-muted);">30%</td>
                  <td style="padding: 16px; font-weight: 700; color: var(--text-main);">Seguimiento de Instrucciones</td>
                  <td style="padding: 16px;"><strong>6 pts (Excelente):</strong> Sigue todos los pasos de manera secuencial y cumple con el 100% de los requerimientos.</td>
                  <td style="padding: 16px;"><strong>4.8 pts (Muy Bueno):</strong> Sigue la mayoría de los pasos y cumple con casi todos los requerimientos de la actividad.</td>
                  <td style="padding: 16px;"><strong>3.6 pts (Satisfactorio):</strong> Sigue los pasos básicos, pero omite detalles o requerimientos importantes de la tarea.</td>
                  <td style="padding: 16px;"><strong>2.4 pts (En Proceso):</strong> Sigue pocas instrucciones. El resultado final se desvía significativamente del objetivo inicial.</td>
                  <td style="padding: 16px;"><strong>1.2 pts (Deficiente):</strong> No sigue las instrucciones proporcionadas ni cumple con los requerimientos mínimos.</td>
                </tr>
                <tr>
                  <td style="padding: 16px; color: var(--text-muted);">15%</td>
                  <td style="padding: 16px; font-weight: 700; color: var(--text-main);">Orden y Aseo</td>
                  <td style="padding: 16px;"><strong>3 pts (Excelente):</strong> Presentación final impecable. El espacio de trabajo quedó perfectamente limpio y organizado.</td>
                  <td style="padding: 16px;"><strong>2.4 pts (Muy Bueno):</strong> Muy buena presentación. El espacio de trabajo quedó recogido y adecuadamente limpio.</td>
                  <td style="padding: 16px;"><strong>1.8 pts (Satisfactorio):</strong> Presentación aceptable. Se observa poco cuidado en la limpieza final del espacio de trabajo.</td>
                  <td style="padding: 16px;"><strong>1.2 pts (En Proceso):</strong> Presentación descuidada (manchas o arrugas). El espacio de trabajo quedó sucio o desordenado.</td>
                  <td style="padding: 16px;"><strong>0.6 pts (Deficiente):</strong> Presentación deficiente del trabajo e ignoró por completo el aseo del área asignada.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
"""

    if "id=\"rubrica-manualidades\"" not in html:
        # Append before closing main tag
        html = html.replace("  </main>", rubrica_manualidades_html + "\n  </main>")

    with open(HTML_FILE, 'w', encoding='utf-8') as f:
        f.write(html)
    print("Rubric 'Manualidades' added successfully.")

if __name__ == "__main__":
    update_html()
