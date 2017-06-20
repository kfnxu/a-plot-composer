import React from 'react'

import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types'
import ExploreboardViewPage from '../../../../explore/view';

export const Exploreboard = (props) => {
  const styles = {
    actionButton: {
      marginLeft: 5
    }
  }

  return (

  <div style={{ margin: '0 auto' }} >
     {<ExploreboardViewPage {...props} />}
  </div>

 )
}

Exploreboard.propTypes = {
  exploreboardDNode     : PropTypes.string.isRequired,
  dataAsync : PropTypes.func.isRequired,
  insertChartToTarger   : PropTypes.func.isRequired
}

export default Exploreboard
