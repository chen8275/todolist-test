import { Check, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';

type Priority = 'red' | 'yellow' | 'green';

const PRIORITY_COLOR: Record<Priority, string> = {
  red: 'bg-red-500',
  yellow: 'bg-yellow-400',
  green: 'bg-green-500',
};

interface Props {
  id: string;
  text: string;
  completed: boolean;
  priority: Priority;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  isLight?: boolean;
}

export default function TodoItem({ id, text, completed, priority, onToggle, onDelete, isLight }: Props) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`flex items-center gap-2 ${
        isLight
          ? 'bg-white/80 hover:bg-white border-gray-200'
          : 'bg-[#001f27] hover:bg-[#002b35] border-cyan-500/10'
      } transition-all duration-300 rounded-full px-4 py-1.5 w-full shadow-sm border group`}
    >
      <span className={`shrink-0 w-2 h-2 rounded-full ${PRIORITY_COLOR[priority]} ${completed ? 'opacity-30' : ''}`} />
      <span className={`flex-1 text-xs font-light tracking-wide ${
        isLight ? 'text-gray-700' : 'text-gray-200'
      } ${completed ? 'line-through opacity-40' : ''}`}>
        {text}
      </span>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onToggle(id)}
          className={`p-1.5 rounded-md transition-all ${
            completed
              ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/20'
              : 'text-gray-500 hover:text-cyan-400 hover:bg-cyan-400/10'
          }`}
        >
          <Check size={16} strokeWidth={2.5} />
        </button>
        <button
          onClick={() => onDelete(id)}
          className="p-1.5 rounded-md text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-colors opacity-40 group-hover:opacity-100"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </motion.div>
  );
}
