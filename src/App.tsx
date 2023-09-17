import { Navigate, useNavigate } from "react-router-dom";
import "./App.css";
import TodosApp from "./components/TodosApp/TodosApp";
import { useAppSelector } from "./redux/hooks";
import { AppContainer, AppTitle } from "./styles/AppGeneralStyles";

// login req
// user: id: uuid, email, pass
 
function App() {
  const isAuthorized = useAppSelector((state) => state.auth.isAuthorized);
  if (!isAuthorized) {
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
