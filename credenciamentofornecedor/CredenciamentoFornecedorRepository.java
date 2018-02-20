package br.com.edocs.app.credenciamentofornecedor;

import org.springframework.stereotype.Repository;

import br.com.edocs.arquitetura.repository.GenericJpaRepository;

@Repository
public interface CredenciamentoFornecedorRepository 
        extends GenericJpaRepository<CredenciamentoFornecedor, Long>, CredenciamentoFornecedorRepositoryQuery {

}
