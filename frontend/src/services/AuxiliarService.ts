export function formatarDataParaLocal(dataDeNascimento: string) {

  const cortandoData = dataDeNascimento.replaceAll("-", "/")
  dataDeNascimento = cortandoData.split("/").reverse().join("/")
  return dataDeNascimento;
}

export function retornarDataPadrao(data: string) {
  const cortandoData = data.replaceAll("/", "-")
  data = cortandoData.split("-").reverse().join("-")
  return data;
}
