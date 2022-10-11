import { Sidebar } from "./components/Sidebar";
import { Flex } from "@chakra-ui/react";
import { Dashboard } from "./components/Dashboard";
import { Routes, Route } from "react-router-dom";
import { Cadastro } from "./components/Cadastro";

function App() {
  return (
    <>
      <Flex>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/cadastrar-pessoa" element={<Cadastro />} />
        </Routes>
      </Flex>
    </>
  );
}

export default App;
