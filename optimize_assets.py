import os
import glob
from PIL import Image
import re

ASSETS_DIR = r"assets\images"
HTML_FILES = ["index.html"]

def convert_images_to_webp():
    total_saved = 0
    image_paths = glob.glob(os.path.join(ASSETS_DIR, "*.jpg")) + glob.glob(os.path.join(ASSETS_DIR, "*.jpeg")) + glob.glob(os.path.join(ASSETS_DIR, "*.png"))
    for img_path in image_paths:
        try:
            # Load image
            img = Image.open(img_path)
            
            # Save as WebP
            base_name = os.path.splitext(img_path)[0]
            webp_path = f"{base_name}.webp"
            
            # Save the image as WebP
            img.save(webp_path, 'webp', quality=75)
            
            orig_size = os.path.getsize(img_path)
            new_size = os.path.getsize(webp_path)
            total_saved += (orig_size - new_size)
            print(f"Converted {os.path.basename(img_path)} -> {os.path.basename(webp_path)} ({(orig_size-new_size)/1024:.2f} KB saved)")
            
            # Optionally remove original to save space
            # os.remove(img_path)
        except Exception as e:
            print(f"Failed to process {img_path}: {e}")
            
    print(f"Total space saved: {total_saved / (1024*1024):.2f} MB")

def update_html():
    for html_file in HTML_FILES:
        with open(html_file, 'r', encoding='utf-8') as f:
            content = f.read()

        # Update extensions
        content = re.sub(r'(src="assets/images/[^"]+)\.(jpg|jpeg|png)(")', r'\1.webp\3', content)

        # Add loading="lazy" decoding="async" where not present
        # Find <img> tags
        def inject_lazy(match):
            img_tag = match.group(0)
            if 'loading="lazy"' not in img_tag:
                img_tag = img_tag.replace('<img ', '<img loading="lazy" decoding="async" ')
            return img_tag

        content = re.sub(r'<img[^>]+>', inject_lazy, content)
        
        with open(html_file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated HTML file: {html_file}")

if __name__ == "__main__":
    print("Starting conversion...")
    convert_images_to_webp()
    update_html()
