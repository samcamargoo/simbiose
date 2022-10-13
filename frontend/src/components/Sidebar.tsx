import { Flex, Spacer, Heading, Text, Drawer } from "@chakra-ui/react";
import { NavItems } from "./NavItems";

export function Sidebar() {



  return (
    <>


    
      <Flex
        minHeight="100vh"
        backgroundColor="rgb(18, 18, 20)"
        width="280px"
        flexDir="column"
        boxShadow="inset  -1px 0 #29292e"
        minWidth="280px"
        p={5}
        
      >
        <Heading color="white" mb={10}>Logo</Heading>
        <NavItems />
      </Flex>
    </>
  );
}
