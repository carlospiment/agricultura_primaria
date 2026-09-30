import os

HTML_FILE = "index.html"

def update_html():
    with open(HTML_FILE, 'r', encoding='utf-8') as f:
        html = f.read()

    # Add manifest and OpenGraph meta tags
    meta_tags = """
  <meta property="og:title" content="Agricultura de Primaria | MEDUCA">
  <meta property="og:description" content="Portal Educativo del Programa Curricular de Agricultura para Educación Básica General en Primaria.">
  <meta property="og:image" content="assets/images/hero.webp">
  <meta property="og:url" content="https://meduca.gob.pa/agricultura">
  <meta property="og:type" content="website">
  <link rel="manifest" href="manifest.json">
  <meta name="theme-color" content="#1b4332">
"""
    if "og:title" not in html:
        # Insert before <title>
        html = html.replace("<title>", meta_tags + "  <title>")

    # Add Service Worker registration script
    sw_script = """
  <!-- Service Worker Registration para Capacidades Offline (PWA) -->
  <script>
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
          .then(registration => console.log('ServiceWorker registrado exitosamente con el scope: ', registration.scope))
          .catch(err => console.log('Fallo en el registro del ServiceWorker: ', err));
      });
    }
  </script>
</body>
"""
    if "serviceWorker.register" not in html:
        html = html.replace("</body>", sw_script)

    with open(HTML_FILE, 'w', encoding='utf-8') as f:
        f.write(html)
    print("Metadata and Service Worker added successfully.")

if __name__ == "__main__":
    update_html()
