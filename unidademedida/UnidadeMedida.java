package br.com.edocs.app.unidademedida;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import br.com.edocs.arquitetura.model.Entidade;

@SuppressWarnings("serial")
@Entity
@Table(name = "unidade_medida")
public class UnidadeMedida extends Entidade {}