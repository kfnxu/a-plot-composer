import React from 'react'

import PropTypes from 'prop-types'
import {Link} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {pink500, grey200, grey500} from 'material-ui/styles/colors';

import Divider from 'material-ui/Divider';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import PageBase from '../../../components/PageBase';

import TablePage from '../components/TablePage'

export const Databinding = (props) => {

  const styles = {
    floatingActionButton: {
      margin: 0,
      top: 'auto',
      right: 20,
      bottom: 20,
      left: 'auto',
      position: 'fixed',
    },
    editButton: {
      fill: grey500
    },
    columns: {
        age: { width: '2%' },
        age_group_id: { width:  '5%'},
        birth_year: { width: '5%'},
        location_id: { width: '5%'},
        model_id: { width: '5%'},
        nm_lower: { width: '10%'},
        nm_mean: { width: '10%'},
        nm_upper: { width: '10%'},
        sex_id: { width: '5%' },
        year_id: { width: '5%' },
        edit: { width: '5%' },
    },
    actionButton: {
      marginLeft: 5
    },
    buttons: {
      marginTop: 30,
      float: 'right'
    },

  };

  return (

    <PageBase title="Data Binding"
              navigation="Application / Data-Binding Page">

      <div>
        {/*<p>Tags(content-controls)
        </p>
                    <RadioButtonGroup floatingLabelText="Display" name="display" defaultSelected="number">
                    <RadioButton value="number" label="Number" />
                    <RadioButton value="txt" label="Text" />
                    <RadioButton value="time" label="Time" />
                    <RadioButton value="verb" label="Verb" />
                    <RadioButton value="noun" label="Noun" />
                    </RadioButtonGroup>
        */}
        <div id={window.ihme.office.getNodes().tag.webnode}>
        </div>
        <Divider/>

        <p>Data cell
        </p>

        {/*<p>
        age
        age_group_id
        birth_year
        location_id
        model_id
        nm_lower
        nm_mean
        nm_upper
        sex_id
        year_id
        </p>
        */}

     </div>

  <div style={{ margin: '0 auto' }} >
    <RaisedButton label="Load data" onClick={props.dataAsync} style={styles.actionButton} />
    <RaisedButton label="Binding" onClick={props.dataBindingToTag} style={styles.actionButton} />
    <TablePage data={props.databindingDNode} {...props} /> 
    {/*{props.databindingDNode}*/}
  </div>

  </PageBase>

 )
}

Databinding.propTypes = {
  databindingDNode     : PropTypes.number.isRequired,
  dataAsync : PropTypes.func.isRequired,
  increment   : PropTypes.func.isRequired
}

export default Databinding
