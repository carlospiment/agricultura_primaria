import re

with open('laboratorioSuelo.js', 'r', encoding='utf-8') as f:
    js_code = f.read()

# 1. Eliminar (MEDUCA 2026) del encabezado de laboratorioSuelo.js
js_code = js_code.replace(
    '* Programa de Agricultura - Sexto Grado (MEDUCA 2026 - Área 4: Suelos y Edafología)',
    '* Programa de Agricultura - Sexto Grado (Área 4: Suelos y Edafología)'
)

print("Updated comment in laboratorioSuelo.js")
