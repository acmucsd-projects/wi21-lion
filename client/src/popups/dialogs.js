import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import './dialogs.css';


const loginUrl = "http://localhost:5000/users/login";
const signupUrl = "http://localhost:5000/users/register";
const resetPasswordUrl = "http://localhost:5000/users/changePassword";
// const enrollUrl = "http://localhost:5000/enrolled_section";

const userAPI = {
  login: async function (email, password) {
    let data = {
      email: email,
      password: password
    }
    // format and make get request for user key
    let response = await fetch(loginUrl, {
      method: "POST",
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
    })
      .then(response => (
        response.json()
      ))
      .catch(error => {
        console.log(error);
      });
    console.log(response)
    if ('error' in response) {
      return { response: false, msg: response.error };
    } else {
      return { response: response, msg: "" };
    }
  },
  register: async function (email, password, firstname, lastname) {

    // format and make get request for user key
    let response = await fetch(`${signupUrl}`, {
      method: "POST",
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        email: email,
        password: password,
        first_name: firstname,
        last_name: lastname,
      })
    })
      .then(response => (
        response.json()
      ))
      .catch(error => {
        console.log(error);
      });
    if ('error' in response) {
      return { response: false, msg: response.error };
    } else {
      return { response: response, msg: "" };
    }
  },
  resetPassword: async function (email, password, token) {
    let data = {
      user_email: email,
      new_password: password
    }
    // format and make get request for user key
    let response = await fetch(resetPasswordUrl, {
      method: "PATCH",
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'auth_token': token,
      },
      body: JSON.stringify(data)
    })
      .then(response => (
        response.json()
      ))
      .catch(error => {
        console.log(error);
      });
    if ('error' in response) {
      return { response: false, msg: response.error };
    } else {
      return { response: response, msg: "" };
    }
  },
}


export function LoginDialog({ show, hide }) {
  const { setUser } = useContext(UserContext);

  // const user = JSON.parse(localStorage.getItem('currentSession'));

  async function handleLogin(e) {
    // get username and password inputs
    e.preventDefault();
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let errorText = document.getElementById('error-text');

    let { response, msg } = await userAPI.login(email.value, password.value);
    if (response) {
      window.localStorage.setItem('currentSession', JSON.stringify({ token: response.token, ...response.user }));
      setUser({ token: response.token, ...response.user});
      hide();
      // clear input values
      email.value = "";
      password.value = "";
    } else {
      errorText.textContent = msg;
    }
  }

  function handleForgotPassword(e) {
    e.preventDefault();
    console.log('take the user to forgot password');
  }

  if (show) {
    // do we want to divert login to the home page or should I implement login functionality here
    return (
      <div className="backdrop">
        <div id="user-dialog">
          <button id="hide-btn" onClick={hide}>&#8249;</button>
          <form>
            <h1>Login</h1>
            <p>using your ucsd credentials</p>
            <label htmlFor="email">email:</label>
            <input
              id="email"
              type="email"
              placeholder="email" />
            <label htmlFor="password">password:</label>
            <input
              id="password"
              type="password"
              placeholder="password" />
            <button
              onClick={e => handleLogin(e)}
            >Lets Go!</button>
            <p><span id="error-text"></span></p>
            <button
              id="forgot-password"
              onClick={e => handleForgotPassword(e)}
            >forgot password</button>
          </form>
        </div>
      </div>
    )
  } else {
    return null;
  }
}


