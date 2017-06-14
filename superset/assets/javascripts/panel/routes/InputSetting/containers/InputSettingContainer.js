import { connect } from 'react-redux'
import { handleSetting,   handleSettingYear, handleSettingStartYear, handleSettingEndYear, handleSettingLocation, handleSettingCauses, } from '../modules/inputsetting'

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the inputsetting:   */

import InputSettingPage from '../components/InputSetting'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const mapDispatchToProps = {
  handleSetting,
  handleSettingYear,
  handleSettingStartYear,
  handleSettingEndYear,
  handleSettingLocation,
  handleSettingCauses,

}

const mapStateToProps = (state) => ({
  inputSettingDNode : state.inputSettingKey
})

export default connect(mapStateToProps, mapDispatchToProps)(InputSettingPage)
