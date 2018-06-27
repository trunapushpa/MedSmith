import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import { withRouter, Link } from 'react-router-dom'

class PatientDashboardContainer extends Component {
    render() {
        return (
            <div>
                <div className="container" style={{paddingBottom: '10px',paddingLeft: '10px'}}>
                    <h3>Welcome {this.props.user.name}</h3>
                </div>
            <div className="container mycard" style={{display: 'flex', flexWrap: 'wrap'}}>
                <div className="card border-primary mb-3" style={{maxWidth: '20rem', marginTop: '10px', marginBottom: '10px', marginLeft: '10px', marginRight: '10px'}}>
                    <Link to="/permissions">
                    <div className="card-header">Manage Permissions</div>
                    <div className="card-body">
                        <h4 className="card-title">Hospitals/Doctors</h4>
                        <p className="card-text">Grant/Forfeit permission to hospitals and doctors so that they can access your medical records.</p>
                    </div>
                    </Link>
                </div>
            </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.auth
    }
};

const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
};

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(PatientDashboardContainer))