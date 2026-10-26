with open('styles.css', 'r', encoding='utf-8') as f:
    content = f.read()

target = """.tab-suelo-btn.active {
  background: var(--primary);
  color: #ffffff;
  border-color: var(--primary);
  box-shadow: 0 2px 6px rgba(27, 67, 50, 0.2);
}

.npk-mini-card.selected {"""

replacement = """.tab-suelo-btn.active {
  background: var(--primary);
  color: #ffffff;
  border-color: var(--primary);
  box-shadow: 0 2px 6px rgba(27, 67, 50, 0.2);
}

.btn-grupo-suelo {
  background: var(--warm-bg);
  border: 1px solid var(--border-color);
  color: var(--text-main);
  padding: 6px 14px;
  border-radius: var(--radius-pill);
  font-size: 0.82rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  font-family: inherit;
}

.btn-grupo-suelo:hover {
  background: #e2ebd9;
  color: var(--primary-dark);
  transform: translateY(-1px);
}

.btn-grupo-suelo.active {
  background: var(--primary);
  color: #ffffff;
  border-color: var(--primary);
  box-shadow: 0 2px 6px rgba(27, 67, 50, 0.25);
}

.elem-suelo-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
}

.elem-suelo-card.selected {
  transform: translateY(-2px);
  box-shadow: 0 5px 14px rgba(0, 0, 0, 0.12);
}

.npk-mini-card.selected {"""

if target in content:
    content = content.replace(target, replacement, 1)
    with open('styles.css', 'w', encoding='utf-8', newline='') as f:
        f.write(content)
    print("styles.css successfully updated!")
else:
    print("Target not found in styles.css!")
