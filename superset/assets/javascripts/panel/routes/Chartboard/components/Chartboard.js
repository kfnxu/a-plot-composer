import React from 'react'

import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types'
//import MultivariateChoroplethMap from '../../ContentChartboard/components/MultivariateChoroplethMap'
//import ChartAreaPage from '../../ContentChartboard/components/AreaPage'
//import TreemapPage from '../../ContentChartboard/components/Treemap'

//for dynamic return component type see this document:
//https://facebook.github.io/react/docs/jsx-in-depth.html#choosing-the-type-at-runtime
//import React from 'react';
//import { PhotoStory, VideoStory } from './stories';
//
//const components = {
//  photo: PhotoStory,
//    video: VideoStory
//    };
//
//    function Story(props) {
//        // Correct! JSX type can be a capitalized variable.
//        const SpecificStory = components[props.storyType];
//          return <SpecificStory story={props.story} />;
//          }
//
//import ExploreViewPage from '../../../../explore/view';
import DashboardViewPage from '../../../../dashboard/view';

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

     {/*{<ExploreViewPage {...props} />}*/}
     {<DashboardViewPage {...props} />}
  </div>

 )
}

Chartboard.propTypes = {
  chartboardDNode     : PropTypes.string.isRequired,
  dataAsync : PropTypes.func.isRequired,
  insertChartToTarger   : PropTypes.func.isRequired
}

export default Chartboard
