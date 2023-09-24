import { createAsyncThunk } from "@reduxjs/toolkit";
import API from "../../../services/api";
import { Todo } from "./todosSlice";

const api = new API();

export const fetchTodos = createAsyncThunk<Todo[]>(
  "todos/fetchTodos",
  async () => {
    const res = await api.getTodos();
    console.log("fetch result from API: ", res);
    return res;
  }
);

export const addTodo = createAsyncThunk<
  Todo[],
  {
    text: string;
    uid: string;
  }
>("todos/addTodo", async ({ text, uid }, { rejectWithValue }) => {
  const res = await api.addTodo(text, uid);
  if (res.error) {
    return rejectWithValue(res.error.message);
  }
  return res;
});

export const saveEditedTodo = createAsyncThunk<
  Todo[],
  { id: string; text?: string; uid?: string }
>("todos/updateTodo", async ({ id, text, uid }) => {
  console.log('TODOS CHUNK CHANGE TODO: ', id, text, uid,)
  const res = await api.updateText(id, text, uid);
  return res;
});

export const deleteTodo = createAsyncThunk<
  Todo[],
  {
    id: string;
    uid: string;
  }
>("todos/deleteTodo", async ({ id, uid }, { rejectWithValue }) => {
  console.log("passed into delete: ", id);
  const res = await api.deleteTodo(id, uid);
  if (res.error) {
    return rejectWithValue(res.error.message);
  }
  return res;
});

export const deleteCompletedTodos = createAsyncThunk<Todo[], string>(
  "todos/deleteCompletedTodos",
  async (uid, { rejectWithValue }) => {
    const res = await api.deleteCompleted(uid);
    if (res.error) {
      return rejectWithValue(res.error.message);
    }
    return res;
  }
);

export const selectAll = createAsyncThunk<Todo[], string>(
  "todos/selectAll",
  async (uid, { rejectWithValue }) => {
    const res = await api.selectAll(uid);
    if (res.error) {
      return rejectWithValue(res.error.message);
    }
    return res;
  }
);
