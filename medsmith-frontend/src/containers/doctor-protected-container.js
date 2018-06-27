import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Route, Link, withRouter, Redirect, Switch} from 'react-router-dom';
import DoctorDashboardContainer from './doctor-dashboard-container';
import {logoutClick} from "../actions";
import logo from '../css/logo.svg'

const MenuLink = ({ label, to, activeOnlyWhenExact }) => (
    <Route
        path={to}
        exact={activeOnlyWhenExact}
        children={({ match }) => (
                <Link to={to} className={match ? "nav-link active" : "nav-link"}>{label}</Link>
        )}
    />
);

class DoctorProtectedContainer extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark fixed-top bg-dark">
                    <Link className="navbar-brand" to="/"><img src={logo} className="nav-logo" alt="logo" height="30px"/>&nbsp;&nbsp;MedSmith</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01"
                            aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarColor01">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <MenuLink to="/dashboard" label="Dashboard"/>
                            </li>
                        </ul>
                        <button className="btn btn-secondary my-2 my-sm-0" type="button" onClick={this.props.logoutClick}>Logout</button>
                    </div>
                </nav>
                <br/><br/><br/><br/>
                <Switch>
                    <Route path="/dashboard" component={DoctorDashboardContainer}/>
                    <Route render={()=>(
                        <Redirect to="/dashboard"/>
                    )}/>
                </Switch>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {}
};

const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({
        logoutClick: logoutClick
    }, dispatch);
};

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(DoctorProtectedContainer))