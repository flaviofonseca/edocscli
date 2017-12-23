package br.com.edocs.app.unidademedida;

import br.com.edocs.arquitetura.controller.PesquisarGridDTO;
import br.com.edocs.arquitetura.repository.GenericJpaRepositoryImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import javax.persistence.EntityManager;
import java.util.List;
import java.util.Map;

public class UnidadeMedidaRepositoryImpl
        extends GenericJpaRepositoryImpl<UnidadeMedida>
        implements UnidadeMedidaRepositoryQuery {

    @Autowired
    private EntityManager entityManager;

    @Override
    protected EntityManager getEntityManager() {
        return this.entityManager;
    }

    @Override
    public PageImpl<UnidadeMedida> pesquisarPaginado(PesquisarGridDTO pesquisarGridDTO, Pageable pageable) {

        StringBuilder sqlJoin = new StringBuilder("");
        StringBuilder sqlWhere = new StringBuilder("");

        return super.pesquisarPaginado(UnidadeMedida.class,
                                        sqlJoin,
                                        sqlWhere,
                                        pageable,
                                        "unidademedida.id as id");
    }

    @Override
    public List<Map<String, Object>> pesquisarAutoComplete(PesquisarGridDTO pesquisarGridDTO) {
        return super.getListMapAutoComplete(UnidadeMedida.class, pesquisarGridDTO);
    }
}
