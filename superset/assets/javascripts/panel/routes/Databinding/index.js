import { injectReducer } from '../../store/reducers'

export default (store) => 
({
  path : 'databinding',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Databinding = require('./containers/DatabindingContainer').default
      const reducer = require('./modules/databinding').default

      /*  Add the reducer to the store on key 'databinding'  */
      injectReducer(store, { key: 'databindingKey', reducer })

      /*  Return getComponent   */
      cb(null, Databinding)

    /* Webpack named bundle   */
    }, 'databinding')
  }
})
