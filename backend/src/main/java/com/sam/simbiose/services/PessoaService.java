package com.sam.simbiose.services;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.sam.simbiose.dtos.PessoaDto;


public interface PessoaService {

	ResponseEntity<Object> cadastrarPessoa(PessoaDto pessoaDto);
	ResponseEntity<Object> atualizarPessoa(Long id, PessoaDto pessoaDto);
	ResponseEntity<List<PessoaDto>> listarPessoas();
	ResponseEntity<Object> deletarPessoa(Long id);
	ResponseEntity<Object> listarPessoaPorId(Long id);
	
}
