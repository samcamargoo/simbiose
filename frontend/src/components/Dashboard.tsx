import {
  Flex,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  ModalFooter,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  TableCaption,
  Spinner,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Pessoa } from "../models/Pessoa";
import {
  deletarPessoaPorId,
  editarPessoaPorId,
  listarTodasPessoas,
} from "../services/PessoaService";
import { FaUserEdit, FaTrashAlt, FaWindows } from "react-icons/fa";
import InputMask from "react-input-mask";
import {
  AiOutlineCalendar,
  AiOutlineUser,
  AiOutlineMail,
} from "react-icons/ai";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast, Slide } from "react-toastify";

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
  const { register, handleSubmit, reset } = useForm<Pessoa>();
  const [loadingPessoas, setLoadingPessoas] = useState<boolean>(false);
  const [isDeletando, setIsDeletando] = useState<boolean>(false);

  function deletarPessoa(pessoa?: Pessoa) {
    setIsDeletando(true);
    deletarPessoaPorId(pessoa!.id)
      .then(() => {
        toast.success(pessoa?.nome + " deletado com sucesso", {
          theme: "dark",
          position: "bottom-center",
          autoClose: 1000
        });
        setIsDeletando(false);
        onCloseDelete();
        carregarListaDePessoas();
      })
      .catch(() => {
        console.log("erro ao deletar " + pessoa?.nome);
      }).finally(() => setIsDeletando(false));
  }

  const editarPessoa: SubmitHandler<Pessoa> = (data: Pessoa) => {
    editarPessoaPorId(data.id, data)
      .then(() => {
        onClose();
        toast("Pessoa editada com sucesso!", {
          position: "bottom-center",
          theme: "dark",
          autoClose: 1500,
          transition: Slide,
        });
        carregarListaDePessoas();
      })
      .catch(() => {
        console.log("deu erro");
      });
  };

  function carregarListaDePessoas() {
    setLoadingPessoas(true);
    listarTodasPessoas()
      .then((res) => {
        setPessoas(res.data);
        setLoadingPessoas(false);
      })
      .catch((err) => {});
  }
  useEffect(() => {
    carregarListaDePessoas()
  }, []);
  
  return (
    <>
      <Modal isOpen={isOpenDelete} onClose={onCloseDelete}>
        <ModalOverlay />
        <ModalContent backgroundColor="rgb(32, 32, 36)" color="white">
          <ModalHeader>Tem certeza que deseja excluir?</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            {pessoaParaDeletar?.nome} será excluído após a confirmação, tem certeza que deseja prosseguir?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={1} onClick={onCloseDelete}>
              Cancelar
            </Button>
            <Button
              background="rgb(130, 87, 229)"
              color="white"
              _hover={{ background: "rgb(120, 87, 195)" }}
              _active={{}}
              onClick={() => deletarPessoa(pessoaParaDeletar)}
              isLoading={isDeletando}
            >
              Prosseguir
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
                  type="text"
                  placeholder="Email"
                  bg="rgb(18, 18, 20)"
                  defaultValue={pessoaParaEditar?.email}
                  border="none"
                  focusBorderColor="rgb(130, 87, 230)"
                  {...register("email")}
                />
              </InputGroup>

              <InputGroup mb={2}>
                <InputLeftElement
                  color="rgb(130, 87, 230)"
                  pointerEvents="none"
                  children={<AiOutlineCalendar />}
                />
                <Input
                  as={InputMask}
                  mask="99/99/9999"
                  type="text"
                  bg="rgb(18, 18, 20)"
                  placeholder="Data de Nascimento"
                  defaultValue={pessoaParaEditar?.dataDeNascimento.toString()}
                  border="none"
                  focusBorderColor="rgb(130, 87, 230)"
                  {...register("dataDeNascimento")}
                />
              </InputGroup>
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="red"
                mr={1}
                onClick={() => {
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
                        {pessoa.dataDeNascimento.toString()}
                      </Td>
                      <Td color="#a8a8b3">
                        <Icon
                          color="rgb(130, 87, 230)"
                          mr={1}
                          as={FaUserEdit}
                          cursor="pointer"
                          onClick={() => {
                            reset();
                            setPessoaParaEditar(pessoa);
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
