import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../modules/Auth';

// const Header = () => (

// );
//

class Header extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      redirect: false,
    };

    this.onLogOutClicked = this.onLogOutClicked.bind(this);

  }

  onLogOutClicked() {
    Auth.deauthenticateUser();
  }

  render() {
    return (
      <div>
          <div className="top-bar">
            <div className="top-bar-left">
            </div>

            <div className="top-bar-right">
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign up</Link>
              {Auth.isUserAuthenticated() == true ? (<Link to="/login" onClick={this.onLogOutClicked}>Logout</Link>) : (<div></div>)}
            </div>
          </div>
      </div>
    );
  }
}

export default Header;
