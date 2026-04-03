# 📝 notes_to_txt

Convert handwritten or digital notes into clean `.txt` files — fast, simple, and scriptable.

---

## ✨ Features

- 📸 Accepts image files (`.jpg`, `.png`) containing handwritten or printed notes
- 📄 Supports PDF and structured text formats
- 🔍 Auto-detects input format — no manual flags needed
- 🧹 Cleans and normalizes extracted text
- 💾 Outputs a clean `.txt` file at your specified path
- 🖥️ Simple CLI interface

---

## 📦 Installation

```bash
git clone https://github.com/aniketxai/notes_to_txt.git
cd notes_to_txt
pip install -r requirements.txt
```

---

## 🚀 Usage

```bash
python notes_to_txt.py --input <path_to_notes> --output <output_file.txt>
```

**Example:**

```bash
python notes_to_txt.py --input my_notes.jpg --output result.txt
```

---

## 🔄 How It Works

```
┌─────────────────────────────────────────────────────────┐
│                        Input Notes                       │
│              (Image / PDF / Structured file)             │
└──────────────────────────┬──────────────────────────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │  Detect Format  │
                  │  Image / PDF /  │
                  │     Text?       │
                  └────────┬────────┘
                           │
              ┌────────────▼────────────┐
              │     Handwritten?        │
              └──────┬─────────┬────────┘
                    Yes        No
                     │          │
              ┌──────▼──┐  ┌───▼────┐
              │   OCR   │  │ Parse  │
              │ Engine  │  │ Text / │
              │         │  │  PDF   │
              └──────┬──┘  └───┬────┘
                     │         │
              ┌──────▼─────────▼──────┐
              │   Post-process Text   │
              │  Clean, normalize,    │
              │    strip noise        │
              └──────────┬────────────┘
                         │
              ┌───────────▼────────────┐
              │   Write output .txt    │
              │  Saved to target path  │
              └────────────────────────┘
```

---

## 🗂️ Project Structure

```
notes_to_txt/
├── notes_to_txt.py       # Main entry point
├── requirements.txt      # Python dependencies
├── utils/
│   ├── ocr.py            # OCR engine logic
│   ├── parser.py         # PDF/text parser
│   └── postprocess.py    # Text cleaning utilities
└── README.md
```

---

## 🛠️ Requirements

- Python 3.8+
- Tesseract OCR (for handwritten/image input)
- See `requirements.txt` for Python dependencies

Install Tesseract:

```bash
# Ubuntu/Debian
sudo apt install tesseract-ocr

# macOS
brew install tesseract
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repo
2. Create your feature branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m 'Add my feature'`
4. Push to the branch: `git push origin feature/my-feature`
5. Open a Pull Request

---

## 📄 License

MIT License — feel free to use and modify.

---

## 👤 Author

**aniketxai** — [GitHub](https://github.com/aniketxai)
