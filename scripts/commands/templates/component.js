import React from 'react'
import PropType from 'prop-types'
import { translate } from 'react-i18next'

/**
 * Inclua uma descrição aqui
 */
const @componentName = ({ t }) => { // Inclua props aqui
  return (
    <div />
  )
}

@componentName.propTypes = {
  t: PropType.func.isRequired
} // Inclua a definição das propriedades conforme no README na sessão Prop-Types

export default translate('@componentName')(@componentName)
