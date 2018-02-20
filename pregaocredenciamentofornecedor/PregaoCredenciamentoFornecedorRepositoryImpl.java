package br.com.edocs.app.pregaocredenciamentofornecedor;

import br.com.edocs.arquitetura.repository.GenericJpaRepositoryImpl;
import br.com.edocs.arquitetura.controller.PesquisarDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Map;

public class PregaoCredenciamentoFornecedorRepositoryImpl
        extends GenericJpaRepositoryImpl<PregaoCredenciamentoFornecedor>
        implements PregaoCredenciamentoFornecedorRepositoryQuery {

    @Autowired
    private EntityManager entityManager;

    @Override
    protected EntityManager getEntityManager() {
        return this.entityManager;
    }

    @Override
    public PageImpl<PregaoCredenciamentoFornecedor> pesquisarPaginado(PesquisarDTO pesquisarGridDTO, Pageable pageable) {

        StringBuilder sqlJoin = new StringBuilder("");
        StringBuilder sqlWhere = new StringBuilder("");

        return super.pesquisarPaginado(PregaoCredenciamentoFornecedor.class,
                                        sqlJoin,
                                        sqlWhere,
                                        pageable,
                                        pesquisarDTO,
                                        null,
                                        "pregaocredenciamentofornecedor.id as id");
    }

    @Override
    public List<Map<String, Object>> pesquisarAutoComplete(PesquisarDTO pesquisarDTO) {
        return super.getListMapAutoComplete(PregaoCredenciamentoFornecedor.class, pesquisarDTO);
    }
}
