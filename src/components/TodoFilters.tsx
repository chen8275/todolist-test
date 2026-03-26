import type { Filter } from '../types';

interface Props {
  filter: Filter;
  onFilter: (f: Filter) => void;
}

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'active', label: '未完成' },
  { key: 'done', label: '已完成' },
];

export default function TodoFilters({ filter, onFilter }: Props) {
  return (
    <div className="filters">
      {FILTERS.map(({ key, label }) => (
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
