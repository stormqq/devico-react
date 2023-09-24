import { Navigate, useNavigate } from "react-router-dom";
import "./App.css";
import TodosApp from "./components/TodosApp/TodosApp";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { AppContainer, AppTitle } from "./styles/AppGeneralStyles";
import { useEffect } from "react";
import { getUserByToken } from "./redux/features/authSlice/authThunks";

// login req
// user: id: uuid, email, pass

// access token, refresh token, jwt


// mui tables
 
function App() {

  if (localStorage.getItem("accessToken") === null) {
    return <Navigate to="/" />;
  } else {
  return (
    <AppContainer>
      <AppTitle>todos</AppTitle>
      <TodosApp />
    </AppContainer>
  );
  }
}

export default App;
