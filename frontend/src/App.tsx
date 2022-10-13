import 'react-toastify/dist/ReactToastify.css';

import { Flex } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Sidebar } from './components/Sidebar';
import { Tabela } from './components/Tabela';

function App() {
  return (
    <>
      <Flex>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Tabela />} />
        </Routes>
        <ToastContainer />
      </Flex>
    </>
  );
}

export default App;
