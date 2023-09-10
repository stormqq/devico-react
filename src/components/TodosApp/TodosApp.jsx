import styles from "./TodoApp.module.css";
import TodoList from "../TodoList/TodoList";
import NewTodoInput from "../NewTodoInput/NewTodoInput";
import TodosFilters from "../TodosFilters/TodosFilters";
import { useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodos, selectAll } from "../../redux/features/todosSlice/todosThunks";
import { removeError } from "../../redux/features/todosSlice/todosSlice";
import { getAllTodosSelector } from "../../redux/selectors/todosSelectors";
import { getCurrErrorSellector } from "../../redux/selectors/currErrorSelector";
function TodoApp() {
  const dispatch = useDispatch();
  const todos = useSelector(getAllTodosSelector);
  const currError = useSelector(getCurrErrorSellector);

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
        <div className={styles.inputErr}>
          {currError.name}: {currError.message}
        </div>
      ) : null}
      <div className={styles.todosContainer}>
        {todos.length > 0 ? (
          <span
            className={`${styles.selectAll} ${
              allTodosCompleted && styles.selectedAll
            }`}
            onClick={() => dispatch(selectAll())}
          >
            ❯
          </span>
        ) : null}
        <NewTodoInput />
        <TodoList />
        {todos.length > 0 ? <TodosFilters /> : null}
      </div>
    </>
  );
}

export default TodoApp;
