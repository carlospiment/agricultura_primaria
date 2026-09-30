# Auditoría Técnica Integral: Portal Web de Agricultura de Primaria (MEDUCA 2026)

**Fecha:** 26 de septiembre de 2026  
**Proyecto:** Portal Curricular de Agricultura para Educación Básica General (3.º a 6.º Grado)  
**Autor:** Ingeniero Carlos Pimentel  
**Ubicación:** `g:\Mi unidad\MEDUCA\AGRICULTURA\WEB`  

---

## 1. Resumen Ejecutivo y Puntuación General

| Dimensión | Puntuación | Estado | Prioridad |
| :--- | :---: | :---: | :---: |
| **Seguridad Web** | 55 / 100 | Riesgo Alto | Inmediata (Fase 1) |
| **Rendimiento (Performance)** | 40 / 100 | Crítico | Inmediata (Fase 2) |
| **Accesibilidad (A11y - WCAG 2.1 AA)** | 45 / 100 | Crítico | Alta (Fase 3) |
| **Arquitectura y Calidad de Código** | 50 / 100 | Moderado | Media (Fase 4) |
| **Experiencia de Usuario (UX)** | 60 / 100 | Regular | Alta (Fases 1 y 3) |
| **SEO y Metadatos** | 65 / 100 | Aceptable | Baja (Fase 5) |

---

## 2. Diagnóstico Detallado de Hallazgos

### 2.1. Seguridad Web
1. **DOM-based Cross-Site Scripting (XSS) en Buscador:**
   - **Archivo:** `app.js` (Línea 2407).
   - **Causa:** `searchResultsContainer.innerHTML = ... "${query}" ...`.
   - **Riesgo:** Inyección de scripts al escribir o pegar contenido malicioso en el buscador.
   - **Solución:** Escapar caracteres HTML o usar `textContent` / nodos DOM nativos.
2. **Reverse Tabnabbing en Enlaces a PDF:**
   - **Archivo:** `index.html` (Líneas 491 y 6868).
   - **Causa:** `target="_blank"` sin `rel="noopener noreferrer"`.
   - **Riesgo:** Exposición del objeto `window.opener` a ventanas secundarias.
   - **Solución:** Añadir `rel="noopener noreferrer"`.
3. **Discrepancia en Nombre de Archivo PDF (Riesgo 404):**
   - **Archivo:** `index.html` (Línea 491).
   - **Causa:** Enlace a `assets/pdf/A1Tema1_%20LaJardineria.pdf` vs. archivo en disco `A1Tema1_ LaJardineria.pdf`.
   - **Solución:** Renombrar el archivo a formato web estándar (`a1_tema1_la_jardineria.pdf`) y actualizar el enlace.

---

### 2.2. Rendimiento y Core Web Vitals
1. **Sobrecarga de Imágenes (13.3 MB en total):**
   - 14 imágenes JPEG de más de 1 MB cada una (`hero.jpg`, `area1.jpg`, `jardin_ornamental.jpg`, etc.).
   - 63 etiquetas `<img>` sin `loading="lazy"` ni `decoding="async"`.
   - Sin atributos explícitos `width` y `height` (provoca saltos de diseño / Cumulative Layout Shift).
   - **Solución:** Convertir a formato WebP (reducción estimada del 88%, bajando a ~1.5 MB total) y añadir atributos de lazy-loading.
2. **Árbol DOM Masivo (4,776 elementos en una sola vista):**
   - `index.html` pesa 748 KB con 9,214 líneas. Todo el contenido de 3.º a 6.º grado está en el DOM al mismo tiempo.
   - **Solución:** Aligerar estilos inline redundantes y considerar carga diferida por grado o área.
3. **PDF de Alto Peso (17 MB):**
   - `Plantas_Ornamentales.pdf` pesa 16.96 MB, lo que satura conexiones en zonas rurales de Panamá.
   - **Solución:** Comprimir y linealizar el PDF a menos de 2–3 MB.
4. **Cadena Crítica de Fuentes (`@import` en CSS):**
   - **Archivo:** `styles.css` (Línea 7).
   - Bloquea la descarga paralela. Debe migrarse a `<link rel="preconnect">` en el `<head>`.
5. **Inicialización Temprana de 16 Sopas de Letras:**
   - Se crean más de 2,300 celdas interactivas al arrancar la página. Deben inicializarse bajo demanda cuando el usuario entra al grado correspondiente.
6. **Listener de Scroll sin Optimizar:**
   - En `app.js` (Línea 2470), el evento `scroll` se ejecuta continuamente sin `{ passive: true }` ni `requestAnimationFrame`.

---

### 2.3. Accesibilidad (WCAG 2.1 AA)
1. **Campos sin Etiquetas:**
   - 99 elementos `<input>` y 45 `<textarea>` sin `<label for="...">` ni `aria-label`. Los lectores de pantalla no anuncian el contexto.
