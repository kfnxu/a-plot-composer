import React from 'react'

import RaisedButton from 'material-ui/RaisedButton';
import PageBase from '../../../components/PageBase';
import Paper from 'material-ui/Paper';
import PropTypes from 'prop-types'

import DashboardViewPage    from '../../../../dashboard/view';
import ExploreboardViewPage from '../../../../explore/view';
import SqllabboardViewPage  from '../../../../SqlLab/view';
import ProfileViewPage  from '../../../../profile/view';

import ListboardViewPage    from '../../../../list';
import WelcomeboardViewPage from '../../../../welcome.view';

export default class Chartboard extends React.Component {
  constructor (props) {
    super(props)
    this.getViewComponent = this.getViewComponent.bind(this)
  }

  getViewComponent () {
    var path = (((window.location.pathname).split('/')).slice(1,3)).join('/');
    console.log('chartboard url path', path, window.location)
    switch (path) {
      case 'superset/dashboard':
        return <DashboardViewPage {...this.props} />

      case 'superset/explore':
        return <ExploreboardViewPage {...this.props} />

      case 'superset/sqllab':
        return <SqllabboardViewPage {...this.props} />

      case 'slicemodelview/list':
        return <ListboardViewPage  {...this.props} />

      case 'superset/profile':
        return <ProfileViewPage  {...this.props} />

      default:
        return <WelcomeboardViewPage  {...this.props} /> 
    }
  }

  render () {
    return (
      <Paper style={ {height:'100%', width:'100%'} }>
        { this.getViewComponent() }
      </Paper>
    )
  }
}

