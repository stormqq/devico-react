import { RootState } from "../store";

export const getAllTodosSelector = (state: RootState) => state.todos.todos;
