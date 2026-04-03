const express = require("express");
const multer = require("multer");
const cors = require("cors");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const app = express();
const allowedOrigin = process.env.FRONTEND_ORIGIN || "http://localhost:5173";
app.use(cors({ origin: allowedOrigin }));

const uploadsDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const upload = multer({ dest: uploadsDir });
const ocrScriptPath = path.join(__dirname, "ocr.py");

app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No image file received. Use form field 'image'." });
  }

  const imagePath = path.resolve(req.file.path);

  exec(`python3 "${ocrScriptPath}" "${imagePath}"`, { maxBuffer: 10 * 1024 * 1024 },
  (error, stdout, stderr) => {
    
    if (error) {
      const details = (stderr || error.message || "Unknown OCR error").trim();
      console.error("OCR error:", details);
      return res.status(500).json({ error: "Error processing image", details });
    }

    const output = (stdout || "").trim();
    const jsonMatch = output.match(/\{[\s\S]*\}/);
    const candidate = jsonMatch ? jsonMatch[0] : output;

    try {
      const parsed = JSON.parse(candidate);
      return res.json({
        text: parsed.text || "",
        confidence: Number.isFinite(parsed.confidence) ? parsed.confidence : 0,
      });
    } catch {
      return res.json({ text: output, confidence: 0 });
    }
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));