import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { baseUrl } from '../components/BaseUrl';
import '../App.css';
import Swal from "sweetalert2";
import logo from '../assets/images/logo.png';

class Register extends Component {
  constructor(props){
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      isLoading: false,
      isDisabled: false
    }
  }

  validateForm = () => {
    const { username, email, password } = this.state;
    if(username.length == 0){
      Swal.fire({
        title: "Empty!",
        text: "Please enter username",
        icon: "error",
        confirmButtonText: "OK",
      });
    }else if(email.length == 0){
      Swal.fire({
        title: "Empty!",
        text: "Please enter email",
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
      this.doRegister();
    }
  }

  doRegister = () => {
    const { username, email, password } = this.state;
    this.setState({isLoading: true, isDisabled: true})
    let req = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: `${username}`,
        email: `${email}`,
        password: `${password}`,

      }),
    };
    fetch(`${baseUrl}register`, req)
      .then((response) => response.json())
      .then((responseJson) => {
        // console.warn(responseJson);
        if(responseJson.msg === "This email is already in use"){
          this.setState({isLoading: false, isDisabled: false})
          Swal.fire({
            title: "Duplicate Attempt",
            text: 'Email is already taken',
            icon: "error",
            confirmButtonText: "OK",
          })
        }else if(responseJson.msg === "Registration successful!"){
          Swal.fire({
            title: "Success",
            text: 'Registration successful!',
            icon: "success",
            confirmButtonText: "OK",
          }).then(()=> {
            this.props.history.push("/login")
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
          <h2 className="text-center text-dark mt-5">Account Registration</h2>
          <div className="text-center mb-5 text-dark">App Academy</div>
          <div className="card my-5">

            <form className="card-body cardbody-color p-lg-5">

              <div className="text-center">
                <img src={logo} className="img-fluid profile-image-pic img-thumbnail my-3"
                  width="200px" alt="logo" />
              </div>

              <div className="mb-3">
                <input type="text" className="form-control" id="Username" aria-describedby="Username"
                  placeholder="Username"
                  onChange={(e) =>
                    this.setState({ username: e.target.value })
                  }
                  />
              </div>
              <div className="mb-3">
                <input type="text" className="form-control" id="email" aria-describedby="Email"
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
              <div className="text-center"><button type="button" disabled={isDisabled} onClick={(e) => this.validateForm()} class="btn btn-danger font-weight-bold px-5 mb-5 w-100">
              {isLoading ? (
                'loading ...'
              ) : (
                "Create Account"
              )}
              </button></div>
              <div id="emailHelp" className="form-text text-center mb-5 text-dark">Already
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
