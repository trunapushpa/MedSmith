import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import cities from './cities'
import FieldFileInput from './field-file-input-component'

class DoctorRegComponent extends Component {
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
                            <label htmlFor="reg_no">Registration Number *</label>
                            <Field name="reg_no" className="form-control" component="input" type="input"
                                   placeholder="Enter your registration number" required={true}/>
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

                        <Field name="file" component={FieldFileInput} labl="ID Proof *" required={true}/>

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
                        <div className="form-check">
                            <label className="form-check-label" htmlFor="acceptc">
                                <Field name="acceptc" className="form-check-inline" id="acceptc" component="input"
                                       type="checkbox" required={true}/> &nbsp;&nbsp;&nbsp;Accept Terms and Conditions
                            </label>
                        </div>
                        <br/>
                        <div className="form-group App">
                            <button className="btn btn-primary" type="submit">Submit</button>
                        </div>
                    </form>
                </div>
                {/*</div>*/}
            </div>
        )
    }
}

DoctorRegComponent = reduxForm({
    form: 'doctor_reg',
    initialValues: {
        fname: '',
        lname: '',
        email: '',
        pwd: '',
        region: '',
        reg_no: '',
        gender: 'male'
    }
})(DoctorRegComponent);

export default DoctorRegComponent;