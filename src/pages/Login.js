import React, { Component } from 'react';
import { withRouter, Router, NavLink, Link } from 'react-router-dom';
import '../App.css';
import Swal from "sweetalert2";
import logo from '../assets/images/logo.png';

class Login extends Component {

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
          <h2 class="text-center text-dark mt-5">Login Form</h2>
          <div class="text-center mb-5 text-dark">App Academy</div>
          <div class="card my-5">

            <form class="card-body cardbody-color p-lg-5">

              <div class="text-center">
                <img src={logo} class="img-fluid profile-image-pic img-thumbnail my-3"
                  width="200px" alt="logo" />
              </div>

              <div class="mb-3">
                <input type="text" class="form-control" id="Username" aria-describedby="emailHelp"
                  placeholder="User Name"
                  onChange={(e) =>
                    this.setState({ username: e.target.value })
                  }
                  />
              </div>
              <div class="mb-3">
                <input type="password" class="form-control" id="password" placeholder="password"
                onChange={(e) =>
                  this.setState({ password: e.target.value })
                }
                />
              </div>
              <div class="text-center"><button disabled={isDisabled} onClick={(e) => this.validateForm()} type="button" class="btn btn-danger font-weight-bold px-5 mb-5 w-100">
              {isLoading ? (
                'loading ...'
              ) : (
                "Login"
              )}
              </button></div>
              <div id="emailHelp" class="form-text text-center mb-5 text-dark">Not
                Registered? <Link to="/register" class="text-dark fw-bold"> Create an
                  Account</Link>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>

    )
  }
}

export default withRouter(Login)
