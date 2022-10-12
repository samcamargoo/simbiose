import { Sidebar } from "./components/Sidebar";
import { Flex } from "@chakra-ui/react";
import { Dashboard } from "./components/Dashboard";
import { Routes, Route } from "react-router-dom";
import { Cadastro } from "./components/Cadastro";
import { Tabela } from "./components/Tabela";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Flex>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/cadastrar-pessoa" element={<Cadastro />} />
          <Route path="/listar-pessoas" element={<Tabela />} />
        </Routes>
        <ToastContainer />
      </Flex>
    </>
  );
}

export default App;
