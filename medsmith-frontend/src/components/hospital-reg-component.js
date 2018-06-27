import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import cities from './cities'

class HospitalRegComponent extends Component {
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
                            <label htmlFor="name">Hospital Name *</label>
                            <Field name="name" className="form-control" component="input" type="input"
                                   placeholder="Enter hospital's name" required={true}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Official Email *</label>
                            <Field name="email" className="form-control" component="input" type="email"
                                   placeholder="Enter address" required={true}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="pwd">Password *</label>
                            <Field name="pwd" className="form-control" component="input" type="password"
                                   placeholder="Password" required={true}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Address *</label>
                            <Field name="address" className="form-control" component="textarea" type="input"
                                   placeholder="Enter address" required={true}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="manager_name">Manager's Name *</label>
                            <Field name="manager_name" className="form-control" component="input" type="input"
                                   placeholder="Enter name of the person managing MedSmith" required={true}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="manager_phone">Manager's Phone *</label>
                            <Field name="manager_phone" className="form-control" component="input" type="input"
                                   placeholder="Enter phone number" required={true}/>
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

HospitalRegComponent = reduxForm({
    form: 'hospital_reg',
    initialValues: {
        name: '',
        address: '',
        email: '',
        manager_name: '',
        manager_phone: '',
        pwd: '',
        region: ''
    }
})(HospitalRegComponent);

export default HospitalRegComponent;