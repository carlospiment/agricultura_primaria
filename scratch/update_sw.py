with open('sw.js', 'r', encoding='utf-8') as f:
    sw = f.read()

target = "  './assets/images/hero.webp',"
replacement = "  './assets/images/hero.webp',\n  './assets/images/infografia-nutricion-suelo.svg',"

if target in sw:
    sw = sw.replace(target, replacement, 1)
    with open('sw.js', 'w', encoding='utf-8', newline='') as f:
        f.write(sw)
    print("sw.js successfully updated with infografia asset!")
else:
    print("Target not found in sw.js")
