import React, { Component } from 'react';

export default class UpdateContact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: this.props.location.data.firstName,
            secondName: this.props.location.data.secondName,
            phone: this.props.location.data.phone,
            address: this.props.location.data.address,
            note: this.props.location.data.note
        }
    }

    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });

    }

    updateContact = (event) => {
        event.preventDefault();
        let id = this.props.location.data._id;
        fetch('/v0/contact/edit/' + id, {
            method: 'POST',
            body: JSON.stringify(this.state),
            headers: {
                'Content-Type': 'application/json',
                "Authorization": localStorage.token
            }
        }).then(res => {
            if (res.status === 200) {
                this.props.history.push('/home');

            } else {
                const error = new Error(res.error);
                throw error;
            }
        })
    }

    render() {
        return (
            <div>
                <div className="container">
                    <div className="addContact-form">
                        <h1 className="title">Edit Contact</h1>
                        <form onSubmit={this.updateContact}>
                            <div className="form-group">
                                <label>First Name</label>
                                <input className="form-control" type="text" name="firstName" value={this.state.firstName} onChange={this.handleInputChange} required />
                            </div>
                            <div className="form-group">
                                <label>Second Name</label>
                                <input className="form-control" type="text" name="secondName" value={this.state.secondName} onChange={this.handleInputChange} required />
                            </div>
                            <div className="form-group">
                                <label>Phone</label>
                                <input className="form-control" type="text" name="phone" value={this.state.phone} onChange={this.handleInputChange} required />
                            </div>
                            <div className="form-group">
                                <label>Address</label>
                                <input className="form-control" type="text" name="address" value={this.state.address} onChange={this.handleInputChange} required />
                            </div>
                            <div className="form-group">
                                <label>Note</label>
                                <input className="form-control" type="text" name="note" value={this.state.note} onChange={this.handleInputChange} />
                            </div>
                            <button className="btn btn-primary btn-block" type="submit" value="Submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
