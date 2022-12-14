import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { ErrorMessage } from "@hookform/error-message";
import React, { HtmlHTMLAttributes, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  AiOutlineCalendar,
  AiOutlineMail,
  AiOutlineUser,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { toast } from "react-toastify";

import { Pessoa } from "../models/Pessoa";
import { formatarDataParaLocal } from "../services/AuxiliarService";
import {
  cadastrarPessoa,
  verificarEmailPessoa,
} from "../services/PessoaService";

export function NavItems() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Pessoa>({ criteriaMode: "all" });
  const [isCadastrando, setIsCadastrando] = useState<boolean>(false);
  const [emailEmUso, setEmailEmUso] = useState<boolean>(false);
  const [dataInvalida, setDataInvalida] = useState<boolean>(false);

  const cadastrar: SubmitHandler<Pessoa> = (data: Pessoa) => {
    setDataInvalida(false);

    {
      /*Formatar Data MM-DD-YYYY para DD/MM/YYYY */
    }
    data.dataDeNascimento = formatarDataParaLocal(data.dataDeNascimento);

    setIsCadastrando(true);
    cadastrarPessoa(data)
      .then(() => {
        reset();
        onClose();
        toast.success(data.nome + " cadastrado com sucesso", {
          theme: "dark",
          position: "bottom-center",
        });
        window.location.reload();
      })
      .catch(() => {})
      .finally(() => {
        setIsCadastrando(false);
      });
  };

  function verificarEmail(email: string) {
    setEmailEmUso(false);
    {
      /* verificamos se o email contem os caracteres necessarios, se sim então faremos a verificação no backend para checar se o email já está em uso*/
    }

    let pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (pattern.test(email)) {
      verificarEmailPessoa(email)
        .then((res) => {
          setEmailEmUso(false);
          if (res.data) {
            setEmailEmUso(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <>
      {/* Drawer de cadastro de pessoa*/}

      <Drawer isOpen={isOpen} onClose={onClose} placement="right" size="xs">
        <DrawerOverlay />
        <DrawerContent backgroundColor="rgb(32, 32, 36)" color="white">
          <DrawerCloseButton />
          <DrawerHeader>Cadastro de pessoa</DrawerHeader>
          <DrawerBody>
            <form id="cadastro-pessoa" onSubmit={handleSubmit(cadastrar)}>
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
                    pattern: {
                      value:
                      /^(([a-zA-Z\u00C0-\u00FF]{2,})+( [a-zA-Z\u00C0-\u00FF]+)+)$/gm,
                      message: "Insira nome e sobrenome, somente letras e acentos."
                    },
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
                  children={<AiOutlineMail />}
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
                  onBlur={(e) => verificarEmail(e.target.value)}
                />
              </InputGroup>
              {emailEmUso ? (
                <Text fontSize="14px" color="rgb(211, 66, 66)">
                  Email em uso
                </Text>
              ) : null}
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
                  children={<AiOutlineCalendar />}
                />
                <Input
                  id="data-nascimento"
                  max={new Date().toISOString().split("T")[0]}
                  type="date"
                  required
                  placeholder="Data de Nascimento"
                  border="none"
                  color="white"
                  bg="rgb(18, 18, 20)"
                  focusBorderColor="rgb(130, 87, 230)"
                  {...register("dataDeNascimento", {
                    required: "Data de Nascimento é obrigatório",
                  })}
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
              {dataInvalida ? (
                <Text fontSize="14px" color="rgb(211, 66, 66)">
                  Data inválida
                </Text>
              ) : null}
            </form>
          </DrawerBody>
          <DrawerFooter>
            <Button
              onClick={() => {
                reset();
                onClose();
              }}
              colorScheme="red"
              mr={1}
            >
              Cancelar
            </Button>
            <Button
              disabled={emailEmUso}
              type="submit"
              form="cadastro-pessoa"
              background="rgb(130, 87, 229)"
              _hover={{ background: "rgb(120, 87, 195)" }}
              _active={{}}
              isLoading={isCadastrando}
            >
              Salvar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      <Flex flexDir="column" color="white" textTransform="uppercase">
        <Flex
          as={Button}
          color="white"
          _hover={{
            bg: "rgb(130, 87, 229)",
          }}
          variant="ghost"
          bg={[
            "rgb(130, 87, 229)",
            "rgb(130, 87, 229)",
            "rgb(130, 87, 229)",
            "none",
          ]}
          borderRadius="lg"
          height="70px"
          mb={1}
          leftIcon={<AiOutlineUserAdd />}
          onClick={() => {
            reset();
            onOpen();
          }}
        >
          Cadastrar Pessoa
        </Flex>
      </Flex>
    </>
  );
}
