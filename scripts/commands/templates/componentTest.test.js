import React from 'react'
import ReactDOM from 'react-dom'
import App from './@componentName'
import sinon from 'sinon'
import Enzyme, { mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

it('renders without crashing', () => { // Teste básico do componente
  const div = document.createElement('div')
  ReactDOM.render(<App />, div)
  ReactDOM.unmountComponentAtNode(div)
})
