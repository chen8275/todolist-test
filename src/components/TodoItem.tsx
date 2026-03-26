import { useRef, useState } from 'react';
import type { Todo, Priority } from '../types';

const PRIORITY_LABEL: Record<Priority, string> = {
  high: '高',
  medium: '中',
  low: '低',
};

interface Props {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, text: string) => void;
  onPriorityChange: (id: number, priority: Priority) => void;
}

export default function TodoItem({ todo, onToggle, onDelete, onEdit, onPriorityChange }: Props) {
  const [editing, setEditing] = useState(false);
  const spanRef = useRef<HTMLSpanElement>(null);

  function startEdit() {
    setEditing(true);
    setTimeout(() => {
      const el = spanRef.current;
      if (!el) return;
      el.focus();
      const range = document.createRange();
      range.selectNodeContents(el);
      range.collapse(false);
      const sel = window.getSelection();
      sel?.removeAllRanges();
      sel?.addRange(range);
    }, 0);
  }

  function finishEdit() {
    const el = spanRef.current;
    if (!el) return;
    const newText = el.textContent?.trim() ?? '';
    if (newText) onEdit(todo.id, newText);
    else el.textContent = todo.text;
    setEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLSpanElement>) {
    if (e.key === 'Enter') { e.preventDefault(); finishEdit(); }
    if (e.key === 'Escape') {
      const el = spanRef.current;
      if (el) el.textContent = todo.text;
      setEditing(false);
    }
  }

  return (
    <div className="todo-item">
      <div className={`priority-bar ${todo.priority}`} />
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
      />
      <span
        ref={spanRef}
        className={`todo-text${todo.done ? ' done' : ''}`}
        contentEditable={editing}
        suppressContentEditableWarning
        onBlur={finishEdit}
        onKeyDown={handleKeyDown}
      >
        {todo.text}
      </span>
      <div className="item-actions">
        <select
          value={todo.priority}
          onChange={e => onPriorityChange(todo.id, e.target.value as Priority)}
        >
          {(['high', 'medium', 'low'] as Priority[]).map(p => (
            <option key={p} value={p}>{PRIORITY_LABEL[p]}</option>
          ))}
        </select>
        <button onClick={startEdit} title="编辑">✏️</button>
        <button onClick={() => onDelete(todo.id)} title="删除">🗑️</button>
      </div>
    </div>
  );
}
