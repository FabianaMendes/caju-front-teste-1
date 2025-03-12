import Router from "~/router";
import Header from "./components/Header";
import { RegistersProvider } from "./context/RegistersContext";

function App() {
  return (
    <>
      <Header text="Caju Front Teste" />
      <div style={{ marginTop: 64 }}>
        <RegistersProvider>
          <Router />
        </RegistersProvider>
      </div>
    </>
  );
}

export default App;
