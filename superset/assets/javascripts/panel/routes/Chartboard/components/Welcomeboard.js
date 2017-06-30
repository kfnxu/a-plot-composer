import React from 'react'

import RaisedButton from 'material-ui/RaisedButton';
import PageBase from '../../../components/PageBase';
import PropTypes from 'prop-types'
import WelcomeboardViewPage from '../../../../list';

export const Welcomeboard = (props) => {
  const styles = {
    actionButton: {
      marginLeft: 5
    }
  }

  return (
  <PageBase>
  <div style={{ margin: '0 auto' }} >
     {<WelcomeboardViewPage {...props} />}
  </div>
  </PageBase>

 )
}

Welcomeboard.propTypes = {
  welcomeboardDNode     : PropTypes.string.isRequired,
  dataAsync : PropTypes.func.isRequired,
  insertChartToTarger   : PropTypes.func.isRequired
}

export default Welcomeboard
