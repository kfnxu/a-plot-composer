import React from 'react'

import RaisedButton from 'material-ui/RaisedButton';
import PropTypes from 'prop-types'

import TablePage from '../components/TablePage'

//will render the page from import itself
//import ProfileViewPage from '../../../../profile';

export const Dataimport = (props) => {

  const styles = {
    actionButton: {
      marginLeft: 5
    }
  }

  return (

  <div style={{ margin: '0 auto' }} >
    <RaisedButton label="Load (async)" onClick={props.dataAsync} style={styles.actionButton} />
    <RaisedButton label="To office" onClick={props.prepareDataForOffice} style={styles.actionButton} />
    <TablePage data={props.dataimportDNode} {...props} />
    {/*{props.dataimportDNode}*/}
  </div>

 )
}

//Dataimport.propTypes = {
//  dataimportDNode     : PropTypes.object.isRequired,
//  dataAsync : PropTypes.func.isRequired,
//  prepareDataForOffice : PropTypes.func.isRequired,
//  insertDataToOffice: PropTypes.func.isRequired,
//  increment   : PropTypes.func.isRequired
//}

export default Dataimport
