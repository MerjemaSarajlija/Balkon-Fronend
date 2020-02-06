import React, { Component } from 'react';
import '../Css/Home.css'



export default class Home extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      contacts: [],
      error: null
    }

  }

  navigateUpdate = (e, data) => {
    e.preventDefault();
    this.props.history.push({
      pathname: '/updateContact/' + data._id,
      data: data
    })
  }

  componentDidMount() {
    this.fetchUsers();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  navigate() {
    this.props.history.push('/addContact');
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('token');
    this.props.history.push('/');
  }

  fetchUsers() {
    this._isMounted = true;
    // Where we're fetching data from
    fetch('/v0/contact/get', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": localStorage.token
      }
    })
      // We get the API response and receive data in JSON format...
      .then(response => response.json())
      // ...then we update the contacts state
      .then(
        data => {
          if (this._isMounted) {
            this.setState({
              contacts: data,
              isLoading: false,
            })
          }
        }
      )
      // Catch any errors we hit and update the app
      .catch(error => this.setState({ error, isLoading: false }));
  }

  deleteContact = (e, id) => {
    e.preventDefault();
    fetch('/v0/contact/delete/' + id, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": localStorage.token
      }
    }).then(res => {
      if (res.status === 200) {
        window.location.reload(false);
      } else {
        const error = new Error(res.error);
        console.log(error);
        throw error;
      }
    })
  }

  render() {
    if (this.state.isLoading) return null;
    let items = this.state.contacts.contacts;
    return (
      <div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-8">
            </div>
            <div className="col-md-2">
              <button className="confirm-btn grey-button" onClick={this.navigate.bind(this)} >ADD CONTACT</button>
            </div>
            <div className="col-md-2">
              <button className="confirm-btn grey-button" onClick={this.logout.bind(this)} >LOGOUT</button>
            </div>
          </div>
        </div>
        {
          Object.keys(items).map(key => {
            return (
              <div className="container-fluid" key={key}>
                <div className="row md-3">
                  <div className="col-md-2">
                    <img src="https://electrostar.be/wp-content/uploads/2018/09/profile-placeholder.jpg" alt="" width="100%" />
                  </div>
                  <div className="col-md-10">
                    <h1> {items[key].firstName} {items[key].secondName} </h1>
                    <h4>Phone: {items[key].phone}</h4>
                    <h4>Address: {items[key].address}</h4>
                    <h4>Note: {items[key].note}</h4>
                    <div className="row">
                      <div className="col-md-2">
                        <button className="confirm-btn" onClick={e => this.deleteContact(e, items[key]._id)}>DELETE</button>
                      </div>
                      <div className="col-md-2">
                        <button className="confirm-btn grey-button" onClick={e => this.navigateUpdate(e, items[key])}>EDIT</button>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    );
  }

}
