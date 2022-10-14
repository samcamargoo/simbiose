package com.sam.simbiose.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sam.simbiose.entities.Pessoa;

public interface PessoaRepository extends JpaRepository<Pessoa, Long> {

	boolean existsByEmail(String email);
}
