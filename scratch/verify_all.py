with open('index.html', 'r', encoding='utf-8') as f:
    text = f.read()

print('Occurrences of infografiaCicloDinamico:', text.count('infografiaCicloDinamico'))
print('Occurrences of btn-infografia-modo:', text.count('btn-infografia-modo'))

start = text.find('id="laboratorio-suelo-sexto"')
end = text.find('</section>', start)
print('Length of laboratorio section:', end - start)

sub = text[start:end]
print('MEDUCA 2026 in laboratorio section:', sub.count('MEDUCA 2026'))
