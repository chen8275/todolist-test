import type { Todo, Priority } from '../types';
import TodoItem from './TodoItem';

interface Props {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (id: number, text: string) => void;
  onPriorityChange: (id: number, priority: Priority) => void;
}

export default function TodoList({ todos, onToggle, onDelete, onEdit, onPriorityChange }: Props) {
  return (
    <div className="todo-list">
      {todos.length === 0 ? (
        <div className="empty">暂无待办事项</div>
      ) : (
        todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
            onPriorityChange={onPriorityChange}
          />
        ))
      )}
    </div>
  );
}
