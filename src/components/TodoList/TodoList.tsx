import { memo, useMemo } from 'react';
import TodoItem from '../TodoItem/TodoItem';
import { getAllTodosSelector } from '../../redux/selectors/todosSelectors';
import { getFilterSelector } from '../../redux/selectors/filterSelectors';
import { useAppSelector } from '../../redux/hooks';
import { List, ListItem } from '@mui/material';
import { TodosList } from '../../styles/TodosListStyles';

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
    <TodosList>
      {filteredTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
        />
      ))}
    </TodosList>
  );
}

export default memo(TodoList);
