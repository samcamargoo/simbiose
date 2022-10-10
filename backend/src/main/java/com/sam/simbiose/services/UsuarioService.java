package com.sam.simbiose.services;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.sam.simbiose.entities.Usuario;

public interface UsuarioService {

	ResponseEntity<Object> cadastrarUsuario(Usuario usuario);
	ResponseEntity<Object> atualizarUsuario(Long id, Usuario usuario);
	List<ResponseEntity<Usuario>> listarUsuarios();
	ResponseEntity<Object> deletarUsuario(Long id);
	
}
