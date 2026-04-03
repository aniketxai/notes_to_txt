import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import DarkModeToggle from '../components/DarkModeToggle';
import { useApp } from '../context/AppContext';

const DemoPage = () => {
  const navigate = useNavigate();
  const { addToHistory } = useApp();

  const handleDemo = () => {
    const demoData = {
      fileName: 'demo-handwritten-notes.jpg',
      imagePreview: 'https://images.pexels.com/photos/159618/notebook-paper-pen-book-159618.jpeg?auto=compress&cs=tinysrgb&w=800',
      extractedText: "Introduction to Machine Learning\n\nMachine learning is a subset of artificial intelligence that enables systems to learn and improve from experience without being explicitly programmed. It focuses on developing computer programs that can access data and use it to learn for themselves.\n\nKey Concepts:\n- Supervised Learning: Learning with labeled data\n- Unsupervised Learning: Finding patterns in unlabeled data\n- Neural Networks: Inspired by biological neural networks\n- Deep Learning: Multiple layers of neural networks\n\nApplications:\n1. Image Recognition\n2. Natural Language Processing\n3. Recommendation Systems\n4. Autonomous Vehicles\n5. Medical Diagnosis\n\nConclusion:\nMachine learning continues to revolutionize how we interact with technology and solve complex problems.",
      summary: [
        "Machine learning enables systems to learn from experience autonomously",
        "Covers both supervised and unsupervised learning approaches",
        "Neural networks and deep learning are fundamental concepts",
        "Wide range of applications from image recognition to medical diagnosis",
        "Technology continues to evolve and transform various industries"
      ],
      confidence: 98.2,
      wordCount: 156,
      readabilityScore: 9.1,
      keywords: ['machine learning', 'artificial intelligence', 'neural networks', 'deep learning', 'supervised learning']
    };

    addToHistory(demoData);
    navigate('/processing');
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
            <div className="inline-flex p-4 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 text-white mb-6">
              <Sparkles className="w-12 h-12" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              Try Demo Mode
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              See how our AI extracts text from handwritten notes
            </p>
          </div>

          <Card glass className="mb-8">
            <div className="aspect-video rounded-lg overflow-hidden mb-6 border-2 border-gray-200 dark:border-gray-700">
              <img
                src="https://images.pexels.com/photos/159618/notebook-paper-pen-book-159618.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Sample handwritten notes"
                className="w-full h-full object-cover"
              />
            </div>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              Sample Handwritten Notes
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              This demo uses a sample image of handwritten notes about machine learning.
              Click the button below to see how our AI processes and extracts the text.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg text-center">
                <div className="text-3xl font-bold gradient-text mb-1">98%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Accuracy</div>
              </div>
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg text-center">
                <div className="text-3xl font-bold gradient-text mb-1">156</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Words</div>
              </div>
              <div className="p-4 bg-white dark:bg-gray-800 rounded-lg text-center">
                <div className="text-3xl font-bold gradient-text mb-1">2s</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Processing</div>
              </div>
            </div>

            <Button
              size="lg"
              className="w-full"
              icon={<Sparkles className="w-5 h-5" />}
              onClick={handleDemo}
            >
              Run Demo
            </Button>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card glass className="text-center">
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                High Accuracy
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                98%+ accuracy on clear handwriting
              </p>
            </Card>

            <Card glass className="text-center">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Lightning Fast
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Results in just 2-3 seconds
              </p>
            </Card>

            <Card glass className="text-center">
              <div className="text-4xl mb-3">✨</div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                AI Summary
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Automatic key points extraction
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DemoPage;
