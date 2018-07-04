import React from 'react';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import reducers from './Reducers'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'

const store = createStore(reducers)

render(<Provider store={store}><App /></Provider>, document.querySelector('[data-root="app"]'))

if (process.env.REACT_APP_SHOULD_USE_SERVICE_WORKER && parseInt(process.env.REACT_APP_SHOULD_USE_SERVICE_WORKER, 10) === 1) registerServiceWorker()
