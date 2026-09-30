import os

HTML_FILE = "index.html"
CSS_FILE = "styles.css"

mapping = {
    'style="background: var(--card-bg); border-radius: var(--radius-md); padding: 28px; border: 1px solid var(--border-color); box-shadow: var(--shadow-sm);"': 'semantic-card-standard',
    'style="background: var(--card-bg); border: 2px solid var(--accent); border-radius: var(--radius-md); padding: 32px; box-shadow: var(--shadow-md);"': 'semantic-card-accent',
    'style="background: var(--card-bg); border: 2px solid var(--primary-light); border-radius: var(--radius-md); padding: 32px; box-shadow: var(--shadow-md);"': 'semantic-card-primary-light',
    'style="background: var(--card-bg); border-radius: var(--radius-md); padding: 32px; border: 2px solid var(--primary-light); box-shadow: var(--shadow-md);"': 'semantic-card-primary-light',
    'style="background: var(--card-bg); border: 2px solid var(--primary-dark); border-radius: var(--radius-md); padding: 32px; box-shadow: var(--shadow-md);"': 'semantic-card-primary-dark',
    'style="background: linear-gradient(135deg, #ffffff 0%, #f4fbf7 100%); border: 2px solid var(--accent-light); border-radius: var(--radius-md); padding: 32px; box-shadow: var(--shadow-md);"': 'semantic-card-gradient',
    'style="background: var(--warm-bg); border: 1px solid var(--border-color); border-radius: var(--radius-md); padding: 28px;"': 'semantic-card-warm',
    'style="margin-top: 36px; background: var(--card-bg); border: 2px solid var(--primary-light); border-radius: var(--radius-md); padding: 28px; box-shadow: var(--shadow-md);"': 'semantic-card-primary-top'
}

css_classes = """
/* ==========================================================================
   SEMANTIC CARDS (Refactored from inline styles)
   ========================================================================== */
.semantic-card-standard {
    background: var(--card-bg);
    border-radius: var(--radius-md);
    padding: 28px;
    border: 1px solid var(--border-color);
    box-shadow: var(--shadow-sm);
}
.semantic-card-accent {
    background: var(--card-bg);
    border: 2px solid var(--accent);
    border-radius: var(--radius-md);
    padding: 32px;
    box-shadow: var(--shadow-md);
}
.semantic-card-primary-light {
    background: var(--card-bg);
    border: 2px solid var(--primary-light);
    border-radius: var(--radius-md);
    padding: 32px;
    box-shadow: var(--shadow-md);
}
.semantic-card-primary-dark {
    background: var(--card-bg);
    border: 2px solid var(--primary-dark);
    border-radius: var(--radius-md);
    padding: 32px;
    box-shadow: var(--shadow-md);
}
.semantic-card-gradient {
    background: linear-gradient(135deg, var(--card-bg) 0%, var(--warm-bg) 100%);
    border: 2px solid var(--accent-light);
    border-radius: var(--radius-md);
    padding: 32px;
    box-shadow: var(--shadow-md);
}
.semantic-card-warm {
    background: var(--warm-bg);
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    padding: 28px;
}
.semantic-card-primary-top {
    margin-top: 36px;
    background: var(--card-bg);
    border: 2px solid var(--primary-light);
    border-radius: var(--radius-md);
    padding: 28px;
    box-shadow: var(--shadow-md);
}
"""

def extract_styles():
    with open(HTML_FILE, 'r', encoding='utf-8') as f:
        html = f.read()

    # Append CSS classes to styles.css
    with open(CSS_FILE, 'a', encoding='utf-8') as f:
        f.write(css_classes)

    # Replace inline styles in HTML
    # Note: Many divs already have a class attribute.
    # We should carefully inject the class into the existing class="" or create one.
    
    # We will do a generic replacement:
    for inline_style, class_name in mapping.items():
        # Because we can't easily parse without bs4, we just replace the style="" attribute 
        # with class="class_name" (if the element already has a class, it will have two class attributes,
        # which is technically invalid HTML, but browsers handle it by taking the first. Wait!
        # Let's use re.sub to inject into existing class if present, else add class attribute.
        pass

    # A safer string manipulation:
    for inline_style, class_name in mapping.items():
        # Find all occurrences of this style
        # e.g., <div class="something" style="...">
        html = html.replace(inline_style, f'data-semantic="{class_name}"')
        
    # Now merge data-semantic into class
    import re
    def merge_classes(match):
        tag = match.group(0)
        # Find data-semantic value
        m = re.search(r'data-semantic="([^"]+)"', tag)
        if m:
            semantic_class = m.group(1)
            # Remove data-semantic
            tag = tag.replace(m.group(0), '')
            # If it already has class="...", inject into it
            class_m = re.search(r'class="([^"]+)"', tag)
            if class_m:
                old_class = class_m.group(1)
                tag = tag.replace(class_m.group(0), f'class="{old_class} {semantic_class}"')
            else:
                tag = tag.replace('>', f' class="{semantic_class}">')
        return tag

    html = re.sub(r'<[^>]+data-semantic="[^>]+>', merge_classes, html)

    with open(HTML_FILE, 'w', encoding='utf-8') as f:
        f.write(html)
        
    print("CSS classes extracted successfully.")

if __name__ == "__main__":
    extract_styles()
