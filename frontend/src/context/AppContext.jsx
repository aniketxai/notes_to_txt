import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('notesHistory');
    return saved ? JSON.parse(saved) : [];
  });

  const [currentNote, setCurrentNote] = useState(null);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('notesHistory', JSON.stringify(history));
  }, [history]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  const addToHistory = (note) => {
    const newNote = {
      ...note,
      id: Date.now(),
      timestamp: new Date().toISOString(),
    };
    setHistory([newNote, ...history.slice(0, 9)]);
    setCurrentNote(newNote);
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('notesHistory');
  };

  return (
    <AppContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
        history,
        addToHistory,
        clearHistory,
        currentNote,
        setCurrentNote,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
