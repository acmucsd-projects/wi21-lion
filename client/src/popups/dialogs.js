import React from 'react';
import './dialogs.css';



export function DeleteDialog({ show, hide, pageType, pageName }) {

  // should I implement the delete post here or inside of whatever page we are calling it on?
  function onSubmit() {
    console.log('you deleted!!');

    // make api call to delete
    // if (pageType === 'class') {
    //   fetch(url, {
    //     method: 'DELETE',
    //     className: pageName
    //   })
    //   .then(response => {});
    // } else {
    //   fetch(url, {
    //     method: 'DELETE',
    //     className: pageName
    //   })
    //   .then(response => {});
    // }
   
    hide();
  }

  if(show) {
    return (
      <div className="backdrop">
        <div id="delete-dialog">
          <form>
            <h2>Are you sure you want to delete this page?</h2>
            <p>once a post is deleted it cannot be restored</p>
            <div>
              <button onClick={hide}>cancel</button>
              <button onClick={onSubmit}>confirm</button>
            </div>
          </form>
        </div>
      </div> 
    )
  } else {
    return null;
  }
}


export function LoginDialog({ show, hide }) {

  function handleLogin() {
    // get username and password inputs
    let username = document.getElementById('username');
    let password = document.getElementById('password');

    console.log(username);
    console.log(password);

    // clear input values
    username.value = "";
    password.value = "";

    // format and make get request for user key
    // fetch(url, {
    //   method: "GET",
    //
    // })
    // .then(response => (
    //    response.json();
    // ))
    // .then(data => {
    //   console.log(data) <-- this should be JWT token
    // })
    // .catch(error => {
    //   console.log(error);
    // });

    hide();
  }

  if (show) {
  

    // do we want to divert login to the home page or should I implement login functionality here
    return (
      <div className="backdrop">
        <div id="login-dialog">
          <button id="hide-btn" onClick={hide}>x</button>
          <form>
            <h1>Login</h1>
            <p>using your ucsd credentials</p>
            <label for="username"/>
            <input id="username" type="text" placeholder="PID"></input>
            <label for="password"/>
            <input id="password" type="text" placeholder="password"></input> 
            <button onClick={handleLogin}>Lets Go!</button>
          </form>
        </div>
      </div>
    )
  }else {
    return null;
  }
}