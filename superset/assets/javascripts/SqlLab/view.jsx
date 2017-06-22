import React from 'react';
import { render } from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import { getInitialState, sqlLabReducer } from './reducers';
import { initEnhancer } from '../reduxUtils';
import { initJQueryAjax } from '../modules/utils';
import App from './components/App';
import { appSetup } from '../common';

import './main.css';
import './reactable-pagination.css';
import '../components/FilterableTable/FilterableTableStyles.css';

export default class SqllabViewPage extends React.Component{

  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {
   appSetup();
   initJQueryAjax();
   const appContainer = document.getElementById('js-explore-view-container');
   const bootstrapData = JSON.parse(appContainer.getAttribute('data-bootstrap'));
   const state = Object.assign({}, getInitialState(bootstrapData.defaultDbId), bootstrapData);
   // jquery hack to highlight the navbar menu
   $('a:contains("SQL Lab")').parent().addClass('active');

   const store = createStore(
     sqlLabReducer, state, compose(applyMiddleware(thunkMiddleware), initEnhancer()));

     return (
       <Provider store={store}>
        <App />
       </Provider>
    )
  }
}

/*
render(
  <Provider store={store}>
    <App />
  </Provider>,
  appContainer,
);*/
