// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout'

import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from '../containers/App';
import NotFoundPage from '../containers/NotFoundPage.js';
import TablePage from '../containers/TablePage';
import BindingPage from '../containers/BindingPage';

import DataimportRoute from './Dataimport'

import DatabindingRoute from './Databinding'
import InputSetting from './InputSetting'
import ChartboardRoute from './Chartboard'
//import ExploreboardRoute from './Chartboard/exploreboard'
//import WelcomeboardRoute from './Chartboard/welcomeboard'
//import SqllabboardRoute from './Chartboard/sqllabboard'
//import ListboardRoute from './Chartboard/listboard'

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

export const createRoutes = (store) =>  
(
 [{
  path        : '/',
  component   : CoreLayout,
  indexRoute : ChartboardRoute(store), 
  childRoutes : [
      //{
      //   path :"binding",
      //   component: BindingPage
      //},

      InputSetting(store),
      DatabindingRoute(store),
      DataimportRoute(store),
      ChartboardRoute(store),
      //ExploreboardRoute(store),
      //WelcomeboardRoute(store), 
      //SqllabboardRoute(store),
      //ListboardRoute(store),
  ]
 }, 
 ]
)

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes
