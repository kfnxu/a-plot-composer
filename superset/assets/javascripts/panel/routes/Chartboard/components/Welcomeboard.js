import React from 'react'

import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types'
import WelcomeboardViewPage from '../../../../welcome.view';

export const Welcomeboard = (props) => {
  const styles = {
    actionButton: {
      marginLeft: 5
    }
  }

  return (

  <div style={{ margin: '0 auto' }} >
     {<WelcomeboardViewPage {...props} />}
  </div>

 )
}

Welcomeboard.propTypes = {
  welcomeboardDNode     : PropTypes.string.isRequired,
  dataAsync : PropTypes.func.isRequired,
  insertChartToTarger   : PropTypes.func.isRequired
}

export default Welcomeboard
