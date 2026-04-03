import { useNavigate } from 'react-router-dom';
import { Upload, Search, Sparkles, Zap, Brain, FileText, ArrowRight, CircleCheck as CheckCircle2 } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import DarkModeToggle from '../components/DarkModeToggle';

const LandingPage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'AI-Powered OCR',
      description: 'Advanced machine learning algorithms extract text from any handwriting style with incredible accuracy.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Smart Summaries',
      description: 'Get instant AI-generated summaries and key points from your notes in seconds.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: 'Searchable Notes',
      description: 'Find any word or phrase instantly with powerful search and keyword highlighting.',
      color: 'from-orange-500 to-red-500',
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: 'Export Anywhere',
      description: 'Download as PDF, copy to clipboard, or save to your favorite note-taking app.',
      color: 'from-green-500 to-emerald-500',
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Upload Your Notes',
      description: 'Drag and drop or click to upload images of your handwritten notes',
      icon: <Upload className="w-6 h-6" />,
    },
    {
      number: '02',
      title: 'AI Processing',
      description: 'Our advanced AI analyzes and extracts text with high accuracy',
      icon: <Zap className="w-6 h-6" />,
    },
    {
      number: '03',
      title: 'Get Results',
      description: 'View, search, edit, and export your digitized notes instantly',
      icon: <CheckCircle2 className="w-6 h-6" />,
    },
  ];

  return (
    <div className="min-h-screen gradient-bg">
      <div className="fixed top-8 right-8 z-50">
        <DarkModeToggle />
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-400/30 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent-400/30 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10">
        <section className="min-h-screen flex items-center justify-center px-4 py-20">
          <div className="max-w-6xl mx-auto text-center">
            <div className="inline-block mb-6 px-6 py-2 glass-card">
              <span className="text-sm font-semibold gradient-text">
                Powered by Advanced AI
              </span>
            </div>

            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 dark:text-white mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
              Transform Your
              <span className="block gradient-text animate-gradient">
                Handwritten Notes
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-5 duration-1000" style={{ animationDelay: '200ms' }}>
              Convert handwritten notes to digital text instantly with AI-powered OCR, smart summaries, and powerful search capabilities.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-6 duration-1000" style={{ animationDelay: '400ms' }}>
              <Button
                size="lg"
                icon={<Upload className="w-5 h-5" />}
                onClick={() => navigate('/upload')}
              >
                Upload Notes Now
              </Button>
              <Button
                size="lg"
                variant="glass"
                icon={<Sparkles className="w-5 h-5" />}
                onClick={() => navigate('/demo')}
              >
                Try Demo Mode
              </Button>
            </div>

            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { value: '99.9%', label: 'Accuracy' },
                { value: '<2s', label: 'Processing' },
                { value: '50+', label: 'Languages' },
                { value: '∞', label: 'Usage' },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="animate-in fade-in slide-in-from-bottom duration-1000"
                  style={{ animationDelay: `${600 + index * 100}ms` }}
                >
                  <div className="text-4xl font-bold gradient-text mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                Powerful Features
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Everything you need to digitize and organize your handwritten notes
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  hover
                  glass
                  className="group animate-in fade-in slide-in-from-bottom duration-700"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {feature.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                How It Works
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                Three simple steps to digital notes
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="relative animate-in fade-in slide-in-from-bottom duration-700"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <Card glass className="text-center h-full">
                    <div className="text-6xl font-bold gradient-text mb-4">
                      {step.number}
                    </div>
                    <div className="inline-flex p-4 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 text-white mb-4">
                      {step.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </Card>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="w-8 h-8 text-primary-400" />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button
                size="lg"
                onClick={() => navigate('/upload')}
                icon={<Upload className="w-5 h-5" />}
              >
                Get Started Now
              </Button>
            </div>
          </div>
        </section>

        <footer className="py-12 px-4 border-t border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto text-center">
            <div className="mb-6">
              <h3 className="text-2xl font-bold gradient-text mb-2">
                Smart Notes Converter
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Transform handwriting into digital text with AI
              </p>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              © 2024 Smart Notes Converter. Built with React & Tailwind CSS
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
