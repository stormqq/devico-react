import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "./features/todosSlice/todosSlice";
import filterReducer from "./features/filterSlice/filterSlice";

export const store = configureStore({
  reducer: {
    todos: todosReducer,
    filter: filterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
