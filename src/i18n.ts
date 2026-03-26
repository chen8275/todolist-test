export type Lang = 'zh' | 'en';

export const translations = {
  zh: {
    title: '待办事项',
    placeholder: '添加待办事项...',
    add: '添加',
    priority: { high: '高', medium: '中', low: '低' },
    filters: { all: '全部', active: '未完成', done: '已完成' },
    empty: '暂无待办事项',
    itemsLeft: (n: number) => `剩余 ${n} 项未完成`,
    clearDone: (n: number) => `清除已完成 (${n})`,
    edit: '编辑',
    delete: '删除',
  },
  en: {
    title: 'Todo List',
    placeholder: 'Add a todo...',
    add: 'Add',
    priority: { high: 'High', medium: 'Medium', low: 'Low' },
    filters: { all: 'All', active: 'Active', done: 'Done' },
    empty: 'No todos',
    itemsLeft: (n: number) => `${n} item${n !== 1 ? 's' : ''} left`,
    clearDone: (n: number) => `Clear done (${n})`,
    edit: 'Edit',
    delete: 'Delete',
  },
} as const;

export type Translations = {
  title: string;
  placeholder: string;
  add: string;
  priority: { high: string; medium: string; low: string };
  filters: { all: string; active: string; done: string };
  empty: string;
  itemsLeft: (n: number) => string;
  clearDone: (n: number) => string;
  edit: string;
  delete: string;
};
