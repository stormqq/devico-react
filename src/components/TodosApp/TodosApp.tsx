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
import { getUserByToken } from "../../redux/features/authSlice/authThunks";

function TodoApp() {
  const dispatch = useAppDispatch();
  const todos = useAppSelector(getAllTodosSelector);
  const currError = useAppSelector(getCurrErrorSellector);
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    const fetchData = async () => {
      if (!user) {
      await dispatch(getUserByToken());
      }
      await dispatch(fetchTodos());
    };
    fetchData();
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
      {user ? (
      <TodosContainer>
        {todos.length > 0 ? (
          <SelectAllButton allTodosCompleted={allTodosCompleted}
            onClick={() => dispatch(selectAll(user.uid))}
          >
            ❯
          </SelectAllButton>
        ) : null}
        <NewTodoInput />
        <TodoList />
        {todos.length > 0 ? <TodosFilters /> : null}
      </TodosContainer>
      ) : null}
    </>
  );
}

export default TodoApp;
