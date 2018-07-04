import React, { Component } from 'react'
import { connect as ConnectToRedux } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from './@pageName.conf'
import { translate } from 'react-i18next'
import PropType from 'prop-types'

/**
 * Uma descrição da sua página aqui
 */
export class @pageName extends Component {
  constructor () { // Remova o construtor se não for necessário
    super()
  }

  render () { // Método Render deve retornar APENAS chamadas para regras de negócio e JSX renderizáveis conforme README na seção "Estilo de Código"
    const i18n = this.props.t // Cria a variável com a função de tradução, use como i18n('NomeDaPagina:Chave')
    return (
      <div/>
    )
  }
}

@pageName.propTypes = {
  t: PropType.func.isRequired
} // Adicione a validação de propriedades conforme o README na seção Prop-Types

export default ConnectToRedux(mapStateToProps, mapDispatchToProps)(translate('@pageName')(@pageName))
