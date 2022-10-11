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
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Pessoa } from "../models/Pessoa";
import {
  deletarPessoaPorId,
  listarTodasPessoas,
} from "../services/PessoaService";
import { FaUserEdit, FaTrashAlt } from "react-icons/fa";
import InputMask from "react-input-mask";
import { AiOutlineCalendar, AiOutlineUser, AiOutlineMail } from "react-icons/ai";

export function Tabela() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [pessoaParaEditar, setPessoaParaEditar] = useState<Pessoa>();

  function deletarPessoa(pessoa: Pessoa) {
    deletarPessoaPorId(pessoa.id)
      .then(() => {
        console.log(pessoa.nome + " deletado com sucesso!");
      })
      .catch(() => {
        console.log("erro ao deletar " + pessoa.nome);
      });
  }

  useEffect(() => {
    listarTodasPessoas()
      .then((res) => {
        setPessoas(res.data);
      })
      .catch((err) => {});
  }, []);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent backgroundColor="rgb(32, 32, 36)" color="white">
          <ModalHeader>Editar Pessoa</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>
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
              />
              </InputGroup>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={1} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              _hover={{}}
              _active={{}}
              color="white"
              background="rgb(130, 87, 230)"
            >
              Editar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Flex width="100%" justifyContent="center" alignItems="center">
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th>Nome</Th>
                <Th>Email</Th>
                <Th>Data de Nascimento</Th>
                <Th>Ações</Th>
              </Tr>
            </Thead>
            <Tbody>
              {pessoas.map((pessoa) => (
                <Tr>
                  <Td>{pessoa.nome}</Td>
                  <Td>{pessoa.email}</Td>
                  <Td>{pessoa.dataDeNascimento.toString()}</Td>
                  <Td>
                    <Icon
                      as={FaUserEdit}
                      cursor="pointer"
                      onClick={() => {
                        setPessoaParaEditar(pessoa);
                        onOpen();
                      }}
                    />
                    <Icon
                      as={FaTrashAlt}
                      cursor="pointer"
                      onClick={() => {
                        deletarPessoa(pessoa);
                      }}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Flex>
    </>
  );
}
