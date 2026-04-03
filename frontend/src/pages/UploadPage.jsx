import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, Image as ImageIcon, X, FileImage, ArrowLeft } from 'lucide-react';
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
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setIsUploading(true);

    setTimeout(() => {
      const mockData = {
        fileName: selectedFile.name,
        imagePreview: preview,
        extractedText: "This is a sample extracted text from the handwritten notes. Machine learning algorithms have successfully identified and converted the handwritten content into digital text. The system maintains high accuracy across various handwriting styles and conditions.",
        summary: [
          "Advanced OCR technology successfully processed the image",
          "Text extraction completed with high confidence score",
          "Multiple handwriting styles detected and converted",
          "Key information identified and highlighted"
        ],
        confidence: 96.5,
        wordCount: 142,
        readabilityScore: 8.2,
        keywords: ['machine learning', 'algorithms', 'handwriting', 'conversion', 'accuracy']
      };

      addToHistory(mockData);
      navigate('/processing');
    }, 1000);
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen gradient-bg">
      <div className="fixed top-8 right-8 z-50">
        <DarkModeToggle />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary-400/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent-400/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
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
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              Upload Your Notes
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Drag and drop or click to upload your handwritten notes
            </p>
          </div>

          {!selectedFile ? (
            <Card glass className="p-0 overflow-hidden">
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`
                  relative p-16 text-center cursor-pointer transition-all duration-300
                  ${isDragging
                    ? 'bg-primary-50 dark:bg-primary-950/30 border-4 border-primary-500 border-dashed scale-105'
                    : 'border-4 border-gray-300 dark:border-gray-700 border-dashed hover:border-primary-400 dark:hover:border-primary-500'
                  }
                `}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileInputChange}
                  className="hidden"
                />

                <div className={`transition-all duration-300 ${isDragging ? 'scale-110' : ''}`}>
                  <div className="inline-flex p-6 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 text-white mb-6">
                    <Upload className="w-12 h-12" />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    {isDragging ? 'Drop your file here' : 'Upload Image'}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Drag and drop your image here, or click to browse
                  </p>

                  <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-500 dark:text-gray-500">
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">JPG</span>
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">PNG</span>
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">JPEG</span>
                    <span className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">Max 10MB</span>
                  </div>
                </div>
              </div>
            </Card>
          ) : (
            <div className="space-y-6">
              <Card glass>
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-32 h-32 rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <FileImage className="w-5 h-5 text-primary-500 flex-shrink-0" />
                          <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                            {selectedFile.name}
                          </h3>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>

                      <button
                        onClick={clearSelection}
                        className="flex-shrink-0 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                      >
                        <X className="w-5 h-5 text-gray-500" />
                      </button>
                    </div>

                    <div className="mt-4 p-4 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-200 dark:border-green-800">
                      <p className="text-sm text-green-700 dark:text-green-400 font-medium">
                        File ready for processing
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="flex-1"
                  icon={<ImageIcon className="w-5 h-5" />}
                  onClick={handleUpload}
                  disabled={isUploading}
                >
                  {isUploading ? 'Processing...' : 'Process Image'}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={clearSelection}
                  disabled={isUploading}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card glass className="text-center">
              <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white mb-3">
                <ImageIcon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                High Quality
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Best results with clear, well-lit images
              </p>
            </Card>

            <Card glass className="text-center">
              <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white mb-3">
                <Upload className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Fast Processing
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Get results in seconds, not minutes
              </p>
            </Card>

            <Card glass className="text-center">
              <div className="inline-flex p-3 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 text-white mb-3">
                <FileImage className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Any Format
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Supports JPG, PNG, and other formats
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
