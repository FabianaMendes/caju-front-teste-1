import Router from "~/router";
import Header from "./components/Header";
import { RegistersProvider } from "./context/RegistersContext";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Header text="Caju Front Teste" />
      <div style={{ marginTop: 64 }}>
        <RegistersProvider>
          <ToastContainer />
          <Router />
        </RegistersProvider>
      </div>
    </>
  );
}

export default App;
