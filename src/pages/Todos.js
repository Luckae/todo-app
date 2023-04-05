import React, { Component } from 'react';
import logo from '../assets/images/logo.png';

class Todos extends Component {

  checkToken = () => {
    if(!localStorage.getItem("token")){
      this.props.history.push("/login")
    }
  }

  logout = () => {
    if(localStorage.clear()) {
      this.props.history.push("/login")
    }
  }

  componentDidMount(){
    this.checkToken();
  }

  render(){
    return(
      <div className="container">
      <div className="text-center">
        <img src={logo} className="img-fluid profile-image-pic img-thumbnail my-3"
          width="200px" alt="logo" />
      </div>
      <div className="info-container">
      <div className="user-name">
      <h2>Hello {`${localStorage.getItem("name")}`}</h2>
      </div>
      <div className="user-name mb-2">
      <button className="btn btn-danger" onClick={(e) => this.logout()} style={{ fontSize: 18 }}>Logout</button>
      </div>
      </div>
      <div className="todo-container">
      <div className="todo-app">
        <form className="add-todo-form">
          <input className="add-todo-input" type="text" placeholder="Add a to-do item" />
          <button type="button" className="add-todo-btn">Add</button>
        </form>
        <ul className="todo-list"></ul>
      </div>
      </div>
      </div>
    )
  }
}

export default Todos;
