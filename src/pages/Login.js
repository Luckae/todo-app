import React, { Component } from 'react';
import { withRouter, Router, NavLink, Link } from 'react-router-dom';
import '../App.css';
import { baseUrl } from '../components/BaseUrl';
import Swal from "sweetalert2";
import logo from '../assets/images/logo.png';

class Login extends Component {

  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      isLoading: false,
      isDisabled: false
    }
  }

  validateForm = () => {
    const { email, password } = this.state;
    if(email.length == 0){
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
    }else{
      this.doLogin();
    }
  }

  doLogin = async () => {
    const { email, password } = this.state;
    this.setState({isLoading: true, isDisabled: true})
    let req = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: `${email}`,
        password: `${password}`,

      }),
    };
    await fetch(`${baseUrl}appAcademy/login`, req)
      .then((response) => response.json())
      .then((responseJson) => {
        // console.warn(responseJson);
        if(responseJson.msg === "Logged in!"){
          localStorage.setItem("token", responseJson.token)
          localStorage.setItem("name", responseJson.user.name)
          this.setState({isLoading: false, isDisabled: false})
          Swal.fire({
            title: "Success",
            text: 'Login successful!',
            icon: "success",
            confirmButtonText: "OK",
          }).then(()=> {
            this.props.history.push("/todo")
          })
        }else{
          this.setState({isLoading: false, isDisabled: false})
          Swal.fire({
            title: "Error!",
            text: 'An error occurred. Please try again later.',
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      })
      .catch((error) => {
        this.setState({isLoading: false, isDisabled: false})
        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      })
     }


  render(){
    const { isLoading, isDisabled } = this.state;
    return(
      <div className="container">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h2 className="text-center text-dark mt-5">Account Login</h2>
          <div className="text-center mb-5 text-dark">App Academy</div>
          <div className="card my-5">

            <form className="card-body cardbody-color p-lg-5">

              <div className="text-center">
                <img src={logo} className="img-fluid profile-image-pic img-thumbnail my-3"
                  width="200px" alt="logo" />
              </div>

              <div className="mb-3">
                <input type="email" className="form-control" id="email" aria-describedby="email"
                  placeholder="Email"
                  onChange={(e) =>
                    this.setState({ email: e.target.value })
                  }
                  />
              </div>
              <div className="mb-3">
                <input type="password" className="form-control" id="password" placeholder="password"
                onChange={(e) =>
                  this.setState({ password: e.target.value })
                }
                />
              </div>
              <div className="text-center"><button disabled={isDisabled} onClick={(e) => this.validateForm()} type="button" class="btn btn-danger font-weight-bold px-5 mb-5 w-100">
              {isLoading ? (
                'loading ...'
              ) : (
                "Login"
              )}
              </button></div>
              <div id="emailHelp" className="form-text text-center mb-5 text-dark">Not
                Registered? <Link to="/register" className="text-dark fw-bold"> Create an
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
