with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

start_marker = '<!-- Infografía Científica del Ciclo de Nutrición y Absorción Radicular -->'
end_marker = '<!-- Selector de Grupos Científicos -->'

idx1 = text.find(start_marker)
idx2 = text.find(end_marker)

print(f"idx1: {idx1}, idx2: {idx2}")
if idx1 != -1 and idx2 != -1:
    print("Found top infographic block!")
    print(text[idx1:idx1+100])
