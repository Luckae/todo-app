import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import '../App.css';
import Swal from "sweetalert2";
import logo from '../assets/images/logo.png';

class Register extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      password: '',
      isLoading: false,
      isDisabled: false
    }
  }

  validateForm = () => {
    const { username, password } = this.state;
    if(username.length == 0){
      Swal.fire({
        title: "Empty!",
        text: "Please enter username",
        icon: "error",
        confirmButtonText: "OK",
      });
    }else if(password.length == 0){
      Swal.fire({
        title: "Empty!",
        text: "Please enter password",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  }
  render(){
    const { isLoading, isDisabled } = this.state;
    return(
      <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3">
          <h2 class="text-center text-dark mt-5">Register Form</h2>
          <div class="text-center mb-5 text-dark">App Academy</div>
          <div class="card my-5">

            <form class="card-body cardbody-color p-lg-5">

              <div class="text-center">
                <img src={logo} class="img-fluid profile-image-pic img-thumbnail my-3"
                  width="200px" alt="logo" />
              </div>

              <div class="mb-3">
                <input type="text" class="form-control" id="Username" aria-describedby="emailHelp"
                  placeholder="User Name" />
              </div>
              <div class="mb-3">
                <input type="password" class="form-control" id="password" placeholder="password" />
              </div>
              <div class="text-center"><button type="button" disabled={isDisabled} onClick={(e) => this.validateForm()} class="btn btn-danger font-weight-bold px-5 mb-5 w-100">Create Account</button></div>
              <div id="emailHelp" class="form-text text-center mb-5 text-dark">Already
                Registered? <Link to="/login" class="text-dark fw-bold">Login</Link>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
    )
  }
}

export default withRouter(Register)
