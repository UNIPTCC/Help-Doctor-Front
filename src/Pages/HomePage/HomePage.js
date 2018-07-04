import React, { Component } from 'react'
import { connect as ConnectToRedux } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from './HomePage.conf'

/**
 * Uma descrição da sua página aqui
 */
export class HomePage extends Component {
  constructor (props) { // Remova o construtor se não for necessário
    super(props)
    this.state = {
      
    }
  }

  render () { // Método Render deve retornar APENAS chamadas para regras de negócio e JSX renderizáveis conforme README na seção "Estilo de Código"
    return (
      <div>
        <h1>HomePage</h1>
      </div>
    )
  }
}

export default ConnectToRedux(mapStateToProps, mapDispatchToProps)(HomePage)
