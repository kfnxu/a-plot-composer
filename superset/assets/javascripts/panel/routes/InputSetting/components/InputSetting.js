import React from 'react';
import {Link} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import Toggle from 'material-ui/Toggle';
import DatePicker from 'material-ui/DatePicker';
import {grey400} from 'material-ui/styles/colors';
import Divider from 'material-ui/Divider';

import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Slider from 'material-ui/Slider';

import PageBase from '../../../components/PageBase';
import PropTypes from 'prop-types'

export const InputSettingPage = (props) => {

 const styles = {
    toggleDiv: {
      maxWidth: 300,
      marginTop: 40,
      marginBottom: 5
    },
    toggleLabel: {
      color: grey400,
      fontWeight: 100
    },
    buttons: {
      marginTop: 30,
      float: 'right'
    },
    slider: {
      width: '80%',
    },
    saveButton: {
      marginLeft: 5
    }
  };

    console.log('inputsettingpage', props, props.handleSetting); 
    return (
    <PageBase title="Setting"
              navigation="Application / Setting Page">

          {/*
          <RaisedButton label="iframes"
                        style={styles.saveButton}
                        onClick={window.ihme.office.getIframes}
                        primary={true}/>
          */}

        {/*
        <TextField
          hintText="Data source API"
          floatingLabelText="Data source API"
          fullWidth={true}
          name="inputDataSourceAPI"
          value={window.ihme.office.getFromLocalStorage('inputDataSourceAPI')}
          onChange={props.handleSetting}
        />
        */}
        <TextField
          hintText="Model"
          floatingLabelText="48"
          fullWidth={true}
          name="inputModel"
          data-value={window.ihme.office.getFromLocalStorage('inputModel')}
          onChange={props.handleSetting}
        />
        <p>
                    <RadioButtonGroup floatingLabelText="Display" name="inputDisplay" defaultSelected={window.ihme.office.getFromLocalStorage('inputDisplay')} onChange={props.handleSetting}>
                    <RadioButton value="1" label="Cause" style={{ display: 'inline-block', width: '150px', marginLeft: '10px' }}  />
                    <RadioButton value="2" label="Risk"  style={{ display: 'inline-block', width: '150px', marginLeft: '10px' }}  />
                    </RadioButtonGroup>

        </p>

        <Divider/>

        <p>
                    <RadioButtonGroup floatingLabelText="Metric" name="inputMetric" defaultSelected={1}>
                    <RadioButton value="1" label="deaths" style={{ display: 'inline-block', width: '150px', marginLeft: '10px' }} />
                    <RadioButton value="2" label="YLDs"  style={{ display: 'inline-block', width: '150px', marginLeft: '10px' }} />
                    <RadioButton value="3" label="DALYs" style={{ display: 'inline-block', width: '150px', marginLeft: '10px' }} />
                    </RadioButtonGroup>
        </p>

        <Divider/>

        <p>
                   <SelectField floatingLabelText="Location" value={window.ihme.office.getFromLocalStorage('inputLocation')} fullWidth={true} name="inputLocation" onChange={props.handleSettingLocation}>
                     <MenuItem value="6" label="Global" primaryText="Global" />
                     <MenuItem value="7" label="Southeast Asia, East Asia, and Oceania" primaryText="Southeast Asia, East Asia, and Oceania" />
                  </SelectField>
        </p>


        <p>

                    <span>Year</span> 
                    <Slider
                         name="inputYear"
                         defaultValue={2016}
                         style={styles.slider.width}
                         value={window.ihme.office.getFromLocalStorage('inputYear')}
                         min={1996}
                         max={2050}
                         step={1}
                         onChange={props.handleSettingYear}
                    />
        </p>

        <p>

                    <span>Start Year</span>
                    <Slider
                         name="inputStartYear"
                         defaultValue={2016}
                         style={styles.slider.width}
                         value={window.ihme.office.getFromLocalStorage('inputStartYear')}
                         min={1996}
                         max={2050}
                         step={1}
                         onChange={props.handleSettingStartYear}
                    />
        </p>

        <p>

                    <span>End Year</span>
                    <Slider
                         name="inputEndYear"
                         defaultValue={2016}
                         style={styles.slider.width}
                         value={window.ihme.office.getFromLocalStorage('inputEndYear')}
                         min={1996}
                         max={2050}
                         step={1}
                         onChange={props.handleSettingEndYear}
                    />
        </p>

        <Divider/>

        <p>
                    <RadioButtonGroup floatingLabelText="Age" name="inputAge" defaultSelected={window.ihme.office.getFromLocalStorage('inputAge')} onChange={props.handleSetting}>
                    <RadioButton value="1" label="All"  style={{ display: 'inline-block', width: '150px', marginLeft: '10px' }} />
                    <RadioButton value="2" label="<5" style={{ display: 'inline-block', width: '150px', marginLeft: '10px' }}  />
                    <RadioButton value="3" label="5-14" style={{ display: 'inline-block', width: '150px', marginLeft: '10px' }} />
                    <RadioButton value="4" label="15-49"  style={{ display: 'inline-block', width: '150px', marginLeft: '10px' }} />
                    <RadioButton value="5" label="50-69" style={{ display: 'inline-block', width: '150px', marginLeft: '10px' }} />
                    <RadioButton value="6" label="70+" style={{ display: 'inline-block', width: '150px', marginLeft: '10px' }} />
                    </RadioButtonGroup>
        </p>
        <Divider/>

        <p>
                    <RadioButtonGroup floatingLabelText="Sex" name="inputSex" defaultSelected={window.ihme.office.getFromLocalStorage('inputSex')} onChange={props.handleSetting}>
                    <RadioButton value="1" label="Male"  style={{ display: 'inline-block', width: '150px', marginLeft: '10px' }} />
                    <RadioButton value="2" label="Female" style={{ display: 'inline-block', width: '150px', marginLeft: '10px' }} />
                    <RadioButton value="3" label="Both" style={{ display: 'inline-block', width: '150px', marginLeft: '10px' }} />
                    </RadioButtonGroup>
        </p>
        <Divider/>

        <p>
                   <SelectField floatingLabelText="Cause" value={window.ihme.office.getFromLocalStorage('inputCauses')} fullWidth={true} name="inputCauses" onChange={props.handleSettingCauses}>
                     <MenuItem value="294" label="All causes" primaryText="All causes" />
                     <MenuItem value="298" label="HIV" primaryText="HIV" />
                     <MenuItem value="302" label="diarrhea" primaryText="diarrhea" />
                  </SelectField>
        </p>

        <p>
                    <RadioButtonGroup floatingLabelText="Units" name="inputUnits" defaultSelected={window.ihme.office.getFromLocalStorage('inputUnits')} onChange={props.handleSetting}>
                    <RadioButton value="1" label="#"  style={{ display: 'inline-block', width: '150px', marginLeft: '10px' }} />
                    <RadioButton value="2" label="Rate" style={{ display: 'inline-block', width: '150px', marginLeft: '10px' }} />
                    <RadioButton value="3" label="%" style={{ display: 'inline-block', width: '150px', marginLeft: '10px' }} />
                    </RadioButtonGroup>
        </p>

        <Divider/>

        <div> 
                  <Toggle 
                    label="Rate of change"
                    name="inputRateOfChange"
                    defaultToggled={true}
                    labelStyle={styles.toggleLabel} onToggle={props.handleSetting} />
        </div>

        <Divider/>

        <p>
                    <RadioButtonGroup floatingLabelText="Detail" name="inputDetail" defaultSelected={window.ihme.office.getFromLocalStorage('inputDetail')} onChange={props.handleSetting}>
                    <RadioButton value="1" label="National" style={{ display: 'inline-block', width: '150px', marginLeft: '10px' }} />
                    <RadioButton value="2" label="Subnationsl" style={{ display: 'inline-block', width: '150px', marginLeft: '10px' }} />
                    </RadioButtonGroup>
        </p>

        <Divider/>
        <TextField
          hintText="Data set start"
          floatingLabelText="Data set start"
          fullWidth={true}
          name="inputDataStartPos"
          data-value={window.ihme.office.getFromLocalStorage('inputDataStartPos')}
          onChange={props.handleSetting}
        />

        <TextField
          hintText="Data set length"
          floatingLabelText="Data set length"
          name="inputDataLength"
          fullWidth={true}
          data-value={window.ihme.office.getFromLocalStorage('inputDataLength')}
          onChange={props.handleSetting}
        />

        <TextField
          hintText="Target position-x"
          floatingLabelText="Target position-x"
          name="targetPosX"
          fullWidth={true}
          data-value={window.ihme.office.getFromLocalStorage('targetPosX')}
          onChange={props.handleSetting}
        />

        <TextField
          hintText="Target position-y"
          floatingLabelText="Target position-y"
          name="targetPosY"
          fullWidth={true}
          data-value={window.ihme.office.getFromLocalStorage('targetPosY')}
          onChange={props.handleSetting}
        />

        {/*
        <div style={styles.buttons}>
          <Link to="/">
            <RaisedButton label="Cancel"/>
          </Link>

          <RaisedButton label="Save"
                        style={styles.saveButton}
                        primary={true}/>
        </div>
        */}
    </PageBase>
    );
};

export default InputSettingPage; 
