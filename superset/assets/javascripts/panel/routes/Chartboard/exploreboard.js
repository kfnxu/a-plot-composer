import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'exploreboard',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Exploreboard = require('./containers/ExploreboardContainer').default
      const reducer = require('./modules/chartboard').default

      /*  Add the reducer to the store on key 'chartboard'  */
      injectReducer(store, { key: 'exploreboardKey', reducer })

      /*  Return getComponent   */
      cb(null, Exploreboard)

    /* Webpack named bundle   */
    }, 'exploreboard')
  }
})
