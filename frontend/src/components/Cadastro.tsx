import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  CloseButton,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { AiOutlineUser } from "react-icons/ai";
import { Pessoa } from "../models/Pessoa";
import InputMask from "react-input-mask";
import { ErrorMessage } from "@hookform/error-message";
import { useState } from "react";
import { cadastrarPessoa } from "../services/PessoaService";

export function Cadastro() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Pessoa>({ criteriaMode: "all" });

  const [isCadastrando, setIsCadastrando] = useState<boolean>(false);
  const [cadastroError, setCadastroError] = useState<boolean>(false);
  const [cadastroSuccess, setCadastroSuccess] = useState<boolean>(false);

  const cadastrar: SubmitHandler<Pessoa> = (data: Pessoa) => {
    setIsCadastrando(true);
    cadastrarPessoa(data)
      .then((res) => {
        setCadastroSuccess(true)
        console.log("pessoa cadastrada");
      })
      .catch((err) => {
        setCadastroError(true);
        console.log("erro ao cadastrar pessoa");
      })
      .finally(() => {
        setIsCadastrando(false);
      });
  };
  return (
    <>
      <Flex
        backgroundColor="rgb(32, 32, 36)"
        height="100vh"
        width="100%"
        justifyContent="center"
        flexDir="column"
        alignItems="center"
      >
        <Flex
          width="300px"
          mt={20}
          height="300px"
          minHeight="300px"
          p={30}
          justifyContent="center"
          alignItems="center"
          flexDir="column"
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
                  required: "Nome é obrigatório",
                })}
              />
            </InputGroup>
            <ErrorMessage
              errors={errors}
              name="nome"
              render={({ messages }) =>
                messages &&
                Object.entries(messages).map(([type, message]) => (
                  <Text fontSize="14px" color="rgb(211, 66, 66)" key={type}>
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
                  required: "Email é obrigatório",
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
                  <Text fontSize="14px" color="rgb(211, 66, 66)" key={type}>
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
                  required: "Data de Nascimento é obrigatório",
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
                  <Text fontSize="14px" color="rgb(211, 66, 66)" key={type}>
                    {message}
                  </Text>
                ))
              }
            />

            <Flex justifyContent="space-between">
              <Button background="red.500" color="white">
                Cancelar
              </Button>
              <Button
                background="rgb(130, 87, 229)"
                type="submit"
                color="white"
                isLoading={isCadastrando}
              >
                Cadastrar
              </Button>
            </Flex>
          </form>
        </Flex>
        <Flex pt={10}>
          {cadastroError ? (
            <Alert status="error">
              <AlertIcon />
              Erro ao cadastrar pessoa, verifique os campos.
            </Alert>
          ) : (
            <></>
          )}

          {cadastroSuccess ? (<Alert status="success">
              <AlertIcon />
              Pessoa cadastrada com sucesso!
            </Alert>) : (<></>)}
        </Flex>
      </Flex>
    </>
  );
}
