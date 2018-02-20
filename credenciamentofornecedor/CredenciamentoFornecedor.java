package br.com.edocs.app.credenciamentofornecedor;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import br.com.edocs.arquitetura.model.Entidade;

@SuppressWarnings("serial")
@Entity
@Table(name = "credenciamento_fornecedor")
public class CredenciamentoFornecedor extends Entidade {}