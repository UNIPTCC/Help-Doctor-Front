import rootReducer from '../index.js'
import assert from 'assert'

describe('index of reducers', () => {
  it('should be a function', () => {
    assert.equal(typeof rootReducer, 'function')
  })
})
