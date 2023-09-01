import axios from "axios";

class API {
  constructor() {
    this.url = "http://127.0.0.1:3000/";
  }

  async getTodos() {
    try {
      const response = await axios.get(`${this.url}todos`);
      return response.data;
    } catch (error) {
      return {
        error,
      };
    }
  }

  async addTodo(text) {
    try {
      const response = await axios.post(`${this.url}todos`, { text });
      return response.data;
    } catch (error) {
      return {
        error,
      };
    }
  }

  async deleteTodo(id) {
    try {
      const response = await axios.delete(`${this.url}todos/${id}`);
      return response.data;
    } catch (error) {
      return {
        error,
      };
    }
  }

  async toggleCompleted(id) {
    try {
      const response = await axios.put(`${this.url}todos`, { id });
      return response.data;
    } catch (error) {
      return {
        error,
      };
    }
  }

  async updateText(id, text) {
    try {
      const response = await axios.put(`${this.url}todos`, { id, text });
      return response.data;
    } catch (error) {
      return {
        error,
      };
    }
  }

  async selectAll() {
    try {
      const response = await axios.put(`${this.url}todos/bulk`);
      return response.data;
    } catch (error) {
      return {
        error,
      };
    }
  }

  async deleteCompleted() {
    try {
      const response = await axios.delete(`${this.url}todos/bulk`);
      return response.data;
    } catch (error) {
      return {
        error,
      };
    }
  }
}

export default API;
