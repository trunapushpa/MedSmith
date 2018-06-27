import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import cities from './cities'
import diseases from './diseases'

class PatientRegComponent extends Component {
    render() {
        return (
            <div className="container col-lg-7">
                {/*<div className="col-form-label">*/}
                <div className="jumbotron">
                    <h1 style={{textAlign: "center"}}>Register</h1>
                    <small className="form-text text-muted" style={{textAlign: "center"}}>(We'll never share your
                        details with anyone else.)
                    </small>
                    <form onSubmit={this.props.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="fname">First Name *</label>
                            <Field name="fname" className="form-control" component="input" type="input"
                                   placeholder="Enter first name" required={true}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="lname">Last Name</label>
                            <Field name="lname" className="form-control" component="input" type="input"
                                   placeholder="Enter last name"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="Gender">Gender</label>
                            <div>
                                <div className="form-check-inline">
                                <label className="form-check-label">
                                    <Field name="gender" component="input" type="radio" value="male" className="form-check-input"/>Male
                                </label>
                                </div>
                                <div className="form-check-inline">
                                <label className="form-check-label">
                                    <Field name="gender" component="input" type="radio" value="female" className="form-check-input"/>Female
                                </label>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="dob">Date of Birth</label>
                            <Field name="dob" className="form-control" component="input" type="date"
                                   placeholder="Enter last name" required={true}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email address *</label>
                            <Field name="email" className="form-control" component="input" type="email"
                                   placeholder="Enter email" required={true}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="pwd">Password *</label>
                            <Field name="pwd" className="form-control" component="input" type="password"
                                   placeholder="Password" required={true}/>
                        </div>
                        <div className="form-group">
                            <label>Region *</label>
                            <Field name="region" className="form-control" component="input" list="region_list"
                                   placeholder="Enter city name" required={true}/>
                            {/*<Field name="region" component="select" className="form-control">*/}
                            {/*{cities.map((city, i) => {*/}
                            {/*return <option key={i}>{city}</option>*/}
                            {/*})}*/}
                            {/*</Field>*/}
                            {/*</div>*/}
                            <datalist id="region_list">{
                                cities.map((city, i) => {
                                    return <option key={i} value={city}/>
                                })
                            }</datalist>
                        </div>
                        <br/>
                        <legend>Additional Details</legend><hr/>
                        <div className="form-group">
                             {/* TODO: Add multiple such fields on add click and remove button for each */}
                            <label>Past ailments</label>
                            <Field name="past_ailments" className="form-control" component="input" list="diseases_list"
                                   placeholder="Enter past ailment" required={true}/>
                            <datalist id="diseases_list">{
                                diseases.map((disease, i) => {
                                    return <option key={i} value={disease}/>
                                })
                            }</datalist>
                        </div>
                        <div className="form-group">
                            <label htmlFor="surgical_history">Surgical history</label>
                            <Field name="surgical_history" className="form-control" component="textarea" type="input"
                                   placeholder="Enter any surgeries performed in past"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="med_allergies">Medical allergies</label>
                            <Field name="med_allergies" className="form-control" component="textarea" type="input"
                                   placeholder="Enter any medical allergies"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="family_history">Family history</label>
                            <Field name="family_history" className="form-control" component="textarea" type="input"
                                   placeholder="Eg: diabetes on paternal side"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="habits">Habits</label>
                            <Field name="habits" className="form-control" component="textarea" type="input"
                                   placeholder="Eg: tobacco use, alcohol intake, exercise, and diet habits"/>
                        </div>
                        <div className="form-check">
                            <label className="form-check-label" htmlFor="allow_rd">
                                <Field name="allow_rd" className="form-check-inline" id="allow_rd" component="input"
                                       type="checkbox"/> &nbsp;&nbsp;&nbsp;Allow your medical data to be used for research purposes
                            </label>
                        </div>
                        <div className="form-check">
                            <label className="form-check-label" htmlFor="acceptc">
                                <Field name="acceptc" className="form-check-inline" id="acceptc" component="input" value={true}
                                       type="checkbox" required={true}/> &nbsp;&nbsp;&nbsp;Accept Terms and Conditions
                            </label>
                        </div>
                        <br/>
                        <div className="form-group App">
                            <button className="btn btn-primary" type="submit">Submit</button>
                        </div>
                    </form>
                </div>
                {/*</div>*/
                }
            </div>
        )
    }
}

PatientRegComponent = reduxForm({
    form: 'patient_reg',
    initialValues: {
        fname: '',
        lname: '',
        email: '',
        pwd: '',
        region: '',
        gender: 'male',
        allow_rd: '',
        dob: '',
        surgical_history: '',
        med_allergies: '',
        family_history: '',
        habits: ''
    }
})(PatientRegComponent);

export default PatientRegComponent;