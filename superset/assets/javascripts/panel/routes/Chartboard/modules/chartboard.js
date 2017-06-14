import React from 'react'
import CompositionMap from '../components/Composition'

// ------------------------------------
// Constants
// ------------------------------------
export const INSERT_CHART = 'INSERT_CHART'
export const TEXT_ASYNC = 'TEXT_ASYNC'
// ------------------------------------
// Actions
// ------------------------------------
export const insertChartToTarger = (proxy) => {
  //clone will works, but inject from innerHTML will not work
  //console.log('insertChartToTarget', proxy); 
  //use localStorage as communication channel
  var value = 'linearChartCmd';
  ihme.office.publishCommand(value);

  return {
    type    : INSERT_CHART,
    payload : value
  }
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

export const dataAsync = (event, value) => {
  console.log('dataAsync', event, value);
  var url = window.ihme.office.getFromLocalStorage('inputDataSourceAPI');
  return (dispatch, getState) =>
      fetch(url)
      //fetch(`/api.json`)
             .then(response => response.json())
             .then(json => 
                dispatch({
                  type    : TEXT_ASYNC,
                  payload : JSON.stringify(json) 
                })
                )
}


export const actions = {
  insertChartToTarger,
  dataAsync,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [INSERT_CHART]    : (state, action) => state + action.payload,
  [TEXT_ASYNC] : (state, action) => action.payload, //{ return ( <ChartPage data={action.payload} /> ) },
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = ""; //0
export default function chartboardReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
