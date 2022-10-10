package com.sam.simbiose.services;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.sam.simbiose.entities.Pessoa;

public interface PessoaService {

	ResponseEntity<Object> cadastrarUsuario(Pessoa usuario);
	ResponseEntity<Object> atualizarUsuario(Long id, Pessoa usuario);
	List<ResponseEntity<Pessoa>> listarUsuarios();
	ResponseEntity<Object> deletarUsuario(Long id);
	
}
