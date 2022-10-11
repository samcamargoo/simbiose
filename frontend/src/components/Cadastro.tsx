import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { AiOutlineUser } from "react-icons/ai";

export function Cadastro() {
  const { register, handleSubmit } = useForm();

  return (
    <>
      <Flex
        backgroundColor="rgb(32, 32, 36)"
        height="100vh"
        width="100%"
        justifyContent="center"
      >
        <Flex
          width="300px"
          mt={20}
          height="300px"
          p={30}
          justifyContent="center"
          alignItems="center"
        >
          <form>
            <InputGroup mb={2}>
              <InputLeftElement
                color="rgb(130, 87, 230)"
                pointerEvents="none"
                children={<AiOutlineUser />}
              />
              <Input
                type="text"
                placeholder="Nome"
                border="none"
                color="white"
                bg="rgb(18, 18, 20)"
                focusBorderColor="rgb(130, 87, 230)"
              />
            </InputGroup>

            <InputGroup mb={2}>
              <InputLeftElement
                color="rgb(130, 87, 230)"
                pointerEvents="none"
                children={<AiOutlineUser />}
              />
              <Input
                type="text"
                placeholder="Email"
                border="none"
                color="white"
                bg="rgb(18, 18, 20)"
                focusBorderColor="rgb(130, 87, 230)"
              />
            </InputGroup>

            <InputGroup mb={2}>
              <InputLeftElement
                color="rgb(130, 87, 230)"
                pointerEvents="none"
                children={<AiOutlineUser />}
              />
              <Input
                type="text"
                placeholder="Data de Nascimento"
                border="none"
                color="white"
                bg="rgb(18, 18, 20)"
                focusBorderColor="rgb(130, 87, 230)"
              />
            </InputGroup>
            <Flex justifyContent="space-between">
              <Button background="red.500" color="white">Cancelar</Button>
              <Button background="rgb(130, 87, 229)" type="submit" color="white">Cadastrar</Button>
            </Flex>
          </form>
        </Flex>
      </Flex>
    </>
  );
}
