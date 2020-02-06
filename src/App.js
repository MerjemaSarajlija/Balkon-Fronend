import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import './App.css';
import { Route, Switch, } from 'react-router-dom';
import Login from './Components/Login';
import Home from './Components/Home';
import AddContact from './Components/AddContact'
import UpdateContact from './Components/UpdateContact'


class App extends Component {

  render() {
    return (
      <div>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/home" exact component={Home} />
          <Route path="/addContact" exact component={AddContact} />
          <Route path="/updateContact/:id" exact component={UpdateContact}></Route>
        </Switch>
      </div>
    );
  }
}

export default App;
