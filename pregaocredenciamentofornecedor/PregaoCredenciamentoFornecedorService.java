package br.com.edocs.app.pregaocredenciamentofornecedor;

import br.com.edocs.arquitetura.controller.PesquisarGridDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import br.com.edocs.arquitetura.service.GenericServiceImpl;

import java.util.List;
import java.util.Map;

@Service
public class PregaoCredenciamentoFornecedorService extends GenericServiceImpl<PregaoCredenciamentoFornecedor, PesquisarDTO> {

	private PregaoCredenciamentoFornecedorRepository pregaoCredenciamentoFornecedorRepository;
	
	@Autowired
	public PregaoCredenciamentoFornecedorService(PregaoCredenciamentoFornecedorRepository pregaoCredenciamentoFornecedorRepository) {
		super();
		this.pregaoCredenciamentoFornecedorRepository = pregaoCredenciamentoFornecedorRepository;
	}

	@Override
	protected PregaoCredenciamentoFornecedorRepository getGenericJpaRepository() {
		return this.pregaoCredenciamentoFornecedorRepository;
	}

	@Override
	public PageImpl<PregaoCredenciamentoFornecedor> pesquisarPaginado(PesquisarDTO pesquisarDTO, Pageable pageable) {
		return this.pregaoCredenciamentoFornecedorRepository.pesquisarPaginado(pesquisarDTO, pageable);
	}

	@Override
	public List<Map<String, Object>> pesquisarAutoComplete(PesquisarDTO pesquisarDTO) {
		return this.pregaoCredenciamentoFornecedorRepository.pesquisarAutoComplete(pesquisarDTO);
	}
}
