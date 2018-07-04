import * as actionTypes from '../../Actions/actionTypes'
import initialState from '../initialState'

export default function ReducerExample (state = initialState, action) {
  switch (action.type) {
    case actionTypes.SHOW_ERROR: // Substitua essa linha pela sua ação
      return {
        ...state,
        error: {
          isError: true,
          message: action.message
        }
      } // Substitua essa linha pelo seu retorno

    default: // Não delete esta linha
      return state
  }
}
