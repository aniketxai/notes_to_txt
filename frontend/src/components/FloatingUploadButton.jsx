import { Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FloatingUploadButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/upload')}
      className="fixed bottom-8 right-8 z-40 bg-gradient-to-r from-primary-500 to-accent-500 text-white p-4 rounded-full shadow-2xl hover:shadow-primary-500/50 hover:scale-110 transition-all duration-300 animate-float"
      aria-label="Quick upload"
    >
      <Upload className="w-6 h-6" />
    </button>
  );
};

export default FloatingUploadButton;
