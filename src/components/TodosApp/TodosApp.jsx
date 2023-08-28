import styles from "./TodoApp.module.css";
import TodoList from "../TodoList/TodoList";
import NewTodoInput from "../NewTodoInput/NewTodoInput";
import TodosFilters from "../TodosFilters/TodosFilters";
import useTodos from "../../hooks/useTodos";

function TodoApp() {
  const {
    todos,
    setTodos,
    filter,
    handleAddTodo,
    handleDeleteTodo,
    handleToggleCompleted,
    handleChangeFilter,
    handleSelectAll,
    handleDeleteCompleted,
    allTodosCompleted,
  } = useTodos();

  return (
    <main className={styles.todosContainer}>
      {todos.length > 0 && (
        <span
          className={`${styles.selectAll} ${
            allTodosCompleted && styles.selectedAll
          }`}
          onClick={handleSelectAll}
        >
          ❯
        </span>
      )}
      <NewTodoInput addTodo={handleAddTodo} />
      <TodoList
        todos={todos}
        currFilter={filter}
        setTodos={setTodos}
        deleteTodo={handleDeleteTodo}
        toggleCompleted={handleToggleCompleted}
      />
      {todos.length > 0 && (
        <TodosFilters
          todos={todos}
          deleteCompleted={handleDeleteCompleted}
          changeFilter={handleChangeFilter}
        />
      )}
    </main>
  );
}

export default TodoApp;
