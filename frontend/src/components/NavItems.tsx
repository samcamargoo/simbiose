import { Flex, Link, Icon } from "@chakra-ui/react";
import { AiOutlineUserAdd, AiOutlineSolution } from "react-icons/ai";
import { CgUserList } from "react-icons/cg";
export function NavItems() {
  return (
    <>
      <Flex flexDir="column" color="white">
        <Flex
          justifyContent="space-between"
          _hover={{
            bg: "rgb(130, 87, 229)",
          }}
          borderRadius="lg"
          p={5}
        >
          <Link href="#" _hover={{ textDecoration: "none" }}>
            <Icon mr={4} as={AiOutlineUserAdd} w="5" h="5" />
            Cadastrar Pessoa
          </Link>
        </Flex>

        <Flex
          _hover={{
            bg: "rgb(130, 87, 229)",
          }}
          borderRadius="lg"
          p={5}
        >
          <Link _hover={{ textDecoration: "none" }}>
            <Icon mr={4} as={AiOutlineSolution} w="5" h="5" />
            Ver Pessoas
          </Link>
        </Flex>
      </Flex>
    </>
  );
}
