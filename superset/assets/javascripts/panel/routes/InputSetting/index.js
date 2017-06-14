import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'setting',

  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const InputSetting = require('./containers/InputSettingContainer').default
      const reducer = require('./modules/inputsetting').default

      /*  Add the reducer to the store on key 'dataimport'  */
      injectReducer(store, { key: 'inputSettingKey', reducer })

      /*  Return getComponent   */
      cb(null, InputSetting)

    /* Webpack named bundle   */
    }, 'setting')
  }
})
