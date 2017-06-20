import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'welcomeboard',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Welcomeboard = require('./containers/WelcomeboardContainer').default
      const reducer = require('./modules/chartboard').default

      /*  Add the reducer to the store on key 'chartboard'  */
      injectReducer(store, { key: 'welcomeboardKey', reducer })

      /*  Return getComponent   */
      cb(null, Welcomeboard)

    /* Webpack named bundle   */
    }, 'welcomeboard')
  }
})
