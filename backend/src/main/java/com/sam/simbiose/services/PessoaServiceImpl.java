package com.sam.simbiose.services;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.sam.simbiose.entities.Pessoa;
import com.sam.simbiose.repositories.PessoaRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class PessoaServiceImpl implements PessoaService{

	private final PessoaRepository pessoaRepository;
	
	@Override
	public ResponseEntity<Object> cadastrarPessoa(Pessoa pessoa) {
		
		return ResponseEntity.status(HttpStatus.CREATED).body(pessoaRepository.save(pessoa));
	}

	@Override
	public ResponseEntity<Object> atualizarPessoa(Long id, Pessoa pessoa) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public ResponseEntity<List<Pessoa>> listarPessoas() {
		List<Pessoa> pessoas = pessoaRepository.findAll();
		return ResponseEntity.status(HttpStatus.OK).body(pessoas);
	}

	@Override
	public ResponseEntity<Object> deletarPessoa(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	

}