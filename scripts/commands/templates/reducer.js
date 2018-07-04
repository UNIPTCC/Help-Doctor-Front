import * as actionTypes from '../../Actions/actionTypes'
import initialState from '../initialState'

export default function @reducerName (state = initialState, action) {
  switch (action.type) {
    case actionTypes.THE_ACTION: // Substitua essa linha pela sua ação
      return initialState // Substitua essa linha pelo seu retorno

    default: // Não delete esta linha
      return initialState
  }
}
