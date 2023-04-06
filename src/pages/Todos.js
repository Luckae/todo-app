import React, { Component } from 'react';
import logo from '../assets/images/logo.png';
import { baseUrl } from '../components/BaseUrl';
import Swal from "sweetalert2";

class Todos extends Component {

  constructor(props){
    super(props);
    this.state = {
      tasks: [],
      item: "",
      isAddingItem: false,
      isFetchingTasks: false,
      isUpdatingStatus: false,
      isRemovingItem: false,
      postsPerPage: 10,
      currentPage: 1,
    }
  }

  checkToken = () => {
    if(!localStorage.getItem("token")){
      this.props.history.push("/login")
    }
  }

  logout = () => {
    localStorage.clear()
    if(localStorage.getItem("token") === null) {
      this.props.history.push("/login")
    }
  }

  componentDidMount(){
    this.checkToken();
    this.getTodoList()
  }


  //=========================================
    //START OF UPDATE TASK
  //=========================================
  updateTask = async (id) => {
    let params = id.split(",")
    this.setState({isUpdatingStatus: true})
    let req = {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: `${params[1]}`,
        description: null,
        completed: true,
      }),
    };
    await fetch(`${baseUrl}todoApp/tasks/${params[0]}`, req)
      .then((response) => response.json())
      .then((responseJson) => {
        console.warn(responseJson);
        if(responseJson && responseJson.id){
          this.setState({isUpdatingStatus: false, isDisabled: false})
          Swal.fire({
            title: "Success",
            text: 'Status updated successfully!',
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            window.location.reload()
          })
        }else{
          this.setState({isUpdatingStatus: false, isDisabled: false})
          Swal.fire({
            title: "Error!",
            text: 'An error occurred. Please try again later.',
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      })
      .catch((error) => {
        this.setState({isUpdatingStatus: false, isDisabled: false})
        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      })
  }
  //=========================================
    //END OF UPDATE TASK
  //=========================================

  //=========================================
    //START OF DELETE TASK
  //=========================================
  deleteTask = (id) => {
    this.setState({isRemovingItem: true})
    const url = `${baseUrl}todoApp/tasks/${id}`;
    fetch(url, {
      method: 'DELETE',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
      },
    })
      .then(res => res.json())
      .then(res => {
        // console.warn(res);
        if(res.message === "Task deleted"){
            this.setState({isRemovingItem: false});
          Swal.fire({
            title: "Success",
            text: "Task removed successfully",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
              window.location.reload()
          })
        }else{
          Swal.fire({
            title: "Error",
            text: "An error occurred, please try again",
            icon: "error",
            confirmButtonText: "OK",
          })
          this.setState({isRemovingItem: false});
        }
      })
      .catch(error => {
        this.setState({isRemovingItem: false});
        alert(error);
      });
  }
  //=========================================
    //END OF DELETE TASK
  //=========================================

  //=========================================
    //START OF GET ALL TASK
  //=========================================
  getTodoList = async () => {
    this.setState({ isFetchingTasks: true})
    let obj = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };
    await fetch(`${baseUrl}todoApp/tasks`, obj)
      .then((response) => response.json())
      .then((responseJson) => {
        // console.warn(responseJson);
        if (responseJson) {
            this.setState({ tasks: responseJson, isFetchingTasks: false });
          }else{
            this.setState({ isFetchingTasks: false })
            Swal.fire({
              title: "Error!",
              text: "Could not retrieve todo list. Please try again later",
              icon: "error",
              confirmButtonText: "OK",
            })
          }
      })
      .catch((error) => {
        this.setState({ isFetchingTasks: false })
        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  }

  //=========================================
    //END OF GET ALL TASK
  //=========================================

  showTasks = () => {
    const { postsPerPage, currentPage, isRemovingItem, tasks } = this.state;
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = parseInt(indexOfLastPost) - parseInt(postsPerPage);
    const currentPosts = tasks.slice(indexOfFirstPost, indexOfLastPost);
    try {
      return currentPosts.map((item, index) => {
        return (
          <tr>
         <td className="text-xs font-weight-bold">{index +1}</td>
         <td className="text-xs text-capitalize font-weight-bold">{item.title}</td>
         <td className={item.completed.toString() === "true" ? 'badge bg-success mt-3' : "badge bg-warning mt-3" }>{item.completed.toString()}</td>
         <td><button className="btn btn-success" id={item.id} onClick={() => this.updateTask(`${item.id}, ${item.title}`)}>Update</button></td>
         <td><button className="btn btn-danger" id={item.id} onClick={() => this.deleteTask(`${item.id}`)}>Delete</button></td>
         </tr>
          );
      });
    } catch (e) {
      // Swal.fire({
      //   title: "Error",
      //   text: e.message,
      //   type: "error",
      // })
    }
  }

  //=========================================
    //START OF PAGINATION
  //=========================================
  showPagination = () => {
    const { postsPerPage, tasks } = this.state;
    const pageNumbers = [];
    const totalPosts = tasks.length;
    for(let i = 1; i<= Math.ceil(totalPosts/postsPerPage); i++){
      pageNumbers.push(i)
    }

   const paginate = (pageNumbers) => {
     this.setState({currentPage: pageNumbers})
   }
    return(
      <nav>
      <ul className="pagination mt-4" style={{float: 'right', position: 'relative', right: 54}}>
      {pageNumbers.map(number => (
        <li key={number} className={this.state.currentPage === number ? 'page-item active' : 'page-item'}>
        <button onClick={()=> paginate(number)} className="page-link">
          { number }
        </button>
       </li>
     ))}
      </ul>
      </nav>
    )
  }
  //=========================================
    //END OF PAGINATION
  //=========================================


  //=========================================
    // START OF CREATE TODO TASK
  //=========================================

  createTodo = async () => {
    const { item } = this.state;
    this.setState({isAddingItem: true, isDisabled: true})
    let req = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: `${item}`,
        description: "hello",
        completed: false,
      }),
    };
    await fetch(`${baseUrl}todoApp/tasks`, req)
      .then((response) => response.json())
      .then((responseJson) => {
        // console.warn(responseJson);
        if(responseJson){
          this.setState({isAddingItem: false, isDisabled: false})
          Swal.fire({
            title: "Success",
            text: 'Task added successfully!',
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            window.location.reload()
          })
        }else{
          this.setState({isAddingItem: false, isDisabled: false})
          Swal.fire({
            title: "Error!",
            text: 'An error occurred. Please try again later.',
            icon: "error",
            confirmButtonText: "OK",
          });
        }
      })
      .catch((error) => {
        this.setState({isAddingItem: false, isDisabled: false})
        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      })
     }
     //=========================================
       //END OF CREATE TODO TASK
     //=========================================




  render(){
    const { isAddingItem, isUpdatingStatus, isRemovingItem, isFetchingTasks } = this.state;
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
          <input className="add-todo-input" type="text" placeholder="Add item" onChange={(e) =>
            this.setState({ item: e.target.value })
          } />
          <button type="button" onClick={(e) => this.createTodo()} className="add-todo-btn">
          {isAddingItem ? (
            'adding item ...'
          ) : (
            "Add"
          )}
          </button>
        </form>

        <div className="container-fluid py-4">
        <div className="table-responsive p-0 pb-2">
          {isRemovingItem && <p className="text-center text-danger">Removing item ...</p>}
          {isUpdatingStatus && <p className="text-center text-success">Updating Status ...</p>}
      <table className="table align-items-center justify-content-center mb-0">
          <thead>
              <tr>
              <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">S/N</th>
              <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">Task</th>
              <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">Completed</th>
              <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">Update</th>
              <th className="text-uppercase text-secondary text-sm font-weight-bolder opacity-7 ps-2">Delete</th>
              </tr>
          </thead>
          {isFetchingTasks ? <div style={{ position: 'relative', top: 10, left: 250}} class="spinner-border text-success" role="status">
            <span className="sr-only">Loading...</span>
          </div> :
          <tbody>
             {this.showTasks()}
          </tbody>
        }
          </table>
          </div>
          <div style={{float: 'right'}}>
          {this.showPagination()}
          </div>
          </div>



      </div>
      </div>
      </div>
    )
  }
}

export default Todos;
