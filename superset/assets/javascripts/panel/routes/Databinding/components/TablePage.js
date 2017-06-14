import React from 'react'

import {Link} from 'react-router';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ContentAdd from 'material-ui/svg-icons/content/add';
import {pink500, grey200, grey500} from 'material-ui/styles/colors';
import PageBase from '../../../components/PageBase';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

import PropTypes from 'prop-types'

//export const DatabindingTable = (props) => {
class DatabindingTable extends React.Component{

  constructor(props) {
    super(props);
  }

  componentWillMount() {
   
  }

  componentDidMount() {
    var cb = function(){ console.log('calledback from ihme.office.js');}; 
    /////// init data first
    window.ihme.office.loadForecastingData();
    window.ihme.office.getTags(cb);
  }

  render() {

  var Data = { api:{} }; 
  Data.api.items = [];
  if( this.props.data && this.props.data.length > 0 ) Data.api.items = JSON.parse(this.props.data);

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
    <PageBase title="Data Cells"
              navigation="Application / Import-Data Page">
      <div>
        <Link to="/form" >
          <FloatingActionButton style={styles.floatingActionButton} backgroundColor={pink500}>
            <ContentAdd />
          </FloatingActionButton>
        </Link>

           <RadioButtonGroup floatingLabelText="Display" name={window.ihme.office.getNodes().tag.datacell} defaultSelected="number">
            {Data.api.items.map(function(x, xindex){
                     return (
                       Object.keys(x).map(function (key, yindex) {
                         return ( 
                           <RadioButton value={xindex + "," + key + "," + yindex} label={key + ":" + x[key]} /> 
                         )
                       })
                     )
             }
            )}
           </RadioButtonGroup>
      </div>
    </PageBase>
 )
 }
}

//DatabindingTable.propTypes = {
//  databindingDNode     : PropTypes.number.isRequired,
//  doubleAsync : PropTypes.func.isRequired,
//  increment   : PropTypes.func.isRequired
//}

export default DatabindingTable
