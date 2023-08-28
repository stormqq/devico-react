import { useState, useCallback, useMemo, useEffect } from "react";

function useTodos() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (localStorage.getItem("todos")) {
      setTodos(JSON.parse(localStorage.getItem("todos")));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAddTodo = useCallback((text) => {
    setTodos((prevTodos) => [
      ...prevTodos,
      { id: Date.now(), text, completed: false },
    ]);
  }, []);

  const handleDeleteTodo = useCallback((id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  }, []);

  const handleToggleCompleted = useCallback((id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, []);

  const handleChangeFilter = useCallback((newFilter) => {
    setFilter(newFilter);
  }, []);

  const handleSelectAll = useCallback(() => {
    const allTodosCompleted = todos.every((todo) => todo.completed);
    setTodos((prevTodos) =>
      prevTodos.map((todo) => ({ ...todo, completed: !allTodosCompleted }))
    );
  }, [todos]);

  const handleDeleteCompleted = useCallback(() => {
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.completed));
  }, []);

  const allTodosCompleted = useMemo(() => {
    return todos.every((todo) => todo.completed);
  }, [todos]);

  return {
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
  };
}

export default useTodos;
