import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { browserHistory, hashHistory, Router } from 'react-router'
import { Provider } from 'react-redux'

const propTypes = 
    {
    routes : PropTypes.object.isRequired,
    store  : PropTypes.object.isRequired
    }

class AppContainer extends Component {

  shouldComponentUpdate () {
    return false
  }

  // change from using browserHistory to hashHistory to support office.js which disabled history.pushState and replaceState
  // <Router history={browserHistory}  children={routes} />
  render () {
    const { routes, store } = this.props

    return (
      <Provider store={store}>
        <div style={{ height: '100%' }}>
          <Router history={hashHistory}  children={routes} />
        </div>
      </Provider>
    )
  }
}

export default AppContainer
