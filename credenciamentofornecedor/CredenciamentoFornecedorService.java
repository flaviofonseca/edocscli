package br.com.edocs.app.credenciamentofornecedor;

import br.com.edocs.arquitetura.controller.PesquisarGridDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import br.com.edocs.arquitetura.service.GenericServiceImpl;

import java.util.List;
import java.util.Map;

@Service
public class CredenciamentoFornecedorService extends GenericServiceImpl<CredenciamentoFornecedor> {

	private CredenciamentoFornecedorRepository credenciamentoFornecedorRepository;
	
	@Autowired
	public CredenciamentoFornecedorService(CredenciamentoFornecedorRepository credenciamentoFornecedorRepository) {
		super();
		this.credenciamentoFornecedorRepository = credenciamentoFornecedorRepository;
	}

	@Override
	protected CredenciamentoFornecedorRepository getGenericJpaRepository() {
		return this.credenciamentoFornecedorRepository;
	}

	@Override
	public PageImpl<CredenciamentoFornecedor> pesquisarPaginado(PesquisarGridDTO pesquisarGridDTO, Pageable pageable) {
		return this.credenciamentoFornecedorRepository.pesquisarPaginado(pesquisarGridDTO, pageable);
	}

	@Override
	public List<Map<String, Object>> pesquisarAutoComplete(PesquisarGridDTO pesquisarGridDTO) {
		return this.credenciamentoFornecedorRepository.pesquisarAutoComplete(pesquisarGridDTO);
	}
}
