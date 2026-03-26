import { useState } from 'react';
import type { Priority } from '../types';
import { useLang } from '../LangContext';

interface Props {
  onAdd: (text: string, priority: Priority) => void;
}

export default function TodoInput({ onAdd }: Props) {
  const { t } = useLang();
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');

  function handleAdd() {
    const trimmed = text.trim();
    if (!trimmed) return;
    onAdd(trimmed, priority);
    setText('');
    setPriority('medium');
  }

  return (
    <div className="input-row">
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleAdd()}
        placeholder={t.placeholder}
      />
      <select value={priority} onChange={e => setPriority(e.target.value as Priority)}>
        <option value="high">{t.priority.high}</option>
        <option value="medium">{t.priority.medium}</option>
        <option value="low">{t.priority.low}</option>
      </select>
      <button onClick={handleAdd}>{t.add}</button>
    </div>
  );
}
