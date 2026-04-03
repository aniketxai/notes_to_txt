import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Brain, Sparkles, Search, CircleCheck as CheckCircle2 } from 'lucide-react';

const ProcessingPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { icon: Brain, text: 'Analyzing image...', color: 'from-blue-500 to-cyan-500' },
    { icon: Sparkles, text: 'Extracting text...', color: 'from-purple-500 to-pink-500' },
    { icon: Search, text: 'Identifying keywords...', color: 'from-orange-500 to-red-500' },
    { icon: CheckCircle2, text: 'Generating summary...', color: 'from-green-500 to-emerald-500' },
  ];

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }
        return prev;
      });
    }, 1200);

    const navigationTimer = setTimeout(() => {
      navigate('/result');
    }, 5000);

    return () => {
      clearInterval(stepInterval);
      clearTimeout(navigationTimer);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen gradient-bg flex items-center justify-center px-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-400/30 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-400/30 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 max-w-2xl w-full text-center">
        <div className="mb-12">
          <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 mb-8 animate-pulse">
            <Brain className="w-16 h-16 text-white animate-pulse" />
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Processing Your Notes
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Our AI is working its magic...
          </p>
        </div>

        <div className="space-y-6 mb-12">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;

            return (
              <div
                key={index}
                className={`
                  glass-card p-6 flex items-center gap-4 transition-all duration-500
                  ${isActive ? 'scale-105 shadow-2xl' : ''}
                  ${isCompleted ? 'opacity-50' : ''}
                `}
              >
                <div
                  className={`
                    flex-shrink-0 w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500
                    ${isActive
                      ? `bg-gradient-to-r ${step.color} text-white scale-110`
                      : isCompleted
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-200 dark:bg-gray-800 text-gray-400'
                    }
                  `}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-7 h-7" />
                  ) : (
                    <Icon className={`w-7 h-7 ${isActive ? 'animate-pulse' : ''}`} />
                  )}
                </div>

                <div className="flex-1 text-left">
                  <p className={`
                    font-semibold transition-colors duration-300
                    ${isActive
                      ? 'text-gray-900 dark:text-white text-lg'
                      : 'text-gray-600 dark:text-gray-400'
                    }
                  `}>
                    {step.text}
                  </p>
                </div>

                {isActive && (
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-primary-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="w-2 h-2 rounded-full bg-primary-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="w-2 h-2 rounded-full bg-primary-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="glass-card p-8">
          <div className="relative h-3 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary-500 to-accent-500 rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            >
              <div className="absolute inset-0 bg-white/30 animate-shimmer" />
            </div>
          </div>

          <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            {Math.round(((currentStep + 1) / steps.length) * 100)}% Complete
          </p>
        </div>

        <p className="mt-8 text-sm text-gray-500 dark:text-gray-500">
          This usually takes just a few seconds
        </p>
      </div>
    </div>
  );
};

export default ProcessingPage;
