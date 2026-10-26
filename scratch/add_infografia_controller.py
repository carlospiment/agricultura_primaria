controller_code = '''
    // E. Controlador Interactivo de Modos de la Infografía Animada
    function initInfografiaInteractiva() {
      const btnModos = document.querySelectorAll('.btn-infografia-modo');
      const svgElem = document.getElementById('infografiaCicloDinamico');
      const textoTitulo = document.getElementById('infoModoTitulo');
      const textoDesc = document.getElementById('infoModoDesc');
      const btnPausar = document.getElementById('btnPausarInfografia');

      const MODOS_INFO = {
        todo: {
          titulo: '✨ Ciclo Completo de Nutrición Vegetal',
          desc: 'Los minerales de la roca madre se meteorizan hacia la solución del suelo; las raíces absorben agua e iones por Flujo de Masas y Difusión; el xilema los eleva a las hojas, donde junto con la luz solar y el CO₂ atmosférico se sintetizan glucosa, proteínas y estructuras celulares.',
          clase: ''
        },
        masas: {
          titulo: '🌊 Flujo de Masas (Mass Flow) — El Río hacia las Hojas',
          desc: 'La transpiración foliar crea una succión constante en el xilema. El agua del suelo arrastra directamente los iones muy solubles (Nitrato NO₃⁻, Calcio Ca²⁺, Magnesio Mg²⁺, Sulfato SO₄²⁻ y Boro). Representa más del 80% del nitrógeno y calcio absorbidos.',
          clase: 'modo-masas'
        },
        difusion: {
          titulo: '🧲 Difusión Química (Diffusion) — El Movimiento Molecular',
          desc: 'El Fósforo (H₂PO₄⁻), Potasio (K⁺), Hierro (Fe²⁺) y Zinc (Zn²⁺) tienen baja movilidad y se adhieren al suelo. Al ser consumidos por los pelos radiculares, se crea un gradiente de concentración que hace que los iones viajen lentamente de zonas concentradas hacia la raíz.',
          clase: 'modo-difusion'
        },
        roca: {
          titulo: '🏔️ Origen Geológico Natural — Meteorización de Rocas Madre',
          desc: 'A lo largo de miles de años, el agua de lluvia y los ácidos biológicos descomponen minerales primarios: las Apatitas liberan Fósforo; los Feldespatos y Micas liberan Potasio; las Calizas y Dolomitas liberan Calcio y Magnesio; y el Yeso libera Azufre.',
          clase: 'modo-roca'
        },
        hojas: {
          titulo: '🍃 Vía Aérea Estomática y Fotosíntesis — Captura de Carbono',
          desc: 'El 45% de la biomasa seca es Carbono (C). Las hojas absorben gas CO₂ por difusión a través de los estomas. En los cloroplastos, la clorofila (con su átomo central de Magnesio) usa la energía del sol para unir CO₂ e Hidrógeno del agua en glucosa y celulosa.',
          clase: 'modo-hojas'
        }
      };

      if (btnModos && svgElem) {
        btnModos.forEach(btn => {
          if (btn.id === 'btnPausarInfografia') return;
          btn.addEventListener('click', function() {
            const modo = this.getAttribute('data-modo');
            btnModos.forEach(b => {
              if (b.id !== 'btnPausarInfografia') b.classList.remove('active');
            });
            this.classList.add('active');

            const info = MODOS_INFO[modo];
            if (info) {
              svgElem.className.baseVal = 'svg-infografia-dinamica ' + info.clase;
              if (textoTitulo) textoTitulo.textContent = info.titulo;
              if (textoDesc) textoDesc.textContent = info.desc;
            }
          });
        });
      }

      if (btnPausar && svgElem) {
        let pausado = false;
        btnPausar.addEventListener('click', function() {
          pausado = !pausado;
          if (pausado) {
            svgElem.classList.add('anim-paused');
            btnPausar.innerHTML = '▶️ Reanudar';
            btnPausar.style.borderColor = '#16a34a';
            btnPausar.style.color = '#15803d';
          } else {
            svgElem.classList.remove('anim-paused');
            btnPausar.innerHTML = '⏸️ Pausar';
            btnPausar.style.borderColor = '#f59e0b';
            btnPausar.style.color = '#b45309';
          }
        });
      }
    }

    initInfografiaInteractiva();
'''

with open('laboratorioSuelo.js', 'r', encoding='utf-8') as f:
    code = f.read()

target = "      });\n    });\n  }\n\n  if (document.readyState === 'loading') {"
replacement = "      });\n    });\n" + controller_code + "  }\n\n  if (document.readyState === 'loading') {"

if target in code:
    code = code.replace(target, replacement, 1)
    with open('laboratorioSuelo.js', 'w', encoding='utf-8', newline='') as f:
        f.write(code)
    print("laboratorioSuelo.js successfully updated with initInfografiaInteractiva!")
else:
    print("Target not found in laboratorioSuelo.js!")
