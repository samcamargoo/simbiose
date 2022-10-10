package com.sam.simbiose.services;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.sam.simbiose.entities.Usuario;

public class UsuarioServiceImpl implements UsuarioService{

	@Override
	public ResponseEntity<Object> cadastrarUsuario(Usuario usuario) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ResponseEntity<Object> atualizarUsuario(Long id, Usuario usuario) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<ResponseEntity<Usuario>> listarUsuarios() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ResponseEntity<Object> deletarUsuario(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

}
