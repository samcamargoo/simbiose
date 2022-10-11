import {
  Button,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { AiOutlineUser } from "react-icons/ai";
import { Pessoa } from "../models/Pessoa";
import InputMask from "react-input-mask";
import { ErrorMessage } from "@hookform/error-message";
import { useState } from "react";

export function Cadastro() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Pessoa>({ criteriaMode: "all" });

  const [dataValida, setDataValida] = useState<boolean>(false);

  const cadastrar: SubmitHandler<Pessoa> = (data: Pessoa) => {
    data.dataDeNascimento = new Date(data.dataDeNascimento);
    if (isNaN(data.dataDeNascimento.getTime())) {
      return setDataValida(false);
    }
    setDataValida(true);
    console.log(data.dataDeNascimento);
  };
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
          <form onSubmit={handleSubmit(cadastrar)}>
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
                {...register("nome", {
                  required: 'O campo "Nome" é obrigatório',
                })}
              />
            </InputGroup>
            <ErrorMessage
              errors={errors}
              name="nome"
              render={({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => (
                  <Text fontSize="10px" color="red" key={type}>
                    {message}
                  </Text>
                ))
              }
            />

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
                {...register("email", {
                  required: 'O campo "Email" é obrigatório',
                  pattern: {
                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                    message: "Email inválido",
                  },
                })}
              />
            </InputGroup>
            <ErrorMessage
              errors={errors}
              name="email"
              render={({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => (
                  <Text fontSize="10px" color="red" key={type}>
                    {message}
                  </Text>
                ))
              }
            />

            <InputGroup mb={2}>
              <InputLeftElement
                color="rgb(130, 87, 230)"
                pointerEvents="none"
                children={<AiOutlineUser />}
              />
              <Input
                as={InputMask}
                mask="99/99/9999"
                type="text"
                placeholder="Data de Nascimento"
                border="none"
                color="white"
                bg="rgb(18, 18, 20)"
                focusBorderColor="rgb(130, 87, 230)"
                {...register("dataDeNascimento", {
                  required: 'O campo "Data de Nascimento" é obrigatório',
                })}
                onChange={(e) => {
                  e.target.value.replace("/", "");
                }}
              />
            </InputGroup>
            <ErrorMessage
              errors={errors}
              name="dataDeNascimento"
              render={({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => (
                  <Text fontSize="10px" color="red" key={type}>
                    {message}
                  </Text>
                ))
              }
            />
            {dataValida ? (
              <Text></Text>
            ) : (
              <Text fontSize="10px" color="red">
                Data de Nascimento inválida
              </Text>
            )}
            <Flex justifyContent="space-between">
              <Button background="red.500" color="white">
                Cancelar
              </Button>
              <Button
                background="rgb(130, 87, 229)"
                type="submit"
                color="white"
              >
                Cadastrar
              </Button>
            </Flex>
          </form>
        </Flex>
      </Flex>
    </>
  );
}
