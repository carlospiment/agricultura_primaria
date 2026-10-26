/**
 * Laboratorio Interactivo del Suelo: Nutrientes Vegetales, Química y pH
 * Basado en estándares científicos: FAO, IPNI, USDA-NRCS y Criterios de Esencialidad (Arnon & Stout, Marschner)
 * Programa de Agricultura - Sexto Grado (MEDUCA 2026 - Área 4)
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

  // 2. Fichas de Cada Elemento Químico Nutricional
  const ELEMENTOS_DATA = {
    // --- MACRONUTRIENTES PRIMARIOS ---
    N: {
      grupo: 'primarios',
      simbolo: 'N',
      numero: '7',
      nombre: 'Nitrógeno',
      formaAsimilable: 'Nitrato (NO₃⁻) y Amonio (NH₄⁺)',
      rol: 'Crecimiento Vegetativo, Hojas Verdes y Clorofila',
      resumen: 'Es el motor del crecimiento vegetal. Forma parte integral de todas las proteínas, enzimas, ácidos nucleicos (ADN/ARN) y de la molécula de clorofila responsable de la fotosíntesis.',
      fuentes: 'Compost maduro, purines de ortiga, abonos verdes con leguminosas (frijol de abono, guandú) y gallinaza bien fermentada.',
      deficiencia: 'Clorosis generalizada (amarillamiento) que inicia en las hojas más viejas (inferiores) y avanza hacia arriba. Crecimiento raquítico.',
      exceso: 'Follaje excesivo de color verde oscuro azulado, tallos débiles y quebradizos, y retraso severo en la floración.',
      consejo: 'Asociar maíz con frijol en el huerto escolar permite aprovechar el nitrógeno atmosférico que las bacterias fijan en las raíces del frijol.'
    },
    P: {
      grupo: 'primarios',
      simbolo: 'P',
      numero: '15',
      nombre: 'Fósforo',
      formaAsimilable: 'Ortofosfatos (H₂PO₄⁻ y HPO₄²⁻)',
      rol: 'Enraizamiento Profundo, Transferencia de Energía y Floración',
      resumen: 'Interviene directamente en el almacenamiento y transporte de energía celular (moléculas de ATP), en la formación de membranas celulares y en la maduración de semillas y frutos.',
      fuentes: 'Harina de huesos calcinada, roca fosfórica molida, estiércol avícola maduro y compost enriquecido.',
      deficiencia: 'Bordes y venas de las hojas más viejas adquieren coloraciones púrpuras, violáceas o rojizas. Sistema radicular escaso y enano.',
      exceso: 'No causa daño tóxico directo visible, pero bloquea e inhibe la absorción de micronutrientes indispensables como el Zinc (Zn) y Hierro (Fe).',
      consejo: 'Aplica el abono rico en fósforo en el fondo del hoyo de siembra, pues es un elemento de bajísima movilidad en el suelo.'
    },
    K: {
      grupo: 'primarios',
      simbolo: 'K',
      numero: '19',
      nombre: 'Potasio',
      formaAsimilable: 'Catión Potasio (K⁺)',
      rol: 'Resistencia a Sequía, Turgencia y Calibre de Frutos',
      resumen: 'Regula la apertura y cierre de los estomas celulares para economizar agua, activa más de 60 enzimas metabólicas y transporta azúcares hacia los frutos y tubérculos.',
      fuentes: 'Té o extracto de cáscaras de plátano hervidas, ceniza de leña limpia cernida (en suelos no alcalinos) y mulch vegetal.',
      deficiencia: 'Bordes y puntas de las hojas chamuscadas o secas (necrosis marginal en forma de "V" invertida), tallos débiles y frutos insípidos.',
      exceso: 'El exceso de potasio bloquea la asimilación de Magnesio (Mg) y Calcio (Ca), originando podredumbres apicales en tomates.',
      consejo: 'El fertilizante casero de cáscaras de plátano es ideal cuando las tomateras y pimientos del huerto inician la floración y cuajado.'
    },

    // --- MACRONUTRIENTES SECUNDARIOS ---
    Ca: {
      grupo: 'secundarios',
      simbolo: 'Ca',
      numero: '20',
      nombre: 'Calcio',
      formaAsimilable: 'Catión Calcio (Ca²⁺)',
      rol: 'Estructura Celular (Paredes) y Desarrollo Radicular',
      resumen: 'Forma el pectato de calcio en la lámina media que "cementa" las paredes de las células vegetales, brindando firmeza a tallos y frutos, y regula el crecimiento de los ápices radiculares.',
      fuentes: 'Cáscaras de huevo trituradas maceradas en vinagre (acetato de calcio soluble), cal agrícola molida y yeso agrícola.',
      deficiencia: 'Muerte de las yemas terminales, hojas jóvenes deformes o curvadas en forma de cuchara, y la típica podredumbre apical ("culo negro") en tomates y pimentones.',
      exceso: 'Eleva el pH del suelo provocando la precipitación e inmovilización de fósforo y de micronutrientes catiónicos como el hierro y zinc.',
      consejo: 'El calcio se mueve solo con el agua de transpiración; mantener un riego uniforme previene frutos con podredumbre apical.'
    },
    Mg: {
      grupo: 'secundarios',
      simbolo: 'Mg',
      numero: '12',
      nombre: 'Magnesio',
      formaAsimilable: 'Catión Magnesio (Mg²⁺)',
      rol: 'Átomo Central de la Clorofila y Fotosíntesis',
      resumen: 'Es el corazón químico de cada molécula de clorofila. Sin magnesio, la planta no puede absorber fotones de luz solar ni realizar fotosíntesis, además de activar la síntesis de almidones.',
      fuentes: 'Harina de dolomita (carbonato de calcio y magnesio), sales de Epsom (sulfato de magnesio) aplicadas al follaje y compost verde.',
      deficiencia: 'Clorosis intervenal ("patrón de espina de pescado") en hojas viejas: las nervaduras permanecen verdes mientras el espacio entre ellas se vuelve amarillo brillante.',
      exceso: 'Genera un desbalance catiónico severo en el suelo que reduce la absorción de potasio y calcio.',
      consejo: 'Una pulverización suave con 1 cucharada de sales de Epsom en 4 litros de agua revive rápidamente hojas intervenalmente amarillas.'
    },
    S: {
      grupo: 'secundarios',
      simbolo: 'S',
      numero: '16',
      nombre: 'Azufre',
      formaAsimilable: 'Anión Sulfato (SO₄²⁻)',
      rol: 'Síntesis de Aminoácidos Azufrados, Proteínas y Aromas',
      resumen: 'Constituyente insustituible de los aminoácidos cisteína y metionina, indispensables para formar proteínas, enzimas respiratorias y los compuestos aromáticos típicos del culantro, ajo y cebolla.',
      fuentes: 'Yeso agrícola (sulfato de calcio), materia orgánica bien descompuesta y restos de plantas crucíferas en el compost.',
      deficiencia: 'Clorosis uniforme de color verde pálido o amarillo en las hojas más jóvenes (a diferencia del nitrógeno, que afecta hojas viejas).',
      exceso: 'Rara vez tóxico, pero en dosis extremas puede acidificar fuertemente el suelo y quemar las raíces absorbentes.',
      consejo: 'El azufre orgánico estimula el aroma penetrante de las plantas aromáticas y medicinales del huerto escolar.'
    },

    // --- MICRONUTRIENTES ESENCIALES ---
    Fe: {
      grupo: 'micros',
      simbolo: 'Fe',
      numero: '26',
      nombre: 'Hierro',
      formaAsimilable: 'Catión Ferroso (Fe²⁺) y Férrico (Fe³⁺)',
      rol: 'Formación de Clorofila y Transporte de Electrones',
      resumen: 'Aunque no forma parte de la molécula de clorofila, actúa como catalizador indispensable para sintetizarla y forma parte de citocromos y ferredoxina en la respiración y fotosíntesis.',
      fuentes: 'Lixiviado de lombricompost (humus líquido), purines fermentados de malezas y quelatos de hierro en suelos alcalinos.',
      deficiencia: 'Clorosis intervenal muy intensa en las hojas más jóvenes: los brotes nuevos nacen casi blancos o amarillo limón con nervaduras verdes muy finas.',
      exceso: 'Poco frecuente, salvo en suelos extremadamente inundados y anegados donde produce toxicidad por reducción férrica excesiva.',
      consejo: 'Si riegas con agua muy dura o el suelo tiene mucha cal (pH > 7.5), el hierro se bloquea. Agrega compost ácido o vinagre suave para desbloquearlo.'
    },
    Zn: {
      grupo: 'micros',
      simbolo: 'Zn',
      numero: '30',
      nombre: 'Cinc / Zinc',
      formaAsimilable: 'Catión Zinc (Zn²⁺)',
      rol: 'Síntesis de Auxinas (Hormonas de Crecimiento) y Enzimas',
      resumen: 'Esencial para la síntesis de triptófano, aminoácido precursor del ácido indolacético (auxinas), la hormona encargada del estiramiento celular y elongación de tallos.',
      fuentes: 'Estiércol de ganado vacuno madurado, harina de algas marinas y compostaje biológico rico en microbiología.',
      deficiencia: 'Entrenudos muy cortos que producen tallos enanos con hojas agrupadas en "roseta" y hojas anormalmente angostas ("enfermedad de hoja pequeña").',
      exceso: 'Produce toxicidad con clorosis similar a la deficiencia de hierro debido a competencia a nivel de transportadores de membrana.',
      consejo: 'Fundamental en la etapa de germinación del maíz y frijol para garantizar plantones altos y vigorosos.'
    },
    Mn: {
      grupo: 'micros',
      simbolo: 'Mn',
      numero: '25',
      nombre: 'Manganeso',
      formaAsimilable: 'Catión Manganoso (Mn²⁺)',
      rol: 'Fotólisis del Agua en la Fotosíntesis (Liberación de O₂)',
      resumen: 'Actúa en el fotosistema II rompiendo las moléculas de agua para liberar el oxígeno que respiramos, e interviene en la síntesis de lignina y carbohidratos.',
      fuentes: 'Compost de restos de ramas trituradas, mantillo de bosque y biofertilizantes enriquecidos.',
      deficiencia: 'Moteado clorótico con pequeñas manchitas necróticas grisáceas o marrones dispersas en hojas medianas y jóvenes.',
      exceso: 'Muy peligroso en suelos hiperácidos (pH < 5.0) donde se vuelve hiper-soluble y causa toxicidad con manchas necróticas y enrollamiento foliar.',
      consejo: 'Mantener el pH del suelo escolar por encima de 5.5 evita que el manganeso se torne tóxico para los cultivos.'
    },
    B: {
      grupo: 'micros',
      simbolo: 'B',
      numero: '5',
      nombre: 'Boro',
      formaAsimilable: 'Ácido Bórico no disociado (H₃BO₃)',
      rol: 'Polinización, Fecundación Floral y Transporte de Azúcares',
      resumen: 'Estructural en las paredes celulares de pectina y decisivo para la germinación del grano de polen, el crecimiento del tubo polínico y la fertilidad de las flores.',
      fuentes: 'Ceniza vegetal en microdosis muy leves, restos orgánicos triturados y bórax agrícola formulado.',
      deficiencia: 'Muerte de brotes apicales terminales, caída masiva de flores sin cuajar fruto, y frutos agrietados o con zonas corchosas secas.',
      exceso: 'El rango entre deficiencia y toxicidad es muy estrecho: el exceso quema rápidamente los bordes de las hojas.',
      consejo: 'Nunca apliques boro puro en grandes cantidades; basta con incorporar buena materia orgánica madura al cantero.'
    },
    Cu: {
      grupo: 'micros',
      simbolo: 'Cu',
      numero: '29',
      nombre: 'Cobre',
      formaAsimilable: 'Catión Cúprico (Cu²⁺)',
      rol: 'Proteína Plastocianina y Firmeza Celular contra Hongos',
      resumen: 'Componente de la enzima plastocianina en la fotosíntesis, participa en el metabolismo de carbohidratos y estimula la síntesis de lignina en tallos.',
      fuentes: 'Materia orgánica equilibrada, compostajes diversificados y aplicaciones preventivas de caldo bordelés ecológico.',
      deficiencia: 'Puntas de hojas jóvenes enrolladas en espiral, marchitez permanente en brotes nuevos y muerte descendente de ramillas.',
      exceso: 'Inhibe el crecimiento radicular y provoca clorosis férrica inducida al bloquear los sitios de absorción de hierro.',
      consejo: 'El caldo bordelés tradicional aporta microdosis nutritivas de cobre mientras protege contra hongos en épocas lluviosas.'
    },
    Mo: {
      grupo: 'micros',
      simbolo: 'Mo',
      numero: '42',
      nombre: 'Molibdeno',
      formaAsimilable: 'Anión Molibdato (MoO₄²⁻)',
      rol: 'Fijación de Nitrógeno y Reducción de Nitratos',
      resumen: 'Forma parte del cofactor de la enzima nitrogenasa (en bacterias fijadoras de nitrógeno) y de la nitrato reductasa. Sin molibdeno, la planta acumula nitratos tóxicos y no puede fabricar proteínas.',
      fuentes: 'Suelos con materia orgánica bien aireada; su asimilabilidad aumenta al subir el pH con cal agrícola.',
      deficiencia: 'Clorosis parecida a la falta de nitrógeno y deformación en "cola de látigo" en hojas de col, brócoli y coliflor.',
      exceso: 'Rara vez causa toxicidad en plantas, aunque forrajes con exceso de Mo pueden causar desbalances en el ganado.',
      consejo: 'Es el único micronutriente que se absorbe mejor en suelos neutros o ligeramente alcalinos que en suelos ácidos.'
    },

    // --- ELEMENTOS ESTRUCTURALES (NO MINERALES) ---
    C: {
      grupo: 'estructurales',
      simbolo: 'C',
      numero: '6',
      nombre: 'Carbono',
      formaAsimilable: 'Dióxido de Carbono (CO₂) del aire atmosférico',
      rol: 'Esqueleto Químico Fundamental de la Materia Orgánica (~45% peso seco)',
      resumen: 'Constituye la columna vertebral de todas las biomoléculas: carbohidratos, celulosa, almidones, azúcares, lípidos, proteínas y ADN.',
      fuentes: 'El aire libre que rodea el huerto escolar a través de los estomas de las hojas durante la fotosíntesis diurna.',
      deficiencia: 'Asfixia vegetal si las plantas están hacinadas o en invernaderos completamente cerrados sin ventilación ni luz solar.',
      exceso: 'No existe en condiciones normales de huerto abierto; mayores niveles ambientales de CO₂ aceleran la fotosíntesis si hay agua y luz.',
      consejo: 'Deja suficiente distancia entre surcos para que el aire circule libremente y las hojas absorban abundante CO₂ fresco.'
    },
    H: {
      grupo: 'estructurales',
      simbolo: 'H',
      numero: '1',
      nombre: 'Hidrógeno',
      formaAsimilable: 'Agua (H₂O) absorbida por las raíces',
      rol: 'Generador de Poder Reductor (NADPH) y Gradientes Protónicos (~6% peso seco)',
      resumen: 'Proviene directamente de la fotólisis del agua. Los protones de hidrógeno impulsan la síntesis de ATP y permiten fijar el carbono durante el ciclo de Calvin.',
      fuentes: 'Riego con agua dulce limpia y humedad adecuada retenida en los microporos del suelo.',
      deficiencia: 'Estrés hídrico severo: marchitamiento foliar, cierre inmediato de estomas, paralización de fotosíntesis y deshidratación.',
      exceso: 'El exceso de agua encharcada desplaza el aire del suelo, asfixiando las raíces por falta de oxígeno.',
      consejo: 'Un riego constante a tempranas horas de la mañana proporciona el hidrógeno necesario antes de las horas de máxima insolación.'
    },
    O: {
      grupo: 'estructurales',
      simbolo: 'O',
      numero: '8',
      nombre: 'Oxígeno',
      formaAsimilable: 'Gas O₂ (respiración) y H₂O / CO₂ (~45% peso seco)',
      rol: 'Respiración Celular Aeróbica y Aceptor Final de Electrones',
      resumen: 'Indispensable para que las células de las raíces y hojas oxiden los azúcares y liberen la energía biológica vital que las mantiene vivas.',
      fuentes: 'Aire atmosférico y porosidad ventilada del suelo edáfico.',
      deficiencia: 'Asfixia radicular en suelos apelmazados, compactados o inundados por falta de drenaje. Muerte y pudrición de raíces.',
      exceso: 'No genera toxicidad en cultivos escolares.',
      consejo: 'Aflojar la tierra con el azadón o rastrillo permite que el oxígeno ingrese a la zona radicular para que las raíces respiren.'
    },

    // --- ELEMENTOS BENÉFICOS (FUNCIONALES) ---
    Si: {
      grupo: 'beneficos',
      simbolo: 'Si',
      numero: '14',
      nombre: 'Silicio',
      formaAsimilable: 'Ácido Monosilícico (H₄SiO₄)',
      rol: 'Escudo Mecánico contra Plagas, Hongos y Resistencia a Sequía',
      resumen: 'Se deposita en la pared celular de la epidermis formando fitolitos duros de sílice amorfa. Crea una armadura protectora que desgasta las mandíbulas de insectos masticadores e impide la penetración de hifas de hongos (roya, oídio).',
      fuentes: 'Ceniza de cascarilla de arroz tostada (rica en sílice bioasimilable), té de cola de caballo (Equisetum) y paja de arroz.',
      deficiencia: 'Tallos flexibles y quebradizos susceptibles al viento (acame en maíz y arroz), y mayor ataque de plagas masticadoras.',
      exceso: 'Completamente seguro e inocuo; el silicio sobrante no causa toxicidad biológica en la planta ni en el suelo.',
      consejo: 'Añadir cascarilla de arroz compostada o calcinada en el huerto escolar crea un escudo natural contra orugas, caracoles y hongos.'
    },
    Co: {
      grupo: 'beneficos',
      simbolo: 'Co',
      numero: '27',
      nombre: 'Cobalto',
      formaAsimilable: 'Catión Cobalto (Co²⁺)',
      rol: 'Cofactor para la Fijación Biológica Simbiótica de Nitrógeno',
      resumen: 'Esencial para que las bacterias simbióticas Rhizobium sinteticen cobalamina (vitamina B12), molécula requerida para sintetizar leghemoglobina y fijar nitrógeno en nódulos radiculares de leguminosas.',
      fuentes: 'Compost con minerales de roca madre equilibrados y estiércoles maduros de rumiantes.',
      deficiencia: 'Escasa nodulación en raíces de leguminosas (frijoles, arvejas, guandú) y menor fijación de nitrógeno natural.',
      exceso: 'En dosis industriales excesivas puede provocar clorosis férrica inducida.',
      consejo: 'Sembrar frijol o guandú inoculado con biofertilizantes promueve la fijación natural de nitrógeno con ayuda de trazas de cobalto.'
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
              <span style="font-size: 0.72rem; color: var(--text-muted);">
                Forma química: <strong>${elem.formaAsimilable}</strong>
              </span>
            </div>
          </div>

          <!-- Resumen Metabólico -->
          <p style="font-size: 0.94rem; color: var(--text-main); line-height: 1.65; margin-bottom: 16px;">
            ${elem.resumen}
          </p>

          <!-- Cuadrícula: Fuentes Orgánicas vs Síntomas de Deficiencia -->
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 14px; margin-bottom: 16px;">
            
            <div style="background: #ffffff; padding: 14px 16px; border-radius: var(--radius-sm); border: 1px solid var(--border-color); box-shadow: 0 2px 5px rgba(0,0,0,0.03);">
              <strong style="color: #15803d; font-size: 0.85rem; display: flex; align-items: center; gap: 6px; margin-bottom: 6px;">
                🌱 Fuentes Orgánicas y Caseras:
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
