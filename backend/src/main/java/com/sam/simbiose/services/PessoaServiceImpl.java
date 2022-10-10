package com.sam.simbiose.services;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.sam.simbiose.entities.Pessoa;

public class PessoaServiceImpl implements PessoaService{

	@Override
	public ResponseEntity<Object> cadastrarUsuario(Pessoa usuario) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ResponseEntity<Object> atualizarUsuario(Long id, Pessoa usuario) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<ResponseEntity<Pessoa>> listarUsuarios() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ResponseEntity<Object> deletarUsuario(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

}
