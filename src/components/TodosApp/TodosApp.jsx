import styles from "./TodoApp.module.css";
import TodoList from "../TodoList/TodoList";
import NewTodoInput from "../NewTodoInput/NewTodoInput";
import TodosFilters from "../TodosFilters/TodosFilters";
import useTodos from "../../hooks/useTodos";
import { useEffect, useState } from "react";

function TodoApp() {
  const {
    todos,
    setTodos,
    filter,
    handleAddTodo,
    handleDeleteTodo,
    handleToggleCompleted,
    handleSaveEditedTodo,
    handleChangeFilter,
    handleSelectAll,
    handleDeleteCompleted,
    allTodosCompleted,
    currError,
    setCurrError
  } = useTodos();

  
  useEffect(() => {
    if (currError) {;
      const errorTimeout = setTimeout(() => {
        setCurrError(false)
      }, 2000);
      return () => {
        clearTimeout(errorTimeout);
      };
    }
  }
  , [currError]);

  console.log('currError: ', currError)
  
  return (
    <>
    {currError ? <div className={styles.inputErr}>{currError.name}: {currError.message}</div> : null}
    <div className={styles.todosContainer}>
      {todos.length > 0 ? (
        <span
          className={`${styles.selectAll} ${
            allTodosCompleted && styles.selectedAll
          }`}
          onClick={handleSelectAll}
        >
          ❯
        </span>
      ) : null}
      <NewTodoInput addTodo={handleAddTodo} />
      <TodoList
        todos={todos}
        saveEditedTodo={handleSaveEditedTodo}
        currFilter={filter}
        setTodos={setTodos}
        deleteTodo={handleDeleteTodo}
        toggleCompleted={handleToggleCompleted}
      />
      {todos.length > 0 ? (
        <TodosFilters
          todos={todos}
          deleteCompleted={handleDeleteCompleted}
          changeFilter={handleChangeFilter}
        />
      ) : null}
    </div>
    </>
  );
}

export default TodoApp;
