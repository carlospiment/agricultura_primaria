# Generador de laboratorioSuelo.js con Estructuras Moleculares y corrección de MEDUCA 2026

script_content = '''/**
 * Laboratorio Interactivo del Suelo: Nutrientes Vegetales, Absorción Radicular, Química y pH
 * Basado en estándares científicos: FAO, IPNI, USDA-NRCS, Modelos de Barber & Oliver y Fisiología de Marschner (2012)
 * Programa de Agricultura - Sexto Grado (Área 4: Suelos y Edafología)
 */
(function() {
  'use strict';

  // 1. Clasificación Científica de los Grupos Nutricionales
  const GRUPOS_NUTRIENTES = {
    primarios: {
      id: 'primarios',
      nombre: 'Macronutrientes Primarios',
      icono: '🌱',
      color: '#16a34a',
      bgLight: '#dcfce7',
      borde: '#16a34a',
      resumenCientifico: 'Elementos minerales con la mayor demanda cuantitativa en la biomasa vegetal (> 1% de la materia seca). Suelen ser los factores limitantes más comunes en el suelo agrícola.',
      fuente: 'FAO (2020) & International Plant Nutrition Institute (IPNI)',
      elementos: ['N', 'P', 'K']
    },
    secundarios: {
      id: 'secundarios',
      nombre: 'Macronutrientes Secundarios',
      icono: '🧱',
      color: '#d97706',
      bgLight: '#fef3c7',
      borde: '#d97706',
      resumenCientifico: 'Requeridos en cantidades moderadas (0.1% a 1% de materia seca). Son componentes estructurales esenciales de paredes celulares, clorofila y aminoácidos azufrados.',
      fuente: 'USDA-NRCS & Marschner: Mineral Nutrition of Higher Plants (2012)',
      elementos: ['Ca', 'Mg', 'S']
    },
    micros: {
      id: 'micros',
      nombre: 'Micronutrientes (Oligoelementos)',
      icono: '🔬',
      color: '#7c3aed',
      bgLight: '#ede9fe',
      borde: '#7c3aed',
      resumenCientifico: 'Requeridos en cantidades traza (partes por millón, < 0.01% de materia seca), pero con el mismo grado de indispensabilidad biológica. Actúan como cofactores y activadores enzimáticos.',
      fuente: 'Criterios de Esencialidad de Arnon & Stout (1939) & Taiz & Zeiger',
      elementos: ['Fe', 'Zn', 'Mn', 'B', 'Cu', 'Mo']
    },
    estructurales: {
      id: 'estructurales',
      nombre: 'Elementos Estructurales (No Minerales)',
      icono: '💨',
      color: '#0284c7',
      bgLight: '#e0f2fe',
      borde: '#0284c7',
      resumenCientifico: 'Constituyen entre el 90% y el 95% de la biomasa seca vegetal. No provienen de la roca madre del suelo; se absorben directamente de la atmósfera (CO₂) y del agua (H₂O) mediante la fotosíntesis.',
      fuente: 'Fisiología Vegetal Comparada (Taiz & Moller) & FAO',
      elementos: ['C', 'H', 'O']
    },
    beneficos: {
      id: 'beneficos',
      nombre: 'Elementos Benéficos (Funcionales)',
      icono: '✨',
      color: '#db2777',
      bgLight: '#fce7f3',
      borde: '#db2777',
      resumenCientifico: 'Elementos químicos no estrictamente indispensables para completar el ciclo de vida en todas las plantas, pero que estimulan drásticamente el vigor, la resistencia contra plagas/enfermedades, o la fijación simbiótica.',
      fuente: 'Epstein & Bloom (2005) & International Fertilizer Association (IFA)',
      elementos: ['Si', 'Co']
    }
  };

  // 2. Fichas de Cada Elemento Químico Nutricional (con Origen Natural, Mecanismo y Estructura Molecular SVG)
  const ELEMENTOS_DATA = {
    // --- MACRONUTRIENTES PRIMARIOS ---
    N: {
      grupo: 'primarios',
      simbolo: 'N',
      numero: '7',
      nombre: 'Nitrógeno',
      formaAsimilable: 'Nitrato (NO₃⁻) y Amonio (NH₄⁺)',
      mecanismoTransporte: 'Flujo de Masas (80% - 90%): el agua del suelo que la planta absorbe al transpirar arrastra los aniones nitrato hacia los pelos radiculares, donde ingresan por transportadores activos acoplados a protones (NRT1/NRT2).',
      origenNatural: 'Atmósfera terrestre (78% de N₂ gaseoso). En la naturaleza ingresa al suelo mediante: 1) Fijación biológica por bacterias simbióticas (Rhizobium en leguminosas) y de vida libre (Azotobacter, cianobacterias); 2) Descargas eléctricas de rayos en tormentas que ionizan N₂ a óxidos nítricos solubles con la lluvia; 3) Descomposición y mineralización biológica del humus y restos vegetales.',
      rol: 'Crecimiento Vegetativo, Hojas Verdes y Clorofila',
      resumen: 'Es el motor del crecimiento vegetal. Forma parte integral de todas las proteínas, enzimas, aminoácidos, ácidos nucleicos (ADN/ARN) y de la molécula de clorofila responsable de la fotosíntesis.',
      fuentes: 'Compost maduro, purines de ortiga, abonos verdes con leguminosas (frijol de abono, guandú) y gallinaza bien fermentada.',
      deficiencia: 'Clorosis generalizada (amarillamiento) que inicia en las hojas más viejas (inferiores) y avanza hacia arriba. Crecimiento raquítico.',
      exceso: 'Follaje excesivo de color verde oscuro azulado, tallos débiles y quebradizos, y retraso severo en la floración.',
      consejo: 'Asociar maíz con frijol en el huerto escolar permite aprovechar el nitrógeno atmosférico que las bacterias fijan en las raíces del frijol.',
      nombreMolecula: 'Aminoácido (Enlace Peptídico) y Anión Nitrato (NO₃⁻)',
      formulaQuimica: 'R–CH(NH₂)–COOH / NO₃⁻',
      explicacionMolecular: 'El nitrógeno posee 5 electrones de valencia y forma 3 enlaces covalentes estables. En las plantas se ensambla en el grupo amino (-NH₂) de los aminoácidos para formar cadenas de proteínas y bases nitrogenadas del ADN.',
      rolBioquimico: 'Constituyente de todos los péptidos, enzimas catalíticas y los 4 anillos pirrólicos de la clorofila.',
      svgMolecular: `<svg viewBox="0 0 220 120" width="100%" height="110">
        <!-- Ion Nitrato (NO3-) resonante -->
        <g transform="translate(45, 60)">
          <line x1="0" y1="0" x2="0" y2="-32" stroke="#2563eb" stroke-width="3" />
          <line x1="3" y1="0" x2="3" y2="-32" stroke="#2563eb" stroke-width="1.5" />
          <line x1="0" y1="0" x2="28" y2="18" stroke="#2563eb" stroke-width="2" />
          <line x1="0" y1="0" x2="-28" y2="18" stroke="#2563eb" stroke-width="2" />
          <circle cx="0" cy="0" r="14" fill="#2563eb" /><text x="0" y="5" font-size="12" font-weight="900" fill="#fff" text-anchor="middle">N⁺</text>
          <circle cx="0" cy="-34" r="11" fill="#dc2626" /><text x="0" y="-30" font-size="10" font-weight="800" fill="#fff" text-anchor="middle">O</text>
          <circle cx="30" cy="20" r="11" fill="#dc2626" /><text x="30" y="24" font-size="10" font-weight="800" fill="#fff" text-anchor="middle">O⁻</text>
          <circle cx="-30" cy="20" r="11" fill="#dc2626" /><text x="-30" y="24" font-size="10" font-weight="800" fill="#fff" text-anchor="middle">O⁻</text>
        </g>
        <!-- Grupo Aminoácido -->
        <g transform="translate(150, 60)">
          <line x1="-35" y1="0" x2="-10" y2="0" stroke="#475569" stroke-width="2" />
          <line x1="-10" y1="0" x2="20" y2="0" stroke="#475569" stroke-width="2" />
          <line x1="20" y1="0" x2="38" y2="-18" stroke="#dc2626" stroke-width="2" />
          <line x1="20" y1="0" x2="38" y2="18" stroke="#dc2626" stroke-width="2" />
          <circle cx="-35" cy="0" r="12" fill="#2563eb" /><text x="-35" y="4" font-size="9" font-weight="800" fill="#fff" text-anchor="middle">NH₂</text>
          <circle cx="-10" cy="0" r="10" fill="#475569" /><text x="-10" y="4" font-size="9" font-weight="800" fill="#fff" text-anchor="middle">Cα</text>
          <circle cx="20" cy="0" r="10" fill="#475569" /><text x="20" y="4" font-size="9" font-weight="800" fill="#fff" text-anchor="middle">C</text>
          <circle cx="42" cy="-20" r="8" fill="#dc2626" /><text x="42" y="-17" font-size="7" font-weight="800" fill="#fff" text-anchor="middle">=O</text>
          <circle cx="42" cy="20" r="8" fill="#dc2626" /><text x="42" y="23" font-size="7" font-weight="800" fill="#fff" text-anchor="middle">OH</text>
          <text x="-10" y="-16" font-size="8" font-weight="700" fill="#1e293b" text-anchor="middle">Cadena R</text>
        </g>
      </svg>`
    },
    P: {
      grupo: 'primarios',
      simbolo: 'P',
      numero: '15',
      nombre: 'Fósforo',
      formaAsimilable: 'Ortofosfatos solubles: H₂PO₄⁻ y HPO₄²⁻',
      mecanismoTransporte: 'Difusión (>90%): el fósforo tiene solubilidad y movilidad extremadamente bajas en el suelo (avanza menos de 1 mm por semana). La raíz debe absorberlo de su entorno inmediato por transportadores activos de alta afinidad (Pht1), o recurrir a micorrizas asociadas.',
      origenNatural: 'Litósfera y Rocas Fosfóricas: proviene de la meteorización lenta de minerales ígneos y sedimentarios del grupo de la Apatita [Ca₅(PO₄)₃(F,Cl,OH)], depósitos fósiles de guano marino de aves y lixiviación milenaria de sedimentos marinos.',
      rol: 'Enraizamiento Profundo, Transferencia de Energía (ATP) y Floración',
      resumen: 'Interviene directamente en el almacenamiento y transporte de energía celular (moléculas de ATP y ADP), en la formación de fosfolípidos de membranas celulares y en la maduración de semillas y flores.',
      fuentes: 'Harina de huesos calcinada, roca fosfórica molida, estiércol avícola maduro y compost enriquecido.',
      deficiencia: 'Bordes y venas de las hojas más viejas adquieren coloraciones púrpuras, violáceas o rojizas. Sistema radicular escaso y enano.',
      exceso: 'No causa daño tóxico directo visible, pero bloquea e inhibe la absorción de micronutrientes indispensables como el Zinc (Zn) y Hierro (Fe).',
      consejo: 'Aplica el abono rico en fósforo en el fondo del hoyo de siembra, pues al ser tan poco móvil, las raíces deben crecer directamente hacia él.',
      nombreMolecula: 'Molécula de ATP (Adenosín Trifosfato) y Fosfatos de Energía',
      formulaQuimica: 'C₁₀H₁₆N₅O₁₃P₃ (ATP) / H₂PO₄⁻',
      explicacionMolecular: 'El fósforo coordina 4 oxígenos en geometría tetraédrica formando puentes fosfodiéster. En el ATP, la hidrólisis del enlace fosfato terminal libera 30.5 kJ/mol de energía metabólica vital.',
      rolBioquimico: 'Moneda energética universal de la célula vegetal para fotosíntesis y síntesis de azúcares.',
      svgMolecular: `<svg viewBox="0 0 220 120" width="100%" height="110">
        <!-- Cadena Trifosfato de ATP -->
        <g transform="translate(10, 60)">
          <!-- Adenosina + Ribosa -->
          <rect x="0" y="-18" width="50" height="36" rx="5" fill="#f1f5f9" stroke="#64748b" stroke-width="1.5" />
          <text x="25" y="-3" font-size="8.5" font-weight="800" fill="#1e293b" text-anchor="middle">Adenina</text>
          <text x="25" y="10" font-size="7.5" font-weight="600" fill="#64748b" text-anchor="middle">+ Ribosa</text>
          <!-- Enlace éster -->
          <line x1="50" y1="0" x2="70" y2="0" stroke="#d97706" stroke-width="2" />
          <!-- Fosfato Alfa -->
          <circle cx="82" cy="0" r="12" fill="#d97706" /><text x="82" y="4" font-size="10" font-weight="900" fill="#fff" text-anchor="middle">Pα</text>
          <!-- Enlace Fosfoanhídrido Alta Energía -->
          <path d="M94 0 Q99 -6 104 0 Q109 6 114 0" fill="none" stroke="#ef4444" stroke-width="2.5" />
          <!-- Fosfato Beta -->
          <circle cx="126" cy="0" r="12" fill="#d97706" /><text x="126" y="4" font-size="10" font-weight="900" fill="#fff" text-anchor="middle">Pβ</text>
          <!-- Enlace Fosfoanhídrido Alta Energía -->
          <path d="M138 0 Q143 -6 148 0 Q153 6 158 0" fill="none" stroke="#ef4444" stroke-width="2.5" />
          <!-- Fosfato Gamma (Terminal) -->
          <circle cx="170" cy="0" r="12" fill="#d97706" /><text x="170" y="4" font-size="10" font-weight="900" fill="#fff" text-anchor="middle">Pγ</text>
          <!-- Oxígenos periféricos -->
          <circle cx="82" cy="-22" r="6" fill="#dc2626" /><circle cx="126" cy="-22" r="6" fill="#dc2626" /><circle cx="170" cy="-22" r="6" fill="#dc2626" />
          <text x="135" y="32" font-size="8" font-weight="800" fill="#dc2626" text-anchor="middle">⚡ Enlaces de Alta Energía (ATP)</text>
        </g>
      </svg>`
    },
    K: {
      grupo: 'primarios',
      simbolo: 'K',
      numero: '19',
      nombre: 'Potasio',
      formaAsimilable: 'Catión Potasio libre en solución (K⁺)',
      mecanismoTransporte: 'Difusión (~80%) y Flujo de Masas (~20%): se libera de las arcillas del suelo hacia la solución circundante donde es absorbido por canales iónicos específicos (canales Shaker tipo AKT1) y transportadores KUP/HAK.',
      origenNatural: 'Corteza Terrestre y Minerales Silicatados: proviene de la meteorización geoquímica de rocas ígneas ricas en Feldespatos potásicos (Ortoclasa y Microclina, KAlSi₃O₈) y Micas (Moscovita, Biotita), así como de depósitos de sales evaporíticas marinas antiguas (Silvita, KCl; Carnalita).',
      rol: 'Resistencia a Sequía, Apertura de Estomas y Calibre de Frutos',
      resumen: 'Regula la presión de turgencia y la apertura/cierre de los estomas celulares para economizar agua, activa más de 60 enzimas metabólicas y transporta azúcares hacia los frutos y tubérculos.',
      fuentes: 'Té o extracto de cáscaras de plátano hervidas, ceniza de leña limpia cernida (en suelos no alcalinos) y mulch vegetal.',
      deficiencia: 'Bordes y puntas de las hojas chamuscadas o secas (necrosis marginal en forma de "V" invertida), tallos débiles y frutos insípidos.',
      exceso: 'El exceso de potasio bloquea la asimilación de Magnesio (Mg) y Calcio (Ca), originando podredumbres apicales en tomates.',
      consejo: 'El fertilizante casero de cáscaras de plátano es ideal cuando las tomateras y pimientos del huerto inician la floración y cuajado.',
      nombreMolecula: 'Catión K⁺ Hidratado y Canal de Membrana Celular',
      formulaQuimica: 'K⁺ · 6H₂O (Esfera Octaédrica)',
      explicacionMolecular: 'El ion K⁺ tiene un radio iónico de 138 pm. En solución acuosa se rodea de 6 moléculas de agua formando un complejo octaédrico que es deshidratado selectivamente al atravesar el filtro de carbonilos del canal iónico vegetal.',
      rolBioquimico: 'Motor osmótico que infla las células oclusivas para abrir los estomas y capturar CO₂.',
      svgMolecular: `<svg viewBox="0 0 220 120" width="100%" height="110">
        <!-- Complejo de K+ hidratado -->
        <g transform="translate(110, 60)">
          <!-- Moléculas de H2O coordinadas -->
          <line x1="0" y1="0" x2="0" y2="-36" stroke="#0284c7" stroke-width="1.5" stroke-dasharray="3,2" />
          <line x1="0" y1="0" x2="0" y2="36" stroke="#0284c7" stroke-width="1.5" stroke-dasharray="3,2" />
          <line x1="0" y1="0" x2="-36" y2="0" stroke="#0284c7" stroke-width="1.5" stroke-dasharray="3,2" />
          <line x1="0" y1="0" x2="36" y2="0" stroke="#0284c7" stroke-width="1.5" stroke-dasharray="3,2" />
          <line x1="0" y1="0" x2="-26" y2="-26" stroke="#0284c7" stroke-width="1.5" stroke-dasharray="3,2" />
          <line x1="0" y1="0" x2="26" y2="26" stroke="#0284c7" stroke-width="1.5" stroke-dasharray="3,2" />
          <!-- Aguas -->
          <circle cx="0" cy="-36" r="8" fill="#38bdf8" /><text x="0" y="-33" font-size="6" font-weight="800" fill="#fff" text-anchor="middle">H₂O</text>
          <circle cx="0" cy="36" r="8" fill="#38bdf8" /><text x="0" y="39" font-size="6" font-weight="800" fill="#fff" text-anchor="middle">H₂O</text>
          <circle cx="-36" cy="0" r="8" fill="#38bdf8" /><text x="-36" y="3" font-size="6" font-weight="800" fill="#fff" text-anchor="middle">H₂O</text>
          <circle cx="36" cy="0" r="8" fill="#38bdf8" /><text x="36" y="3" font-size="6" font-weight="800" fill="#fff" text-anchor="middle">H₂O</text>
          <circle cx="-26" cy="-26" r="7" fill="#38bdf8" />
          <circle cx="26" cy="26" r="7" fill="#38bdf8" />
          <!-- Ion Potasio Central -->
          <circle cx="0" cy="0" r="18" fill="#0284c7" stroke="#0369a1" stroke-width="2" />
          <text x="0" y="6" font-size="13" font-weight="900" fill="#ffffff" text-anchor="middle">K⁺</text>
        </g>
        <text x="110" y="112" font-size="8" font-weight="700" fill="#0369a1" text-anchor="middle">Esfera de Coordinación Acuosa</text>
      </svg>`
    },

    // --- MACRONUTRIENTES SECUNDARIOS ---
    Ca: {
      grupo: 'secundarios',
      simbolo: 'Ca',
      numero: '20',
      nombre: 'Calcio',
      formaAsimilable: 'Catión divalente Calcio (Ca²⁺)',
      mecanismoTransporte: 'Flujo de Masas e Intercepción Radicular: ingresa por el ápice de las raíces tiernas y viaja estrictamente por el xilema arrastrado por la corriente de transpiración hídrica hacia las hojas y frutos.',
      origenNatural: 'Rocas Carbonatadas Sedimentarias: muy abundante en la corteza terrestre en forma de Calizas, Mármoles y Creta (minerales Calcita y Aragonito, CaCO₃), Dolomita [CaMg(CO₃)₂], depósitos de Yeso (CaSO₄·2H₂O) y feldespatos plagioclasas (Anortita).',
      rol: 'Paredes Celulares (Pectato de Calcio) y Firmeza Estructural',
      resumen: 'Forma el pectato de calcio en la lámina media que "cementa" y rigidiza las paredes de las células vegetales, actúa como segundo mensajero celular y estimula el desarrollo del meristemo radicular.',
      fuentes: 'Cáscaras de huevo trituradas maceradas en vinagre (acetato de calcio soluble), cal agrícola molida y yeso agrícola.',
      deficiencia: 'Muerte de las yemas terminales, hojas jóvenes deformes o curvadas en forma de cuchara, y la típica podredumbre apical ("culo negro") en tomates y pimentones.',
      exceso: 'Eleva excesivamente el pH del suelo provocando la precipitación e inmovilización de fósforo y de micronutrientes catiónicos como el hierro y zinc.',
      consejo: 'El calcio se mueve solo si la planta transpira agua; mantener un riego uniforme previene que los tomates sufran podredumbre apical.',
      nombreMolecula: 'Complejo "Egg-Box" de Pectato de Calcio en la Pared Celular',
      formulaQuimica: '[C₆H₇O₆–Ca²⁺–C₆H₇O₆]ₙ',
      explicacionMolecular: 'El catión divalente Ca²⁺ se sitúa entre dos cadenas helicoidales antiparalelas de ácido poligalacturónico de la pectina, coordinándose con 4 grupos carboxilato (-COO⁻) para "coser" la pared vegetal.',
      rolBioquimico: 'Cemento estructural que previene el agrietamiento de frutos y la podredumbre apical.',
      svgMolecular: `<svg viewBox="0 0 220 120" width="100%" height="110">
        <!-- Modelo Egg-Box de Calcio -->
        <g transform="translate(110, 60)">
          <!-- Cadena superior de pectina -->
          <path d="M-90 -30 Q-45 -45 0 -30 Q45 -15 90 -30" fill="none" stroke="#16a34a" stroke-width="4" stroke-linecap="round" />
          <!-- Cadena inferior de pectina -->
          <path d="M-90 30 Q-45 15 0 30 Q45 45 90 30" fill="none" stroke="#16a34a" stroke-width="4" stroke-linecap="round" />
          <!-- Enlaces iónicos con el Calcio -->
          <line x1="-45" y1="-22" x2="-45" y2="0" stroke="#ea580c" stroke-width="2" stroke-dasharray="3,2" />
          <line x1="-45" y1="22" x2="-45" y2="0" stroke="#ea580c" stroke-width="2" stroke-dasharray="3,2" />
          <line x1="45" y1="-22" x2="45" y2="0" stroke="#ea580c" stroke-width="2" stroke-dasharray="3,2" />
          <line x1="45" y1="22" x2="45" y2="0" stroke="#ea580c" stroke-width="2" stroke-dasharray="3,2" />
          <!-- Iones Calcio centrales (Huevos de la caja) -->
          <circle cx="-45" cy="0" r="14" fill="#ea580c" stroke="#c2410c" stroke-width="1.5" />
          <text x="-45" y="4" font-size="9" font-weight="900" fill="#fff" text-anchor="middle">Ca²⁺</text>
          <circle cx="45" cy="0" r="14" fill="#ea580c" stroke="#c2410c" stroke-width="1.5" />
          <text x="45" y="4" font-size="9" font-weight="900" fill="#fff" text-anchor="middle">Ca²⁺</text>
          <!-- Cargas negativas -->
          <circle cx="-45" cy="-24" r="5" fill="#dc2626" /><circle cx="-45" cy="24" r="5" fill="#dc2626" />
          <circle cx="45" cy="-24" r="5" fill="#dc2626" /><circle cx="45" cy="24" r="5" fill="#dc2626" />
        </g>
        <text x="110" y="112" font-size="8" font-weight="700" fill="#c2410c" text-anchor="middle">Reticulación de Cadenas de Pectina</text>
      </svg>`
    },
    Mg: {
      grupo: 'secundarios',
      simbolo: 'Mg',
      numero: '12',
      nombre: 'Magnesio',
      formaAsimilable: 'Catión Magnesio libre (Mg²⁺)',
      mecanismoTransporte: 'Flujo de Masas (principalmente) y Difusión: absorbido por transportadores específicos de magnesio (familia MRS2/MGT) presentes en la membrana plasmática de los pelos absorbentes.',
      origenNatural: 'Rocas Ígneas Máficas y Carbonatos: abundante en minerales ferromagnesianos como Olivino [(Mg,Fe)₂SiO₄], Piroxenos, Biotita, rocas sedimentarias de Dolomita [CaMg(CO₃)₂], Magnesita (MgCO₃), rocas metamórficas (Serpentina) y sales evaporíticas (Epsomita, sulfato de magnesio).',
      rol: 'Átomo Central de la Molécula de Clorofila y Fotosíntesis',
      resumen: 'Es el corazón químico de cada molécula de clorofila (representa el 2.7% de su peso molecular). Sin magnesio, la planta no puede absorber fotones solares ni realizar fotosíntesis, además de activar la síntesis de almidones.',
      fuentes: 'Harina de dolomita (carbonato de calcio y magnesio), sales de Epsom (sulfato de magnesio) aplicadas al follaje y compost verde.',
      deficiencia: 'Clorosis intervenal ("patrón de espina de pescado") en hojas viejas: las nervaduras permanecen verdes mientras el espacio entre ellas se vuelve amarillo brillante.',
      exceso: 'Genera un desbalance catiónico severo en el suelo que reduce la absorción de potasio y calcio.',
      consejo: 'Una pulverización suave con 1 cucharada de sales de Epsom en 4 litros de agua revive rápidamente hojas intervenalmente amarillas.',
      nombreMolecula: 'Anillo de Porfirina con Magnesio en la Molécula de Clorofila',
      formulaQuimica: 'C₅₅H₇₂MgN₄O₅ (Clorofila a)',
      explicacionMolecular: 'El átomo central de Mg²⁺ se encuentra coordinado tetraédricamente por 4 anillos pirrólicos con nitrógeno. Su densidad electrónica le permite absorber la luz azul (430 nm) y roja (660 nm) reflejando el color verde.',
      rolBioquimico: 'Captura y transducción de energía fotónica solar en electrones químicos para la fotosíntesis.',
      svgMolecular: `<svg viewBox="0 0 220 120" width="100%" height="110">
        <!-- Anillo de Clorofila con Mg central -->
        <g transform="translate(110, 60)">
          <!-- Los 4 anillos pirrólicos conectados -->
          <polygon points="0,-42 28,-28 42,0 28,28 0,42 -28,28 -42,0 -28,-28" fill="none" stroke="#15803d" stroke-width="2.5" />
          <!-- Enlaces de coordinación N -> Mg -->
          <line x1="0" y1="-28" x2="0" y2="0" stroke="#16a34a" stroke-width="2" />
          <line x1="0" y1="28" x2="0" y2="0" stroke="#16a34a" stroke-width="2" />
          <line x1="-28" y1="0" x2="0" y2="0" stroke="#16a34a" stroke-width="2" />
          <line x1="28" y1="0" x2="0" y2="0" stroke="#16a34a" stroke-width="2" />
          <!-- Los 4 Nitrógenos coordinantes -->
          <circle cx="0" cy="-28" r="8" fill="#2563eb" /><text x="0" y="-25" font-size="7" font-weight="900" fill="#fff" text-anchor="middle">N</text>
          <circle cx="0" cy="28" r="8" fill="#2563eb" /><text x="0" y="31" font-size="7" font-weight="900" fill="#fff" text-anchor="middle">N</text>
          <circle cx="-28" cy="0" r="8" fill="#2563eb" /><text x="-28" y="3" font-size="7" font-weight="900" fill="#fff" text-anchor="middle">N</text>
          <circle cx="28" cy="0" r="8" fill="#2563eb" /><text x="28" y="3" font-size="7" font-weight="900" fill="#fff" text-anchor="middle">N</text>
          <!-- Átomo Central de Magnesio -->
          <circle cx="0" cy="0" r="16" fill="#16a34a" stroke="#15803d" stroke-width="2" />
          <text x="0" y="5" font-size="11" font-weight="900" fill="#ffffff" text-anchor="middle">Mg²⁺</text>
        </g>
        <text x="110" y="112" font-size="8" font-weight="700" fill="#15803d" text-anchor="middle">Centro Reactivo de la Molécula de Clorofila</text>
      </svg>`
    },
    S: {
      grupo: 'secundarios',
      simbolo: 'S',
      numero: '16',
      nombre: 'Azufre',
      formaAsimilable: 'Anión Sulfato soluble (SO₄²⁻)',
      mecanismoTransporte: 'Flujo de Masas: al ser un anión sumamente móvil en el agua del suelo, es absorbido activamente por transportadores simporte de sulfato/protones (SULTR) en la epidermis radicular.',
      origenNatural: 'Minerales de Sulfuro, Yeso y Vulcanismo: se encuentra en la pirita de hierro (FeS₂), en grandes estratos evaporíticos de Yeso (CaSO₄·2H₂O), emanaciones volcánicas gaseosas (SO₂, H₂S), depósitos de azufre elemental nativo y en la materia orgánica vegetal descompuesta.',
      rol: 'Síntesis de Aminoácidos Azufrados, Proteínas y Aromas Defensivos',
      resumen: 'Constituyente insustituible de los aminoácidos cisteína y metionina, indispensables para formar proteínas, enzimas respiratorias y los compuestos aromáticos típicos del culantro, ajo y cebolla.',
      fuentes: 'Yeso agrícola (sulfato de calcio), materia orgánica bien descompuesta y restos de plantas crucíferas en el compost.',
      deficiencia: 'Clorosis uniforme de color verde pálido o amarillo en las hojas más jóvenes (a diferencia del nitrógeno, que afecta hojas viejas).',
      exceso: 'Rara vez tóxico, pero en dosis extremas puede acidificar fuertemente el suelo y quemar las raíces absorbentes.',
      consejo: 'El azufre orgánico estimula el aroma penetrante de las plantas aromáticas y medicinales del huerto escolar.',
      nombreMolecula: 'Aminoácido Cisteína y Puentes Disulfuro (–S–S–)',
      formulaQuimica: 'HS–CH₂–CH(NH₂)–COOH / SO₄²⁻',
      explicacionMolecular: 'El azufre forma el grupo tiol (-SH). Dos residuos de cisteína pueden oxidarse formando un puente disulfuro covalente (-S-S-) que une cadenas proteicas, dando estabilidad térmica y enzimática.',
      rolBioquimico: 'Plegamiento tridimensional de proteínas y síntesis de glucosinolatos protectores.',
      svgMolecular: `<svg viewBox="0 0 220 120" width="100%" height="110">
        <!-- Molécula con puente disulfuro -S-S- -->
        <g transform="translate(110, 60)">
          <!-- Cadena 1 -->
          <rect x="-85" y="-12" width="40" height="24" rx="4" fill="#f1f5f9" stroke="#64748b" />
          <text x="-65" y="4" font-size="8" font-weight="700" fill="#334155" text-anchor="middle">Cadena A</text>
          <line x1="-45" y1="0" x2="-22" y2="0" stroke="#475569" stroke-width="2" />
          <!-- Azufre 1 -->
          <circle cx="-16" cy="0" r="14" fill="#eab308" stroke="#ca8a04" stroke-width="1.5" />
          <text x="-16" y="5" font-size="12" font-weight="900" fill="#713f12" text-anchor="middle">S</text>
          <!-- Puente Covalente S-S -->
          <line x1="-2" y1="0" x2="14" y2="0" stroke="#ca8a04" stroke-width="3" />
          <!-- Azufre 2 -->
          <circle cx="28" cy="0" r="14" fill="#eab308" stroke="#ca8a04" stroke-width="1.5" />
          <text x="28" y="5" font-size="12" font-weight="900" fill="#713f12" text-anchor="middle">S</text>
          <line x1="42" y1="0" x2="65" y2="0" stroke="#475569" stroke-width="2" />
          <!-- Cadena 2 -->
          <rect x="65" y="-12" width="40" height="24" rx="4" fill="#f1f5f9" stroke="#64748b" />
          <text x="85" y="4" font-size="8" font-weight="700" fill="#334155" text-anchor="middle">Cadena B</text>
        </g>
        <text x="110" y="110" font-size="8" font-weight="700" fill="#ca8a04" text-anchor="middle">Puente Disulfuro (Estabilidad de Proteínas)</text>
      </svg>`
    },

    // --- MICRONUTRIENTES ESENCIALES ---
    Fe: {
      grupo: 'micros',
      simbolo: 'Fe',
      numero: '26',
      nombre: 'Hierro',
      formaAsimilable: 'Catión Ferroso soluble (Fe²⁺) y quelatos',
      mecanismoTransporte: 'Difusión y Mecanismo Estrategia I: las raíces secretan protones (H⁺) para acidificar el suelo alrededor y una enzima férrico-reductasa (FRO2) que reduce el Fe³⁺ insoluble a Fe²⁺ absorbible por el transportador IRT1.',
      origenNatural: 'Corteza Terrestre y Óxidos Minerales: es el 4.° elemento más abundante en la corteza terrestre (~5%). Proviene de minerales de óxido como Hematita (Fe₂O₃), Magnetita (Fe₃O₄), Goethita [FeO(OH)] y silicatos oscuros de rocas basálticas.',
      rol: 'Catalizador de Clorofila, Citocromos y Transporte de Electrones',
      resumen: 'Aunque no forma parte de la molécula de clorofila, actúa como catalizador indispensable para sintetizarla y forma parte de citocromos y ferredoxina en la respiración y fotosíntesis.',
      fuentes: 'Lixiviado de lombricompost (humus líquido), purines fermentados de malezas y quelatos de hierro en suelos alcalinos.',
      deficiencia: 'Clorosis intervenal muy intensa en las hojas más jóvenes: los brotes nuevos nacen casi blancos o amarillo limón con nervaduras verdes muy finas.',
      exceso: 'Poco frecuente, salvo en suelos extremadamente inundados y anegados donde produce toxicidad por reducción férrica excesiva.',
      consejo: 'Si el suelo tiene pH alto (> 7.5), el hierro se vuelve insoluble. Incorporar compost maduro ayuda a quelatarlo naturalmente.',
      nombreMolecula: 'Clúster Catalítico Hierro-Azufre [Fe₄S₄] y Grupo Hemo',
      formulaQuimica: '[Fe₄S₄(S-Cys)₄] en Ferredoxina',
      explicacionMolecular: 'Un cubo inorgánico formado por 4 átomos de Hierro y 4 de Azufre coordinados a cisteínas. Actúa como cable molecular transfiriendo electrones en la fotosíntesis mediante la alternancia redox Fe²⁺ ⇄ Fe³⁺.',
      rolBioquimico: 'Transporte de electrones fotosintéticos en la ferredoxina y citocromos respiratorios.',
      svgMolecular: `<svg viewBox="0 0 220 120" width="100%" height="110">
        <!-- Cubo Fe4S4 -->
        <g transform="translate(110, 60)">
          <!-- Enlaces del cubo -->
          <line x1="-25" y1="-20" x2="20" y2="-20" stroke="#64748b" stroke-width="1.8" />
          <line x1="20" y1="-20" x2="20" y2="20" stroke="#64748b" stroke-width="1.8" />
          <line x1="20" y1="20" x2="-25" y2="20" stroke="#64748b" stroke-width="1.8" />
          <line x1="-25" y1="20" x2="-25" y2="-20" stroke="#64748b" stroke-width="1.8" />
          <!-- Perspectiva -->
          <line x1="-25" y1="-20" x2="-10" y2="-32" stroke="#64748b" stroke-width="1.8" />
          <line x1="20" y1="-20" x2="35" y2="-32" stroke="#64748b" stroke-width="1.8" />
          <line x1="20" y1="20" x2="35" y2="8" stroke="#64748b" stroke-width="1.8" />
          <line x1="-10" y1="-32" x2="35" y2="-32" stroke="#64748b" stroke-width="1.8" />
          <line x1="35" y1="-32" x2="35" y2="8" stroke="#64748b" stroke-width="1.8" />
          <!-- Vértices Hierro (Rojo) y Azufre (Amarillo) -->
          <circle cx="-25" cy="-20" r="10" fill="#dc2626" /><text x="-25" y="-16" font-size="8" font-weight="900" fill="#fff" text-anchor="middle">Fe</text>
          <circle cx="20" cy="-20" r="10" fill="#eab308" /><text x="20" y="-16" font-size="8" font-weight="900" fill="#713f12" text-anchor="middle">S</text>
          <circle cx="20" cy="20" r="10" fill="#dc2626" /><text x="20" y="24" font-size="8" font-weight="900" fill="#fff" text-anchor="middle">Fe</text>
          <circle cx="-25" cy="20" r="10" fill="#eab308" /><text x="-25" y="24" font-size="8" font-weight="900" fill="#713f12" text-anchor="middle">S</text>
          <circle cx="-10" cy="-32" r="9" fill="#eab308" /><text x="-10" y="-28" font-size="7" font-weight="900" fill="#713f12" text-anchor="middle">S</text>
          <circle cx="35" cy="-32" r="9" fill="#dc2626" /><text x="35" y="-28" font-size="7" font-weight="900" fill="#fff" text-anchor="middle">Fe</text>
          <circle cx="35" cy="8" r="9" fill="#eab308" /><text x="35" y="11" font-size="7" font-weight="900" fill="#713f12" text-anchor="middle">S</text>
        </g>
        <text x="110" y="112" font-size="8" font-weight="700" fill="#dc2626" text-anchor="middle">Clúster Redox [Fe₄S₄] de la Ferredoxina</text>
      </svg>`
    },
    Zn: {
      grupo: 'micros',
      simbolo: 'Zn',
      numero: '30',
      nombre: 'Cinc / Zinc',
      formaAsimilable: 'Catión Zinc libre (Zn²⁺) o quelatos',
      mecanismoTransporte: 'Difusión: absorbido por transportadores de la familia ZIP (ZRT/IRT-like Protein) regulados por gradientes de potencial electroquímico.',
      origenNatural: 'Yacimientos Hidrotermales y Rocas Ígneas: se obtiene primordialmente del mineral sulfuro Esfalerita o blenda (ZnS), y de minerales de alteración secundaria como Smithsonita (ZnCO₃) y Hemimorfita.',
      rol: 'Síntesis de Auxinas (Hormona del Crecimiento) y Enzimas',
      resumen: 'Esencial para la síntesis de triptófano, aminoácido precursor del ácido indolacético (auxinas), la hormona encargada del estiramiento celular y elongación de tallos.',
      fuentes: 'Estiércol de ganado vacuno madurado, harina de algas marinas y compostaje biológico rico en microbiología.',
      deficiencia: 'Entrenudos muy cortos que producen tallos enanos con hojas agrupadas en "roseta" y hojas anormalmente angostas ("enfermedad de hoja pequeña").',
      exceso: 'Produce toxicidad con clorosis similar a la deficiencia de hierro debido a competencia a nivel de transportadores de membrana.',
      consejo: 'Fundamental en la etapa de germinación del maíz y frijol para garantizar plantones altos y vigorosos.',
      nombreMolecula: 'Complejo Dedo de Zinc y Molécula de Auxina (Ácido Indolacético)',
      formulaQuimica: 'C₁₀H₉NO₂ (Auxina) / Zn²⁺',
      explicacionMolecular: 'El ion Zn²⁺ no tiene actividad redox y coordina 4 aminoácidos (2 Cys y 2 His) plegando proteínas de transcripción ("dedos de zinc") y activando la anhidrasa carbónica.',
      rolBioquimico: 'Biosíntesis de la hormona auxina responsable del crecimiento y elongación de tallos.',
      svgMolecular: `<svg viewBox="0 0 220 120" width="100%" height="110">
        <g transform="translate(110, 60)">
          <!-- Anillo Indólico de la Auxina -->
          <polygon points="-50,-15 -25,-25 -5,-15 -5,15 -25,25 -50,15" fill="none" stroke="#7c3aed" stroke-width="2" />
          <polygon points="-5,15 15,10 15,-10 -5,-15" fill="none" stroke="#7c3aed" stroke-width="2" />
          <text x="5" y="4" font-size="8" font-weight="800" fill="#2563eb" text-anchor="middle">NH</text>
          <!-- Cadena lateral ácida -->
          <line x1="15" y1="0" x2="35" y2="0" stroke="#7c3aed" stroke-width="2" />
          <line x1="35" y1="0" x2="50" y2="-12" stroke="#dc2626" stroke-width="2" />
          <circle cx="50" cy="-12" r="6" fill="#dc2626" /><text x="50" y="-9" font-size="6" font-weight="700" fill="#fff" text-anchor="middle">=O</text>
          <!-- Zinc coordinado -->
          <circle cx="-25" cy="0" r="15" fill="#7c3aed" stroke="#6d28d9" stroke-width="1.5" />
          <text x="-25" y="4" font-size="10" font-weight="900" fill="#fff" text-anchor="middle">Zn²⁺</text>
        </g>
        <text x="110" y="112" font-size="8" font-weight="700" fill="#6d28d9" text-anchor="middle">Precursor de Ácido Indolacético (Auxina)</text>
      </svg>`
    },
    Mn: {
      grupo: 'micros',
      simbolo: 'Mn',
      numero: '25',
      nombre: 'Manganeso',
      formaAsimilable: 'Catión Manganoso soluble (Mn²⁺)',
      mecanismoTransporte: 'Difusión y Flujo de Masas: absorbido activamente por transportadores NRAMP y ZIP a través de la membrana de las células epidérmicas de la raíz.',
      origenNatural: 'Rocas Ígneas y Sedimentarias: proviene de óxidos de manganeso como la Pirolusita (MnO₂), Manganita, Rodocrosita (MnCO₃) y silicatos en rocas metamórficas.',
      rol: 'Fotólisis del Agua en el Fotosistema II (Liberación del O₂ Vital)',
      resumen: 'Actúa en el centro de reacción del fotosistema II rompiendo catalíticamente las moléculas de agua para liberar el oxígeno que respiramos, e interviene en la síntesis de lignina.',
      fuentes: 'Compost de restos de ramas trituradas, mantillo de bosque y biofertilizantes enriquecidos.',
      deficiencia: 'Moteado clorótico con pequeñas manchitas necróticas grisáceas o marrones dispersas en hojas medianas y jóvenes.',
      exceso: 'Muy peligroso en suelos hiperácidos (pH < 5.0) donde se vuelve hiper-soluble y causa toxicidad con manchas necróticas y enrollamiento foliar.',
      consejo: 'Mantener el pH del suelo escolar por encima de 5.5 evita que el manganeso se torne tóxico para los cultivos.',
      nombreMolecula: 'Complejo Inorgánico [Mn₄CaO₅] de Fotólisis de Agua',
      formulaQuimica: 'Mn₄CaO₅ (Centro Liberador de Oxígeno)',
      explicacionMolecular: 'Un grupo de 4 átomos de Manganeso en estados de oxidación mixtos (+3 a +5) junto a 1 Calcio rompen dos moléculas de agua líquida en: 2H₂O ➔ O₂ + 4H⁺ + 4e⁻.',
      rolBioquimico: 'Es el motor cuántico que libera el gas oxígeno que sustenta toda la vida en la Tierra.',
      svgMolecular: `<svg viewBox="0 0 220 120" width="100%" height="110">
        <g transform="translate(110, 58)">
          <circle cx="-30" cy="-18" r="12" fill="#9333ea" /><text x="-30" y="-14" font-size="9" font-weight="900" fill="#fff" text-anchor="middle">Mn</text>
          <circle cx="10" cy="-22" r="12" fill="#9333ea" /><text x="10" y="-18" font-size="9" font-weight="900" fill="#fff" text-anchor="middle">Mn</text>
          <circle cx="-15" cy="18" r="12" fill="#9333ea" /><text x="-15" y="22" font-size="9" font-weight="900" fill="#fff" text-anchor="middle">Mn</text>
          <circle cx="28" cy="15" r="12" fill="#9333ea" /><text x="28" y="19" font-size="9" font-weight="900" fill="#fff" text-anchor="middle">Mn</text>
          <circle cx="48" cy="-8" r="11" fill="#ea580c" /><text x="48" y="-4" font-size="8" font-weight="900" fill="#fff" text-anchor="middle">Ca</text>
          <!-- Puentes de Oxígeno -->
          <circle cx="-10" cy="-2" r="6" fill="#dc2626" />
          <circle cx="8" cy="0" r="6" fill="#dc2626" />
          <circle cx="-25" cy="5" r="6" fill="#dc2626" />
          <text x="-60" y="-5" font-size="8" font-weight="800" fill="#0284c7">2 H₂O</text>
          <text x="65" y="20" font-size="9" font-weight="900" fill="#16a34a">O₂ + 4H⁺</text>
        </g>
        <text x="110" y="112" font-size="8" font-weight="700" fill="#9333ea" text-anchor="middle">Clúster Catalítico [Mn₄CaO₅] Fotosistema II</text>
      </svg>`
    },
    B: {
      grupo: 'micros',
      simbolo: 'B',
      numero: '5',
      nombre: 'Boro',
      formaAsimilable: 'Ácido Bórico neutro no disociado (H₃BO₃)',
      mecanismoTransporte: 'Flujo de Masas y Difusión Pasiva: al ser una molécula neutra sin carga eléctrica a pH ácido-neutro, cruza directamente la bicapa lipídica y canales de acuaporinas (NIP5;1) con el flujo de agua transpirada.',
      origenNatural: 'Depósitos Evaporíticos de Lagos Salinos y Vulcanismo: concentrado naturalmente en yacimientos sedimentarios de boratos alcalinos (Bórax, Kernita, Ulexita), depósitos hidrotermales y el mineral silicato Turmalina.',
      rol: 'Polinización, Fecundación Floral y Estructura de Paredes Celulares',
      resumen: 'Forma enlaces borato-diéster con ramnogalacturonano II en las paredes celulares y es determinante para la germinación del grano de polen, el crecimiento del tubo polínico y la fertilidad de las flores.',
      fuentes: 'Ceniza vegetal en microdosis muy leves, restos orgánicos triturados y bórax agrícola formulado.',
      deficiencia: 'Muerte de brotes apicales terminales, caída masiva de flores sin cuajar fruto, y frutos agrietados o con zonas corchosas secas.',
      exceso: 'El rango entre deficiencia y toxicidad es muy estrecho: el exceso quema rápidamente los bordes de las hojas.',
      consejo: 'Nunca apliques boro puro en grandes cantidades; basta con incorporar buena materia orgánica madura al cantero.',
      nombreMolecula: 'Ácido Bórico y Complejo Borato-Ramnogalacturonano II',
      formulaQuimica: 'H₃BO₃ / B(OH)₄⁻-RG-II',
      explicacionMolecular: 'El boro tiene geometría trigonal plana en H₃BO₃ y tetraédrica en ion borato. Enlaces éster de borato unen dos monómeros de RG-II para controlar la porosidad y elasticidad de la pared.',
      rolBioquimico: 'Reticulación de polisacáridos de pared y elongación del tubo polínico en la flor.',
      svgMolecular: `<svg viewBox="0 0 220 120" width="100%" height="110">
        <g transform="translate(110, 60)">
          <!-- Átomo central de Boro planar trigonal -->
          <circle cx="0" cy="0" r="14" fill="#f59e0b" stroke="#d97706" stroke-width="2" />
          <text x="0" y="5" font-size="12" font-weight="900" fill="#fff" text-anchor="middle">B</text>
          <!-- 3 Grupos OH a 120 grados -->
          <line x1="0" y1="-14" x2="0" y2="-36" stroke="#d97706" stroke-width="2.5" />
          <line x1="12" y1="7" x2="32" y2="20" stroke="#d97706" stroke-width="2.5" />
          <line x1="-12" y1="7" x2="-32" y2="20" stroke="#d97706" stroke-width="2.5" />
          <circle cx="0" cy="-38" r="9" fill="#dc2626" /><text x="0" y="-35" font-size="7" font-weight="800" fill="#fff" text-anchor="middle">OH</text>
          <circle cx="34" cy="22" r="9" fill="#dc2626" /><text x="34" y="25" font-size="7" font-weight="800" fill="#fff" text-anchor="middle">OH</text>
          <circle cx="-34" cy="22" r="9" fill="#dc2626" /><text x="-34" y="25" font-size="7" font-weight="800" fill="#fff" text-anchor="middle">OH</text>
        </g>
        <text x="110" y="112" font-size="8" font-weight="700" fill="#d97706" text-anchor="middle">Molécula Plana Trigonal de Ácido Bórico (120°)</text>
      </svg>`
    },
    Cu: {
      grupo: 'micros',
      simbolo: 'Cu',
      numero: '29',
      nombre: 'Cobre',
      formaAsimilable: 'Catión Cúprico (Cu²⁺) y quelatos',
      mecanismoTransporte: 'Difusión: absorbido por transportadores específicos de cobre (familia COPT) situados en la membrana plasmática radicular.',
      origenNatural: 'Yacimientos Hidrotermales de Sulfuros: se origina en la meteorización de minerales como Calcopirita (CuFeS₂), Calcocita (Cu₂S), Bornita y carbonatos secundarios coloreados como Malaquita [Cu₂CO₃(OH)₂] y Azurita.',
      rol: 'Proteína Plastocianina en la Fotosíntesis y Resistencia Mecánica',
      resumen: 'Componente de la enzima plastocianina en la cadena de transporte de electrones fotosintética, participa en el metabolismo de carbohidratos y estimula la síntesis de lignina en tallos.',
      fuentes: 'Materia orgánica equilibrada, compostajes diversificados y aplicaciones preventivas de caldo bordelés ecológico.',
      deficiencia: 'Puntas de hojas jóvenes enrolladas en espiral, marchitez permanente en brotes nuevos y muerte descendente de ramillas.',
      exceso: 'Inhibe el crecimiento radicular y provoca clorosis férrica inducida al bloquear los sitios de absorción de hierro.',
      consejo: 'El caldo bordelés tradicional aporta microdosis nutritivas de cobre mientras protege contra hongos en épocas lluviosas.',
      nombreMolecula: 'Centro Activo de Cobre en la Plastocianina',
      formulaQuimica: 'Cu²⁺/Cu⁺ [His, Cys, Met]',
      explicacionMolecular: 'El catión Cu²⁺ se coordina con 2 histidinas, 1 cisteína y 1 metionina en geometría tetraédrica distorsionada, permitiendo una rápida transferencia electrónica monocatiónica.',
      rolBioquimico: 'Transporte de electrones entre citocromo b₆f y Fotosistema I.',
      svgMolecular: `<svg viewBox="0 0 220 120" width="100%" height="110">
        <g transform="translate(110, 60)">
          <circle cx="0" cy="0" r="16" fill="#0284c7" stroke="#0369a1" stroke-width="2" />
          <text x="0" y="5" font-size="11" font-weight="900" fill="#fff" text-anchor="middle">Cu²⁺</text>
          <line x1="0" y1="-16" x2="0" y2="-36" stroke="#0284c7" stroke-width="2" />
          <line x1="16" y1="0" x2="38" y2="0" stroke="#0284c7" stroke-width="2" />
          <line x1="0" y1="16" x2="0" y2="36" stroke="#0284c7" stroke-width="2" />
          <line x1="-16" y1="0" x2="-38" y2="0" stroke="#0284c7" stroke-width="2" />
          <rect x="-15" y="-45" width="30" height="15" rx="3" fill="#2563eb" /><text x="0" y="-35" font-size="7" font-weight="700" fill="#fff" text-anchor="middle">His37</text>
          <rect x="38" y="-8" width="30" height="15" rx="3" fill="#eab308" /><text x="53" y="2" font-size="7" font-weight="700" fill="#713f12" text-anchor="middle">Cys84</text>
          <rect x="-15" y="36" width="30" height="15" rx="3" fill="#2563eb" /><text x="0" y="46" font-size="7" font-weight="700" fill="#fff" text-anchor="middle">His87</text>
          <rect x="-68" y="-8" width="30" height="15" rx="3" fill="#64748b" /><text x="-53" y="2" font-size="7" font-weight="700" fill="#fff" text-anchor="middle">Met92</text>
        </g>
        <text x="110" y="112" font-size="8" font-weight="700" fill="#0369a1" text-anchor="middle">Centro Redox de Cobre Azul de la Plastocianina</text>
      </svg>`
    },
    Mo: {
      grupo: 'micros',
      simbolo: 'Mo',
      numero: '42',
      nombre: 'Molibdeno',
      formaAsimilable: 'Anión Molibdato soluble (MoO₄²⁻)',
      mecanismoTransporte: 'Flujo de Masas: transportado por transportadores aniónicos específicos de alta afinidad (MOT1/MOT2). Es el único micronutriente cuya solubilidad aumenta al aumentar el pH del suelo.',
      origenNatural: 'Rocas Graníticas Ígneas: proviene del mineral sulfuro primario Molibdenita (MoS₂) diseminado en rocas plutónicas, y de minerales secundarios como la Wulfenita (PbMoO₄).',
      rol: 'Fijación Biológica de Nitrógeno y Reducción de Nitratos',
      resumen: 'Forma parte del cofactor de la enzima nitrogenasa (en bacterias fijadoras de nitrógeno) y de la nitrato reductasa. Sin molibdeno, la planta acumula nitratos tóxicos y no puede fabricar proteínas.',
      fuentes: 'Suelos con materia orgánica bien aireada; su asimilabilidad aumenta al subir el pH con cal agrícola.',
      deficiencia: 'Clorosis parecida a la falta de nitrógeno y deformación en "cola de látigo" en hojas de col, brócoli y coliflor.',
      exceso: 'Rara vez causa toxicidad en plantas, aunque forrajes con exceso de Mo pueden causar desbalances en el ganado.',
      consejo: 'Es el único micronutriente que se absorbe mejor en suelos neutros o ligeramente alcalinos que en suelos ácidos.',
      nombreMolecula: 'Cofactor de Molibdeno (Moco) de la Nitrato Reductasa',
      formulaQuimica: 'MoO₄²⁻ / [Mo-Molibdopterina]',
      explicacionMolecular: 'El molibdeno forma enlaces de coordinación con los átomos de azufre del anillo de molibdopterina, operando en estados redox Mo(VI) ⇄ Mo(IV) para reducir el nitrato.',
      rolBioquimico: 'Conversión enzimática de NO₃⁻ a NO₂⁻ para sintetizar proteínas vegetales.',
      svgMolecular: `<svg viewBox="0 0 220 120" width="100%" height="110">
        <g transform="translate(110, 60)">
          <circle cx="0" cy="0" r="16" fill="#0d9488" stroke="#0f766e" stroke-width="2" />
          <text x="0" y="5" font-size="11" font-weight="900" fill="#fff" text-anchor="middle">Mo</text>
          <!-- 4 Oxígenos del Molibdato -->
          <line x1="0" y1="-16" x2="0" y2="-32" stroke="#0d9488" stroke-width="2" />
          <line x1="16" y1="0" x2="32" y2="0" stroke="#0d9488" stroke-width="2" />
          <line x1="0" y1="16" x2="0" y2="32" stroke="#0d9488" stroke-width="2" />
          <line x1="-16" y1="0" x2="-32" y2="0" stroke="#0d9488" stroke-width="2" />
          <circle cx="0" cy="-35" r="7" fill="#dc2626" /><text x="0" y="-32" font-size="7" font-weight="800" fill="#fff" text-anchor="middle">O</text>
          <circle cx="35" cy="0" r="7" fill="#dc2626" /><text x="35" y="3" font-size="7" font-weight="800" fill="#fff" text-anchor="middle">O⁻</text>
          <circle cx="0" cy="35" r="7" fill="#dc2626" /><text x="0" y="38" font-size="7" font-weight="800" fill="#fff" text-anchor="middle">O⁻</text>
          <circle cx="-35" cy="0" r="7" fill="#dc2626" /><text x="-35" y="3" font-size="7" font-weight="800" fill="#fff" text-anchor="middle">O</text>
        </g>
        <text x="110" y="112" font-size="8" font-weight="700" fill="#0f766e" text-anchor="middle">Anión Tetraédrico Molibdato (MoO₄²⁻)</text>
      </svg>`
    },

    // --- ELEMENTOS ESTRUCTURALES (NO MINERALES) ---
    C: {
      grupo: 'estructurales',
      simbolo: 'C',
      numero: '6',
      nombre: 'Carbono',
      formaAsimilable: 'Gas Dióxido de Carbono (CO₂) absorbido por las hojas',
      mecanismoTransporte: 'Difusión Gaseosa Estomática: no entra por las raíces; ingresa pasivamente a través de los estomas microscópicos del envés de las hojas impulsado por el gradiente de presión parcial de CO₂ durante el día.',
      origenNatural: 'Atmósfera Terrestre y Biósfera: se encuentra en la capa de gases de la Tierra (~420 partes por millón de CO₂), proveniente de la respiración celular de todos los seres vivos, emanaciones volcánicas naturales y ciclos biológicos de descomposición.',
      rol: 'Esqueleto Químico Fundamental de la Materia Orgánica (~45% peso seco)',
      resumen: 'Constituye la columna vertebral de todas las biomoléculas: carbohidratos, celulosa, almidones, azúcares, lípidos, proteínas y ADN.',
      fuentes: 'El aire libre que rodea el huerto escolar a través de los estomas de las hojas durante la fotosíntesis diurna.',
      deficiencia: 'Asfixia vegetal si las plantas están hacinadas o en invernaderos completamente cerrados sin ventilación ni luz solar.',
      exceso: 'No existe en condiciones normales de huerto abierto; mayores niveles ambientales de CO₂ aceleran la fotosíntesis si hay agua y luz.',
      consejo: 'Deja suficiente distancia entre surcos para que el aire circule libremente y las hojas absorban abundante CO₂ fresco.',
      nombreMolecula: 'Anillo de Glucosa y Microfibrilla de Celulosa',
      formulaQuimica: '(C₆H₁₀O₅)ₙ (Polímero de Celulosa)',
      explicacionMolecular: 'El carbono forma 4 enlaces tetraédricos. En la celulosa, miles de anillos de D-glucopiranosa se unen por enlaces glucosídicos β-1,4 lineales estabilizados por puentes de hidrógeno.',
      rolBioquimico: 'Estructura fibrosa indeformable de las paredes celulares vegetales.',
      svgMolecular: `<svg viewBox="0 0 220 120" width="100%" height="110">
        <g transform="translate(110, 60)">
          <!-- Anillo 1 de Glucosa -->
          <polygon points="-75,-15 -55,-30 -35,-20 -35,10 -55,25 -75,10" fill="none" stroke="#475569" stroke-width="2" />
          <circle cx="-55" cy="-30" r="5" fill="#dc2626" /><text x="-55" y="-27" font-size="5" font-weight="700" fill="#fff" text-anchor="middle">O</text>
          <!-- Enlace glucosídico beta 1-4 -->
          <line x1="-35" y1="0" x2="-10" y2="0" stroke="#0284c7" stroke-width="2.5" />
          <circle cx="-22" cy="0" r="5" fill="#dc2626" />
          <!-- Anillo 2 de Glucosa -->
          <polygon points="-10,-10 10,-25 30,-15 30,15 10,25 -10,10" fill="none" stroke="#475569" stroke-width="2" />
          <circle cx="10" cy="-25" r="5" fill="#dc2626" /><text x="10" y="-22" font-size="5" font-weight="700" fill="#fff" text-anchor="middle">O</text>
          <!-- Enlace glucosídico continuo -->
          <line x1="30" y1="0" x2="55" y2="0" stroke="#0284c7" stroke-width="2.5" />
          <circle cx="42" cy="0" r="5" fill="#dc2626" />
          <text x="70" y="4" font-size="9" font-weight="800" fill="#475569">... [β-1,4]ₙ</text>
        </g>
        <text x="110" y="112" font-size="8" font-weight="700" fill="#0369a1" text-anchor="middle">Cadena Polimérica de Celulosa (Pared Celular)</text>
      </svg>`
    },
    H: {
      grupo: 'estructurales',
      simbolo: 'H',
      numero: '1',
      nombre: 'Hidrógeno',
      formaAsimilable: 'Molécula de Agua líquida (H₂O) absorbida por las raíces',
      mecanismoTransporte: 'Ósmosis y Canales de Acuaporinas: absorbido por los pelos radiculares mediante flujo hídrico por gradiente de potencial hídrico (Ψ), y luego disociado por fotólisis en los cloroplastos de las hojas.',
      origenNatural: 'Ciclo Hidrológico Terrestre: se obtiene de las masas de agua dulce de la Tierra (ríos, acuíferos subterráneos, precipitaciones pluviales y humedad edáfica retenida en los microporos del suelo).',
      rol: 'Generador de Poder Reductor (NADPH) y Gradientes Protónicos (~6% peso seco)',
      resumen: 'Proviene directamente de la fotólisis del agua. Los protones de hidrógeno impulsan la síntesis de ATP y permiten fijar el carbono durante el ciclo de Calvin.',
      fuentes: 'Riego con agua dulce limpia y humedad adecuada retenida en los microporos del suelo.',
      deficiencia: 'Estrés hídrico severo: marchitamiento foliar, cierre inmediato de estomas, paralización de fotosíntesis y deshidratación.',
      exceso: 'El exceso de agua encharcada desplaza el aire del suelo, asfixiando las raíces por falta de oxígeno.',
      consejo: 'Un riego constante a tempranas horas de la mañana proporciona el hidrógeno necesario antes de las horas de máxima insolación.',
      nombreMolecula: 'Molécula de Agua Polar (H₂O) y Gradiente Quimiosmótico (H⁺)',
      formulaQuimica: 'H₂O (Ángulo 104.5°) / Protones H⁺',
      explicacionMolecular: 'El agua posee un momento dipolar con un ángulo de 104.5°. La fotólisis lumínica de H₂O en la fotosíntesis acumula protones H⁺ dentro del lumen del tilacoide que impulsan la ATP sintasa.',
      rolBioquimico: 'Donador primario de electrones y protones para formar glucosa en el ciclo de Calvin.',
      svgMolecular: `<svg viewBox="0 0 220 120" width="100%" height="110">
        <g transform="translate(110, 55)">
          <!-- Oxígeno central -->
          <circle cx="0" cy="-10" r="18" fill="#dc2626" stroke="#b91c1c" stroke-width="2" />
          <text x="0" y="-4" font-size="14" font-weight="900" fill="#fff" text-anchor="middle">O</text>
          <text x="14" y="-18" font-size="8" font-weight="700" fill="#fca5a5">δ⁻</text>
          <!-- Dos Hidrógenos a 104.5 grados -->
          <line x1="-12" y1="2" x2="-28" y2="24" stroke="#0284c7" stroke-width="3" />
          <line x1="12" y1="2" x2="28" y2="24" stroke="#0284c7" stroke-width="3" />
          <circle cx="-32" cy="28" r="11" fill="#0284c7" stroke="#0369a1" stroke-width="1.5" />
          <text x="-32" y="32" font-size="10" font-weight="900" fill="#fff" text-anchor="middle">H</text>
          <text x="-44" y="24" font-size="8" font-weight="700" fill="#bae6fd">δ⁺</text>
          <circle cx="32" cy="28" r="11" fill="#0284c7" stroke="#0369a1" stroke-width="1.5" />
          <text x="32" y="32" font-size="10" font-weight="900" fill="#fff" text-anchor="middle">H</text>
          <text x="44" y="24" font-size="8" font-weight="700" fill="#bae6fd">δ⁺</text>
          <!-- Arco de ángulo -->
          <path d="M-12 12 Q0 20 12 12" fill="none" stroke="#d97706" stroke-width="1.5" />
          <text x="0" y="22" font-size="7.5" font-weight="800" fill="#b45309" text-anchor="middle">104.5°</text>
        </g>
        <text x="110" y="112" font-size="8" font-weight="700" fill="#0369a1" text-anchor="middle">Dipolo Hídrico y Disociación Protónica en Fotólisis</text>
      </svg>`
    },
    O: {
      grupo: 'estructurales',
      simbolo: 'O',
      numero: '8',
      nombre: 'Oxígeno',
      formaAsimilable: 'Gas O₂ (respiración) y en moléculas de H₂O y CO₂ (~45% peso seco)',
      mecanismoTransporte: 'Difusión en Fase Gaseosa y Acuosa: absorbido como O₂ a través de estomas foliares, lenticelas del tallo y por difusión a través de los poros no saturados de agua del suelo hacia las raíces vivas.',
      origenNatural: 'Atmósfera Terrestre (21% de gas O₂): producido biológicamente a escala planetaria por la fotosíntesis de plantas terrestres, bosques y el fitoplancton marino a lo largo de eones de evolución.',
      rol: 'Respiración Celular Aeróbica en Raíces y Hojas',
      resumen: 'Indispensable para que las mitocondrias de las células vegetales oxiden la glucosa y liberen la energía biológica (ATP) que mantiene vivas las raíces para que sigan absorbiendo agua y minerales.',
      fuentes: 'Aire atmosférico y porosidad ventilada del suelo edáfico.',
      deficiencia: 'Asfixia radicular en suelos apelmazados, compactados o inundados por falta de drenaje. Muerte y pudrición de raíces.',
      exceso: 'No genera toxicidad en cultivos escolares.',
      consejo: 'Aflojar la tierra con el azadón o rastrillo permite que el oxígeno ingrese a la zona radicular para que las raíces respiren.',
      nombreMolecula: 'Gas Oxígeno Diatómico (O=O) y Dióxido de Carbono (O=C=O)',
      formulaQuimica: 'O₂ (Doble Enlace) / CO₂ Lineal',
      explicacionMolecular: 'El oxígeno molecular (O₂) posee un doble enlace covalente O=O con dos electrones desapareados en orbitales antienlazantes π*, actuando como aceptor final de electrones mitocondrial.',
      rolBioquimico: 'Respiración aeróbica de la raíz para obtener energía y absorber minerales del suelo.',
      svgMolecular: `<svg viewBox="0 0 220 120" width="100%" height="110">
        <g transform="translate(110, 60)">
          <!-- Molécula de Oxígeno O2 -->
          <circle cx="-30" cy="0" r="18" fill="#dc2626" stroke="#b91c1c" stroke-width="2" />
          <text x="-30" y="6" font-size="14" font-weight="900" fill="#fff" text-anchor="middle">O</text>
          <!-- Doble enlace covalente -->
          <line x1="-12" y1="-5" x2="12" y2="-5" stroke="#475569" stroke-width="3" />
          <line x1="-12" y1="5" x2="12" y2="5" stroke="#475569" stroke-width="3" />
          <circle cx="30" cy="0" r="18" fill="#dc2626" stroke="#b91c1c" stroke-width="2" />
          <text x="30" y="6" font-size="14" font-weight="900" fill="#fff" text-anchor="middle">O</text>
        </g>
        <text x="110" y="112" font-size="8" font-weight="700" fill="#dc2626" text-anchor="middle">Molécula Diatómica de Oxígeno (O=O)</text>
      </svg>`
    },

    // --- ELEMENTOS BENÉFICOS (FUNCIONALES) ---
    Si: {
      grupo: 'beneficos',
      simbolo: 'Si',
      numero: '14',
      nombre: 'Silicio',
      formaAsimilable: 'Ácido Monosilícico no disociado [H₄SiO₄ o Si(OH)₄]',
      mecanismoTransporte: 'Flujo de Masas y Transportadores de Silicio: absorbido pasiva y activamente por transportadores nodulín-like tipo NIP (Lsi1 como canal de entrada y Lsi2 como transportador de salida al xilema).',
      origenNatural: 'Corteza Terrestre y Silicatos (~28% de la litósfera): es el segundo elemento químico más abundante del planeta. Proviene de arenas de Cuarzo (SiO₂), arcillas minerales (Caolinita, Esmectita), feldespatos y cenizas volcánicas.',
      rol: 'Escudo Mecánico contra Plagas, Hongos y Resistencia al Viento (Acame)',
      resumen: 'Se deposita en la pared celular de la epidermis formando fitolitos duros de sílice amorfa. Crea una armadura protectora que desgasta las mandíbulas de insectos masticadores e impide la penetración de hifas de hongos (roya, oídio).',
      fuentes: 'Ceniza de cascarilla de arroz tostada (rica en sílice bioasimilable), té de cola de caballo (Equisetum) y paja de arroz.',
      deficiencia: 'Tallos flexibles y quebradizos susceptibles al viento (acame en maíz y arroz), y mayor ataque de plagas masticadoras.',
      exceso: 'Completamente seguro e inocuo; el silicio sobrante no causa toxicidad biológica en la planta ni en el suelo.',
      consejo: 'Añadir cascarilla de arroz compostada o calcinada en el huerto escolar crea un escudo natural contra orugas, caracoles y hongos.',
      nombreMolecula: 'Tetraedro de Ácido Monosilícico [Si(OH)₄] y Fitolito de Sílice',
      formulaQuimica: 'Si(OH)₄ ➔ SiO₂ · nH₂O (Sílice Amorfa)',
      explicacionMolecular: 'El silicio se coordina con 4 grupos hidroxilo en geometría tetraédrica perfecta. Al perder agua en las paredes epidérmicas, se condensa formando una doble capa polimérica de sílice opalina.',
      rolBioquimico: 'Escudo mecánico de vidrio biogénico que repele hongos e insectos masticadores.',
      svgMolecular: `<svg viewBox="0 0 220 120" width="100%" height="110">
        <g transform="translate(110, 58)">
          <!-- Tetraedro de Si -->
          <line x1="0" y1="0" x2="0" y2="-32" stroke="#059669" stroke-width="2.5" />
          <line x1="0" y1="0" x2="-28" y2="20" stroke="#059669" stroke-width="2.5" />
          <line x1="0" y1="0" x2="28" y2="20" stroke="#059669" stroke-width="2.5" />
          <line x1="0" y1="0" x2="0" y2="26" stroke="#059669" stroke-width="2" stroke-dasharray="3,2" />
          <!-- Átomo central de Silicio -->
          <circle cx="0" cy="0" r="16" fill="#059669" stroke="#047857" stroke-width="2" />
          <text x="0" y="5" font-size="11" font-weight="900" fill="#fff" text-anchor="middle">Si</text>
          <!-- 4 Grupos OH -->
          <circle cx="0" cy="-35" r="9" fill="#dc2626" /><text x="0" y="-32" font-size="7" font-weight="800" fill="#fff" text-anchor="middle">OH</text>
          <circle cx="-32" cy="22" r="9" fill="#dc2626" /><text x="-32" y="25" font-size="7" font-weight="800" fill="#fff" text-anchor="middle">OH</text>
          <circle cx="32" cy="22" r="9" fill="#dc2626" /><text x="32" y="25" font-size="7" font-weight="800" fill="#fff" text-anchor="middle">OH</text>
          <circle cx="0" cy="30" r="8" fill="#dc2626" /><text x="0" y="33" font-size="6" font-weight="800" fill="#fff" text-anchor="middle">OH</text>
        </g>
        <text x="110" y="112" font-size="8" font-weight="700" fill="#047857" text-anchor="middle">Geometría Tetraédrica del Ácido Monosilícico</text>
      </svg>`
    },
    Co: {
      grupo: 'beneficos',
      simbolo: 'Co',
      numero: '27',
      nombre: 'Cobalto',
      formaAsimilable: 'Catión Cobalto divalente (Co²⁺)',
      mecanismoTransporte: 'Flujo de Masas y Difusión: transportado en solución y captado por transportadores de cationes divalentes inespecíficos en la raíz.',
      origenNatural: 'Rocas Ígneas Ultramáficas y Minerales de Sulfuro: presente en la corteza terrestre en minerales de sulfuro y arseniuro como Cobaltita (CoAsS), Linneíta y asociado a yacimientos de níquel y cobre.',
      rol: 'Cofactor para la Fijación Biológica Simbiótica de Nitrógeno en Leguminosas',
      resumen: 'Esencial para que las bacterias simbióticas Rhizobium sinteticen cobalamina (vitamina B12), molécula requerida para sintetizar leghemoglobina y fijar nitrógeno en nódulos radiculares de leguminosas.',
      fuentes: 'Compost con minerales de roca madre equilibrados y estiércoles maduros de rumiantes.',
      deficiencia: 'Escasa nodulación en raíces de leguminosas (frijoles, arvejas, guandú) y menor fijación de nitrógeno natural.',
      exceso: 'En dosis industriales excesivas puede provocar clorosis férrica inducida.',
      consejo: 'Sembrar frijol o guandú inoculado con biofertilizantes promueve la fijación natural de nitrógeno con ayuda de trazas de cobalto.',
      nombreMolecula: 'Anillo de Corrina con Cobalto en la Cobalamina (Vitamina B12)',
      formulaQuimica: 'C₆₃H₈₈CoN₁₄O₁₄P (Cobalamina)',
      explicacionMolecular: 'El ion Co²⁺/Co³⁺ se sitúa en el centro de un macrociclo de corrina tetrapirrólico con un enlace covalente carbono-cobalto único en la naturaleza.',
      rolBioquimico: 'Cofactor de la nitrogenasa bacteriana para la asimilación simbiótica de N₂ en leguminosas.',
      svgMolecular: `<svg viewBox="0 0 220 120" width="100%" height="110">
        <g transform="translate(110, 60)">
          <!-- Anillo Corrina -->
          <polygon points="0,-38 28,-24 38,0 26,26 0,38 -26,26 -38,0 -28,-24" fill="none" stroke="#db2777" stroke-width="2" />
          <line x1="0" y1="-26" x2="0" y2="0" stroke="#db2777" stroke-width="1.8" />
          <line x1="0" y1="26" x2="0" y2="0" stroke="#db2777" stroke-width="1.8" />
          <line x1="-26" y1="0" x2="0" y2="0" stroke="#db2777" stroke-width="1.8" />
          <line x1="26" y1="0" x2="0" y2="0" stroke="#db2777" stroke-width="1.8" />
          <!-- Nitrógenos de coordinación -->
          <circle cx="0" cy="-26" r="7" fill="#2563eb" /><text x="0" y="-23" font-size="7" font-weight="900" fill="#fff" text-anchor="middle">N</text>
          <circle cx="0" cy="26" r="7" fill="#2563eb" /><text x="0" y="29" font-size="7" font-weight="900" fill="#fff" text-anchor="middle">N</text>
          <circle cx="-26" cy="0" r="7" fill="#2563eb" /><text x="-26" y="3" font-size="7" font-weight="900" fill="#fff" text-anchor="middle">N</text>
          <circle cx="26" cy="0" r="7" fill="#2563eb" /><text x="26" y="3" font-size="7" font-weight="900" fill="#fff" text-anchor="middle">N</text>
          <!-- Átomo de Cobalto -->
          <circle cx="0" cy="0" r="16" fill="#db2777" stroke="#be185d" stroke-width="2" />
          <text x="0" y="5" font-size="11" font-weight="900" fill="#fff" text-anchor="middle">Co²⁺</text>
        </g>
        <text x="110" y="112" font-size="8" font-weight="700" fill="#be185d" text-anchor="middle">Núcleo Organometálico de Cobalamina (B12)</text>
      </svg>`
    }
  };

  // 3. Datos de la Escala de pH y Asimilación Nutricional
  const PH_DATA = [
    {
      phMin: 4.0, phMax: 5.4,
      nivel: 'Muy Ácido',
      color: '#dc2626',
      bgBar: '#fee2e2',
      tuboColor: '#ef4444',
      estado: '⚠️ Riesgo de Toxicidad por Aluminio y Bloqueo Severo',
      desc: 'Común en zonas con lluvias torrenciales o suelos lixiviados. El Fósforo (P), Calcio (Ca) y Magnesio (Mg) quedan bloqueados químicamente; el Aluminio (Al) y Manganeso (Mn) se vuelven solubles y tóxicos para las raíces tiernas.',
      accion: 'Aplicar cal agrícola (carbonato de calcio) o ceniza de madera cernida para elevar gradualmente el pH hasta 6.0 - 6.5.',
      nutrientes: 'Fósforo (30% asimilable) • Calcio (Bajo) • Magnesio (Bajo) • Hierro (Soluble pero tóxico)'
    },
    {
      phMin: 5.5, phMax: 5.9,
      nivel: 'Moderadamente Ácido',
      color: '#ea580c',
      bgBar: '#ffedd5',
      tuboColor: '#f97316',
      estado: 'Aceptable para Cultivos Específicos',
      desc: 'Tolerado por piña, café, yuca y papa. Sin embargo, la mayoría de hortalizas escolares (tomate, pimentón, pepino) presentarán un crecimiento más lento por retención parcial de fósforo.',
      accion: 'Incorporar compost orgánico maduro o harina de huesos para amortiguar suavemente la acidez sin choques bruscos.',
      nutrientes: 'Fósforo (60% asimilable) • Nitrógeno (80%) • Potasio (80%) • Micronutrientes (Buenos)'
    },
    {
      phMin: 6.0, phMax: 6.8,
      nivel: 'Óptimo / Ligeramente Ácido',
      color: '#16a34a',
      bgBar: '#dcfce7',
      tuboColor: '#22c55e',
      estado: '🌟 Máxima Fertilidad Escolar y Biodisponibilidad',
      desc: '¡El rango de oro agronómico! En este intervalo, prácticamente todos los macronutrientes (N, P, K, Ca, Mg, S) y micronutrientes se encuentran en su máxima solubilidad sin ningún riesgo de toxicidad mineral.',
      accion: '¡Mantén este equilibrio perfecto con aportes regulares de compost y acolchado vegetal seco (mulch)!',
      nutrientes: 'N (100%) • P (100%) • K (100%) • Ca (100%) • Mg (100%) • S (100%) • Micronutrientes (100%)'
    },
    {
      phMin: 6.9, phMax: 7.3,
      nivel: 'Neutro',
      color: '#0d9488',
      bgBar: '#ccfbf1',
      tuboColor: '#14b8a6',
      estado: 'Equilibrio Químico y Alta Actividad Biológica',
      desc: 'Excelente para hortalizas de hoja verde, leguminosas y lombrices de tierra. Gran actividad de bacterias nitrificantes benéficas en el suelo.',
      accion: 'Ideal para hortalizas anuales. Monitorear periódicamente si se riega con aguas duras.',
      nutrientes: 'N (100%) • P (95%) • K (100%) • Ca (100%) • Micronutrientes (Buen equilibrio)'
    },
    {
      phMin: 7.4, phMax: 7.9,
      nivel: 'Moderadamente Alcalino',
      color: '#0284c7',
      bgBar: '#e0f2fe',
      tuboColor: '#38bdf8',
      estado: 'Bloqueo Inducido de Micronutrientes Metálicos',
      desc: 'Frecuente en suelos costeros o con sobre-encalado. El Fósforo precipita como fosfato tricálcico insoluble, y el Hierro (Fe), Zinc (Zn) y Manganeso (Mn) se bloquean fuertemente, provocando clorosis intervenal.',
      accion: 'Incorporar materia orgánica ácida (turba, aserrín envejecido de pino) o aplicar azufre elemental micronizado para acidificar suavemente.',
      nutrientes: 'Fósforo (50% bloqueado) • Hierro (Muy retenido) • Zinc (Bloqueado) • Molibdeno (100% disponible)'
    },
    {
      phMin: 8.0, phMax: 9.0,
      nivel: 'Muy Alcalino / Salino',
      color: '#7c3aed',
      bgBar: '#ede9fe',
      tuboColor: '#8b5cf6',
      estado: '⚠️ Suelo Difícil y Clorosis Férrica Severa',
      desc: 'Suelos salinos o sódicos. La estructura del suelo se dispersa, la permeabilidad cae drásticamente y casi todos los micronutrientes están retenidos químicamente sin llegar a las raíces.',
      accion: 'Lavar sales con buen drenaje, incorporar abundante abono orgánico ácido y aplicar yeso agrícola para desalojar sodio.',
      nutrientes: 'Fósforo (Insoluble) • Hierro / Zinc / Manganeso / Boro (Severamente bloqueados)'
    }
  ];

  function getPhInfo(val) {
    for (let i = 0; i < PH_DATA.length; i++) {
      if (val >= PH_DATA[i].phMin && val <= PH_DATA[i].phMax + 0.05) {
        return PH_DATA[i];
      }
    }
    return PH_DATA[2]; // Default óptimo
  }

  // 4. Diagnósticos Ampliados de Síntomas Nutricionales
  const DIAGNOSTICOS = {
    amarillo: {
      titulo: 'Clorosis General en Hojas Viejas (Amarillamiento de Abajo hacia Arriba)',
      deficiencia: 'Nitrógeno (N) — Macronutriente Primario',
      remedio: 'Aplica té de compost maduro, purín de ortiga o riega con abono verde fermentado. Como el nitrógeno es altamente móvil en el floema, la planta lo traslada a las hojas jóvenes, sacrificando las hojas inferiores.',
      color: '#ca8a04',
      badge: 'Deficiencia de N (Móvil)'
    },
    purpura: {
      titulo: 'Bordes y Nervaduras Púrpuras o Violáceas en Hojas Inferiores',
      deficiencia: 'Fósforo (P) — Macronutriente Primario',
      remedio: 'Incorpora harina de huesos molida o roca fosfórica en el fondo del surco. Verifica que el pH no sea menor a 5.5, ya que la acidez fija fuertemente el fósforo con hierro y aluminio insolubles.',
      color: '#9333ea',
      badge: 'Deficiencia de P (Móvil)'
    },
    quemado: {
      titulo: 'Puntas y Bordes Marginales Secos / Quemados (Necrosis en "V")',
      deficiencia: 'Potasio (K) — Macronutriente Primario',
      remedio: 'Riega con té de cáscaras de plátano hervidas o ceniza vegetal limpia cernida. El potasio regula la turgencia celular; sin él, las hojas se deshidratan y los bordes mueren chamuscados.',
      color: '#0284c7',
      badge: 'Deficiencia de K (Móvil)'
    },
    manchas: {
      titulo: 'Nervaduras Verdes con Fondo Amarillo Intenso en Hojas Jóvenes / Brotes',
      deficiencia: 'Hierro (Fe) — Micronutriente Esencial',
      remedio: 'Clorosis férrica clásica. El hierro es inmóvil en la planta, por lo que las hojas nuevas nacen casi blancas con nervios verdes. Si el suelo tiene pH alto (> 7.5), aplica quelato de hierro o compost ácido.',
      color: '#16a34a',
      badge: 'Deficiencia de Fe (Inmóvil)'
    },
    intervenal_vieja: {
      titulo: 'Clorosis Intervenal en Hojas Viejas ("Patrón Espina de Pescado")',
      deficiencia: 'Magnesio (Mg) — Macronutriente Secundario',
      remedio: 'Aplica sales de Epsom (sulfato de magnesio, 1 cucharada por galón) pulverizado al follaje o harina de dolomita al suelo. El magnesio es el átomo central de la clorofila.',
      color: '#d97706',
      badge: 'Deficiencia de Mg (Móvil)'
    },
    podredumbre: {
      titulo: 'Puntas de Frutos Podridas ("Culo Negro" en Tomates) y Yemas Rizadas',
      deficiencia: 'Calcio (Ca) — Macronutriente Secundario',
      remedio: 'Aporta macerado de cáscaras de huevo en vinagre o cal agrícola. Crucial: mantén un riego constante y regular, ya que el calcio solo se transporta a través de la corriente de transpiración continua.',
      color: '#b91c1c',
      badge: 'Deficiencia de Ca (Inmóvil)'
    },
    quebradizo: {
      titulo: 'Tallos Débiles, Caída de Plantas (Acame) y Alta Incidencia de Plagas',
      deficiencia: 'Silicio (Si) y Potasio (K) — Benéfico y Primario',
      remedio: 'Aplica ceniza de cascarilla de arroz tostada o té de cola de caballo. Los fitolitos de sílice refuerzan la pared celular vegetal creando una armadura impenetrable contra insectos y hongos.',
      color: '#db2777',
      badge: 'Carencia de Si / Resistencia'
    }
  };

  // 5. Inicialización Principal del Laboratorio
  function initLaboratorio() {
    // A. Pestañas Principales (Nutrientes, pH, Diagnóstico)
    const tabBtns = document.querySelectorAll('.tab-suelo-btn');
    const tabPanels = document.querySelectorAll('.tab-suelo-panel');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const targetTab = this.getAttribute('data-tab');
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanels.forEach(p => p.style.display = 'none');

        this.classList.add('active');
        const panel = document.getElementById(targetTab);
        if (panel) panel.style.display = 'block';
      });
    });

    // B. Lógica de Grupos y Elementos Nutricionales
    let grupoActual = 'primarios';
    let elementoActual = 'N';

    const grupoBtns = document.querySelectorAll('.btn-grupo-suelo');
    const elementosContainer = document.getElementById('sueloElementosGrid');
    const detalleContainer = document.getElementById('nutrienteDetalleBox');
    const grupoInfoBanner = document.getElementById('grupoInfoBanner');

    function renderElementosDeGrupo(grupoKey) {
      grupoActual = grupoKey;
      const grp = GRUPOS_NUTRIENTES[grupoKey];
      if (!grp || !elementosContainer) return;

      // Actualizar banner del grupo
      if (grupoInfoBanner) {
        grupoInfoBanner.innerHTML = `
          <div style="background: ${grp.bgLight}; border-left: 4px solid ${grp.color}; padding: 12px 16px; border-radius: var(--radius-sm); margin-bottom: 16px; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px;">
            <div>
              <strong style="color: ${grp.color}; font-size: 0.98rem; display: block;">
                ${grp.icono} ${grp.nombre}
              </strong>
              <span style="font-size: 0.84rem; color: var(--text-muted); line-height: 1.4; display: block; margin-top: 2px;">
                ${grp.resumenCientifico}
              </span>
            </div>
            <span style="font-size: 0.74rem; background: #ffffff; color: ${grp.color}; border: 1px solid ${grp.color}; padding: 3px 10px; border-radius: var(--radius-pill); font-weight: 700; white-space: nowrap;">
              📚 Fuente: ${grp.fuente}
            </span>
          </div>
        `;
      }

      // Renderizar botones de los elementos de ese grupo
      elementosContainer.innerHTML = '';
      grp.elementos.forEach((elemKey, idx) => {
        const elem = ELEMENTOS_DATA[elemKey];
        if (!elem) return;

        const isSelected = (idx === 0 && !grp.elementos.includes(elementoActual)) || (elemKey === elementoActual);
        if (isSelected) elementoActual = elemKey;

        const card = document.createElement('button');
        card.type = 'button';
        card.className = `elem-suelo-card ${isSelected ? 'selected' : ''}`;
        card.setAttribute('data-elem', elemKey);
        card.style.cssText = `
          cursor: pointer;
          background: ${isSelected ? grp.bgLight : 'var(--warm-bg)'};
          border: 2px solid ${isSelected ? grp.color : 'var(--border-color)'};
          border-radius: var(--radius-sm);
          padding: 12px 14px;
          text-align: center;
          transition: all 0.2s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 4px;
          outline: none;
        `;

        card.innerHTML = `
          <div style="width: 44px; height: 44px; background: ${grp.color}; color: white; font-weight: 800; font-size: 1.35rem; border-radius: 8px; display: flex; align-items: center; justify-content: center; box-shadow: 0 3px 8px rgba(0,0,0,0.12);">
            ${elem.simbolo}
          </div>
          <strong style="color: var(--primary-dark); font-size: 0.9rem; margin-top: 4px; line-height: 1.2;">${elem.nombre}</strong>
          <span style="font-size: 0.7rem; color: ${grp.color}; font-weight: 700;">Z = ${elem.numero}</span>
        `;

        card.addEventListener('click', function() {
          document.querySelectorAll('.elem-suelo-card').forEach(c => {
            c.classList.remove('selected');
            c.style.background = 'var(--warm-bg)';
            c.style.borderColor = 'var(--border-color)';
          });
          this.classList.add('selected');
          this.style.background = grp.bgLight;
          this.style.borderColor = grp.color;
          mostrarDetalleElemento(elemKey);
        });

        elementosContainer.appendChild(card);
      });

      mostrarDetalleElemento(elementoActual);
    }

    function mostrarDetalleElemento(elemKey) {
      elementoActual = elemKey;
      const elem = ELEMENTOS_DATA[elemKey];
      if (!elem || !detalleContainer) return;
      const grp = GRUPOS_NUTRIENTES[elem.grupo];

      detalleContainer.innerHTML = `
        <div style="background: ${grp.bgLight}; border: 2px solid ${grp.borde}; border-radius: var(--radius-sm); padding: 22px; transition: all 0.3s ease;">
          
          <!-- Encabezado del Elemento -->
          <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px; margin-bottom: 14px; padding-bottom: 12px; border-bottom: 1px dashed ${grp.borde};">
            <div style="display: flex; align-items: center; gap: 14px;">
              <span style="display: inline-flex; align-items: center; justify-content: center; width: 48px; height: 48px; background: ${grp.color}; color: #fff; font-weight: 900; font-size: 1.5rem; border-radius: 10px; box-shadow: 0 4px 10px rgba(0,0,0,0.15);">
                ${elem.simbolo}
              </span>
              <div>
                <div style="display: flex; align-items: baseline; gap: 8px;">
                  <strong style="color: var(--primary-dark); font-size: 1.25rem;">${elem.nombre}</strong>
                  <span style="font-size: 0.8rem; color: var(--text-muted); font-weight: 700;">(Número Atómico Z = ${elem.numero})</span>
                </div>
                <span style="font-size: 0.82rem; color: ${grp.color}; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;">
                  ${elem.rol}
                </span>
              </div>
            </div>

            <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 4px;">
              <span style="font-size: 0.78rem; background: #fff; border: 1.5px solid ${grp.color}; color: ${grp.color}; padding: 4px 12px; border-radius: var(--radius-pill); font-weight: 800;">
                ${grp.icono} ${grp.nombre}
              </span>
              <span style="font-size: 0.74rem; color: var(--text-muted);">
                Forma química iónica: <strong style="color: var(--primary-dark);">${elem.formaAsimilable}</strong>
              </span>
            </div>
          </div>

          <!-- Resumen Fisiológico -->
          <p style="font-size: 0.94rem; color: var(--text-main); line-height: 1.65; margin-bottom: 16px;">
            ${elem.resumen}
          </p>

          <!-- NUEVO COMPONENTE: ESTRUCTURA MOLECULAR Y BIOQUÍMICA -->
          <div style="background: #ffffff; border: 1.5px solid ${grp.borde}; border-radius: var(--radius-sm); padding: 16px; margin-bottom: 16px; box-shadow: 0 2px 6px rgba(0,0,0,0.04);">
            <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px; margin-bottom: 12px; border-bottom: 1px solid var(--border-color); padding-bottom: 8px;">
              <strong style="color: var(--primary-dark); font-size: 0.95rem; display: flex; align-items: center; gap: 8px;">
                <i class="fa-solid fa-atom" style="color: ${grp.color};"></i> Estructura Molecular y Bioquímica en la Planta
              </strong>
              <span style="font-size: 0.75rem; background: ${grp.bgLight}; color: ${grp.color}; border: 1px solid ${grp.color}; padding: 2px 10px; border-radius: var(--radius-pill); font-weight: 800;">
                ${elem.nombreMolecula}
              </span>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 16px; align-items: center;">
              <!-- Diagrama SVG de la Estructura Molecular -->
              <div style="background: #f8fafc; border: 1px solid var(--border-color); border-radius: 6px; padding: 10px; display: flex; align-items: center; justify-content: center; min-height: 130px;">
                ${elem.svgMolecular}
              </div>
              
              <!-- Explicación Química y Enlaces -->
              <div>
                <div style="font-size: 0.82rem; font-weight: 700; color: var(--primary-dark); margin-bottom: 4px;">
                  Fórmula y Geometría: <code style="background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-weight: 800; color: #0f172a;">${elem.formulaQuimica}</code>
                </div>
                <p style="font-size: 0.83rem; color: var(--text-muted); line-height: 1.5; margin: 0 0 6px 0;">
                  ${elem.explicacionMolecular}
                </p>
                <div style="font-size: 0.77rem; color: #475569; background: var(--warm-bg); padding: 6px 10px; border-radius: 4px; border-left: 3px solid ${grp.color};">
                  <strong>Rol bioquímico:</strong> ${elem.rolBioquimico}
                </div>
              </div>
            </div>
          </div>

          <!-- PANEL: MECANISMO DE ABSORCIÓN Y ORIGEN EN LA NATURALEZA -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 14px; margin-bottom: 16px;">
            
            <!-- Mecanismo de Absorción por la Raíz -->
            <div style="background: #ffffff; padding: 14px 16px; border-radius: var(--radius-sm); border: 1px solid var(--border-color); border-left: 4px solid #0284c7; box-shadow: 0 2px 5px rgba(0,0,0,0.03);">
              <strong style="color: #0369a1; font-size: 0.85rem; display: flex; align-items: center; gap: 6px; margin-bottom: 6px;">
                ⚡ ¿Cómo lo absorbe la planta? (Mecanismo y Transporte):
              </strong>
              <span style="font-size: 0.83rem; color: var(--text-main); line-height: 1.5; display: block;">
                ${elem.mecanismoTransporte}
              </span>
            </div>

            <!-- Dónde se Obtiene en la Naturaleza -->
            <div style="background: #ffffff; padding: 14px 16px; border-radius: var(--radius-sm); border: 1px solid var(--border-color); border-left: 4px solid #b45309; box-shadow: 0 2px 5px rgba(0,0,0,0.03);">
              <strong style="color: #92400e; font-size: 0.85rem; display: flex; align-items: center; gap: 6px; margin-bottom: 6px;">
                🏔️ ¿Dónde se obtiene en la naturaleza? (Minerales y Ciclos):
              </strong>
              <span style="font-size: 0.83rem; color: var(--text-main); line-height: 1.5; display: block;">
                ${elem.origenNatural}
              </span>
            </div>

          </div>

          <!-- Cuadrícula: Fuentes Orgánicas vs Síntomas de Deficiencia -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 14px; margin-bottom: 16px;">
            
            <div style="background: #ffffff; padding: 14px 16px; border-radius: var(--radius-sm); border: 1px solid var(--border-color); box-shadow: 0 2px 5px rgba(0,0,0,0.03);">
              <strong style="color: #15803d; font-size: 0.85rem; display: flex; align-items: center; gap: 6px; margin-bottom: 6px;">
                🌱 Fuentes Orgánicas y Caseras (Huerto Escolar):
              </strong>
              <span style="font-size: 0.84rem; color: var(--text-muted); line-height: 1.5; display: block;">
                ${elem.fuentes}
              </span>
            </div>

            <div style="background: #ffffff; padding: 14px 16px; border-radius: var(--radius-sm); border: 1px solid var(--border-color); box-shadow: 0 2px 5px rgba(0,0,0,0.03);">
              <strong style="color: #b91c1c; font-size: 0.85rem; display: flex; align-items: center; gap: 6px; margin-bottom: 6px;">
                ⚠️ Síntoma de Deficiencia (Carencia):
              </strong>
              <span style="font-size: 0.84rem; color: var(--text-muted); line-height: 1.5; display: block;">
                ${elem.deficiencia}
              </span>
            </div>

          </div>

          <!-- Consejo Práctico del Huerto Escolar -->
          <div style="background: rgba(255, 255, 255, 0.95); border-left: 4px solid ${grp.color}; padding: 12px 16px; border-radius: var(--radius-sm); border: 1px solid var(--border-color);">
            <strong style="font-size: 0.84rem; color: var(--primary-dark); display: block; margin-bottom: 2px;">
              💡 Aplicación Pedagógica en el Huerto Escolar (6.° Grado):
            </strong>
            <span style="font-size: 0.84rem; color: var(--text-muted); line-height: 1.5;">
              ${elem.consejo}
            </span>
          </div>

        </div>
      `;
    }

    // Eventos para botones de cambio de grupo
    grupoBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const grpKey = this.getAttribute('data-grupo');
        grupoBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        renderElementosDeGrupo(grpKey);
      });
    });

    // Iniciar con Primarios y Nitrógeno
    renderElementosDeGrupo('primarios');

    // C. Lógica del Semáforo de pH
    const sliderPh = document.getElementById('sliderPhValue');
    const displayPhNumero = document.getElementById('displayPhNumero');
    const badgePhNivel = document.getElementById('badgePhNivel');
    const phTuboLiquido = document.getElementById('phTuboLiquido');
    const phDescText = document.getElementById('phDescText');
    const phAccionText = document.getElementById('phAccionText');
    const phNutrientesBar = document.getElementById('phNutrientesBar');

    function actualizarPH(val) {
      const info = getPhInfo(val);
      if (!displayPhNumero) return;

      displayPhNumero.textContent = val.toFixed(1);
      displayPhNumero.style.color = info.color;

      badgePhNivel.textContent = info.nivel + ' — ' + info.estado;
      badgePhNivel.style.background = info.bgBar;
      badgePhNivel.style.color = info.color;
      badgePhNivel.style.borderColor = info.color;

      if (phTuboLiquido) {
        phTuboLiquido.style.background = info.tuboColor;
        const pctHeight = Math.min(100, Math.max(20, ((val - 3.5) / 5.5) * 80 + 10));
        phTuboLiquido.style.height = pctHeight + '%';
      }

      if (phDescText) phDescText.textContent = info.desc;
      if (phAccionText) phAccionText.textContent = info.accion;

      if (phNutrientesBar) {
        phNutrientesBar.innerHTML = `<strong>Disponibilidad de Nutrientes Clave:</strong> ${info.nutrientes}`;
        phNutrientesBar.style.color = info.color;
      }
    }

    if (sliderPh) {
      sliderPh.addEventListener('input', function() {
        actualizarPH(parseFloat(this.value));
      });
      actualizarPH(6.5);
    }

    // Botones rápidos de preset de pH
    const quickPhBtns = document.querySelectorAll('.btn-quick-ph');
    quickPhBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const ph = parseFloat(this.getAttribute('data-ph'));
        if (sliderPh) {
          sliderPh.value = ph;
          actualizarPH(ph);
        }
      });
    });

    // D. Diagnosticador Ampliado de Síntomas Foliares
    const diagBtns = document.querySelectorAll('.btn-diag-sintoma');
    const diagResultado = document.getElementById('diagResultadoBox');

    diagBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        diagBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const sintoma = this.getAttribute('data-sintoma');
        const diag = DIAGNOSTICOS[sintoma];
        if (diag && diagResultado) {
          diagResultado.innerHTML = `
            <div style="background: var(--warm-bg); border-left: 4px solid ${diag.color}; padding: 16px 20px; border-radius: var(--radius-sm); border: 1px solid var(--border-color); animation: fadeIn 0.3s ease;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; flex-wrap: wrap; gap: 8px;">
                <strong style="color: var(--primary-dark); font-size: 0.98rem;">${diag.titulo}</strong>
                <span style="font-size: 0.75rem; background: ${diag.color}; color: white; padding: 3px 12px; border-radius: var(--radius-pill); font-weight: 800;">
                  ${diag.badge}
                </span>
              </div>
              <p style="font-size: 0.88rem; color: var(--text-main); margin: 0 0 8px 0; line-height: 1.55;">
                <strong style="color: #b91c1c;">Diagnóstico Científico:</strong> ${diag.deficiencia}
              </p>
              <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0; line-height: 1.5;">
                <strong style="color: #15803d;">Manejo Agroecológico en el Huerto:</strong> ${diag.remedio}
              </p>
            </div>
          `;
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLaboratorio);
  } else {
    initLaboratorio();
  }
})();
'''

with open('laboratorioSuelo.js', 'w', encoding='utf-8') as f:
    f.write(script_content)

print("laboratorioSuelo.js written successfully!")
