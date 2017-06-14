// ------------------------------------
// Constants
// ------------------------------------
export const SETTING_DISPLAY = 'SETTING_DISPLAY'
export const DATA_ASYNC = 'DATA_ASYNC'
export const TEXT_ASYNC = 'TEXT_ASYNC'
export const UPDATE_API_DATA = 'UPDATE_API_DATA'; 


// ------------------------------------
// Actions
// ------------------------------------
export const handleSetting  = (event, value) => {

  window.ihme.office.setToLocalStorage(event.target.name, value);
  //send command to all content-app to upate their api-data
  ihme.office.publishCommand(UPDATE_API_DATA);
  ihme.office.setToLocalStorage('inputDataSourceAPI', ihme.office.setDataSourceAPI());

  console.log('handleSetting', event, event.target, event.target.name, value);
  return {
    type: SETTING_DISPLAY,
    payload: value
  }
}

/// following function handle nodes has no name attached to it
export const handleSettingYear  = (event, value) => {
  
  window.ihme.office.setToLocalStorage("inputYear", value);
  ihme.office.publishCommand(UPDATE_API_DATA);
  ihme.office.setToLocalStorage('inputDataSourceAPI', ihme.office.setDataSourceAPI());
  return {
    type: SETTING_DISPLAY,
    payload: value
  }
}

/// following function handle nodes has no name attached to it
export const handleSettingStartYear  = (event, value) => {

  window.ihme.office.setToLocalStorage("inputStartYear", value);
  ihme.office.publishCommand(UPDATE_API_DATA);
  ihme.office.setToLocalStorage('inputDataSourceAPI', ihme.office.setDataSourceAPI());
  return {
    type: SETTING_DISPLAY,
    payload: value
  }
}

/// following function handle nodes has no name attached to it
export const handleSettingEndYear  = (event, value) => {

  window.ihme.office.setToLocalStorage("inputEndYear", value);
  ihme.office.publishCommand(UPDATE_API_DATA);
  ihme.office.setToLocalStorage('inputDataSourceAPI', ihme.office.setDataSourceAPI());
  return {
    type: SETTING_DISPLAY,
    payload: value
  }
}

/// following function handle nodes has no name attached to it
export const handleSettingLocation  = (event, value) => {

  window.ihme.office.setToLocalStorage("inputLocation", value);
  ihme.office.publishCommand(UPDATE_API_DATA);
  ihme.office.setToLocalStorage('inputDataSourceAPI', ihme.office.setDataSourceAPI());
  return {
    type: SETTING_DISPLAY,
    payload: value
  }
}

export const handleSettingCauses  = (event, value) => {
  
  window.ihme.office.setToLocalStorage("inputCauses", value);
  ihme.office.publishCommand(UPDATE_API_DATA);
  ihme.office.setToLocalStorage('inputDataSourceAPI', ihme.office.setDataSourceAPI());
  return {
    type: SETTING_DISPLAY,
    payload: value
  }
}

export const actions = {
  handleSetting,
  handleSettingYear,
  handleSettingStartYear,
  handleSettingEndYear,
  handleSettingLocation,
  handleSettingCauses,
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SETTING_DISPLAY]    : (state, action) => 1,
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = ""; //0
export default function inputsettingReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
