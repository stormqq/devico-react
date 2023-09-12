import { memo, useMemo } from 'react';
import TodoItem from '../TodoItem/TodoItem';
import styles from './TodoList.module.css';
import { getAllTodosSelector } from '../../redux/selectors/todosSelectors';
import { getFilterSelector } from '../../redux/selectors/filterSelectors';
import { useAppSelector } from '../../redux/hooks';

function TodoList() {
  const todos = useAppSelector(getAllTodosSelector);
  const currFilter = useAppSelector(getFilterSelector);

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      switch (currFilter) {
        case "completed":
          return todo.completed;
        case "active":
          return !todo.completed;
        default:
          return true;
      }
    });
  }, [todos, currFilter]);
  
    return (
    <ul className={styles.todoList}>
      {filteredTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
        />
      ))}
    </ul>
  );
}

export default memo(TodoList);
