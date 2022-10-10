package com.sam.simbiose.services;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.sam.simbiose.entities.Pessoa;


public interface PessoaService {

	ResponseEntity<Object> cadastrarPessoa(Pessoa pessoa);
	ResponseEntity<Object> atualizarPessoa(Long id, Pessoa pessoa);
	ResponseEntity<List<Pessoa>> listarPessoas();
	ResponseEntity<Object> deletarPessoa(Long id);
	
}
