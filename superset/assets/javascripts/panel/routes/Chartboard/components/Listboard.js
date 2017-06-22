import React from 'react'

import RaisedButton from 'material-ui/RaisedButton';
import PageBase from '../../../components/PageBase';
import PropTypes from 'prop-types'
import ListboardViewPage from '../../../../list';

export const Listboard = (props) => {
  const styles = {
    actionButton: {
      marginLeft: 5
    }
  }

  return (
  <PageBase>
  <div style={{ margin: '0 auto' }} >
     {<ListboardViewPage {...props} />}
  </div>
  </PageBase>

 )
}

Listboard.propTypes = {
  listboardDNode     : PropTypes.string.isRequired,
  dataAsync : PropTypes.func.isRequired,
  insertChartToTarger   : PropTypes.func.isRequired
}

export default Listboard
