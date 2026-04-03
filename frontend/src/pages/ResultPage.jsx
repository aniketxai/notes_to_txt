import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Copy, Download, CreditCard as Edit3, Search, FileText, Sparkles, CircleCheck as CheckCircle2, ArrowLeft, TrendingUp, Hash, Target } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import DarkModeToggle from '../components/DarkModeToggle';
import Toast from '../components/Toast';
import { useApp } from '../context/AppContext';

const ResultPage = () => {
  const navigate = useNavigate();
  const { currentNote } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(currentNote?.extractedText || '');
  const [toast, setToast] = useState(null);

  const confidenceValue = Number.isFinite(Number(currentNote?.confidence))
    ? Math.max(0, Math.min(100, Number(currentNote.confidence)))
    : 0;
  const confidenceDisplay = confidenceValue.toFixed(1);

  if (!currentNote) {
    navigate('/upload');
    return null;
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(editedText);
    setToast({ message: 'Copied to clipboard!', type: 'success' });
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([editedText], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'extracted-notes.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    setToast({ message: 'Downloaded successfully!', type: 'success' });
  };

  const highlightText = (text, search) => {
    if (!search.trim()) return text;

    const regex = new RegExp(`(${search})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-300 dark:bg-yellow-600 px-1 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
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

      <div className="relative z-10 min-h-screen px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <Button
            variant="ghost"
            icon={<ArrowLeft className="w-4 h-4" />}
            onClick={() => navigate('/upload')}
            className="mb-8"
          >
            New Upload
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <Card glass>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Extraction Complete
                      </h1>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {currentNote.fileName}
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="glass"
                      size="sm"
                      icon={<Edit3 className="w-4 h-4" />}
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      {isEditing ? 'Done' : 'Edit'}
                    </Button>
                    <Button
                      variant="glass"
                      size="sm"
                      icon={<Copy className="w-4 h-4" />}
                      onClick={handleCopy}
                    >
                      Copy
                    </Button>
                    <Button
                      variant="glass"
                      size="sm"
                      icon={<Download className="w-4 h-4" />}
                      onClick={handleDownload}
                    >
                      Download
                    </Button>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search within text..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>

                {isEditing ? (
                  <textarea
                    value={editedText}
                    onChange={(e) => setEditedText(e.target.value)}
                    className="w-full h-96 p-6 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none resize-none font-mono text-sm leading-relaxed"
                  />
                ) : (
                  <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-300 dark:border-gray-700 min-h-96 max-h-96 overflow-y-auto">
                    <p className="text-gray-900 dark:text-white leading-relaxed whitespace-pre-wrap">
                      {highlightText(editedText, searchTerm)}
                    </p>
                  </div>
                )}
              </Card>

              <Card glass>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    AI Summary
                  </h2>
                </div>

                <div className="space-y-3">
                  {currentNote.summary.map((point, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-white dark:bg-gray-800 rounded-lg">
                      <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {point}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>

              <Card glass>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                    <Target className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                    Keywords
                  </h2>
                </div>

                <div className="flex flex-wrap gap-2">
                  {currentNote.keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-gradient-to-r from-primary-500 to-accent-500 text-white rounded-full text-sm font-medium hover:scale-105 transition-transform cursor-pointer"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </Card>
            </div>

            <div className="space-y-6">
              <Card glass>
                <div className="text-center mb-6">
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white mb-4">
                    <span className="text-xl sm:text-2xl font-bold leading-none">{confidenceDisplay}%</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                    Confidence Score
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    High accuracy extraction
                  </p>
                </div>

                <div className="relative h-3 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-1000"
                    style={{ width: `${confidenceValue}%` }}
                  />
                </div>
              </Card>

              <Card glass>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                    <FileText className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    Statistics
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Hash className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-700 dark:text-gray-300">Word Count</span>
                    </div>
                    <span className="font-bold text-gray-900 dark:text-white">
                      {currentNote.wordCount}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-5 h-5 text-gray-500" />
                      <span className="text-gray-700 dark:text-gray-300">Readability</span>
                    </div>
                    <span className="font-bold text-gray-900 dark:text-white">
                      {currentNote.readabilityScore}/10
                    </span>
                  </div>
                </div>
              </Card>

              <Card glass>
                <h3 className="font-bold text-gray-900 dark:text-white mb-4">
                  Original Image
                </h3>
                <div className="rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                  <img
                    src={currentNote.imagePreview}
                    alt="Original"
                    className="w-full h-auto"
                  />
                </div>
              </Card>

              <Button
                className="w-full"
                size="lg"
                icon={<FileText className="w-5 h-5" />}
                onClick={() => navigate('/upload')}
              >
                Process Another Note
              </Button>
            </div>
          </div>
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default ResultPage;
