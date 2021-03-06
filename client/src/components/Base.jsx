import React from 'react';
import {PropTypes} from 'prop-types';
import {Link, IndexLink} from 'react-router-dom';

const Base = ({children}) => (

  <div>
      <div className="top-bar">
        <div className="top-bar-left">
        </div>

        <div className="top-bar-right">
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign up</Link>
        </div>
      </div>
  </div>
);

Base.propTypes = {
  children: PropTypes.object.isRequired
};

export default Base;
