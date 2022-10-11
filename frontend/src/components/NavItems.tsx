import { Flex, Link, Icon, Button } from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineUserAdd, AiOutlineSolution } from "react-icons/ai";
import { CgUserList } from "react-icons/cg";
import { Cadastro } from "./Cadastro";
import { Dashboard, renderizar } from "./Dashboard";
import { useNavigate } from "react-router-dom";
import { Link as ReachLink } from "react-router-dom";

export function NavItems() {
  const navigate = useNavigate();

  const [isCadastro, setIsCadastro] = useState<boolean>(false);

  return (
    <>
      <Flex flexDir="column" color="white">
        <Flex
          color="white"
          _hover={{
            bg: "rgb(130, 87, 229)",
          }}
          borderRadius="lg"
          height="70px"
          justifyContent="space-around"
          alignItems="center"
          mb={1}
        >
          <Link
            as={ReachLink}
            to="/cadastrar-pessoa"
            _hover={{
              textDecoration: "none",
            }}
          >
            <Icon as={AiOutlineUserAdd} mr={2} />
            Cadastrar Pessoa
          </Link>
        </Flex>

        <Flex
          color="white"
          _hover={{
            bg: "rgb(130, 87, 229)",
          }}
          borderRadius="lg"
          height="70px"
          justifyContent="space-around"
          alignItems="center"
          mb={1}
        >
          <Link
            as={ReachLink}
            to="/listar-pessoas"
            _hover={{
              textDecoration: "none",
            }}
          >
            <Icon as={AiOutlineSolution} mr={2} />
            Listar Pessoas
          </Link>
        </Flex>
      </Flex>
    </>
  );
}
