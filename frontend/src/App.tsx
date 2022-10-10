import { Navbar } from "./components/Navbar";
import {Flex} from "@chakra-ui/react";
import { Dashboard } from "./components/Dashboard";

function App() {
  return (
    <>
    <Flex flexDir="column">
    <Navbar />
    <Dashboard />
    </Flex>
    </>
  )
}

export default App;
