import {
  Flex,
  Spacer,
  Heading,
  Text,
  Drawer,
  Icon,
  Link,
} from "@chakra-ui/react";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { NavItems } from "./NavItems";

export function Sidebar() {
  return (
    <>
      <Flex
        minHeight={["100px", "50px", "50px", "100vh"]}
        backgroundColor="rgb(18, 18, 20)"
        width={["100%", "100%", "100%", "280px"]}
        flexDir="column"
        boxShadow="inset  -1px 0 #29292e"
        minWidth={["100%", "100%", "100%", "280px"]}
        p={5}
        justifyContent={[
          "space-around",
          "space-around",
          "space-around",
          "flex-start",
        ]}
        
      >
        <Flex alignItems="center" mb={10} justifyContent="space-between" >
          
            <Heading color="white" mb={2} >
              Logo
            </Heading>
          
          <Flex>
            <Link href="https://www.github.com/samcamargoo" isExternal>
              <Icon as={AiFillGithub} color="white" w="6" h="6" mr={1} />
            </Link>

            <Link href="https://www.linkedin.com/in/samuel-camargo" isExternal>
              <Icon as={AiFillLinkedin} color="white" w="6" h="6" />
            </Link>
          </Flex>
        </Flex>
        <NavItems />
      </Flex>
    </>
  );
}
