import React, { Component } from 'react'
import { BrowserRouter as Router, AuthenticatedRoute } from 'react-router-util'
import { Switch, Route, Redirect } from 'react-router-dom'

import {HomePage} from './Pages/HomePage/HomePage'

class App extends Component {
  render() {
    const isAuthenticated = true
    const redirectLink = '/'
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={HomePage} />
          <AuthenticatedRoute path='/authenticated' exact component={HomePage} isAuthenticated={isAuthenticated} loginPath={redirectLink} />
          {/* Caso nenhuma das rotas bata, vai cair nessa ultima */}
          <Redirect to='/' />
        </Switch>
      </Router>
    )
  }
}

export default App;
