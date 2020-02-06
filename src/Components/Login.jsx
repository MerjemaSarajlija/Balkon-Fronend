import React, { Component } from 'react';

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      user: null,
      id: ''
    };

  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });

  }

  onSubmit = (event) => {
    event.preventDefault();
    fetch('/v0/accounts/signin', {
      method: 'POST',
      body: JSON.stringify(this.state),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => {
      if (res.status === 200) {
        res.json().then((data) => {
          localStorage.setItem('token', data.token);
          this.props.history.push('/home');

        })
      } else {
        const error = new Error(res.error);
        throw error;
      }
    })
      .catch(err => {
        console.error(err);
        alert('Error logging in please try again');
      });
  }

  render() {
    const backStyle = {
      position: "relative"
    };
    const lForm = {
      margin: "10% 0 0 0"
    }
    return (
      <div className="container-fluid" style={backStyle}>
        <div className="row mt-3">
          <div className="col-md-8">
            <img src="https://aircall.io/wp-content/uploads/2016/10/how-to-implement-a-precise-and-effective-omnichannel-strategy.png" alt="" width="100%" />
          </div>
          <div className="col-md-3" style={lForm}>
            <div className="container">
              <div className="login-form">
                <h1 className="title">Log in</h1>
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label>E-mail</label>
                    <input className="form-control" type="email" name="email" value={this.state.email} onChange={this.handleInputChange} required />
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input className="form-control" type="password" name="password" value={this.state.password} onChange={this.handleInputChange} required />
                  </div>
                  <button className="btn btn-primary btn-block" type="submit" value="Submit">Log in</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}