import 'react-toastify/dist/ReactToastify.css';

import { Flex } from '@chakra-ui/react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { Dashboard } from './components/Dashboard';
import { Sidebar } from './components/Sidebar';

function App() {
  return (
    <>
      <Flex>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
        <ToastContainer />
      </Flex>
    </>
  );
}

export default App;
