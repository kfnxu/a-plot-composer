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

import PageBase from '../components/PageBase';


const ControlPanelSettingPage = () => {

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

    return (
    <PageBase title="Setting"
              navigation="Application / Setting Page">
      <form>
        <p>
                    <RadioButtonGroup floatingLabelText="Display" name="display" defaultSelected="cause" >
                    <RadioButton value="cause" label="Cause" />
                    <RadioButton value="risk" label="Risk" />
                    </RadioButtonGroup>

        </p>

        <Divider/>

        <p>
                    <RadioButtonGroup floatingLabelText="Metric" name="metric" defaultSelected="deaths">
                    <RadioButton value="deaths" label="deaths" />
                    <RadioButton value="YLDs" label="YLDs"  />
                    <RadioButton value="DALYs" label="DALYs" />
                    </RadioButtonGroup>
        </p>

        <Divider/>

        <p>

                    <span>Year</span> 
                    <Slider
                         name="year"
                         defaultValue={2016}
                         style={styles.slider.width}
                         value={1996}
                         min={1996}
                         max={2050}
                         step={1}
                    />
        </p>

        <Divider/>

        <p>
                    <RadioButtonGroup floatingLabelText="Age" name="Age" defaultSelected="0">
                    <RadioButton value="0" label="All"  />
                    <RadioButton value="5" label="<5" />
                    <RadioButton value="14" label="5-14" />
                    <RadioButton value="49" label="15-49"  />
                    <RadioButton value="69" label="50-69" />
                    <RadioButton value="70" label="70+" />
                    </RadioButtonGroup>
        </p>
        <Divider/>

        <p>
                    <RadioButtonGroup floatingLabelText="Sex" name="Sex" defaultSelected="male">
                    <RadioButton value="male" label="Male"  />
                    <RadioButton value="femail" label="Female" />
                    <RadioButton value="both" label="Both" />
                    </RadioButtonGroup>
        </p>
        <Divider/>

        <p>
                   <SelectField floatingLabelText="Cause" value={1} fullWidth={true} >
                     <MenuItem value={1} label="All causes" primaryText="All causes" />
                     <MenuItem value={2} label="HIV" primaryText="HIV" />
                  </SelectField>
        </p>

        <p>
                    <RadioButtonGroup floatingLabelText="Units" name="units" defaultSelected="rate">
                    <RadioButton value="number" label="#"  />
                    <RadioButton value="rate" label="Rate" />
                    <RadioButton value="percentage" label="%" />
                    </RadioButtonGroup>
        </p>

        <Divider/>

        <div> 
                  <Toggle 
                    label="Rate of change"
                    defaultToggled={true}
                    labelStyle={styles.toggleLabel} />
        </div>

        <Divider/>

        <p>
                    <RadioButtonGroup floatingLabelText="Detail" name="detail" defaultSelected="national">
                    <RadioButton value="national" label="National" />
                    <RadioButton value="subnational" label="Subnationsl" />
                    </RadioButtonGroup>
        </p>

        <Divider/>
        <TextField
          hintText="Data set start"
          floatingLabelText="Data set start"
          fullWidth={true}
        />

        <TextField
          hintText="Data set length"
          floatingLabelText="Data set length"
          fullWidth={true}
        />


        <div style={styles.buttons}>
          <Link to="/">
            <RaisedButton label="Cancel"/>
          </Link>

          <RaisedButton label="Save"
                        style={styles.saveButton}
                        type="submit"
                        primary={true}/>
        </div>
      </form>
    </PageBase>
    );
};

export default ControlPanelSettingPage;
