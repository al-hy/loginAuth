import React from 'react';
import {PropTypes} from 'prop-types';
import LoginForm from '../components/LoginForm.jsx';
import Auth from '../modules/Auth';
import {Redirect} from 'react-router-dom';

class LoginPage extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);

    const storedMessage = localStorage.getItem('successMessage');
    let successMessage = '';

    if(storedMessage) {
      successMessage = storedMessage;
      localStorage.removeItem('successMessage');
    }

    // set the initial component state
    this.state = {
      redirect: false,
      errors: {},
      successMessage,
      user: {
        email: '',
        password: ''
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);

  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    //DELETE THIS AS WELL
    console.log('email:', this.state.user.email);
    console.log('password:', this.state.user.password);

    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `email=${email}&password=${password}`;

    const xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open('post', '/auth/login');
    xmlHttpRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlHttpRequest.responseType = 'json';
    xmlHttpRequest.addEventListener('load', () =>{
      if(xmlHttpRequest.status === 200) {
        //successful
        //change the component-container state

        Auth.authenticateUser(xmlHttpRequest.response.token);
        this.setState({
          redirect: true
        });

      } else {
        //there was an error

        const errors = xmlHttpRequest.response.errors ? xmlHttpRequest.response.errors : {};

        errors.summary = xmlHttpRequest.response.message;

        this.setState({
          errors
        });

      }
    });

    xmlHttpRequest.send(formData);
  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  /**
   * Render the component.
   */
  render() {

    return (
      <div>
      {this.state.redirect == false ? (
        <LoginForm
              onSubmit={this.processForm}
              onChange={this.changeUser}
              errors={this.state.errors}
              user={this.state.user}
            /> ) : ( <Redirect to='/'/> )}
      </div>

    );
  }

}

export default LoginPage;
