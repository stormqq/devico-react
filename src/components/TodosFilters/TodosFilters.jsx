import React, { memo, useMemo } from 'react'
import styles from './TodosFilters.module.css'
function TodosFilters({ todos, changeFilter, deleteCompleted}) {
  const totalActive = useMemo(() => {
    return todos.filter((todo) => !todo.completed).length;
  }
  , [todos]);

  const isSomeCompleted = useMemo(() => {
    return todos.some((todo) => todo.completed);
  }
  , [todos]);
  console.log('TodosFilters rendered')
  return (
    <div className={styles.filtersContainer}>
        <span className={styles.totalActive}>{totalActive} items left</span>
        <div className={styles.filtersButtons}>
          <button onClick={() => changeFilter('')}>All</button>
          <button onClick={() => changeFilter('active')}>Active</button>
          <button onClick={() => changeFilter('completed')}>Completed</button>
        </div>
        <button className={`${styles.clearCompleted} ${isSomeCompleted && styles.clearCompletedShow}`} onClick={deleteCompleted}>Clear completed</button>
    </div>
  )
}

export default memo(TodosFilters)