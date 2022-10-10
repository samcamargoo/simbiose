package com.sam.simbiose.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.BeanUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.sam.simbiose.dtos.PessoaDto;
import com.sam.simbiose.entities.Pessoa;
import com.sam.simbiose.repositories.PessoaRepository;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class PessoaServiceImpl implements PessoaService {

	private final PessoaRepository pessoaRepository;

	@Override
	@Transactional
	public ResponseEntity<Object> cadastrarPessoa(PessoaDto pessoaDto) {
		var pessoa = new Pessoa();
		BeanUtils.copyProperties(pessoaDto, pessoa);
		pessoaRepository.save(pessoa);
		return ResponseEntity.status(HttpStatus.CREATED).body(pessoaDto);
	}

	@Override
	@Transactional
	public ResponseEntity<Object> atualizarPessoa(Long id, PessoaDto pessoaDto) {

		Optional<Pessoa> pessoaOptional = pessoaRepository.findById(id);
		
		if(pessoaOptional.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Pessoa não encontrada");
		}
		
		
		BeanUtils.copyProperties(pessoaDto, pessoaOptional.get());
		pessoaRepository.save(pessoaOptional.get());
		return ResponseEntity.status(HttpStatus.OK).body("Pessoa atualizada com sucesso!");
	}

	@Override
	public ResponseEntity<List<PessoaDto>> listarPessoas() {
		List<Pessoa> pessoas = pessoaRepository.findAll();
		List<PessoaDto> pessoasDto = pessoas.stream().map(pessoa -> new PessoaDto(pessoa)).collect(Collectors.toList());
		return ResponseEntity.status(HttpStatus.OK).body(pessoasDto);
	}

	@Override
	@Transactional
	public ResponseEntity<Object> deletarPessoa(Long id) {

		Optional<Pessoa> pessoaOptional = pessoaRepository.findById(id);

		if (pessoaOptional.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Pessoa não encontrada");
		}

		pessoaRepository.deleteById(id);
		return ResponseEntity.status(HttpStatus.OK).body("Pessoa deletada com sucesso");
	}

	@Override
	public ResponseEntity<Object> listarPessoaPorId(Long id) {
		
		Optional<Pessoa> pessoaOptional = pessoaRepository.findById(id);
		
		if(pessoaOptional.isEmpty()) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Pessoa com " + id + " não encontrada");
		}
		var pessoaDto = new PessoaDto();
		BeanUtils.copyProperties(pessoaOptional.get(), pessoaDto);
		
		return ResponseEntity.status(HttpStatus.OK).body(pessoaDto);
	}

}
