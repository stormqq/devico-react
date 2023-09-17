import { memo, useMemo } from 'react'
import { setFilter } from '../../redux/features/filterSlice/filterSlice';
import { deleteCompletedTodos } from '../../redux/features/todosSlice/todosThunks';
import { getAllTodosSelector } from '../../redux/selectors/todosSelectors';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { FiltersButton, FiltersButtonClearCompleted, FiltersButtonsContainer, FiltersContainer, FiltersText } from '../../styles/TodosFiltersStyles';

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
    <FiltersContainer>
        <FiltersText>{totalActive} items left</FiltersText>
        <FiltersButtonsContainer>
          <FiltersButton onClick={() => dispatch(setFilter(''))}>All</FiltersButton>
          <FiltersButton onClick={() => dispatch(setFilter('active'))}>Active</FiltersButton>
          <FiltersButton onClick={() => dispatch(setFilter('completed'))}>Completed</FiltersButton>
        </FiltersButtonsContainer>
        <FiltersButtonClearCompleted isSomeCompleted={isSomeCompleted} onClick={() => dispatch(deleteCompletedTodos())}>Clear completed</FiltersButtonClearCompleted>
    </FiltersContainer>
  )
}

export default memo(TodosFilters)