import { connect } from 'react-redux'
import { insertChartToTarger, dataAsync} from '../modules/chartboard'

/*  This is a container component. Notice it does not contain any JSX,
    nor does it import React. This component is **only** responsible for
    wiring in the actions and state necessary to render a presentational
    component */

import Welcomeboard from '../components/Welcomeboard'

/*  Object of action creators (can also be function that returns object).
    Keys will be passed as props to presentational components. */

const mapDispatchToProps = {
  insertChartToTarger, 
  dataAsync,
}

const mapStateToProps = (state) => ({
  welcomeboardDNode : state.welcomeboardKey,
})

export default connect(mapStateToProps, mapDispatchToProps)(Welcomeboard)
