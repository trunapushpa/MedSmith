import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';

class GrantDocAccess extends Component {
    componentDidMount() {
        console.log('[Mounted] Grant Doc Form');
        this.props.getAllDocs();
    }

    render() {
        return (
            <div>
                {(this.props.grantDocSuccessMsg) ? <div className="container">
                    <br/>
                    <div className="alert alert-dismissible alert-success">
                        <button type="button" className="close" data-dismiss="alert">&times;</button>
                        <strong>Success!</strong> Doctor added.
                    </div>
                </div> : null}
                {(!this.props.allDocsLoading && !this.props.grantDocLoading) ?
                    <form onSubmit={this.props.handleSubmit}>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Doctor:</label>
                                <Field name="id" className="form-control" component="select"
                                       placeholder="Select a doctor" required={true}>
                                    <option hidden value=''>Select a doctor</option>
                                    {
                                        this.props.allDocs.map((doc) => {
                                            return <option key={doc.id} value={doc.id}
                                                           className="list-group-item">{doc.name} ({doc.email})</option>
                                        })
                                    }
                                </Field>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary">Submit</button>
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>
                    </form> :
                    <div>
                        <div className="modal-body">
                            <div className="loader loader-simple"/>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Close</button>
                        </div>
                    </div>}
            </div>
        )
    }
}

GrantDocAccess = reduxForm({
    form: 'grant_doc_access',
    initialValues: {
        id: ''
    }
})(GrantDocAccess);

export default GrantDocAccess;