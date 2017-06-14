// ------------------------------------
// Constants
// ------------------------------------
export const BINDING_TAG_TO_DATA = 'BINDING_TAG_TO_DATA'
export const TEXT_ASYNC = 'TEXT_ASYNC'

// ------------------------------------
// Actions
// ------------------------------------
export function dataBindingToTag () {
  window.ihme.office.bindingTagToData(); 
  return {
    type    : BINDING_TAG_TO_DATA,
    payload : 1 
  }
}

/*  This is a thunk, meaning it is a function that immediately
    returns a function for lazy evaluation. It is incredibly useful for
    creating async actions, especially when combined with redux-thunk! */

export const dataAsync = () => {
  var url = window.ihme.office.getFromLocalStorage('inputDataSourceAPI');
  return (dispatch, getState) =>
      fetch(url)
      //fetch(`/api.json`)
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
                     payload : JSON.stringify(data)
                   })
                )
             })
}

export const actions = {
  dataBindingToTag,
  dataAsync
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [BINDING_TAG_TO_DATA]    : (state, action) => state + action.payload,
  [TEXT_ASYNC] : (state, action) => action.payload, //{ return ( <TablePage data={action.payload} /> ) },
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = ""; //0
export default function databindingReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
