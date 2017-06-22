import React from 'react'

import RaisedButton from 'material-ui/RaisedButton';
import PageBase from '../../../components/PageBase';
import PropTypes from 'prop-types'

import DashboardViewPage from '../../../../dashboard/view';
import ExploreboardViewPage from '../../../../explore/view';
import SqllabboardViewPage from '../../../../SqlLab/view';

import ListboardViewPage from '../../../../list';

export const Chartboard = (props) => {
  const styles = {
    actionButton: {
      marginLeft: 5
    }
  }

  console.log('url', props.location, props.location.pathname);
  return (
  <PageBase>
  <div style={{ margin: '0 auto' }} >
     {<DashboardViewPage {...props} />}
  </div>
  </PageBase>

 )
}

Chartboard.propTypes = {
  chartboardDNode     : PropTypes.string.isRequired,
  dataAsync : PropTypes.func.isRequired,
  insertChartToTarger   : PropTypes.func.isRequired
}

export default Chartboard
