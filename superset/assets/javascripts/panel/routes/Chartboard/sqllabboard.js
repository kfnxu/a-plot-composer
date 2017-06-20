import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'sqllabboard',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Sqllabboard = require('./containers/SqllabboardContainer').default
      const reducer = require('./modules/chartboard').default

      /*  Add the reducer to the store on key 'chartboard'  */
      injectReducer(store, { key: 'sqllabboardKey', reducer })

      /*  Return getComponent   */
      cb(null, Sqllabboard)

    /* Webpack named bundle   */
    }, 'sqllabboard')
  }
})
