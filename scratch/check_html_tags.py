from html.parser import HTMLParser

class TagChecker(HTMLParser):
    def __init__(self):
        super().__init__()
        self.stack = []
        self.errors = []
        self.void_tags = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'}

    def handle_starttag(self, tag, attrs):
        if tag not in self.void_tags:
            self.stack.append((tag, self.getpos()))

    def handle_endtag(self, tag):
        if tag in self.void_tags:
            return
        if not self.stack:
            self.errors.append(f"Unexpected closing tag </{tag}> at line {self.getpos()[0]}")
            return
        last_tag, pos = self.stack.pop()
        if last_tag != tag:
            self.errors.append(f"Mismatched tag: expected </{last_tag}> (opened at {pos}), found </{tag}> at {self.getpos()}")

with open('index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

# Check the laboratorio block
sub_html = "".join(lines[7565:7760])
checker = TagChecker()
try:
    checker.feed(sub_html)
    print("Tag errors in laboratorio section:", len(checker.errors))
    for err in checker.errors:
        print(err)
except Exception as e:
    print("Parser error:", e)
