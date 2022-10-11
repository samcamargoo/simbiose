import axios from "axios";
import { AiOutlineException } from "react-icons/ai";
import { Pessoa } from "../models/Pessoa";

const API_URL = "http://localhost:8080/api/v1/"

export function cadastrarPessoa (pessoa: Pessoa) {
    return axios.post(API_URL + "pessoa", pessoa)
}

export function listarTodasPessoas() {
    return axios.get(API_URL + "pessoas")
}