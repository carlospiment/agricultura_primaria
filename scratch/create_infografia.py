import os

svg_content = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 620" width="100%" height="100%" style="font-family: system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <defs>
    <!-- Gradientes de fondo -->
    <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#bae6fd" />
      <stop offset="40%" stop-color="#e0f2fe" />
      <stop offset="100%" stop-color="#f0fdf4" />
    </linearGradient>
    <linearGradient id="soilGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#78350f" />
      <stop offset="15%" stop-color="#92400e" />
      <stop offset="50%" stop-color="#b45309" />
      <stop offset="80%" stop-color="#713f12" />
      <stop offset="100%" stop-color="#451a03" />
    </linearGradient>
    <linearGradient id="rockGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#475569" />
      <stop offset="50%" stop-color="#64748b" />
      <stop offset="100%" stop-color="#334155" />
    </linearGradient>
    <linearGradient id="sunGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#fef08a" />
      <stop offset="60%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#d97706" />
    </linearGradient>
    <linearGradient id="stemGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#16a34a" />
      <stop offset="50%" stop-color="#22c55e" />
      <stop offset="100%" stop-color="#15803d" />
    </linearGradient>
    <linearGradient id="leafGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#4ade80" />
      <stop offset="100%" stop-color="#15803d" />
    </linearGradient>
    <filter id="shadow" x="-5%" y="-5%" width="110%" height="115%">
      <feDropShadow dx="0" dy="3" stdDeviation="3" flood-opacity="0.15" />
    </filter>
  </defs>

  <!-- CIELO Y ATMÓSFERA -->
  <rect x="0" y="0" width="1000" height="310" fill="url(#skyGrad)" />
  
  <!-- SUELO Y HORIZONTES -->
  <rect x="0" y="310" width="1000" height="310" fill="url(#soilGrad)" />

  <!-- BANNER DEL TÍTULO -->
  <rect x="0" y="0" width="1000" height="52" fill="#1e3a8a" />
  <text x="24" y="32" font-size="18" font-weight="900" fill="#ffffff" letter-spacing="0.5">
    INFOGRAFÍA CIENTÍFICA: CICLO COMPLETO DE NUTRICIÓN VEGETAL Y ABSORCIÓN RADICULAR
  </text>
  <text x="24" y="46" font-size="11" font-weight="600" fill="#93c5fd">
    De la Meteorización de Rocas Madre y la Atmósfera a la Asimilación Molecular en la Célula Vegetal (FAO • Marschner)
  </text>

  <!-- ==========================================
       ZONA 1: ATMÓSFERA Y ENERGÍA SOLAR
       ========================================== -->
  <!-- Sol y Radiación -->
  <circle cx="80" cy="115" r="42" fill="url(#sunGrad)" filter="url(#shadow)" />
  <!-- Rayos solares -->
  <path d="M80 60 L80 40 M80 170 L80 190 M25 115 L5 115 M135 115 L155 115 M40 75 L25 60 M120 155 L135 170 M40 155 L25 170 M120 75 L135 60" stroke="#f59e0b" stroke-width="3" stroke-linecap="round" />
  <text x="80" y="119" font-size="12" font-weight="800" fill="#78350f" text-anchor="middle">SOL (hν)</text>
  <text x="80" y="132" font-size="9" font-weight="700" fill="#78350f" text-anchor="middle">Energía Lumínica</text>

  <!-- Flechas de Radiación Solar hacia las Hojas -->
  <path d="M130 130 C190 145, 240 155, 290 170" fill="none" stroke="#f59e0b" stroke-width="2.5" stroke-dasharray="4,4" />
  <polygon points="290,170 280,165 284,173" fill="#f59e0b" />
  <rect x="150" y="136" width="125" height="20" rx="10" fill="rgba(254,240,138,0.9)" />
  <text x="212" y="150" font-size="9.5" font-weight="700" fill="#b45309" text-anchor="middle">Fotones para Fotosíntesis</text>

  <!-- Nube y Precipitación con Nitrógeno atmosférico disuelto -->
  <g transform="translate(680, 65)">
    <path d="M25 40 A20 20 0 0 1 65 40 A25 25 0 0 1 115 40 A20 20 0 0 1 145 45 A15 15 0 0 1 140 70 L20 70 A15 15 0 0 1 25 40 Z" fill="#ffffff" filter="url(#shadow)" />
    <!-- Gotas de lluvia -->
    <line x1="40" y1="80" x2="35" y2="98" stroke="#0284c7" stroke-width="2" stroke-linecap="round" />
    <line x1="65" y1="78" x2="60" y2="96" stroke="#0284c7" stroke-width="2" stroke-linecap="round" />
    <line x1="90" y1="82" x2="85" y2="100" stroke="#0284c7" stroke-width="2" stroke-linecap="round" />
    <line x1="115" y1="79" x2="110" y2="97" stroke="#0284c7" stroke-width="2" stroke-linecap="round" />
    
    <!-- Rayo de Tormenta (Fijación Eléctrica de N2) -->
    <path d="M75 70 L65 95 L78 95 L68 120" fill="none" stroke="#eab308" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
    
    <rect x="-10" y="115" width="170" height="34" rx="6" fill="#ffffff" stroke="#0284c7" stroke-width="1.2" />
    <text x="75" y="128" font-size="9.5" font-weight="800" fill="#0369a1" text-anchor="middle">Agua de Lluvia (H₂O)</text>
    <text x="75" y="141" font-size="8.5" font-weight="600" fill="#0284c7" text-anchor="middle">+ Nitratos por Rayos (NO₃⁻)</text>
  </g>

  <!-- Absorción de CO2 por Estomas Foliares -->
  <g transform="translate(490, 80)">
    <rect x="0" y="0" width="165" height="48" rx="8" fill="#ffffff" stroke="#059669" stroke-width="1.5" filter="url(#shadow)" />
    <text x="12" y="18" font-size="11" font-weight="800" fill="#065f46">🍃 Entrada de CO₂ Atmosférico</text>
    <text x="12" y="32" font-size="9" font-weight="600" fill="#047857">Por estomas microscópicos</text>
    <text x="12" y="43" font-size="8.5" font-weight="700" fill="#059669">45% de la Biomasa = Carbono (C)</text>
    
    <!-- Flecha hacia las hojas -->
    <path d="M50 48 C40 85, -20 120, -70 145" fill="none" stroke="#059669" stroke-width="2.5" stroke-dasharray="3,3" />
    <polygon points="-70,145 -60,142 -64,151" fill="#059669" />
  </g>

  <!-- ==========================================
       ZONA 2: LA PLANTA (TALLO, HOJAS Y VASCULAR)
       ========================================== -->
  <!-- Tallo Principal -->
  <path d="M345 315 L345 130 Q345 110 365 95" fill="none" stroke="url(#stemGrad)" stroke-width="18" stroke-linecap="round" />

  <!-- Hojas Grandes con Nervaduras -->
  <!-- Hoja Izquierda Superior -->
  <path d="M345 150 C280 120, 200 130, 180 150 C210 180, 290 185, 345 160 Z" fill="url(#leafGrad)" stroke="#15803d" stroke-width="1.5" filter="url(#shadow)" />
  <path d="M345 155 Q260 150 180 150" fill="none" stroke="#86efac" stroke-width="2" />

  <!-- Hoja Derecha Media -->
  <path d="M345 190 C420 160, 490 170, 510 195 C470 225, 410 225, 345 200 Z" fill="url(#leafGrad)" stroke="#15803d" stroke-width="1.5" filter="url(#shadow)" />
  <path d="M345 195 Q430 190 510 195" fill="none" stroke="#86efac" stroke-width="2" />

  <!-- Hoja Izquierda Inferior -->
  <path d="M345 240 C270 220, 210 235, 190 260 C230 285, 300 275, 345 250 Z" fill="url(#leafGrad)" stroke="#15803d" stroke-width="1.5" filter="url(#shadow)" />

  <!-- Fruto / Flor (Demanda de Potasio y Fósforo) -->
  <circle cx="370" cy="95" r="16" fill="#ef4444" stroke="#b91c1c" stroke-width="2" filter="url(#shadow)" />
  <circle cx="365" cy="90" r="4" fill="#fca5a5" />
  <rect x="395" y="85" width="115" height="26" rx="6" fill="#ffffff" stroke="#ef4444" stroke-width="1" />
  <text x="402" y="98" font-size="9" font-weight="800" fill="#b91c1c">Fruto / Flor (Sumidero)</text>
  <text x="402" y="107" font-size="8" font-weight="600" fill="#7f1d1d">Demanda K, P y Ca</text>

  <!-- Lupa / Zoom Vascular en el Tallo (Xilema y Floema) -->
  <g transform="translate(180, 205)">
    <circle cx="50" cy="50" r="48" fill="#ffffff" stroke="#0284c7" stroke-width="3" filter="url(#shadow)" />
    
    <!-- Corte Xilema (Azul) -->
    <rect x="25" y="22" width="22" height="56" rx="4" fill="#e0f2fe" stroke="#0284c7" stroke-width="1.5" />
    <path d="M36 70 L36 30" fill="none" stroke="#0284c7" stroke-width="2.5" stroke-linecap="round" />
    <polygon points="36,25 32,32 40,32" fill="#0284c7" />
    <text x="36" y="86" font-size="8" font-weight="800" fill="#0369a1" text-anchor="middle">XILEMA</text>
    
    <!-- Corte Floema (Naranja) -->
    <rect x="53" y="22" width="22" height="56" rx="4" fill="#fef3c7" stroke="#d97706" stroke-width="1.5" />
    <path d="M64 30 L64 70" fill="none" stroke="#d97706" stroke-width="2.5" stroke-linecap="round" />
    <polygon points="64,75 60,68 68,68" fill="#d97706" />
    <text x="64" y="86" font-size="8" font-weight="800" fill="#b45309" text-anchor="middle">FLOEMA</text>
    
    <!-- Cartel explicativo del zoom -->
    <rect x="-85" y="15" width="80" height="42" rx="4" fill="#ffffff" stroke="#64748b" stroke-width="1" />
    <text x="-80" y="28" font-size="7.5" font-weight="800" fill="#0369a1">▲ Savia Bruta</text>
    <text x="-80" y="38" font-size="7" font-weight="600" fill="#475569">Agua + Iones (N,P,K)</text>
    <text x="-80" y="50" font-size="7.5" font-weight="800" fill="#b45309">▼ Savia Elaborada</text>
  </g>

  <!-- ==========================================
       ZONA 3: EL SUELO, LA RIZOSFERA Y ROCA MADRE
       ========================================== -->
  <!-- Límite Superficie del Suelo -->
  <line x1="0" y1="310" x2="1000" y2="310" stroke="#15803d" stroke-width="5" />
  
  <!-- Pasto y Materia Orgánica en Superficie -->
  <path d="M0 310 Q20 300 40 310 Q60 300 80 310 Q120 300 160 310 Q220 300 280 310 Q340 300 400 310 Q480 300 560 310 Q640 300 720 310 Q800 300 880 310 Q940 300 1000 310" fill="none" stroke="#22c55e" stroke-width="3" />

  <!-- Etiqueta Capa Orgánica / Humus -->
  <rect x="20" y="322" width="190" height="26" rx="4" fill="rgba(0,0,0,0.4)" />
  <text x="28" y="339" font-size="11" font-weight="800" fill="#fef08a">🌱 HORIZONTE A: Humus y Compost</text>

  <!-- Sistema Radicular Principal -->
  <!-- Raíz pivotante central -->
  <path d="M345 315 Q340 390 350 480 Q352 520 355 560" fill="none" stroke="#fef3c7" stroke-width="9" stroke-linecap="round" />
  <!-- Ramificaciones laterales -->
  <path d="M345 340 Q390 370 430 400 Q460 420 500 430" fill="none" stroke="#fde68a" stroke-width="4.5" stroke-linecap="round" />
  <path d="M345 365 Q290 390 260 430 Q230 460 210 490" fill="none" stroke="#fde68a" stroke-width="4" stroke-linecap="round" />
  <path d="M350 420 Q400 450 450 470 Q480 490 520 500" fill="none" stroke="#fef08a" stroke-width="3" stroke-linecap="round" />
  <path d="M350 460 Q310 490 280 520 Q260 540 240 560" fill="none" stroke="#fef08a" stroke-width="2.5" stroke-linecap="round" />

  <!-- Nódulos de Fijación de Nitrógeno (Rhizobium con Cobalto Co) -->
  <circle cx="280" cy="410" r="6" fill="#f472b6" stroke="#db2777" stroke-width="1.5" />
  <circle cx="295" cy="425" r="5" fill="#f472b6" stroke="#db2777" stroke-width="1.5" />
  <rect x="145" y="395" width="125" height="30" rx="4" fill="#ffffff" stroke="#db2777" stroke-width="1" />
  <text x="152" y="407" font-size="8" font-weight="800" fill="#9d174d">Nódulos Simbióticos</text>
  <text x="152" y="418" font-size="7.5" font-weight="600" fill="#be185d">Rhizobium fija N₂ (Usa Co)</text>

  <!-- ==========================================
       INFOGRAFÍA DE LAS 3 VÍAS DE TRANSPORTE
       ========================================== -->
  <!-- VÍA 1: FLUJO DE MASAS -->
  <g transform="translate(560, 335)">
    <rect x="0" y="0" width="220" height="74" rx="8" fill="#ffffff" stroke="#0284c7" stroke-width="2" filter="url(#shadow)" />
    <rect x="0" y="0" width="220" height="24" rx="8" fill="#0284c7" />
    <text x="10" y="16" font-size="11" font-weight="900" fill="#ffffff">🌊 1. FLUJO DE MASAS (Mass Flow)</text>
    <text x="10" y="38" font-size="8.5" font-weight="700" fill="#0369a1">Arrastrados con el agua transpirada</text>
    <text x="10" y="52" font-size="8.5" font-weight="800" fill="#1e293b">Iones: NO₃⁻, Ca²⁺, Mg²⁺, SO₄²⁻, Boro</text>
    <text x="10" y="65" font-size="7.5" font-weight="600" fill="#64748b">Cubre el 80-90% de la demanda de Nitrógeno y Calcio</text>

    <!-- Flecha azul de agua fluyendo hacia la raíz -->
    <path d="M-10 40 C-40 45, -70 55, -110 70" fill="none" stroke="#0284c7" stroke-width="3" stroke-dasharray="4,3" />
    <polygon points="-110,70 -98,67 -102,76" fill="#0284c7" />
  </g>

  <!-- VÍA 2: DIFUSIÓN QUÍMICA -->
  <g transform="translate(560, 420)">
    <rect x="0" y="0" width="220" height="74" rx="8" fill="#ffffff" stroke="#16a34a" stroke-width="2" filter="url(#shadow)" />
    <rect x="0" y="0" width="220" height="24" rx="8" fill="#16a34a" />
    <text x="10" y="16" font-size="11" font-weight="900" fill="#ffffff">🧲 2. DIFUSIÓN (Diffusion)</text>
    <text x="10" y="38" font-size="8.5" font-weight="700" fill="#15803d">Viajan por gradiente [Alta] → [Baja]</text>
    <text x="10" y="52" font-size="8.5" font-weight="800" fill="#1e293b">Iones: H₂PO₄⁻ (Fósforo), K⁺, Fe²⁺, Zn²⁺</text>
    <text x="10" y="65" font-size="7.5" font-weight="600" fill="#64748b">Vital para Fósforo (>90%) y Potasio (~80%)</text>

    <!-- Ondas de difusión hacia la raíz -->
    <path d="M-10 38 Q-40 45 -70 60" fill="none" stroke="#16a34a" stroke-width="2.5" stroke-dasharray="2,3" />
    <polygon points="-70,60 -60,54 -61,64" fill="#16a34a" />
  </g>

  <!-- VÍA 3: INTERCEPCIÓN RADICULAR -->
  <g transform="translate(560, 505)">
    <rect x="0" y="0" width="220" height="70" rx="8" fill="#ffffff" stroke="#ea580c" stroke-width="2" filter="url(#shadow)" />
    <rect x="0" y="0" width="220" height="24" rx="8" fill="#ea580c" />
    <text x="10" y="16" font-size="11" font-weight="900" fill="#ffffff">🌱 3. INTERCEPCIÓN RADICULAR</text>
    <text x="10" y="38" font-size="8.5" font-weight="700" fill="#c2410c">Contacto directo con arcillas y humus</text>
    <text x="10" y="51" font-size="8.5" font-weight="800" fill="#1e293b">Intercambio catiónico en pelos radiculares</text>
    <text x="10" y="63" font-size="7.5" font-weight="600" fill="#64748b">La raíz crece hacia el nutriente en el poro</text>
  </g>

  <!-- ==========================================
       ZONA 4: ROCA MADRE Y METEORIZACIÓN GEOLÓGICA
       ========================================== -->
  <g transform="translate(20, 480)">
    <!-- Bloque de Roca Madre -->
    <rect x="0" y="0" width="230" height="120" rx="6" fill="url(#rockGrad)" stroke="#1e293b" stroke-width="2" filter="url(#shadow)" />
    <text x="12" y="20" font-size="11" font-weight="900" fill="#f8fafc">🏔️ ROCA MADRE (Meteorización)</text>
    <text x="12" y="34" font-size="8" font-weight="600" fill="#cbd5e1">Origen geológico de los minerales en miles de años:</text>
    
    <!-- Minerales y qué nutriente aportan -->
    <rect x="10" y="42" width="210" height="18" rx="3" fill="rgba(255,255,255,0.12)" />
    <text x="15" y="54" font-size="8" font-weight="700" fill="#fde68a">• Apatitas [Ca₅(PO₄)₃] ➔ Fósforo (P)</text>
    
    <rect x="10" y="63" width="210" height="18" rx="3" fill="rgba(255,255,255,0.12)" />
    <text x="15" y="75" font-size="8" font-weight="700" fill="#bfdbfe">• Feldespatos / Micas ➔ Potasio (K)</text>
    
    <rect x="10" y="84" width="210" height="18" rx="3" fill="rgba(255,255,255,0.12)" />
    <text x="15" y="96" font-size="8" font-weight="700" fill="#fed7aa">• Calizas y Dolomita ➔ Calcio (Ca) y Mg</text>
    
    <text x="12" y="112" font-size="7.5" font-weight="600" fill="#94a3b8">• Yeso natural ➔ Azufre (S) | Cuarzo ➔ Silicio (Si)</text>

    <!-- Flechas de desintegración y liberación -->
    <path d="M230 60 C260 60, 280 50, 310 40" fill="none" stroke="#fde68a" stroke-width="2" stroke-dasharray="3,3" />
    <polygon points="310,40 300,43 303,34" fill="#fde68a" />
  </g>

  <!-- Puntos minerales microscópicos flotando en la solución del suelo -->
  <g font-size="8" font-weight="800">
    <circle cx="480" cy="350" r="8" fill="#16a34a" /><text x="480" y="353" fill="#fff" text-anchor="middle">K⁺</text>
    <circle cx="440" cy="380" r="10" fill="#0284c7" /><text x="440" y="383" fill="#fff" text-anchor="middle" font-size="7">NO₃⁻</text>
    <circle cx="510" cy="400" r="9" fill="#d97706" /><text x="510" y="403" fill="#fff" text-anchor="middle" font-size="7">H₂PO₄⁻</text>
    <circle cx="420" cy="430" r="8" fill="#ea580c" /><text x="420" y="433" fill="#fff" text-anchor="middle">Ca²⁺</text>
    <circle cx="470" cy="460" r="8" fill="#ca8a04" /><text x="470" y="463" fill="#fff" text-anchor="middle">Mg²⁺</text>
    <circle cx="390" cy="490" r="8" fill="#7c3aed" /><text x="390" y="493" fill="#fff" text-anchor="middle">Fe²⁺</text>
    <circle cx="430" cy="520" r="8" fill="#0891b2" /><text x="430" y="523" fill="#fff" text-anchor="middle">SO₄²⁻</text>
    <circle cx="490" cy="530" r="8" fill="#db2777" /><text x="490" y="533" fill="#fff" text-anchor="middle">Zn²⁺</text>
  </g>
</svg>'''

with open('assets/images/infografia-nutricion-suelo.svg', 'w', encoding='utf-8') as f:
    f.write(svg_content)

print("assets/images/infografia-nutricion-suelo.svg created successfully!")
