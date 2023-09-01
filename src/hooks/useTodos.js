import { useState, useCallback, useMemo, useEffect } from "react";
import API from "../services/api";

const api = new API();

function useTodos() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("");
  const [currError, setCurrError] = useState(null);

  useEffect(() => {
    api.getTodos().then((res) => {
      if (res.error) {
        setCurrError(res.error);
      } else {
        setTodos(res);
      }
    });
  }, []);

  const handleAddTodo = useCallback((text) => {
    api.addTodo(text).then((res) => {
      if (res.error) {
        setCurrError(res.error);
      } else {
        setTodos(res);
      }
    });
  }, []);

  const handleDeleteTodo = useCallback((id) => {
    api.deleteTodo(id).then((res) => {
      if (res.error) {
        setCurrError(res.error);
      } else {
        setTodos(res);
      }
    });
  }, []);

  const handleToggleCompleted = useCallback((id) => {
    api.toggleCompleted(id).then((res) => {
      if (res.error) {
        setCurrError(res.error);
      } else {
        setTodos(res);
      }
    });
  }, []);

  const handleSaveEditedTodo = useCallback((id, text) => {
    api.updateText(id, text).then((res) => {
      if (res.error) {
        setCurrError(res.error);
      } else {
        setTodos(res);
      }
    });
  }, []);

  const handleChangeFilter = useCallback((newFilter) => {
    setFilter(newFilter);
  }, []);

  const handleSelectAll = useCallback(() => {
    api.selectAll().then((res) => {
      if (res.error) {
        setCurrError(res.error);
      } else {
        setTodos(res);
      }
    });
  }, [todos]);

  const handleDeleteCompleted = useCallback(() => {
    api.deleteCompleted().then((res) => {
      if (res instanceof Error) {
        setCurrError(res.message);
        console.log("deleteComplError: ", currError);
      }
      setTodos(res);
    });
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
    handleSaveEditedTodo,
    handleChangeFilter,
    handleSelectAll,
    handleDeleteCompleted,
    allTodosCompleted,
    currError,
    setCurrError,
  };
}

export default useTodos;
