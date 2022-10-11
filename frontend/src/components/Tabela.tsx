import {
    Flex,
  Icon,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { Pessoa } from "../models/Pessoa";
import { listarTodasPessoas } from "../services/PessoaService";
import { FaUserEdit, FaTrashAlt } from "react-icons/fa";
export function Tabela() {
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);

  useEffect(() => {
    listarTodasPessoas()
      .then((res) => {
        setPessoas(res.data);
        console.log(pessoas);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
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
                    <Icon as={FaUserEdit} /> <Icon as={FaTrashAlt} />
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
