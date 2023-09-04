import { create } from "zustand";
import API from "./api";

const api = new API();

const useZusTodos = create((set) => ({
  todos: [],
  currError: null,

  fetchTodos: async () => {
    const res = await api.getTodos();
    if (res.error) {
      set({ currError: res.error });
    } else {
      set({ todos: res });
    }
  },

  removeError: () => set({ currError: null }),

  addTodo: async (text) => {
    const res = await api.addTodo(text);
    if (res.error) {
      set({ currError: res.error });
    } else {
      set({ todos: res });
    }
  },
  deleteTodo: async (id) => {
    const res = await api.deleteTodo(id);
    if (res.error) {
      set({ currError: res.error });
    } else {
      set({ todos: res });
    }
  },
  toggleCompleted: async (id) => {
    const res = await api.toggleCompleted(id);
    if (res.error) {
      set({ currError: res.error });
    } else {
      set({ todos: res });
    }
  },
  saveEditedTodo: async (id, text) => {
    const res = await api.updateText(id, text);
    if (res.error) {
      set({ currError: res.error });
    } else {
      set({ todos: res });
    }
  },

  selectAll: async () => {
    const res = await api.selectAll();
    if (res.error) {
      set({ currError: res.error });
    } else {
      set({ todos: res });
    }
  },

  deleteCompleted: async () => {
    const res = await api.deleteCompleted();
    if (res.error) {
      set({ currError: res.error });
    } else {
      set({ todos: res });
    }
  },
}));

const useFilter = create((set) => ({
  filter: "",
  setFilter: (newFilter) => set({ filter: newFilter }),
}));

export { useZusTodos, useFilter };
