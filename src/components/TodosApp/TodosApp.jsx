import styles from "./TodoApp.module.css";
import TodoList from "../TodoList/TodoList";
import NewTodoInput from "../NewTodoInput/NewTodoInput";
import TodosFilters from "../TodosFilters/TodosFilters";
import { useEffect, useMemo } from "react";
import { useZusTodos } from "../../services/store";

function TodoApp() {
  const { todos, currError, removeError, fetchTodos, selectAll } = useZusTodos(
    (state) => {
      return {
        todos: state.todos,
        currError: state.currError,
        removeError: state.removeError,
        fetchTodos: state.fetchTodos,
        selectAll: state.selectAll,
      };
    }
  );

  useEffect(() => {
    fetchTodos();
  }, []);

  useEffect(() => {
    if (currError) {
      const errorTimeout = setTimeout(() => {
        removeError();
      }, 2000);
      return () => {
        clearTimeout(errorTimeout);
      };
    }
  }, [currError]);

  const allTodosCompleted = useMemo(() => {
    return todos.every((todo) => todo.completed);
  }, [todos]);

  console.log("currError: ", currError);

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
            onClick={selectAll}
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
