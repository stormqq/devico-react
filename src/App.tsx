import { Navigate, useNavigate } from "react-router-dom";
import "./App.css";
import TodosApp from "./components/TodosApp/TodosApp";
import { AppContainer, AppTitle } from "./styles/AppGeneralStyles";

function App() {
  const tokenExists = localStorage.getItem("accessToken");

  if (!tokenExists) {
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
