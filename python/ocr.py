import pytesseract
from PIL import Image

# (Optional for Mac if needed)
# pytesseract.pytesseract.tesseract_cmd = "/opt/homebrew/bin/tesseract"

img = Image.open("/Users/aniketxai/Desktop/notes_to_txt/python/assets/image.jpeg")

text = pytesseract.image_to_string(img)

print("Extracted Text:\n")
print(text)