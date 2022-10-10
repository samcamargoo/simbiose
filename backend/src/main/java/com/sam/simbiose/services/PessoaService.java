package com.sam.simbiose.services;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.sam.simbiose.dtos.PessoaDto;
import com.sam.simbiose.entities.Pessoa;


public interface PessoaService {

	ResponseEntity<Object> cadastrarPessoa(PessoaDto pessoaDto);
	ResponseEntity<Object> atualizarPessoa(Long id, PessoaDto pessoaDto);
	ResponseEntity<List<Pessoa>> listarPessoas();
	ResponseEntity<Object> deletarPessoa(Long id);
	
}
