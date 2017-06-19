/* eslint no-unused-vars: 0 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Badge, Col, Label, Row, Tabs, Tab, Panel } from 'react-bootstrap';
import App from './components/App';
import { appSetup } from '../common';

import './main.css';

appSetup();

const profileViewContainer = document.getElementById('app');
//const profileViewContainer = document.getElementById('js-explore-view-container');

const bootstrap = JSON.parse(profileViewContainer.getAttribute('data-bootstrap'));

export default class ProfileViewPage extends React.Component{

  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  render() {
     return (
       <App user={user} />
     );
  }

}
/*
const user = bootstrap.user;
ReactDOM.render(
  <App user={user} />,
  profileViewContainer,
);
*/
