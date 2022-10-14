package com.sam.simbiose.controllers;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sam.simbiose.services.PessoaService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("api/v1/verificar-email")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class EmailController {
	
	private final PessoaService pessoaService;
	
	@GetMapping
	public boolean verificarEmail(@RequestParam(value = "email") String email) {
		return pessoaService.existsByEmail(email);
	}
}
