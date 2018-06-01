class Auth {
  //Authenticate the user. Save a token string in local storage

  static authenticateUser(token) {
    localStorage.setItem('token', token);
  }

  //check if a user is authenticated - check if a token is saved in local storage

  static isUserAuthenticated() {
    return localStorage.getItem('token') !== null;
  }

  //Deauthenticate a user. Remove a token from local localStorage

  static deauthenticateUser() {
    localStorage.removeItem('token');
  }

  //get Token value
  static getToken() {
    return localStorage.getItem('token');
  }
}

export default Auth;
