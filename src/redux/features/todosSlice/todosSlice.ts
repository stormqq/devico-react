import { createSlice } from '@reduxjs/toolkit';
import { fetchTodos, addTodo, saveEditedTodo, deleteTodo, deleteCompletedTodos, selectAll} from './todosThunks';

export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodosState {
  todos: Todo[];
  currError: string | null;
}

const initialState: TodosState = {
  todos: [],
  currError: null,
};

const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    removeError(state) {
      state.currError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        // console.log('action.payload ADD', action.payload)
        state.todos = action.payload;
      })
      .addCase(saveEditedTodo.fulfilled, (state, action) => {
        state.todos = action.payload;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.todos = action.payload;
      })
      .addCase(deleteCompletedTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
      })
      .addCase(selectAll.fulfilled, (state, action) => {
        state.todos = action.payload;
      })
      .addMatcher(
        (action) => action.type.endsWith('/rejected'),
        (state, action) => {
          state.currError = action.payload;
        }
      );
  },
});

export const { removeError } = todoSlice.actions;

export default todoSlice.reducer;