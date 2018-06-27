import React, {Component} from 'react'

export default class FieldFileInput extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this)
    }

    onChange(e) {
        const {input: {onChange}} = this.props;
        onChange(e.target.files[0])
    }

    render() {
        const {input, labl} = this.props;  //whatever props you send to the component from redux-form Field
        return (
            <div className="form-group">
                <label>{labl}</label><br/>
                <input
                    type='file'
                    accept='.jpg, .png, .jpeg, .pdf'
                    onChange={this.onChange}
                    required={true}
                    className="form-control-file"
                />
                <small>Only &nbsp;<code>jpg, jpeg, png, pdf</code>&nbsp; files are supported</small>
            </div>
        )
    }
}