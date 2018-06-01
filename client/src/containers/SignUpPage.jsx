//Out first container component that will process the previously created the sign-up form:

import React from 'react';
import {PropTypes} from 'prop-types';
import SignUpForm from '../components/SignUpForm.jsx';
import {Redirect} from 'react-router-dom';

class SignUpPage extends React.Component {
  /**
  * Class Constructor
  */

  constructor(props) {
    super(props);

    //set the initial component state
    this.state = {
      redirect: false,
      errors: {},
      user: {
        email: '',
        name: '',
        password: ''
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);

  }

  //Change the user object
  // @param {object} event - the javascript event object

  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  //Process the form

  processForm(event) {
    //prevent default action. in this case, action is the form submission event
    event.preventDefault();

    //REMEMBER TO DELETE THIS!
    console.log('name:', this.state.user.name);
    console.log('email:', this.state.user.email);
    console.log('password:', this.state.user.password);

    const name = encodeURIComponent(this.state.user.name);
    const email = encodeURIComponent(this.state.user.email);
    const password = encodeURIComponent(this.state.user.password);
    const formData = `name=${name}&email=${email}&password=${password}`

    //Create an AJAX request
    //this should later be changed in order to consider HTTPS
    const xmlHttpRequest = new XMLHttpRequest();
    xmlHttpRequest.open('post', '/auth/signup');
    xmlHttpRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xmlHttpRequest.responseType = 'json';
    xmlHttpRequest.addEventListener('load', () => {
      if(xmlHttpRequest.status === 200) {
        //Success
        //Change the component-container state

        this.setState({
          errors: {}
        });

        localStorage.setItem('successMessage', xmlHttpRequest.response.message);

        //make a redirect
        this.setState({redirect: true});
      } else {
        //failure

        const errors = xmlHttpRequest.response.errors ? xmlHttpRequest.response.errors: {};
        errors.summary = xmlHttpRequest.response.message;

        this.setState({
          errors
        });
      }
    });

    xmlHttpRequest.send(formData);
  }

  render() {
    return (
      <div>
      {this.state.redirect == false ? (
          <SignUpForm onSubmit={this.processForm} onChange={this.changeUser} errors={this.state.errors} user={this.state.user}/> ) :
        ( <Redirect to="/login" />)}
      </div>

    );
  }
}

export default SignUpPage;
