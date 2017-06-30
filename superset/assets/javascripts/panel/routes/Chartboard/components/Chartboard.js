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
//import WelcomeboardViewPage from '../../../../welcome.view';

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
        return <DashboardViewPage {...this.props} style={ {overflow: 'scroll'} } />

      case 'superset/explore':
        return <ExploreboardViewPage {...this.props} style={ {overflow: 'scroll'} } />

      case 'superset/sqllab':
        return <SqllabboardViewPage {...this.props} style={ {overflow: 'scroll'} } />

      case 'slicemodelview/list':
      case 'databaseview/list':
      case 'users/list':
      case 'roles/list':
        return <ListboardViewPage  {...this.props} style={ {overflow: 'scroll'} } />

      case 'superset/profile':
        return <ProfileViewPage  {...this.props} style={ {overflow: 'scroll'} } />

      default:
        return <ListboardViewPage  {...this.props} style={ {overflow: 'scroll'} } />
    }
  }

  render () {
    return (
      <div>
      <Paper style={ {overflow: 'scroll'} }>
        { this.getViewComponent() }
      </Paper>
      </div>
    )
  }
}

