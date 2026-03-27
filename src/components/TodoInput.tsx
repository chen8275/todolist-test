import { useState } from 'react';

interface Props {
  onAdd: (text: string) => void;
  isLight?: boolean;
}

export default function TodoInput({ onAdd, isLight }: Props) {
  const [text, setText] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const t = text.trim();
    if (!t) return;
    onAdd(t);
    setText('');
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex items-stretch gap-0 rounded-md overflow-hidden ${
        isLight ? 'bg-white border-gray-200' : 'bg-[#001f27] border-cyan-500/10'
      } w-full max-w-xs shadow-2xl border transition-all duration-300`}
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
  );
}
