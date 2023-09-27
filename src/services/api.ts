import axios from "axios";

axios.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  if (accessToken) {
    config.headers.authorization = `Bearer ${accessToken} ${refreshToken}`;
  }
  return config;
});

class API {
  private url: string;
  constructor() {
    this.url = "http://127.0.0.1:3000/";
  }

  async getTodos() {
    try {
      const response = await axios.get(`${this.url}todos`);
      console.log('API response: ', response.data)
      return response.data;
    } catch (error) {
      return {
        error,
      };
    }
  }

  async addTodo(text: string, uid: string) {
    try {
      console.log('data passed into API: ', text, uid)
      const response = await axios.post(`${this.url}todos`, { text, uid });
      return response.data;
    } catch (error) {
      return {
        error,
      };
    }
  }

  async deleteTodo(_id: string) {
    try {
      const response = await axios.delete(`${this.url}todos/${_id}`);
      return response.data;
    } catch (error) {
      return {
        error,
      };
    }
  }

  async toggleCompleted(id: string) {
    try {
      const response = await axios.put(`${this.url}todos`, { id });
      return response.data;
    } catch (error) {
      return {
        error,
      };
    }
  }

  async updateText(id: string, text?: string, uid?: string) {
    console.log('UPDATE TEXT API: ', id, text, uid)
    try {
      const response = await axios.put(`${this.url}todos`, { id, text, uid });
      return response.data;
    } catch (error) {
      return {
        error,
      };
    }
  }

  async selectAll(uid: string) {
    try {
      const response = await axios.put(`${this.url}todos/bulk`, { uid });
      return response.data;
    } catch (error) {
      return {
        error,
      };
    }
  }

  async deleteCompleted(uid: string) {
    try {
      const response = await axios.delete(`${this.url}todos/bulk/${uid}`);
      return response.data;
    } catch (error) {
      return {
        error,
      };
    }
  }
  
  async registerUser(email: string, login: string, password: string) {
    try {
      const response = await axios.post(`${this.url}auth/register`, { email, login, password });
      return response.data;
    } catch (error) {
      return {
        error,
      };
    }
  }

  async loginUser(login: string, password: string) {
    try {
      console.log('API defailt headers: ', axios.defaults.headers.common["authorization"])
      const response = await axios.post(`${this.url}auth/login`, { login, password });
      return response.data;
    } catch (error) {
      return {
        error,
      };
    }
  }

  async getUserByToken() {
    try {
      const response = await axios.get(`${this.url}auth/user`);
      return response.data;
    } catch (error) {
      return {
        error,
      };
    }
  }
}

export default API;
