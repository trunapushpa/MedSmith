import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';

class GrantHosAccess extends Component {
    componentDidMount() {
        console.log('[Mounted] Grant Hos Form');
        this.props.getAllHos();
    }

    render() {
        return (
            <div>
                {(this.props.grantHosSuccessMsg) ? <div className="container">
                    <br/>
                    <div className="alert alert-dismissible alert-success">
                        <button type="button" className="close" data-dismiss="alert">&times;</button>
                        <strong>Success!</strong> Hospital added.
                    </div>
                </div> : null}
                {(!this.props.allHosLoading && !this.props.grantHosLoading) ?
                    <form onSubmit={this.props.handleSubmit}>
                        <div className="modal-body">
                            <div className="form-group">
                                <label>Hospital:</label>
                                <Field name="id" className="form-control" component="select"
                                       placeholder="Select a hospital" required={true}>
                                    <option hidden value=''>Select a hospital</option>
                                    {
                                        this.props.allHos.map((hos) => {
                                            return <option key={hos.id} value={hos.id}
                                                           className="list-group-item">{hos.name} ({hos.email})</option>
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

GrantHosAccess = reduxForm({
    form: 'grant_hos_access',
    initialValues: {
        id: ''
    }
})(GrantHosAccess);

export default GrantHosAccess;