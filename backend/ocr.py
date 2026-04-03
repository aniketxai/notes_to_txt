import pytesseract
from PIL import Image
import sys
import json

# Optional (Mac)
# pytesseract.pytesseract.tesseract_cmd = "/opt/homebrew/bin/tesseract"

image_path = sys.argv[1]

img = Image.open(image_path)
text = pytesseract.image_to_string(img)

ocr_data = pytesseract.image_to_data(img, output_type=pytesseract.Output.DICT)
valid_confidences = []

for conf in ocr_data.get("conf", []):
	try:
		value = float(conf)
		if value >= 0:
			valid_confidences.append(value)
	except (ValueError, TypeError):
		continue

confidence = round(sum(valid_confidences) / len(valid_confidences), 2) if valid_confidences else 0.0

print(json.dumps({"text": text, "confidence": confidence}))