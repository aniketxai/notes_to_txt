import pytesseract
from PIL import Image
import sys

# Optional (Mac)
# pytesseract.pytesseract.tesseract_cmd = "/opt/homebrew/bin/tesseract"

image_path = sys.argv[1]

img = Image.open(image_path)
text = pytesseract.image_to_string(img)

print(text)