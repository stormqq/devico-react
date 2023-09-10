import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/api";

const api = new API();

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const res = await api.getTodos();
  console.log('fetch result from API: ', res)
  return res;
});

export const addTodo = createAsyncThunk("todos/addTodo", async (text) => {
  const res = await api.addTodo(text);
  return res;
});

export const saveEditedTodo = createAsyncThunk(
  "todos/updateTodo",
  async ({ id, text }) => {
    const res = await api.updateText(id, text);
    return res;
  }
);  

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async ({id}) => {
  console.log('passed into delete: ', id)
  const res = await api.deleteTodo(id);
  return res;
});

export const deleteCompletedTodos = createAsyncThunk(
  "todos/deleteCompletedTodos",
  async () => {
    const res = await api.deleteCompleted();
    return res;
  }
);

export const selectAll = createAsyncThunk(
  "todos/selectAll",
  async () => {
    const res = await api.selectAll();
    return res;
  }
);


