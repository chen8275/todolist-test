import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface ArchiveEntry {
  id: string;
  text: string;
  date: string;
  completedAt?: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  entries: ArchiveEntry[];
  isLight: boolean;
}

export type { ArchiveEntry };

function parseDate(dateStr: string) {
  const [y, m, d] = dateStr.split('/').map(Number);
  return { year: y, month: m, day: d };
}

export default function ArchiveModal({ open, onClose, entries, isLight }: Props) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth() + 1);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  // Build set of dates that have entries
  const entryDates = new Set(entries.map(e => e.date));

  // Calendar grid
  const firstDay = new Date(viewYear, viewMonth - 1, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(viewYear, viewMonth, 0).getDate();

  function prevMonth() {
    if (viewMonth === 1) { setViewYear(y => y - 1); setViewMonth(12); }
    else setViewMonth(m => m - 1);
  }
  function nextMonth() {
    if (viewMonth === 12) { setViewYear(y => y + 1); setViewMonth(1); }
    else setViewMonth(m => m + 1);
  }

  function handleDayClick(day: number) {
    const dateStr = `${viewYear}/${viewMonth}/${day}`;
    if (entryDates.has(dateStr)) setSelectedDate(dateStr);
  }

  const selectedEntries = selectedDate ? entries.filter(e => e.date === selectedDate) : [];

  const overlayBg = isLight ? 'bg-black/20' : 'bg-black/60';
  const modalBg = isLight ? 'bg-white' : 'bg-[#0d1a1f]';
  const borderColor = isLight ? 'border-gray-200' : 'border-white/10';
  const titleColor = isLight ? 'text-gray-800' : 'text-white/90';
  const accentColor = isLight ? 'text-cyan-600' : 'text-cyan-500';
  const mutedColor = isLight ? 'text-gray-400' : 'text-gray-600';
  const dayTextColor = isLight ? 'text-gray-700' : 'text-gray-300';
  const closeBtnColor = isLight ? 'text-gray-400 hover:text-gray-700' : 'text-gray-600 hover:text-gray-300';
  const navBtnColor = isLight ? 'text-gray-400 hover:text-gray-700' : 'text-gray-500 hover:text-gray-300';
  const dotColor = isLight ? 'bg-cyan-500' : 'bg-cyan-400';
  const hasDotDayBg = isLight ? 'hover:bg-cyan-50 cursor-pointer' : 'hover:bg-cyan-900/20 cursor-pointer';
  const activeDayBg = isLight ? 'bg-cyan-100 text-cyan-700' : 'bg-cyan-900/40 text-cyan-400';
  const detailBg = isLight ? 'bg-gray-50' : 'bg-[#0a1419]';
  const detailText = isLight ? 'text-gray-600' : 'text-gray-300';

  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`fixed inset-0 ${overlayBg} flex items-center justify-center z-50 px-4`}
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.2 }}
            className={`w-full max-w-sm rounded-2xl border ${borderColor} ${modalBg} p-6 shadow-2xl`}
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <h2 className={`text-sm font-semibold tracking-widest uppercase ${titleColor}`}>归档</h2>
              <button onClick={onClose} className={`${closeBtnColor} transition-colors`}>
                <X size={16} />
              </button>
            </div>

            {/* Month nav */}
            <div className="flex items-center justify-between mb-4">
              <button onClick={prevMonth} className={`${navBtnColor} transition-colors`}>
                <ChevronLeft size={16} />
              </button>
              <span className={`text-xs font-mono tracking-widest ${titleColor}`}>
                {viewYear} / {String(viewMonth).padStart(2, '0')}
              </span>
              <button onClick={nextMonth} className={`${navBtnColor} transition-colors`}>
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Week header */}
            <div className="grid grid-cols-7 mb-1">
              {weekDays.map(d => (
                <div key={d} className={`text-center text-[10px] font-mono ${mutedColor} py-1`}>{d}</div>
              ))}
            </div>

            {/* Day grid */}
            <div className="grid grid-cols-7 gap-y-1">
              {/* empty cells */}
              {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dateStr = `${viewYear}/${viewMonth}/${day}`;
                const hasEntry = entryDates.has(dateStr);
                const isSelected = selectedDate === dateStr;
                const isToday = viewYear === today.getFullYear() && viewMonth === today.getMonth() + 1 && day === today.getDate();
                return (
                  <div
                    key={day}
                    onClick={() => handleDayClick(day)}
                    className={`relative flex flex-col items-center justify-center rounded-lg py-1.5 transition-colors ${
                      isSelected ? activeDayBg : hasEntry ? hasDotDayBg : 'cursor-default'
                    }`}
                  >
                    <span className={`text-[11px] font-mono ${
                      isSelected ? '' : isToday ? accentColor : hasEntry ? dayTextColor : mutedColor
                    }`}>
                      {day}
                    </span>
                    {hasEntry && (
                      <span className={`absolute bottom-0.5 w-1 h-1 rounded-full ${dotColor}`} />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Entry count hint */}
            <p className={`text-[10px] font-mono ${mutedColor} mt-3 text-center tracking-widest`}>
              {entryDates.size > 0 ? `共 ${entries.length} 条记录` : '暂无归档'}
            </p>
          </motion.div>
        </motion.div>
      )}

      {/* Day detail modal */}
      {selectedDate && (
        <motion.div
          key="detail-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`fixed inset-0 bg-black/40 flex items-center justify-center z-[60] px-4`}
          onClick={() => setSelectedDate(null)}
        >
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className={`w-full max-w-xs rounded-2xl border ${borderColor} ${detailBg} p-5 shadow-2xl`}
            onClick={e => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <span className={`text-[10px] font-mono tracking-widest ${accentColor}`}>{selectedDate}</span>
              <button onClick={() => setSelectedDate(null)} className={`${closeBtnColor} transition-colors`}>
                <X size={14} />
              </button>
            </div>
            <ul className="flex flex-col gap-2">
              {selectedEntries.map(entry => (
                <li key={entry.id} className={`text-xs ${detailText} flex items-start gap-2`}>
                  <span className={`mt-0.5 shrink-0 ${accentColor} opacity-70`}>✓</span>
                  <div className="flex flex-col gap-0.5">
                    <span>{entry.text}</span>
                    {entry.completedAt && (
                      <span className={`text-[10px] font-mono ${accentColor} opacity-60`}>{entry.completedAt}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
