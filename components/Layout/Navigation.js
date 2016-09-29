/**
 * React Static Boilerplate
 * https://github.com/kriasoft/react-static-boilerplate
 *
 * Copyright © 2015-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Link from '../Link';

class Navigation extends React.Component {


  constructor(props) {
    super(props)
    this.state = { googleUser: null};
  }

  componentDidMount() {
    attachSigninWhenRdy(document.getElementById('navbarLoginBtn'));
    executeWhenLoginRdy(this.onLogin);
  }

  componentWillUnmount() {
    dontExecuteWhenLoginRdyAnymore(this.onLogin);
  }

  getLoginBtn = () => {
    if (this.state.googleUser) {
      return (
        <li><p className="nav navbar-text">Hi {this.state.googleUser.getBasicProfile().getGivenName()}</p></li>
      );
    } else {
      return (
        <li><a id="navbarLoginBtn" href="#"><img className="google-login-btn" src="./google-login.png" alt="Google Logo" /> Sign in</a></li>
      );
    }
  }

  onLogin = () => {
    this.state.googleUser = googleUser;
    this.setState(this.state);
  }

  getLoginReminder = () => {
    if (this.state.googleUser) {
      return null
    } else {
      return (
          <div className="login-reminder">
            <span className="glyphicon glyphicon-cloud"></span>
            <p>Login to synchronize your Pokemon with the cloud</p>
            <span className="glyphicon glyphicon-arrow-right"></span>
          </div>
      )
    }
  }

  render() {
    var loginBtn = this.getLoginBtn();
    var loginReminder = this.getLoginReminder();
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <Link className="navbar-brand" to="#">Pokemon Go Manager</Link>
          </div>
          <div id="navbar" className="collapse navbar-collapse">
            <ul className="nav navbar-nav">
              <li className={location.pathname == '/' ? 'active' : ''}><Link to="/">Home</Link></li>
              <li className={location.pathname == '/ivcalc' ? 'active' : ''}><Link to="/ivcalc">IV Calc</Link></li>
              <li className={location.pathname == '/help' ? 'active' : ''}><Link to="/help">Help</Link></li>
            </ul>
            <ul className="nav navbar-nav navbar-right">
              {loginReminder}
              {loginBtn}
            </ul>
          </div>
        </div>
      </nav>
    );
  }

}

export default Navigation;
