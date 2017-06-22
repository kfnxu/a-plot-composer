import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'listboard',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Listboard = require('./containers/ListboardContainer').default
      const reducer = require('./modules/chartboard').default

      /*  Add the reducer to the store on key 'chartboard'  */
      injectReducer(store, { key: 'listboardKey', reducer })

      /*  Return getComponent   */
      cb(null, Listboard)

    /* Webpack named bundle   */
    }, 'listboard')
  }
})
