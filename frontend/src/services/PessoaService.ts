import axios from "axios";
import { AiOutlineException } from "react-icons/ai";
import { Pessoa } from "../models/Pessoa";

const API_URL = "http://localhost:8080/api/v1/"
const VERIFICAR_EMAIL_URL = "http://localhost:8080/api/v1/verificar-email"

export function cadastrarPessoa (pessoa: Pessoa) {
    return axios.post(API_URL + "pessoa", pessoa)
}

export function listarTodasPessoas() {
    return axios.get(API_URL + "pessoas")
}

export function deletarPessoaPorId(id: number) {
    return axios.delete(API_URL + "pessoa/" + id)
}

export function editarPessoaPorId(id: number, pessoa: Pessoa) {
    return axios.put(API_URL  + "pessoa/" + id, pessoa)
}

export function verificarEmailPessoa(email: string) {
    return axios.get(VERIFICAR_EMAIL_URL + "?email=" + email)
}