import React from 'react';
import '../App.css';
// import fetch from 'isomorphic-fetch';
import './HeroSection.css';
import {Grid, Form, Checkbox} from 'semantic-ui-react';
import Select from 'react-select';

class FormAutoComplete extends React.PureComponent {
    constructor(props){
        super(props)
          this.state = {
            startLocation: '',
            returnLocation: '',
            UI:{
              checkbox : 'activeReturn'
            }
          }
          this.onChange = () => this.onChange()
          this.onChangeReturn = () => this.onChangeReturn()
          this.showReturn = () => this.showReturn()
    }

    render() {
        const AsyncComponent = Select.Async;
        return (
            <Grid className='gridAutocomplete'>
                <Grid.Row centered>
                    <div className="selectFormSearch">
                        <span className="input-group-addon-standar"><i className="fa fa-globe"></i></span>
                        <AsyncComponent
                            value={this.state.startLocation}
                            onChange={this.onChange}
                            valueKey="id" labelKey="City"
                            loadOptions={this.getCity}
                            className=""
                            clearable={true}
                            placeholder='Donde recogera el auto?'
                        />

                    </div>
                    <span id='spanPickUpLocation' className='out'>Selecciona ubicacion</span>
                </Grid.Row>
                <Grid.Row centered id='return'>
                    <div className={`selectFormSearch ${this.state.UI.checkbox}`} >
                        <span className="input-group-addon-standar"><i className="fa fa-globe"></i></span>
                        <AsyncComponent
                            value={this.state.returnLocation}
                            onChange={this.onChangeReturn}
                            valueKey="id" labelKey="City"
                            loadOptions={this.getCity}
                            className=""
                            clearable={true}
                            placeholder='Donde entregara el auto?'

                        />
                    </div>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column width={16}>
                        <Form.Field id='checkLocation'
                            control={Checkbox}
                            onClick={this.showReturn}
                            defaultChecked
                            label={<label className="spanWhite checkboxForm">Entregar en la misma ubicacion</label>}
                        />
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        );

    }

}

FormAutoComplete.propTypes = {

};


export default FormAutoComplete;