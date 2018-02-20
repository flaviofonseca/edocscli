package br.com.edocs.app.credenciamentofornecedor;

import br.com.edocs.arquitetura.controller.GenericControllerImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("credenciamentoFornecedor")
public class CredenciamentoFornecedorController extends GenericControllerImpl<CredenciamentoFornecedor> {

	private CredenciamentoFornecedorService credenciamentoFornecedorService;
	
	@Autowired
	public CredenciamentoFornecedorController(CredenciamentoFornecedorService credenciamentoFornecedorService) {
		super();
		this.credenciamentoFornecedorService = credenciamentoFornecedorService;
	}

	@Override
	public CredenciamentoFornecedorService getGenericService() {
		return this.credenciamentoFornecedorService;
	}

}