export function SignupDialog({ show, hide }) {

  // const user = JSON.parse(localStorage.getItem('currentSession'));

  async function handleSignup(e) {
    // get username and password inputs
    e.preventDefault();
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let passwordConfirm = document.getElementById('password-confirm');
    let firstName = document.getElementById('first-name');
    let lastName = document.getElementById('last-name');
    let errorText = document.getElementById('error-text');

    if (password.value !== passwordConfirm.value) {
      errorText.textContent = "passwords must be matching";
      return;
    }
    let { response, msg } =
      await userAPI.register(
        email.value,
        password.value,
        firstName.value,
        lastName.value
      );

    if (response) {
      let loginResponse = await userAPI.login(email.value, password.value);
      if (loginResponse) {
        hide();
        // clear input values
        email.value = "";
        password.value = "";
        passwordConfirm.value = "";
        firstName.value = "";
        lastName.value = "";
        errorText.textContent = "";

        window.localStorage.setItem('currentSession', { token: loginResponse.token, ...loginResponse.user });
      } else {
        alert("user was created, please log in to access your account");
      }
    } else {
      errorText.textContent = msg;
    }
  }

  if (show) {
    // do we want to divert login to the home page or should I implement login functionality here
    return (
      <div className="backdrop">
        <div id="user-dialog">
          <button id="hide-btn" onClick={hide}>&#8249;</button>
          <form>
            <h1>Sign Up</h1>
            <label htmlFor="email">email:</label>
            <input
              id="email"
              type="email"
              placeholder="email" />
            <label htmlFor="password">password:</label>
            <input
              id="password"
              type="password"
              placeholder="password" />
            <label htmlFor="password-confirm">confirm password:</label>
            <input
              id="password-confirm"
              type="password"
              placeholder="confirm password" />
            <label htmlFor="first-name">first name:</label>
            <input
              id="first-name"
              type="text"
              placeholder="first name" />
            <label htmlFor="last-name">last name:</label>
            <input
              id="last-name"
              type="text"
              placeholder="last name" />
            <button onClick={e => handleSignup(e)}>Lets Go!</button>
            <p><span id="error-text"></span></p>
          </form>
        </div>
      </div>
    )
  } else {
    return null;
  }
}



export function PasswordDialog({ show, hide }) {

  const user = JSON.parse(localStorage.getItem('currentSession'));

  async function handlePasswordReset(e) {
    e.preventDefault();

    let oldpw = document.querySelector('#old-password');
    let newpw = document.querySelector('#new-password');
    let confirmpw = document.querySelector('#confirm-password');
    let errorText = document.querySelector('#error-text');

    if (newpw.value !== confirmpw.value) {
      errorText.textContent = "passwords do not match";
      return;
    }

    let { response } = await userAPI.login(user.email, oldpw.value);
    if (response) {
      console.log(user.email, newpw.value);

      let { response, msg } = await userAPI.resetPassword(user.email, newpw.value, user.token);
      if (response) {
        hide();
        // clear input values
        oldpw.value = "";
        newpw.value = "";
        confirmpw.value = "";

        alert("password updated successfully");

      } else {
        errorText.textContent = msg;
      }
    } else {
      errorText.textContent = "old password was incorrect";
    }
  }

  if (show) {
    return (
      <div className="backdrop">
        <div id="input-dialog">
          <form>
            <label htmlFor="old-password">old password:</label>
            <input id="old-password" type="password" />

            <label htmlFor="new-password">new password:</label>
            <input id="new-password" type="password" />

            <label htmlFor="confirm-password">confirm new password:</label>
            <input id="confirm-password" type="password" />

            <p><span id="error-text"></span></p>
            <div>
              <button onClick={hide}>cancel</button>
              <button onClick={e => handlePasswordReset(e)}>reset</button>
            </div>
          </form>
        </div>
      </div>
    )
  } else {
    return null;
  }
}


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

  if (show) {
    return (
      <div className="backdrop">
        <div id="input-dialog">
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


export function EnrollDialog({ show, hide, section }) {
  const { user, setUser } = useContext(UserContext);

  function onSubmit(e) {
    // if (!context.user || context.user === {}) {
    //   alert("Not Logged in");
    //   hide();
    //   return;
    // }
    e.preventDefault();
    console.log(user);
    fetch(`http://localhost:5000/enrolled_section/${section._id}`, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
        'auth_token': user.token
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        let enrolledSections = user.enrolled_sections;
        enrolledSections.push(data.section_id);
        let tmpUser = user;
        tmpUser.enrolled_sections = enrolledSections;
        setUser(tmpUser);
      })
      .catch(error => {
        console.error(error);
      })
    hide();
  }

  if (show) {
    return (
      <div className="backdrop">
        <div id="input-dialog">
          <form>
            <h2>Are you sure you want to enroll in this section?</h2>
            <p>Section: {section.professor} - {section.quarter} {section.year}</p>
            <div>
              <button onClick={hide}>cancel</button>
              <button onClick={e => onSubmit(e)}>confirm</button>
            </div>
          </form>
        </div>
      </div>
    )
  } else {
    return null;
  }
}
