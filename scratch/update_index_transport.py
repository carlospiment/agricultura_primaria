with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

target = """            <div>
              <strong style="color: var(--primary-dark); font-size: 0.95rem; display: block; margin-bottom: 4px;">
                Criterios de Esencialidad Científica (Arnon & Stout, 1939 • Marschner, 2012):
              </strong>
              <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.6; margin: 0;">
                Para que un nutriente sea considerado <em>esencial</em>: <strong>1)</strong> La planta no puede completar su ciclo vital (vegetativo y reproductivo) en su ausencia; <strong>2)</strong> Su rol biológico no puede ser reemplazado por ningún otro elemento; <strong>3)</strong> Participa directamente en el metabolismo o forma parte de un compuesto vital de la planta. Los <strong>Elementos Benéficos</strong> (como el Silicio y Cobalto) no son estrictamente vitales para todas las plantas, pero mejoran sustancialmente su arquitectura celular, resistencia a plagas y fijación biológica de nitrógeno.
              </p>
            </div>
          </div>

        </div>"""

replacement = """            <div>
              <strong style="color: var(--primary-dark); font-size: 0.95rem; display: block; margin-bottom: 4px;">
                Criterios de Esencialidad Científica (Arnon & Stout, 1939 • Marschner, 2012):
              </strong>
              <p style="font-size: 0.85rem; color: var(--text-muted); line-height: 1.6; margin: 0;">
                Para que un nutriente sea considerado <em>esencial</em>: <strong>1)</strong> La planta no puede completar su ciclo vital (vegetativo y reproductivo) en su ausencia; <strong>2)</strong> Su rol biológico no puede ser reemplazado por ningún otro elemento; <strong>3)</strong> Participa directamente en el metabolismo o forma parte de un compuesto vital de la planta. Los <strong>Elementos Benéficos</strong> (como el Silicio y Cobalto) no son estrictamente vitales para todas las plantas, pero mejoran sustancialmente su arquitectura celular, resistencia a plagas y fijación biológica de nitrógeno.
              </p>
            </div>
          </div>

          <!-- Guía Científica: Vías Fisiológicas de Absorción y Origen Geológico Natural -->
          <div style="margin-top: 18px; background: #ffffff; border: 1px solid var(--border-color); border-radius: var(--radius-sm); padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.04);">
            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; margin-bottom: 14px; border-bottom: 1px solid var(--border-color); padding-bottom: 10px;">
              <strong style="color: var(--primary-dark); font-size: 1.05rem; display: flex; align-items: center; gap: 8px;">
                <i class="fa-solid fa-water" style="color: #0284c7;"></i> ¿Cómo entran los nutrientes a la planta y de dónde vienen en la naturaleza?
              </strong>
              <span style="font-size: 0.76rem; background: rgba(2, 132, 199, 0.1); color: #0284c7; padding: 3px 10px; border-radius: var(--radius-pill); font-weight: 700;">
                Fisiología Vegetal • Modelos de Barber-Oliver & SSSA
              </span>
            </div>

            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 14px; margin-bottom: 14px;">
              
              <!-- Vía 1: Flujo de Masas -->
              <div style="background: var(--warm-bg); border-left: 4px solid #0284c7; padding: 12px 14px; border-radius: 4px; border: 1px solid var(--border-color);">
                <strong style="color: #0369a1; font-size: 0.88rem; display: block; margin-bottom: 4px;">
                  🌊 1. Flujo de Masas (Mass Flow)
                </strong>
                <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.5; margin: 0;">
                  El agua del suelo absorbida por las raíces debido a la <strong>transpiración foliar</strong> arrastra los iones solubles como un río microscópico. Rige la absorción de: <strong>Nitrato (NO₃⁻), Calcio (Ca²⁺), Magnesio (Mg²⁺), Azufre (SO₄²⁻) y Boro</strong>.
                </p>
              </div>

              <!-- Vía 2: Difusión -->
              <div style="background: var(--warm-bg); border-left: 4px solid #16a34a; padding: 12px 14px; border-radius: 4px; border: 1px solid var(--border-color);">
                <strong style="color: #15803d; font-size: 0.88rem; display: block; margin-bottom: 4px;">
                  🧲 2. Difusión Química (Diffusion)
                </strong>
                <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.5; margin: 0;">
                  Los iones viajan milimétricamente desde zonas de mayor concentración en el suelo hacia la superficie radicular donde la planta los consume. Clave para nutrientes de baja movilidad: <strong>Fósforo (H₂PO₄⁻), Potasio (K⁺), Hierro (Fe²⁺) y Zinc (Zn²⁺)</strong>.
                </p>
              </div>

              <!-- Vía 3: Intercepción e Intercambio -->
              <div style="background: var(--warm-bg); border-left: 4px solid #ea580c; padding: 12px 14px; border-radius: 4px; border: 1px solid var(--border-color);">
                <strong style="color: #c2410c; font-size: 0.88rem; display: block; margin-bottom: 4px;">
                  🌱 3. Intercepción Radicular & Estomas
                </strong>
                <p style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.5; margin: 0;">
                  Las raíces crecen y tocan físicamente coloides de arcilla y humus intercambiando iones. A su vez, las <strong>hojas absorben el gas CO₂</strong> mediante difusión a través de los estomas para capturar el Carbono orgánico.
                </p>
              </div>

            </div>

            <!-- Dónde se obtienen en la Naturaleza -->
            <div style="background: rgba(245, 158, 11, 0.08); border: 1px dashed #d97706; padding: 12px 16px; border-radius: 6px;">
              <strong style="color: #92400e; font-size: 0.86rem; display: block; margin-bottom: 4px;">
                🏔️ El Origen Geológico Natural: ¿De dónde salieron estos minerales en la Tierra?
              </strong>
              <p style="font-size: 0.82rem; color: var(--text-main); line-height: 1.55; margin: 0;">
                Todos los nutrientes minerales provienen de la <strong>meteorización (desintegración física y química) de las rocas madre de la corteza terrestre</strong> a lo largo de miles de años: las rocas ígneas aportan <em>feldespatos y micas</em> (fuente original de <strong>Potasio</strong>) y <em>apatitas</em> (fuente original de <strong>Fósforo</strong>); las rocas sedimentarias como calizas y dolomitas aportan <strong>Calcio y Magnesio</strong>; los yacimientos evaporíticos aportan <strong>Yeso y Boro</strong>; y la atmósfera viva aporta el <strong>Nitrógeno, Carbono y Oxígeno</strong>. ¡El suelo fértil es la unión entre la geología y la vida!
              </p>
            </div>

          </div>

        </div>"""

if target in content:
    content = content.replace(target, replacement, 1)
    with open('index.html', 'w', encoding='utf-8', newline='') as f:
        f.write(content)
    print("index.html successfully updated with transport guide!")
else:
    print("Target not found in index.html!")
