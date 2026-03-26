import type { Filter } from '../types';
import { useLang } from '../LangContext';

interface Props {
  filter: Filter;
  onFilter: (f: Filter) => void;
}

export default function TodoFilters({ filter, onFilter }: Props) {
  const { t } = useLang();
  const filters: { key: Filter; label: string }[] = [
    { key: 'all', label: t.filters.all },
    { key: 'active', label: t.filters.active },
    { key: 'done', label: t.filters.done },
  ];

  return (
    <div className="filters">
      {filters.map(({ key, label }) => (
        <button
          key={key}
          className={filter === key ? 'active' : ''}
          onClick={() => onFilter(key)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
