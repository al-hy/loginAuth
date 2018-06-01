import React from 'react';
import DashboardPage from '../containers/DashboardPage.jsx';
import HomePage from './HomePage.jsx';
import Auth from '../modules/Auth';


class Main extends React.Component {

constructor(props) {
  super(props);
}

render() {
  return (
    <div>
      {Auth.isUserAuthenticated() ? <DashboardPage/> : <HomePage/>}
    </div>
  )
}

}

export default Main;
