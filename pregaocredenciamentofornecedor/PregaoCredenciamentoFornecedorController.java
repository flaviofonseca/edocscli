package br.com.edocs.app.pregaocredenciamentofornecedor;

import br.com.edocs.arquitetura.controller.GenericControllerImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import br.com.edocs.arquitetura.controller.PesquisarDTO;
@RestController
@RequestMapping("pregaoCredenciamentoFornecedor")
public class PregaoCredenciamentoFornecedorController extends GenericControllerImpl<PregaoCredenciamentoFornecedor, PesquisarDTO> {

	private PregaoCredenciamentoFornecedorService pregaoCredenciamentoFornecedorService;
	
	@Autowired
	public PregaoCredenciamentoFornecedorController(PregaoCredenciamentoFornecedorService pregaoCredenciamentoFornecedorService) {
		super();
		this.pregaoCredenciamentoFornecedorService = pregaoCredenciamentoFornecedorService;
	}

	@Override
	public PregaoCredenciamentoFornecedorService getGenericService() {
		return this.pregaoCredenciamentoFornecedorService;
	}

}