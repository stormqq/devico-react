import ReactDOM from "react-dom";
import App from "./App";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import Login from "./components/Login/Login.tsx";
import Register from "./components/Register/Register.tsx";
import { CssBaseline } from "@mui/material";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/register" />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/todos",
    element: <App />,
  }
]);

ReactDOM.render(
  <Provider store={store}>
    <CssBaseline />
    <RouterProvider router={router} />
  </Provider>,
  document.getElementById("root")
);
