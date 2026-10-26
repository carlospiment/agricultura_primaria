with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

start = text.find('id="laboratorio-suelo-sexto"')
end = text.find('</section>', start)

sub = text[start:end]
print('Occurrences in laboratorio-suelo-sexto:', sub.count('MEDUCA 2026'))
for line in sub.split('\n'):
    if 'MEDUCA 2026' in line:
        print('Line:', line.strip())
