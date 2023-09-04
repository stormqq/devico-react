import { memo, useMemo } from 'react'
import styles from './TodosFilters.module.css'
import { useFilter, useZusTodos } from '../../services/store';
function TodosFilters() {
  const todos = useZusTodos((state) => state.todos);
  const setFilter = useFilter((state) => state.setFilter);
  const deleteCompleted = useZusTodos((state) => state.deleteCompleted);  

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
          <button onClick={() => setFilter('')}>All</button>
          <button onClick={() => setFilter('active')}>Active</button>
          <button onClick={() => setFilter('completed')}>Completed</button>
        </div>
        <button className={`${styles.clearCompleted} ${isSomeCompleted && styles.clearCompletedShow}`} onClick={deleteCompleted}>Clear completed</button>
    </div>
  )
}

export default memo(TodosFilters)