package com.sam.simbiose.controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sam.simbiose.entities.Pessoa;
import com.sam.simbiose.services.PessoaService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("api/v1")
@AllArgsConstructor
public class PessoaController {
	
	private PessoaService pessoaService;
	
	@GetMapping("/pessoas")
	public List<ResponseEntity<Pessoa>> listarPessoas() {
		return null;
	}

	@PostMapping("/pessoa")
	public ResponseEntity<Object> cadastrarPessoa(@RequestBody @Valid Pessoa pessoa) {
		return pessoaService.cadastrarPessoa(pessoa);
	}
}
