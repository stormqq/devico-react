import { memo, useMemo } from 'react';
import TodoItem from '../TodoItem/TodoItem';
import styles from './TodoList.module.css';

function TodoList({ todos, setTodos, currFilter, deleteTodo, toggleCompleted }) {
  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      if (currFilter === 'completed') {
        return todo.completed;
      } else if (currFilter === 'active') {
        return !todo.completed;
      } else {
        return true;
      }
    });
  }, [todos, currFilter]);
  console.log('TodoList rendered')
  return (
    <ul className={styles.todoList}>
      {filteredTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          setTodos={setTodos}
          deleteTodo={deleteTodo}
          toggleCompleted={toggleCompleted}
        />
      ))}
    </ul>
  );
}

export default memo(TodoList);
