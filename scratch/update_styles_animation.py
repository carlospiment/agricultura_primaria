css_animations = '''

/* ==========================================================================
   INFOGRAFÍA CIENTÍFICA DINÁMICA Y ANIMADA (LABORATORIO DEL SUELO)
   ========================================================================== */
@keyframes sunPulse {
  0%, 100% { transform: scale(1); opacity: 0.95; }
  50% { transform: scale(1.08); opacity: 1; }
}

@keyframes rainSlide {
  0% { transform: translateY(-8px); opacity: 0; }
  30% { opacity: 1; }
  100% { transform: translateY(16px); opacity: 0.1; }
}

@keyframes dashFlowUp {
  from { stroke-dashoffset: 40; }
  to { stroke-dashoffset: 0; }
}

@keyframes dashFlowDown {
  from { stroke-dashoffset: 0; }
  to { stroke-dashoffset: 40; }
}

@keyframes ionFloat {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}

@keyframes wavePulse {
  0% { r: 5; opacity: 0.9; stroke-width: 2; }
  100% { r: 26; opacity: 0; stroke-width: 0.5; }
}

@keyframes vaporRise {
  0% { transform: translate(0, 0); opacity: 0.9; }
  100% { transform: translate(-10px, -20px); opacity: 0; }
}

.anim-sun-core {
  transform-origin: 80px 115px;
  animation: sunPulse 3.5s ease-in-out infinite;
}

.anim-rain-drop {
  animation: rainSlide 1.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
}

.anim-xylem-dash {
  stroke-dasharray: 6, 6;
  animation: dashFlowUp 1.2s linear infinite;
}

.anim-phloem-dash {
  stroke-dasharray: 6, 6;
  animation: dashFlowDown 1.8s linear infinite;
}

.anim-ion-float {
  animation: ionFloat 2.8s ease-in-out infinite;
}

.anim-diffusion-wave {
  animation: wavePulse 2.2s cubic-bezier(0.2, 0.8, 0.4, 1) infinite;
}

.anim-vapor-stomata {
  animation: vaporRise 2.4s ease-out infinite;
}

/* Estado pausado */
.svg-infografia-dinamica.anim-paused * {
  animation-play-state: paused !important;
}

/* Modos de resaltado educativo */
.svg-infografia-dinamica.modo-masas .zona-difusion,
.svg-infografia-dinamica.modo-masas .zona-roca,
.svg-infografia-dinamica.modo-masas .zona-hojas {
  opacity: 0.25;
  transition: opacity 0.3s ease;
}

.svg-infografia-dinamica.modo-difusion .zona-masas,
.svg-infografia-dinamica.modo-difusion .zona-roca,
.svg-infografia-dinamica.modo-difusion .zona-hojas {
  opacity: 0.25;
  transition: opacity 0.3s ease;
}

.svg-infografia-dinamica.modo-roca .zona-masas,
.svg-infografia-dinamica.modo-roca .zona-difusion,
.svg-infografia-dinamica.modo-roca .zona-hojas {
  opacity: 0.25;
  transition: opacity 0.3s ease;
}

.svg-infografia-dinamica.modo-hojas .zona-masas,
.svg-infografia-dinamica.modo-hojas .zona-difusion,
.svg-infografia-dinamica.modo-hojas .zona-roca {
  opacity: 0.25;
  transition: opacity 0.3s ease;
}

.btn-infografia-modo {
  background: var(--warm-bg);
  border: 1px solid var(--border-color);
  color: var(--text-main);
  padding: 6px 14px;
  border-radius: var(--radius-pill);
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
}

.btn-infografia-modo:hover {
  background: #e2ebd9;
  color: var(--primary-dark);
  transform: translateY(-1px);
}

.btn-infografia-modo.active {
  background: var(--primary);
  color: #ffffff;
  border-color: var(--primary);
  box-shadow: 0 2px 6px rgba(27, 67, 50, 0.25);
}
'''

with open('styles.css', 'r', encoding='utf-8') as f:
    existing = f.read()

if 'INFOGRAFÍA CIENTÍFICA DINÁMICA Y ANIMADA' not in existing:
    with open('styles.css', 'a', encoding='utf-8', newline='') as f:
        f.write(css_animations)
    print("styles.css updated with animation classes!")
else:
    print("Animation classes already in styles.css")
