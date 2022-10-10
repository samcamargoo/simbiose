package com.sam.simbiose.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sam.simbiose.entities.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

}
