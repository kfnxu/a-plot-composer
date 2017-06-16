import React from 'react'

import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types'
//import MultivariateChoroplethMap from '../../ContentChartboard/components/MultivariateChoroplethMap'
//import ChartAreaPage from '../../ContentChartboard/components/AreaPage'
//import TreemapPage from '../../ContentChartboard/components/Treemap'

import ExploreViewPage from '../../../../explore/view';

export const Chartboard = (props) => {
  const styles = {
    actionButton: {
      marginLeft: 5
    }
  }

  return (

  <div style={{ margin: '0 auto' }} >
    {/*
    <RaisedButton label="Charts" onClick={props.dataAsync} style={styles.actionButton} />
            <ChartAreaPage data={props.chartboardDNode} {...props} />
            <TreemapPage data={props.chartboardDNode} {...props} />
            <MultivariateChoroplethMap data={props.chartboardDNode} {...props} />
     */}

     <ExploreViewPage {...props} />

  </div>

 )
}

Chartboard.propTypes = {
  chartboardDNode     : PropTypes.string.isRequired,
  dataAsync : PropTypes.func.isRequired,
  insertChartToTarger   : PropTypes.func.isRequired
}

export default Chartboard
