import { History, X, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';

const HistorySidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { history, clearHistory, setCurrentNote } = useApp();
  const navigate = useNavigate();

  const handleNoteClick = (note) => {
    setCurrentNote(note);
    navigate('/result');
    setIsOpen(false);
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed left-8 top-8 z-40 glass-card p-3 hover:scale-110 transition-transform duration-300"
        aria-label="View history"
      >
        <History className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed left-0 top-0 h-full w-80 glass bg-white/95 dark:bg-gray-900/95 z-50 p-6 shadow-2xl overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">History</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {history.length === 0 ? (
              <div className="text-center py-12">
                <History className="w-12 h-12 mx-auto text-gray-400 mb-3" />
                <p className="text-gray-500 dark:text-gray-400">No notes yet</p>
              </div>
            ) : (
              <>
                <div className="space-y-3 mb-4">
                  {history.map((note) => (
                    <div
                      key={note.id}
                      onClick={() => handleNoteClick(note)}
                      className="p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 cursor-pointer hover:shadow-md transition-shadow"
                    >
                      <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 mb-1">
                        {note.extractedText?.substring(0, 60)}...
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {formatDate(note.timestamp)}
                      </p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={clearHistory}
                  className="w-full flex items-center justify-center gap-2 p-3 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear History
                </button>
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default HistorySidebar;
