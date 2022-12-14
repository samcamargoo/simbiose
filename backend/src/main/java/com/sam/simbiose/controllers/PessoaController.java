package com.sam.simbiose.controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sam.simbiose.dtos.PessoaDto;
import com.sam.simbiose.services.PessoaService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("api/v1")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class PessoaController {
	
	private PessoaService pessoaService;
	
	@GetMapping("/pessoas")
	public ResponseEntity<List<PessoaDto>> listarPessoas() {
		return pessoaService.listarPessoas();
	}

	@PostMapping("/pessoa")
	public ResponseEntity<Object> cadastrarPessoa(@RequestBody @Valid PessoaDto pessoaDto) {
		return pessoaService.cadastrarPessoa(pessoaDto);
	}
	
	@DeleteMapping("/pessoa/{id}")
	public ResponseEntity<Object> deletarPessoa(@PathVariable (value = "id") Long id) {
		return pessoaService.deletarPessoa(id);
	}
	
	@PutMapping("/pessoa/{id}")
	public ResponseEntity<Object> atualizarPessoa(@PathVariable (value = "id") Long id, @RequestBody @Valid PessoaDto pessoaDto) {
		return pessoaService.atualizarPessoa(id, pessoaDto);
	}
	
	@GetMapping("/pessoa/{id}")
	public ResponseEntity<Object> listarPessoaPorId(@PathVariable(value = "id") Long id) {
		return pessoaService.listarPessoaPorId(id);
	}
}
