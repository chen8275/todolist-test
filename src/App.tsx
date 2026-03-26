import { useState, useEffect } from 'react';
import type { Todo, Filter, Priority } from './types';
import { useLang } from './LangContext';
import TodoInput from './components/TodoInput';
import TodoFilters from './components/TodoFilters';
import TodoList from './components/TodoList';
import TodoFooter from './components/TodoFooter';
import LangSwitcher from './components/LangSwitcher';
import './App.css';

const STORAGE_KEY = 'todos';

function loadTodos(): Todo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Todo[]) : [];
  } catch {
    return [];
  }
}

export default function App() {
  const { t } = useLang();
  const [todos, setTodos] = useState<Todo[]>(loadTodos);
  const [filter, setFilter] = useState<Filter>('all');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  function addTodo(text: string, priority: Priority) {
    setTodos(prev => [...prev, { id: Date.now(), text, done: false, priority }]);
  }

  function toggleTodo(id: number) {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t));
  }

  function deleteTodo(id: number) {
    setTodos(prev => prev.filter(t => t.id !== id));
  }

  function editTodo(id: number, text: string) {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, text } : t));
  }

  function changePriority(id: number, priority: Priority) {
    setTodos(prev => prev.map(t => t.id === id ? { ...t, priority } : t));
  }

  function clearDone() {
    setTodos(prev => prev.filter(t => !t.done));
  }

  const filtered = todos.filter(t => {
    if (filter === 'active') return !t.done;
    if (filter === 'done') return t.done;
    return true;
  });

  const activeCount = todos.filter(t => !t.done).length;
  const doneCount = todos.filter(t => t.done).length;

  return (
    <div className="container">
      <div className="header">
        <h1>{t.title}</h1>
        <LangSwitcher />
      </div>
      <TodoInput onAdd={addTodo} />
      <TodoFilters filter={filter} onFilter={setFilter} />
      <TodoList
        todos={filtered}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
        onEdit={editTodo}
        onPriorityChange={changePriority}
      />
      <TodoFooter activeCount={activeCount} doneCount={doneCount} onClearDone={clearDone} />
    </div>
  );
}
