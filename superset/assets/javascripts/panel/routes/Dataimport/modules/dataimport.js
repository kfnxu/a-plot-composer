// ------------------------------------
// Constants
// ------------------------------------
export const TEXT_ASYNC = 'TEXT_ASYNC'
export const INSERT_DATA_OFFICE = 'INSERT_DATA_OFFICE'

/// test
import React from 'react'
import TablePage from '../components/TablePage'

// ------------------------------------
// Actions
// ------------------------------------

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

export const dataAsync = () => {
  window.ihme.office.init();
  var url = window.ihme.office.getFromLocalStorage('inputDataSourceAPI');
  return (dispatch, getState) =>  
      fetch(url)
      //fetch(`/v1.0/forecasting/outputs/48?location_id=7&age_group_id=2&sex_id=2&start_year=2016&end_year=2040`)
             .then(response => response.json())
             .then(function(json){
                var s = 0;
                var l = json.length;
                if ( parseInt( window.ihme.office.getFromLocalStorage('inputDataStartPos') ) > 0 )
                     s = parseInt( window.ihme.office.getFromLocalStorage('inputDataStartPos') );
                if (  parseInt(window.ihme.office.getFromLocalStorage('inputDataLength')) > 0 )
                     l = s + parseInt(window.ihme.office.getFromLocalStorage('inputDataLength'));
                var data = json.slice(s, l);
                console.log('data binding', data, s, l );
                return(
                   dispatch({
                     type    : TEXT_ASYNC,
                     payload : JSON.stringify(data) // can send as json object, but better pracitice to encoded to string here and decode when needed
                   })
                )
             })

}

export const prepareDataForOffice = ( value = 1) => {
  //need to validate office state (if office is initialized successuflly) before calling this
  //window.ihme.office.init(); 
  window.ihme.office.loadForecastingData(); 

  return {
    type: INSERT_DATA_OFFICE, 
    payload: value 
  }
}

export const insertDataToOffice = ( value = 1) => {
  //need to validate office state (if office is initialized successuflly) before calling this
  window.ihme.office.importForecastingData();

  return {
    type: INSERT_DATA_OFFICE,
    payload: value
  }
}

export const actions = {
  dataAsync, 
  prepareDataForOffice, 
  insertDataToOffice
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [INSERT_DATA_OFFICE]    : (state, action) => state + action.payload,
  [TEXT_ASYNC] : (state, action) => action.payload, //{ return ( <TablePage data={action.payload} /> ) },
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = ""; //0
export default function dataimportReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
