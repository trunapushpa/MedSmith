import React, {Component} from 'react';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {withRouter} from 'react-router-dom'
import GrantDocAccess from "../components/grant-access-doc-form";
import GrantHosAccess from "../components/grant-access-hos-form";
import {
    getAllDocsClick,
    grantDocClick,
    getAllHosClick,
    grantHosClick,
    getGrantedDocsClick,
    removeDoc, getGrantedHosClick, removeHos
} from "../actions";

class PatientPermissionsContainer extends Component {
    componentDidMount() {
        console.log('[Mounted] Permissions Container');
        this.props.getGrantedDocsClick();
        this.props.getGrantedHosClick();
        // call get_doctors and get_hospitals
    }

    render() {
        return (
            <div>
                <div className={"container"}>
                    <div className="flex-wrap">
                        <button className="btn btn-success" style={{
                            marginLeft: '10px',
                            marginRight: '10px',
                            marginBottom: '10px',
                            marginTop: '10px'
                        }} data-toggle="modal" data-target="#addPermsHospital">Add
                            Hospital
                        </button>
                        &nbsp;
                        <button className={"btn btn-success"} style={{
                            marginLeft: '10px',
                            marginRight: '10px',
                            marginBottom: '10px',
                            marginTop: '10px'
                        }} data-toggle="modal" data-target="#addPermsDoctor">Add
                            Doctor
                        </button>
                    </div>
                    <br/>
                    <p>Grant access to hospitals and doctors so they can view your medical records.</p>
                    <br/>
                    <legend>Hospitals</legend>
                    <hr/>
                    <small> Here Hospitals which can view your records are displayed</small><br/><br/>
                    <div className="container bg-white" style={{paddingTop: '5px', paddingBottom: '5px'}}>
                        {(this.props.getGrantedHosReducer.grantedHosLoading) ? <div className="loader loader-simple"/> :
                            <table className="table table-hover table-borderless">
                                <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Remove</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.props.getGrantedHosReducer.grantedHos.map((hos, i) => {
                                        return <tr key={hos.id}>
                                            <td>{i+1}</td>
                                            <td>{hos.name}</td>
                                            <td>{hos.email}</td>
                                            <td><button className="btn btn-danger btn-sm" onClick={()=>{this.props.removeHos(hos.id)}}>Remove</button></td>
                                        </tr>
                                    })
                                }
                                </tbody>
                            </table>}
                    </div>
                    <br/><br/>
                    <legend>Doctors</legend>
                    <hr/>
                    <small> Here Doctors who can view your records are displayed</small><br/><br/>
                    <div className="container bg-white" style={{paddingTop: '5px', paddingBottom: '5px', marginBottom: '50px'}}>
                        {(this.props.getGrantedDocsReducer.grantedDocsLoading) ? <div className="loader loader-simple"/> :
                            <table className="table table-hover table-borderless">
                                <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Remove</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    this.props.getGrantedDocsReducer.grantedDocs.map((doc, i) => {
                                        return <tr key={doc.id}>
                                            <td>{i+1}</td>
                                            <td>{doc.name}</td>
                                            <td>{doc.email}</td>
                                            <td><button className="btn btn-danger btn-sm" onClick={()=>{this.props.removeDoc(doc.id)}}>Remove</button></td>
                                        </tr>
                                    })
                                }
                                </tbody>
                            </table>}
                    </div>
                </div>
                <div className="modal fade" id="addPermsDoctor">
                    <div className="modal-dialog">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h4 className="modal-title">Grant Access to Doctor</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>

                            <GrantDocAccess getAllDocs={this.props.getAllDocs} allDocs={this.props.allDocs}
                                            allDocsLoading={this.props.allDocsLoading}
                                            onSubmit={this.props.grantDocClick}
                                            grantDocLoading={this.props.grantDocLoading}
                                            grantDocSuccessMsg={this.props.grantDocSuccessMsg}
                            />

                        </div>
                    </div>
                </div>
                <div className="modal fade" id="addPermsHospital">
                    <div className="modal-dialog">
                        <div className="modal-content">

                            <div className="modal-header">
                                <h4 className="modal-title">Grant Access to Hospital</h4>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                            </div>

                            <GrantHosAccess getAllHos={this.props.getAllHos} allHos={this.props.allHos}
                                            allHosLoading={this.props.allHosLoading}
                                            onSubmit={this.props.grantHosClick}
                                            grantHosLoading={this.props.grantHosLoading}
                                            grantHosSuccessMsg={this.props.grantHosSuccessMsg}
                            />

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        allDocs: state.getAllDocs.allDocs,
        allDocsLoading: state.getAllDocs.allDocsLoading,
        grantDocLoading: state.grantDocReducer.grantDocLoading,
        grantDocSuccessMsg: state.grantDocReducer.grantDocSuccessMsg,
        allHos: state.getAllHos.allHos,
        allHosLoading: state.getAllHos.allHosLoading,
        grantHosLoading: state.grantHosReducer.grantHosLoading,
        grantHosSuccessMsg: state.grantHosReducer.grantHosSuccessMsg,
        getGrantedDocsReducer: state.getGrantedDocsReducer,
        getGrantedHosReducer: state.getGrantedHosReducer
    }
};

const matchDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getAllDocs: getAllDocsClick,
        grantDocClick: grantDocClick,
        getAllHos: getAllHosClick,
        grantHosClick: grantHosClick,
        getGrantedDocsClick: getGrantedDocsClick,
        removeDoc: removeDoc,
        getGrantedHosClick: getGrantedHosClick,
        removeHos: removeHos
    }, dispatch);
};

export default withRouter(connect(mapStateToProps, matchDispatchToProps)(PatientPermissionsContainer))