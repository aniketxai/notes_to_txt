const express = require("express");
const multer = require("multer");
const cors = require("cors");
const { exec } = require("child_process");
const path = require("path");

const app = express();
app.use(cors());

const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("image"), (req, res) => {
  const imagePath = req.file.path;

  exec(`python3 /Users/aniketxai/Desktop/notes_to_txt/python/ocr.py "${imagePath}"`, 
  (error, stdout, stderr) => {
    
    if (error) {
      console.error(stderr);
      return res.status(500).send("Error processing image");
    }

    res.json({ text: stdout });
  });
});

app.listen(5000, () => console.log("Server running on port 5000"));