import { memo, useMemo } from 'react'
import styles from './TodosFilters.module.css'
import { setFilter } from '../../redux/features/filterSlice/filterSlice';
import { deleteCompletedTodos } from '../../redux/features/todosSlice/todosThunks';
import { getAllTodosSelector } from '../../redux/selectors/todosSelectors';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

function TodosFilters() {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(getAllTodosSelector);

  const totalActive = useMemo(() => {
    return todos.filter((todo) => !todo.completed).length;
  }
  , [todos]);

  const isSomeCompleted = useMemo(() => {
    return todos.some((todo) => todo.completed);
  }
  , [todos]);
  
  return (
    <div className={styles.filtersContainer}>
        <span className={styles.totalActive}>{totalActive} items left</span>
        <div className={styles.filtersButtons}>
          <button onClick={() => dispatch(setFilter(''))}>All</button>
          <button onClick={() => dispatch(setFilter('active'))}>Active</button>
          <button onClick={() => dispatch(setFilter('completed'))}>Completed</button>
        </div>
        <button className={`${styles.clearCompleted} ${isSomeCompleted && styles.clearCompletedShow}`} onClick={() => dispatch(deleteCompletedTodos())}>Clear completed</button>
    </div>
  )
}

export default memo(TodosFilters)