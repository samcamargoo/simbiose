package com.sam.simbiose.dtos;

import java.time.LocalDate;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Past;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.sam.simbiose.entities.Pessoa;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PessoaDto {

	@NotBlank
	private String nome;
	
	@NotBlank
	private String email;
	
	@Past
	@JsonFormat(pattern = "dd/MM/yyyy")
	private LocalDate dataDeNascimento;
	
	public PessoaDto(Pessoa pessoa) {
		this.nome = pessoa.getNome();
		this.email = pessoa.getEmail();
		this.dataDeNascimento = pessoa.getDataDeNascimento();
	}
}
