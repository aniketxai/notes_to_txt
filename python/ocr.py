import pytesseract
from PIL import Image
import os
import sys

# (Optional for Mac if needed)
# pytesseract.pytesseract.tesseract_cmd = "/opt/homebrew/bin/tesseract"

base_dir = os.path.dirname(__file__)
default_image_path = os.path.join(base_dir, "assets", "image.jpeg")
image_path = sys.argv[1] if len(sys.argv) > 1 else default_image_path

img = Image.open(image_path)

text = pytesseract.image_to_string(img)

print("Extracted Text:\n")
print(text)