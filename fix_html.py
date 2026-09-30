import re

HTML_FILE = "index.html"

def process_html():
    with open(HTML_FILE, 'r', encoding='utf-8') as f:
        content = f.read()

    # Task 1: Replace background: #ffffff; with background: var(--card-bg);
    content = re.sub(r'background:\s*#ffffff;?', r'background: var(--card-bg);', content)

    # Task 2: Add aria-label to inputs and textareas that lack one
    def inject_aria(match):
        tag = match.group(0)
        if 'aria-label=' not in tag and 'type="hidden"' not in tag:
            if tag.startswith('<input'):
                tag = tag.replace('<input ', '<input aria-label="Campo de respuesta" ')
            elif tag.startswith('<textarea'):
                tag = tag.replace('<textarea ', '<textarea aria-label="Campo de respuesta" ')
        return tag

    content = re.sub(r'<input[^>]+>', inject_aria, content)
    content = re.sub(r'<textarea[^>]+>', inject_aria, content)

    with open(HTML_FILE, 'w', encoding='utf-8') as f:
        f.write(content)
        
    print("Modifications applied successfully.")

if __name__ == "__main__":
    process_html()
