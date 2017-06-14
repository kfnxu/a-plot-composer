import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'dataimport',

  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Dataimport = require('./containers/DataimportContainer').default
      const reducer = require('./modules/dataimport').default

      /*  Add the reducer to the store on key 'dataimport'  */
      injectReducer(store, { key: 'dataimportKey', reducer })

      /*  Return getComponent   */
      cb(null, Dataimport)

    /* Webpack named bundle   */
    }, 'dataimport')
  }
})
