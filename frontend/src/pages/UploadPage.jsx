import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Image as ImageIcon, X, FileImage, ArrowLeft } from 'lucide-react';
import axios from "axios";

import Button from '../components/Button';
import Card from '../components/Card';
import DarkModeToggle from '../components/DarkModeToggle';
import { useApp } from '../context/AppContext';

const UploadPage = () => {
  const navigate = useNavigate();
  const { addToHistory } = useApp();

  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleFileSelect(file);
    }
  };

  const handleFileSelect = (file) => {
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) handleFileSelect(file);
  };

  // 🔥 MAIN FUNCTION (REAL BACKEND CALL)
  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const res = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const extractedText = res.data.text;

      // 🔥 Basic smart summary
      const summary = extractedText
        .split(".")
        .slice(0, 4)
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      const wordCount = extractedText.trim()
        ? extractedText.trim().split(/\s+/).length
        : 0;

      const data = {
        fileName: selectedFile.name,
        imagePreview: preview,
        extractedText,
        summary,
        confidence: 95,
        wordCount,
        readabilityScore: 8.0,
        keywords: extractedText.split(/\s+/).slice(0, 5),
      };

      addToHistory(data);
      navigate('/processing');

    } catch (error) {
      console.error(error);
      alert("Error processing image");
    }

    setIsUploading(false);
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="min-h-screen gradient-bg">
      <div className="fixed top-8 right-8 z-50">
        <DarkModeToggle />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <div className="max-w-4xl w-full">

          <Button
            variant="ghost"
            icon={<ArrowLeft className="w-4 h-4" />}
            onClick={() => navigate('/')}
            className="mb-8"
          >
            Back to Home
          </Button>

          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">Upload Your Notes</h1>
            <p className="text-gray-600">Upload handwritten notes image</p>
          </div>

          {!selectedFile ? (
            <Card>
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className="p-16 text-center border-4 border-dashed cursor-pointer"
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInputChange}
                  className="hidden"
                />

                <Upload className="w-12 h-12 mx-auto mb-4" />

                <h3 className="text-xl font-bold mb-2">
                  {isDragging ? 'Drop here' : 'Upload Image'}
                </h3>

                <p>Click or drag file</p>
              </div>
            </Card>
          ) : (
            <div className="space-y-6">

              <Card>
                <div className="flex gap-4">
                  <img src={preview} alt="preview" className="w-32 h-32 object-cover" />

                  <div className="flex-1">
                    <h3>{selectedFile.name}</h3>
                    <p>{(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>

                    <button onClick={clearSelection}>
                      <X />
                    </button>
                  </div>
                </div>
              </Card>

              <div className="flex gap-4">
                <Button onClick={handleUpload} disabled={isUploading}>
                  {isUploading ? "Extracting Text..." : "Process Image"}
                </Button>

                <Button onClick={clearSelection}>Cancel</Button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default UploadPage;