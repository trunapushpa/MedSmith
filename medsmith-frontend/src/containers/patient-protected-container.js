import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Route, Link, withRouter, Redirect, Switch} from 'react-router-dom';
import PatientDashboardContainer from './patient-dashboard-container';
import PatientPermissionsContainer from './patient-permissions-container';
import {logoutClick} from "../actions";
import logo from '../css/logo.svg';

const MenuLink = ({ label, to, activeOnlyWhenExact }) => (
    <Route
        path={to}
        exact={activeOnlyWhenExact}
        children={({ match }) => (
                <Link to={to} className={match ? "nav-link active" : "nav-link"}>{label}</Link>
        )}
    />
);

class PatientProtectedContainer extends Component {
    render() {
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark fixed-top bg-dark">
                    <Link className="navbar-brand nav-item" to="/"><img src={logo} className="nav-logo" alt="logo" height="30px"/>&nbsp;&nbsp;MedSmith</Link>
                    {/*<a className="navbar-brand" href="">MedSmith</a>*/}
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01"
                            aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"/>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarColor01">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <MenuLink to="/dashboard" label="Dashboard"/>
                                {/*<Link className={"nav-link"} to="/dashboard">Dashboard</Link>*/}
                            </li>
                            <li className="nav-item">
                                <MenuLink to="/permissions" label="Manage Permissions"/>
                                {/*<Link className={"nav-link"} to="/permissions">Modify Permissions</Link>*/}
                            </li>
                        </ul>
                        <button className="btn btn-secondary my-2 my-sm-0" type="button" onClick={this.props.logoutClick}>Logout</button>
                    </div>
                </nav>
                <br/><br/><br/><br/>
                <Switch>
                    <Route path="/dashboard" component={PatientDashboardContainer}/>
                    <Route path="/permissions" component={PatientPermissionsContainer}/>
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

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(PatientProtectedContainer))