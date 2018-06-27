import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import { withRouter, Link } from 'react-router-dom'

class DoctorDashboardContainer extends Component {
    render() {
        return (
            <div>
            <div className="container mycard" style={{display: 'flex', flexWrap: 'wrap'}}>
                <div className="card border-primary mb-3" style={{maxWidth: '20rem', marginTop: '10px', marginBottom: '10px', marginLeft: '10px', marginRight: '10px'}}>
                    <Link to="/permissions">
                    <div className="card-header">View Permissions</div>
                    <div className="card-body">
                        <h4 className="card-title">Patients</h4>
                        <p className="card-text">View the patients who have given access to their medical records.</p>
                    </div>
                    </Link>
                </div>
            </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {}
};

const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({}, dispatch);
};

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(DoctorDashboardContainer))