2. **Modo Oscuro con Contraste Roto:**
   - Hay variables de tema oscuro en `styles.css`, pero ningún botón para activarlo.
   - Cientos de tarjetas tienen `background: #ffffff` inline fijo. Al cambiar variables a texto claro (`#e8f5e9`), el texto se vuelve blanco sobre blanco (completamente invisible).
3. **Marcado HTML Malformado (Falta `</footer>`):**
   - La etiqueta `<footer class="main-footer">` (Línea 9177) nunca se cierra. El buscador, botones flotantes y scripts quedan atrapados dentro del pie de página.
4. **Jerarquía de Encabezados:**
   - Solo existe un `<h1>` en el logo. Falta un `<h1>` dinámico o semántico por vista principal.

---

### 2.4. Arquitectura y Mantenibilidad
1. **3,102 Estilos en Línea (`style="..."`):**
   - Dificultan el mantenimiento y aumentan el tamaño del HTML en ~300 KB.
2. **325 Manejadores Inline `onclick="..."`:**
   - Acoplan fuertemente el HTML a funciones globales en JS e impiden políticas de seguridad CSP estrictas.
3. **Carpeta Duplicada de 31 MB (`agricultura_primaria/`):**
   - Copia redundante que duplica el consumo de espacio y genera riesgos de edición sobre archivos obsoletos.
4. **Código Repetido en JS (Violación DRY):**
   - 15 funciones de cuestionario idénticas (`checkToolQuiz`, etc.) y 16 sopas de letras que pueden unificarse en motores genéricos.

---

### 2.5. Experiencia de Usuario (UX)
1. **Secuestro del Menú Móvil en Scroll:**
   - Al bajar más de 300px, el botón de menú cambia a "Volver arriba". El usuario no puede abrir el menú mientras lee un tema; debe subir primero para volver a navegar.
2. **Formularios de Talleres no Guardan ni Imprimen:**
   - Los talleres indican "Guarda o imprime esta guía", pero solo disparan un `alert()`. No hay botón de impresión ni estilos `@media print`, y los datos se pierden al recargar.
3. **Puntero en Sopas de Letras:**
   - Al arrastrar el dedo fuera de la cuadrícula en móviles, la selección se queda bloqueada por falta de captura de puntero (`setPointerCapture`).

---

## 3. Hoja de Ruta de Implementación por Fases

### Fase 1: Seguridad y Errores Críticos (Prioridad Inmediata)
- [x] Sanitizar entrada del buscador en `app.js` (Línea 2407) para prevenir DOM XSS.
- [x] Cerrar la etiqueta `</footer>` en `index.html`.
- [x] Agregar `rel="noopener noreferrer"` en los enlaces externos y PDFs.
- [x] Separar el botón de menú móvil del botón de subir arriba para no bloquear la navegación.
- [x] Corregir la ruta del PDF `A1Tema1_ LaJardineria.pdf`.

### Fase 2: Rendimiento y Carga Rápida
- [x] Comprimir las 14 imágenes a formato WebP y actualizar etiquetas con `loading="lazy"` y dimensiones.
- [x] Migrar `@import` de tipografías a `<link rel="preconnect">` en el `<head>`.
- [x] Comprimir y optimizar para web el archivo `Plantas_Ornamentales.pdf`.
- [x] Diferir la inicialización de las 16 sopas de letras hasta que el usuario abra su pestaña.
- [x] Optimizar el listener de scroll con `{ passive: true }` y `requestAnimationFrame`.

### Fase 3: Accesibilidad y UX de Talleres
- [x] Asociar `<label>` y `aria-label` a los 99 inputs y 45 textareas.
- [x] Diseñar hoja de estilo de impresión (`@media print`) para que alumnos y docentes puedan imprimir guías limpiamente.
- [x] Implementar guardado automático de respuestas en `localStorage`.
- [x] Añadir captura de puntero (`setPointerCapture`) en las sopas de letras táctiles.
- [x] Corregir el modo oscuro eliminando fondos inline fijos `#ffffff`.

### Fase 4: Limpieza Arquitectónica
- [ ] Eliminar o respaldar la carpeta duplicada `agricultura_primaria/`.
- [ ] Reemplazar las 15 funciones repetidas de cuestionario en `app.js` por un motor universal con `data-*` attributes.
- [ ] Extraer estilos inline comunes hacia clases semánticas en `styles.css`.

### Fase 5: Metadatos y Capacidades Offline
- [x] Agregar favicon oficial del proyecto.
- [x] Configurar metaetiquetas Open Graph y Twitter Card para compartir en WhatsApp y plataformas educativas.
- [x] Añadir `manifest.json` y Service Worker básico para funcionamiento sin internet (PWA).
