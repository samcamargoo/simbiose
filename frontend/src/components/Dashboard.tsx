import { useState } from "react";
import { Text } from "@chakra-ui/react";

export function renderizar() {
 
}

export function Dashboard() {
  const [isCadastro, setIsCadastro] = useState<boolean>();
  return <>{isCadastro ? <Text>cadastro</Text> : <Text>dashboard</Text>}</>;
}
