package br.com.edocs.app.unidademedida;

import org.springframework.stereotype.Repository;

import br.com.edocs.arquitetura.repository.GenericJpaRepository;

@Repository
public interface UnidadeMedidaRepository 
        extends GenericJpaRepository<UnidadeMedida, Long>, UnidadeMedidaRepositoryQuery {

}
