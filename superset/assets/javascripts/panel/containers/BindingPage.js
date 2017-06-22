import React from 'react';
import {Link} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {pink500, grey200, grey500} from 'material-ui/styles/colors';

import Divider from 'material-ui/Divider';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import PageBase from '../components/PageBase';
//import Data from '../data';

const BindingPage = () => {

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
    saveButton: {
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
        <p>Tags(content-controls)
        </p>
                    <RadioButtonGroup floatingLabelText="Display" name="display" defaultSelected="number">
                    <RadioButton value="number" label="Number" />
                    <RadioButton value="txt" label="Text" />
                    <RadioButton value="time" label="Time" />
                    <RadioButton value="verb" label="Verb" />
                    <RadioButton value="noun" label="Noun" />
                    </RadioButtonGroup>


        <Divider/>

        <p>Data cell
        </p>

        <p>
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

        <Divider/>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn style={styles.columns.age}>age</TableHeaderColumn>
              <TableHeaderColumn style={styles.columns.age_group_id}>ag_id</TableHeaderColumn>
              <TableHeaderColumn style={styles.columns.birth_year}>b_year</TableHeaderColumn>
              <TableHeaderColumn style={styles.columns.location_id}>loc_id</TableHeaderColumn>
              <TableHeaderColumn style={styles.columns.model_id}>m_id</TableHeaderColumn>
              <TableHeaderColumn style={styles.columns.nm_lower}>nm_l</TableHeaderColumn>
              <TableHeaderColumn style={styles.columns.nm_mean}>nm_m</TableHeaderColumn>
              <TableHeaderColumn style={styles.columns.nm_upper}>nm_u</TableHeaderColumn>
              <TableHeaderColumn style={styles.columns.sex_id}>s_id</TableHeaderColumn>
              <TableHeaderColumn style={styles.columns.year_id}>y_id</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Data.api.items.map(item =>
              <TableRow key={item.age}>
                <TableRowColumn style={styles.columns.age}>{item.age}</TableRowColumn>
                <TableRowColumn style={styles.columns.age_group_id}>{item.age_group_id}</TableRowColumn>
                <TableRowColumn style={styles.columns.birth_year}>{item.birth_year}</TableRowColumn>
                <TableRowColumn style={styles.columns.location_id}>{item.location_id}</TableRowColumn>
                <TableRowColumn style={styles.columns.model_id}>{item.model_id}</TableRowColumn>
                <TableRowColumn style={styles.columns.nm_lower}>{item.nm_lower}</TableRowColumn>
                <TableRowColumn style={styles.columns.nm_mean}>{item.nm_mean}</TableRowColumn>
                <TableRowColumn style={styles.columns.nm_upper}>{item.nm_upper}</TableRowColumn>
                <TableRowColumn style={styles.columns.sex_id}>{item.sex_id}</TableRowColumn>
                <TableRowColumn style={styles.columns.year_id}>{item.year_id}</TableRowColumn>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
        <p>
        <Divider/>

        <div style={styles.buttons}>
          <Link to="/">
            <RaisedButton label="Cancel"/>
          </Link>

          <RaisedButton label="Save"
                        style={styles.saveButton}
                        type="submit"
                        primary={true}/>
        </div>
        </p>
    </PageBase>
  );
};

export default BindingPage;
