import { connect } from 'react-redux'
import { dataBindingToTag, dataAsync } from '../modules/databinding'

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component - in this case, the counter:   */

import Databinding from '../components/Databinding'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. Here we are
    implementing our wrapper around increment; the component doesn't care   */

const mapDispatchToProps = {
  dataBindingToTag,
  dataAsync
}

const mapStateToProps = (state) => ({
  databindingDNode : state.databindingKey
})

export default connect(mapStateToProps, mapDispatchToProps)(Databinding)
