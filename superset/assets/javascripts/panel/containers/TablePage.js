import React from 'react';
import {Link} from 'react-router';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {pink500, grey200, grey500} from 'material-ui/styles/colors';
import PageBase from '../components/PageBase';
import Data from '../menu';

const TablePage = () => {

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
        age: '2%',
        age_group_id: '2%',
        birth_year: '5%',
        location_id: '2%',
        model_id: '5%',
        nm_lower: '20%',
        nm_mean: '20%',
        nm_upper: '20%',
        sex_id: '2%',
        year_id: '5%', 
        edit: '5%',
    }
  };

  return (
    <PageBase title="Import Data"
              navigation="Application / Import-Data Page">

      <div>
        <Link to="/form" >
          <FloatingActionButton style={styles.floatingActionButton} backgroundColor={pink500}>
            <ContentAdd />
          </FloatingActionButton>
        </Link>

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
    </PageBase>
  );
};

export default TablePage;
