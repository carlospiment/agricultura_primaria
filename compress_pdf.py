import fitz
import os

PDF_PATH = r"assets\pdf\Plantas_Ornamentales.pdf"
OUT_PATH = r"assets\pdf\Plantas_Ornamentales_Optimized.pdf"

def compress_pdf():
    if not os.path.exists(PDF_PATH):
        print(f"File not found: {PDF_PATH}")
        return
        
    print(f"Original size: {os.path.getsize(PDF_PATH) / (1024*1024):.2f} MB")
    try:
        doc = fitz.open(PDF_PATH)
        doc.save(OUT_PATH, garbage=4, deflate=True, clean=True)
        print(f"Optimized size: {os.path.getsize(OUT_PATH) / (1024*1024):.2f} MB")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    compress_pdf()
