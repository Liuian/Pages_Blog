import os
from pathlib import Path
from PIL import Image
import fitz  # PyMuPDF
import re

# 自然排序（像是 1.jpg, 2.jpg, 10.jpg）
def natural_key(s):
    return [int(text) if text.isdigit() else text.lower() for text in re.split(r'(\d+)', s)]

def get_sorted_files(folder):
    files = list(Path(folder).glob("*"))
    files = [f for f in files if f.suffix.lower() in ('.jpg', '.jpeg', '.pdf')]
    files.sort(key=lambda x: natural_key(x.name))
    return files

def convert_images_to_pdfs(files):
    pdf_paths = []
    for file in files:
        if file.suffix.lower() in ('.jpg', '.jpeg'):
            image = Image.open(file).convert("RGB")
            temp_pdf = str(file) + ".temp.pdf"
            image.save(temp_pdf)
            pdf_paths.append(temp_pdf)
        elif file.suffix.lower() == '.pdf':
            pdf_paths.append(str(file))
    return pdf_paths

def merge_pdfs(pdf_paths, output_path="merged_output.pdf"):
    merged_doc = fitz.open()
    for pdf in pdf_paths:
        with fitz.open(pdf) as doc:
            merged_doc.insert_pdf(doc)
    merged_doc.save(output_path)
    print(f"✅ Merged PDF saved to: {output_path}")

def main():
    folder = "C:/Users/ianliu/Documents/Ian_private/cosera-database-and-sql-for-data-science-with-python/"
    files = get_sorted_files(folder)
    print("🔍 Files to merge (sorted):")
    for f in files:
        print(" -", f.name)
    all_pdfs = convert_images_to_pdfs(files)
    if all_pdfs:
        merge_pdfs(all_pdfs)
    else:
        print("⚠️ No valid files found.")
    # 清除暫存 PDF
    for f in all_pdfs:
        if f.endswith(".temp.pdf"):
            os.remove(f)

if __name__ == "__main__":
    main()
