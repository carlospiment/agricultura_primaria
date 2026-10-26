with open('index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i in range(7670, 7725):
    print(f"{i+1}: {repr(lines[i])}")
