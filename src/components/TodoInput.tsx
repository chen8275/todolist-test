import { useState } from 'react';

type Priority = 'red' | 'yellow' | 'green';

interface Props {
  onAdd: (text: string, priority: Priority) => void;
  isLight?: boolean;
}

const PRIORITIES: { value: Priority; color: string; label: string }[] = [
  { value: 'red',    color: 'bg-red-500',    label: '高' },
  { value: 'yellow', color: 'bg-yellow-400', label: '中' },
  { value: 'green',  color: 'bg-green-500',  label: '低' },
];

export default function TodoInput({ onAdd, isLight }: Props) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('green');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const t = text.trim();
    if (!t) return;
    onAdd(t, priority);
    setText('');
  }

  return (
    <div className="flex flex-col items-center gap-2 w-full max-w-xs">
      {/* Priority selector */}
      <div className="flex gap-2">
        {PRIORITIES.map(p => (
          <button
            key={p.value}
            type="button"
            onClick={() => setPriority(p.value)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono tracking-widest transition-all duration-200 border ${
              priority === p.value
                ? isLight
                  ? 'border-gray-400 bg-gray-100 opacity-100'
                  : 'border-white/30 bg-white/10 opacity-100'
                : isLight
                  ? 'border-gray-200 opacity-40 hover:opacity-70'
                  : 'border-white/10 opacity-30 hover:opacity-60'
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${p.color}`} />
            <span className={isLight ? 'text-gray-600' : 'text-gray-300'}>{p.label}</span>
          </button>
        ))}
      </div>

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className={`flex items-stretch gap-0 rounded-md overflow-hidden ${
          isLight ? 'bg-white border-gray-200' : 'bg-[#001f27] border-cyan-500/10'
        } w-full shadow-2xl border transition-all duration-300`}
      >
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Add a task."
          className={`flex-1 px-4 py-2 bg-transparent ${
            isLight ? 'text-gray-800 placeholder:text-gray-400' : 'text-gray-200 placeholder:text-gray-600'
          } outline-none text-xs font-light tracking-wide`}
        />
        <button
          type="submit"
          className={`${
            isLight
              ? 'bg-gray-100 hover:bg-gray-200 text-gray-700 border-l border-gray-200'
              : 'bg-[#002b3a] hover:bg-cyan-600 text-cyan-50 border-l border-cyan-500/10'
          } px-3 text-[10px] font-bold tracking-widest uppercase transition-all active:scale-95`}
        >
          I Got This!
        </button>
      </form>
    </div>
  );
}
