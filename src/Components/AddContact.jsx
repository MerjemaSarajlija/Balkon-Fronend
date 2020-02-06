import React, { Component } from 'react';

export default class AddContact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            secondName: "",
            phone: "",
            address: "",
            note: ""
        }
    }

    handleInputChange = (event) => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        });

    }

    addContact = (event) => {
        event.preventDefault();
        fetch('/v0/contact/create', {
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
               <h1 className="title">Add Contact</h1>
               <form onSubmit={this.addContact}>
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
                   <input className="form-control" type="text" name="note" value={this.state.note} onChange={this.handleInputChange}  />
                 </div>
                 <button className="btn btn-primary btn-block" type="submit" value="Submit">Submit</button>
               </form>
             </div>
           </div>
         </div>
       );
     }
}

  

  
