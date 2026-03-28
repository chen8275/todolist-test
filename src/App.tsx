import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import confetti from 'canvas-confetti';
import { Dog } from 'lucide-react';
import TodoItemComponent from './components/TodoItem';
import TodoInputComponent from './components/TodoInput';
import ArchiveModal, { ArchiveEntry } from './components/ArchiveModal';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const STORAGE_KEY = 'todos-v2';
const ARCHIVE_KEY = 'archive-v1';

function loadTodos(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Todo[]) : [];
  } catch {
    return [];
  }
}

function loadArchive(): ArchiveEntry[] {
  try {
    const raw = localStorage.getItem(ARCHIVE_KEY);
    return raw ? (JSON.parse(raw) as ArchiveEntry[]) : [];
  } catch {
    return [];
  }
}

type Theme = 'black' | 'gray' | 'white';

export default function App() {
  const [theme, setTheme] = useState<Theme>('black');
  const [todos, setTodos] = useState<Todo[]>(loadTodos);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [archive, setArchive] = useState<ArchiveEntry[]>(loadArchive);
  const [showArchive, setShowArchive] = useState(false);

  useEffect(() => { localStorage.setItem(STORAGE_KEY, JSON.stringify(todos)); }, [todos]);
  useEffect(() => { localStorage.setItem(ARCHIVE_KEY, JSON.stringify(archive)); }, [archive]);
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  function addTodo(text: string) {
    setTodos(prev => [{ id: Math.random().toString(36).substr(2, 9), text, completed: false }, ...prev]);
  }

  function toggleTodo(id: string) {
    const todo = todos.find(t => t.id === id);
    if (!todo) return;
    if (!todo.completed) {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ['#06b6d4', '#0891b2', '#ffffff'] });
      const today = new Date();
      const date = `${today.getFullYear()}/${today.getMonth() + 1}/${today.getDate()}`;
      const completedAt = `${String(today.getHours()).padStart(2, '0')}:${String(today.getMinutes()).padStart(2, '0')}:${String(today.getSeconds()).padStart(2, '0')}`;
      setArchive(prev => [...prev, { id: todo.id + '-' + Date.now(), text: todo.text, date, completedAt }]);
    }
    setTodos(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  }

  function deleteTodo(id: string) {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }

  const formatTime = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
  };

  const bgClass = theme === 'black' ? 'bg-[#000d11]' : theme === 'gray' ? 'bg-[#2a2a2a]' : 'bg-[#f0f4f8]';
  const textClass = theme === 'white' ? 'text-gray-700' : 'text-gray-200';
  const titleClass = theme === 'white' ? 'text-gray-900' : theme === 'gray' ? 'text-gray-100' : 'text-white/90';
  const clockClass = theme === 'white' ? 'text-gray-400' : theme === 'gray' ? 'text-gray-500' : 'text-gray-600';
  const isLight = theme === 'white';

  return (
    <div className={`min-h-screen ${bgClass} transition-colors duration-500 flex flex-col items-center pt-24 px-4 font-sans ${textClass}`}>

      {/* Dog icon — fixed top-left */}
      <a href="https://github.com/chen8275/todolist-test" target="_blank" rel="noopener noreferrer" className="fixed top-8 left-12">
        <Dog size={18} className={isLight ? 'text-gray-800' : 'text-white'} style={{ opacity: 0.7 }} />
      </a>

      {/* Theme dots — fixed top-right, order: gray / white / black */}
      <div className="fixed top-8 right-8 flex items-center gap-3">
        <button
          onClick={() => setTheme('gray')}
          className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-110 bg-[#9ca3af] ${
            theme === 'gray' ? 'ring-2 ring-cyan-500 ring-offset-1' : 'opacity-60 hover:opacity-100'
          }`}
        />
        <button
          onClick={() => setTheme('white')}
          className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-110 bg-white border border-gray-200 ${
            theme === 'white' ? 'ring-2 ring-cyan-500 ring-offset-1' : 'opacity-60 hover:opacity-100'
          }`}
        />
        <button
          onClick={() => setTheme('black')}
          className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-110 bg-black border border-gray-700 ${
            theme === 'black' ? 'ring-2 ring-cyan-500 ring-offset-1' : 'opacity-60 hover:opacity-100'
          }`}
        />
      </div>

      <header className="mb-16 text-center w-full flex flex-col items-center">
        <h1 className={`text-4xl md:text-5xl font-light tracking-tight ${titleClass} mb-4 select-none cursor-default transition-colors duration-500`}>
          Just do it.
        </h1>
        <TodoInputComponent onAdd={addTodo} isLight={isLight} />
      </header>

      <main className="w-full max-w-sm flex flex-col items-center">
        <div className={`text-[8px] font-mono ${clockClass} mb-6 tracking-[0.15em] transition-colors duration-500`}>
          {formatTime(currentTime)}
        </div>

        <div className="w-full max-w-[260px] flex flex-col gap-2 mx-auto">
          <AnimatePresence mode="popLayout" initial={false}>
            {todos.map(todo => (
              <TodoItemComponent
                key={todo.id}
                id={todo.id}
                text={todo.text}
                completed={todo.completed}
                onToggle={toggleTodo}
                onDelete={deleteTodo}
                isLight={isLight}
              />
            ))}
          </AnimatePresence>
        </div>

        {todos.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            className="text-gray-400 text-xs mt-12 tracking-widest uppercase"
          >
            A fresh start.
          </motion.p>
        )}
      </main>

      {/* Archive button — fixed bottom-right */}
      <button
        onClick={() => setShowArchive(true)}
        className={`fixed bottom-8 right-8 text-[10px] font-mono tracking-widest uppercase transition-colors duration-300 ${
          isLight ? 'text-gray-400 hover:text-gray-700' : 'text-gray-600 hover:text-gray-400'
        }`}
      >
        归档
      </button>

      <ArchiveModal open={showArchive} onClose={() => setShowArchive(false)} entries={archive} isLight={isLight} />

      {/* Background glow */}
      <div className={`fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] ${isLight ? 'bg-cyan-100/30' : 'bg-cyan-900/5'} blur-[120px] rounded-full -z-10 pointer-events-none transition-colors duration-500`} />
      <div className={`fixed bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] ${isLight ? 'bg-blue-50/20' : 'bg-cyan-950/5'} blur-[150px] rounded-full -z-10 pointer-events-none transition-colors duration-500`} />
    </div>
  );
}
