import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/api";
import { Todo } from "./todosSlice";
// import { Todo } from "../../../types/User";

const api = new API();

export const fetchTodos = createAsyncThunk<Todo[]>("todos/fetchTodos", async () => {
  const res = await api.getTodos();
  console.log('fetch result from API: ', res)
  return res;
});

export const addTodo = createAsyncThunk<Todo[], string>("todos/addTodo", async (text, {rejectWithValue}) => {
  const res = await api.addTodo(text);
  if (res.error) {
    return rejectWithValue(res.error.message);
  }
  return res;
});

export const saveEditedTodo = createAsyncThunk<Todo[], {id: number, text?: string}>(
  "todos/updateTodo",
  async ({ id, text }) => {
    const res = await api.updateText(id, text);
    return res;
  }
);  

export const deleteTodo = createAsyncThunk<Todo[], number>("todos/deleteTodo", async (id, {rejectWithValue}) => {
  console.log('passed into delete: ', id)
  const res = await api.deleteTodo(id);
  if (res.error) {
    return rejectWithValue(res.error.message);
  }
  return res;
});

export const deleteCompletedTodos = createAsyncThunk<Todo[]>(
  "todos/deleteCompletedTodos",
  async (_, { rejectWithValue }) => {
    const res = await api.deleteCompleted();
    if (res.error) {
      return rejectWithValue(res.error.message);
    }
    return res;
  }
);

export const selectAll = createAsyncThunk<Todo[]>(
  "todos/selectAll",
  async (_, {rejectWithValue}) => {
    const res = await api.selectAll();
    if (res.error) {
      return rejectWithValue(res.error.message);
    }
    return res;
  }
);


