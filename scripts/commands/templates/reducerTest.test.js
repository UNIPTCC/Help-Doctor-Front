import assert from 'assert'
import @reducerName from '../Handlers/@reducerName'
import * as actionTypes from '../../Actions/actionTypes'

describe('@reducerName', () => {
  describe('ACTION_1', () => { // Altere o nome deste teste para o nome de cada ação
    it('dummy description for ACTION_1 test', () => { // Adicione sua descrição aqui
      const action = {
        type: actionTypes.ACTION_1
      }
      const expected = {}

      assert.deepEqual(@reducerName({}, action), expected)
    })
  })
})