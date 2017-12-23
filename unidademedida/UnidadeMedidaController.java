package br.com.edocs.app.unidademedida;

import br.com.edocs.arquitetura.controller.GenericControllerImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("unidadeMedida")
public class UnidadeMedidaController extends GenericControllerImpl<UnidadeMedida> {

	private UnidadeMedidaService unidadeMedidaService;
	
	@Autowired
	public UnidadeMedidaController(UnidadeMedidaService unidadeMedidaService) {
		super();
		this.unidadeMedidaService = unidadeMedidaService;
	}

	@Override
	public UnidadeMedidaService getGenericService() {
		return this.unidadeMedidaService;
	}

}