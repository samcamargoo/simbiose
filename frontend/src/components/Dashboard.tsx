import '../assets/styles.css'
import {
  Button,
  Flex,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { ErrorMessage } from "@hookform/error-message";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  AiOutlineCalendar,
  AiOutlineMail,
  AiOutlineUser,
} from "react-icons/ai";
import { FaTrashAlt, FaUserEdit } from "react-icons/fa";
import { Slide, toast } from "react-toastify";

import { Pessoa } from "../models/Pessoa";
import { formatarDataParaLocal, retornarDataPadrao } from "../services/AuxiliarService";
import {
  deletarPessoaPorId,
  editarPessoaPorId,
  listarTodasPessoas,
} from "../services/PessoaService";

export function Dashboard() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const [pessoaParaDeletar, setPessoaParaDeletar] = useState<Pessoa>();
  const [pessoaParaEditar, setPessoaParaEditar] = useState<Pessoa>();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Pessoa>({ criteriaMode: "all" });
  const [loadingPessoas, setLoadingPessoas] = useState<boolean>(false);
  const [isDeletando, setIsDeletando] = useState<boolean>(false);
  const [emailEmUso, setEmailEmUso] = useState<boolean>(false);
  const [isEditando, setIsEditando] = useState<boolean>(false);
  const [emailEmUsoMessage, setEmailEmUsoMessage] = useState<string>("");

  const [dataInvalida, setDataInvalida] = useState<boolean>(false);

  function deletarPessoa(pessoa?: Pessoa) {
    setIsDeletando(true);
    deletarPessoaPorId(pessoa!.id)
      .then(() => {
        toast.success(pessoa?.nome + " deletado com sucesso", {
          theme: "dark",
          position: "bottom-center",
          autoClose: 1000,
        });
        setIsDeletando(false);
        onCloseDelete();
        carregarListaDePessoas();
      })
      .catch((err) => {})
      .finally(() => setIsDeletando(false));
  }

  const editarPessoa: SubmitHandler<Pessoa> = (data: Pessoa) => {
    setEmailEmUso(false);
    data.dataDeNascimento = formatarDataParaLocal(data.dataDeNascimento);

    setIsEditando(true);
    editarPessoaPorId(data.id, data)
      .then(() => {
        setIsEditando(false);
        onClose();
        toast.success("Pessoa editada com sucesso!", {
          position: "bottom-center",
          theme: "dark",
          autoClose: 1500,
          transition: Slide,
        });
        carregarListaDePessoas();
      })
      .catch((err) => {
        setIsEditando(false);

        setEmailEmUso(true);
        setEmailEmUsoMessage(err.response.data);
      });
  };

  

  function carregarListaDePessoas() {
    setLoadingPessoas(true);
    listarTodasPessoas()
      .then((res) => {
        setPessoas(res.data);
        setLoadingPessoas(false);
      })
      .catch(() => {
        console.log("erro ao carregar pessoas");
        setLoadingPessoas(false);
      });
  }
  useEffect(() => {
    carregarListaDePessoas();
  }, []);

  return (
    <>
      <Modal isOpen={isOpenDelete} onClose={onCloseDelete}>
        <ModalOverlay />
        <ModalContent backgroundColor="rgb(32, 32, 36)" color="white">
          <ModalHeader>Tem certeza que deseja excluir?</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            {pessoaParaDeletar?.nome} será excluído após a confirmação, tem
            certeza que deseja prosseguir?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={1} onClick={onCloseDelete}>
              Não
            </Button>
            <Button
              background="rgb(130, 87, 229)"
              color="white"
              _hover={{ background: "rgb(120, 87, 195)" }}
              _active={{}}
              onClick={() => deletarPessoa(pessoaParaDeletar)}
              isLoading={isDeletando}
            >
              Sim
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Modal de edição de pessoa */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent backgroundColor="rgb(32, 32, 36)" color="white">
          <ModalHeader>Editar Pessoa</ModalHeader>
          <ModalCloseButton />

          <form onSubmit={handleSubmit(editarPessoa)}>
            <ModalBody>
              <Input
                hidden
                defaultValue={pessoaParaEditar?.id}
                {...register("id")}
              />

              <InputGroup mb={2}>
                <InputLeftElement
                  color="rgb(130, 87, 230)"
                  pointerEvents="none"
                  children={<AiOutlineUser />}
                ></InputLeftElement>

                <Input
                  type="text"
                  placeholder="Nome"
                  bg="rgb(18, 18, 20)"
                  defaultValue={pessoaParaEditar?.nome}
                  border="none"
                  focusBorderColor="rgb(130, 87, 230)"
                  {...register("nome")}
                />
              </InputGroup>

              <InputGroup mb={2}>
                <InputLeftElement
                  color="rgb(130, 87, 230)"
                  pointerEvents="none"
                  children={<AiOutlineMail />}
                />
                <Input
                  id="email"
                  type="text"
                  placeholder="Email"
                  bg="rgb(18, 18, 20)"
                  defaultValue={pessoaParaEditar?.email}
                  border="none"
                  focusBorderColor="rgb(130, 87, 230)"
                  {...register("email", {
                    required: "Email obrigatório",
                    pattern: {
                      value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                      message: "Email inválido",
                    },
                  })}
                />
              </InputGroup>
              {emailEmUso ? (
                <Text fontSize="14px" color="rgb(211, 66, 66)">
                  {emailEmUsoMessage}
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
                  type="date"
                  max={new Date().toISOString().split("T")[0]}
                  bg="rgb(18, 18, 20)"
                  placeholder="Data de Nascimento"
                  defaultValue={pessoaParaEditar?.dataDeNascimento}
                  border="none"
                  focusBorderColor="rgb(130, 87, 230)"
                  {...register("dataDeNascimento", {
                    required: "Data de Nascimento obrigatório",
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
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="red"
                mr={1}
                onClick={() => {
                  setEmailEmUso(false);
                  onClose();
                }}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                _hover={{}}
                _active={{}}
                color="white"
                background="rgb(130, 87, 230)"
                isLoading={isEditando}
              >
                Editar
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>

      <Flex
        width="100%"
        height="100%"
        minHeight="100vh"
        justifyContent="center"
        alignItems="center"
        backgroundColor="rgb(32, 32, 36)"
        flexDir="column"
        p={5}
      >
        {loadingPessoas ? (
          <Spinner color="white" />
        ) : (
          <>
            <TableContainer color="white">
              <Table size="sm">
                <TableCaption>
                  {pessoas.length + " pessoas cadastradas"}
                </TableCaption>
                <Thead>
                  <Tr>
                    <Th color="white">Nome</Th>
                    <Th color="white">Email</Th>
                    <Th color="white">Data de Nascimento</Th>
                    <Th color="white">Ações</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {pessoas.map((pessoa) => (
                    <Tr>
                      <Td color="#a8a8b3">{pessoa.nome}</Td>
                      <Td color="#a8a8b3">{pessoa.email}</Td>
                      <Td color="#a8a8b3">
                        {pessoa.dataDeNascimento}
                      </Td>
                      <Td color="#a8a8b3">
                        <Icon
                          color="rgb(130, 87, 230)"
                          mr={1}
                          as={FaUserEdit}
                          cursor="pointer"
                          onClick={() => {
                            setEmailEmUso(false);
                            setDataInvalida(false);
                            reset();
                            const pessoaParaEditar: Pessoa = {
                              id: pessoa.id,
                              nome: pessoa.nome,
                              email: pessoa.email,
                              dataDeNascimento: retornarDataPadrao(pessoa.dataDeNascimento)
                            }
                            setPessoaParaEditar(pessoaParaEditar);
                            onOpen();
                          }}
                        />
                        <Icon
                          color="rgb(211, 66, 66)"
                          as={FaTrashAlt}
                          cursor="pointer"
                          onClick={() => {
                            setPessoaParaDeletar(pessoa);
                            onOpenDelete();
                          }}
                        />
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </>
        )}
      </Flex>
    </>
  );
}
