with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

marker = '<!-- PESTAÑA 2: SEMÁFORO DE pH -->'
idx = text.find(marker)
print(f"Marker idx: {idx}")
if idx != -1:
    print("Preceding 250 chars:")
    print(repr(text[idx-250:idx]))
