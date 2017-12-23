package br.com.edocs.app.unidademedida;

import br.com.edocs.arquitetura.controller.PesquisarGridDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import br.com.edocs.arquitetura.service.GenericServiceImpl;

import java.util.List;
import java.util.Map;

@Service
public class UnidadeMedidaService extends GenericServiceImpl<UnidadeMedida> {

	private UnidadeMedidaRepository unidadeMedidaRepository;
	
	@Autowired
	public UnidadeMedidaService(UnidadeMedidaRepository unidadeMedidaRepository) {
		super();
		this.unidadeMedidaRepository = unidadeMedidaRepository;
	}

	@Override
	protected UnidadeMedidaRepository getGenericJpaRepository() {
		return this.unidadeMedidaRepository;
	}

	@Override
	public PageImpl<UnidadeMedida> pesquisarPaginado(PesquisarGridDTO pesquisarGridDTO, Pageable pageable) {
		return this.unidadeMedidaRepository.pesquisarPaginado(pesquisarGridDTO, pageable);
	}

	@Override
	public List<Map<String, Object>> pesquisarAutoComplete(PesquisarGridDTO pesquisarGridDTO) {
		return this.unidadeMedidaRepository.pesquisarAutoComplete(pesquisarGridDTO);
	}
}
