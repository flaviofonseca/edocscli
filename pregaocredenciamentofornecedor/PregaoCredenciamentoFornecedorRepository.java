package br.com.edocs.app.pregaocredenciamentofornecedor;

import org.springframework.stereotype.Repository;

import br.com.edocs.arquitetura.repository.GenericJpaRepository;

@Repository
public interface PregaoCredenciamentoFornecedorRepository 
        extends GenericJpaRepository<PregaoCredenciamentoFornecedor, Long>, PregaoCredenciamentoFornecedorRepositoryQuery {

}
