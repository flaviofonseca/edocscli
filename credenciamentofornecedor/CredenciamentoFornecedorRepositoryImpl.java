package br.com.edocs.app.credenciamentofornecedor;

import br.com.edocs.arquitetura.controller.PesquisarGridDTO;
import br.com.edocs.arquitetura.repository.GenericJpaRepositoryImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Map;

public class CredenciamentoFornecedorRepositoryImpl
        extends GenericJpaRepositoryImpl<CredenciamentoFornecedor>
        implements CredenciamentoFornecedorRepositoryQuery {

    @Autowired
    private EntityManager entityManager;

    @Override
    protected EntityManager getEntityManager() {
        return this.entityManager;
    }

    @Override
    public PageImpl<CredenciamentoFornecedor> pesquisarPaginado(PesquisarGridDTO pesquisarGridDTO, Pageable pageable) {

        StringBuilder sqlJoin = new StringBuilder("");
        StringBuilder sqlWhere = new StringBuilder("");

        return super.pesquisarPaginado(CredenciamentoFornecedor.class,
                                        sqlJoin,
                                        sqlWhere,
                                        pageable,
                                        "credenciamentofornecedor.id as id");
    }

    @Override
    public List<Map<String, Object>> pesquisarAutoComplete(PesquisarGridDTO pesquisarGridDTO) {
        return super.getListMapAutoComplete(CredenciamentoFornecedor.class, pesquisarGridDTO);
    }
}
