import Router from "~/router";
import Header from "./components/Header";
import { RegistersProvider } from "./context/RegistersContext";
import { ToastContainer } from "react-toastify";
import * as S from './App.styles'

function App() {
  return (
    <>
      <Header text="Caju Front Teste" />
      <S.Body>
        <RegistersProvider>
          <ToastContainer />
          <Router />
        </RegistersProvider>
      </S.Body>
    </>
  );
}

export default App;
