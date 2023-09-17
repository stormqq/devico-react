import styles from "./TodoApp.module.css";
import TodoList from "../TodoList/TodoList";
import NewTodoInput from "../NewTodoInput/NewTodoInput";
import TodosFilters from "../TodosFilters/TodosFilters";
import { useEffect, useMemo } from "react";
import { fetchTodos, selectAll } from "../../redux/features/todosSlice/todosThunks";
import { removeError } from "../../redux/features/todosSlice/todosSlice";
import { getAllTodosSelector } from "../../redux/selectors/todosSelectors";
import { getCurrErrorSellector } from "../../redux/selectors/currErrorSelector";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { CurrError, SelectAllButton, TodosContainer } from "../../styles/TodosAppStyles";

function TodoApp() {

  const dispatch = useAppDispatch();
  const todos = useAppSelector(getAllTodosSelector);
  const currError = useAppSelector(getCurrErrorSellector);
  
  console.log('currError: ', currError)
  useEffect(() => {
    dispatch(fetchTodos());
  }, []);
  
  useEffect(() => {
    if (currError) {
      const errorTimeout = setTimeout(() => {
        dispatch(removeError());
      }, 2000);
      return () => {
        clearTimeout(errorTimeout);
      };
    }
  }, [currError]);

  const allTodosCompleted = useMemo(() => {
    return todos.every((todo) => todo.completed);
  }, [todos]);

  return (
    <>
      {currError ? (
        <CurrError>{currError}</CurrError>
      ) : null}
      <TodosContainer>
        {todos.length > 0 ? (
          <SelectAllButton allTodosCompleted={allTodosCompleted}
            onClick={() => dispatch(selectAll())}
          >
            ❯
          </SelectAllButton>
        ) : null}
        <NewTodoInput />
        <TodoList />
        {todos.length > 0 ? <TodosFilters /> : null}
      </TodosContainer>
    </>
  );
}

export default TodoApp;
