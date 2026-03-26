import { useState } from 'react';
import type { Priority } from '../types';

interface Props {
  onAdd: (text: string, priority: Priority) => void;
}

export default function TodoInput({ onAdd }: Props) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');

  function handleAdd() {
    const t = text.trim();
    if (!t) return;
    onAdd(t, priority);
    setText('');
    setPriority('medium');
  }

  return (
    <div className="input-row">
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleAdd()}
        placeholder="添加待办事项..."
      />
      <select value={priority} onChange={e => setPriority(e.target.value as Priority)}>
        <option value="high">高</option>
        <option value="medium">中</option>
        <option value="low">低</option>
      </select>
      <button onClick={handleAdd}>添加</button>
    </div>
  );
}
