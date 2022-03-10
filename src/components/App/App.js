import React from 'react';
import FirstPage from '../FirstPage/FirstPage';
import Home from '../Home/Home';
import LoginForm from '../LoginForm/LoginForm';
import SignupForm from '../Signup Form/SignupForm';
import { LogoutContext, TokenContext } from '../../utils/contexts';
import './App.scss';
import { instanceOf } from 'prop-types';
import { Navigate, Route, Routes } from 'react-router-dom';
import { logout, logoutAllDevices } from '../../services/logoutServices';
import { Cookies, withCookies } from 'react-cookie';

class App extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    let token = localStorage.getItem('token');
    this.state = {
      token: token ? token : undefined,
      loggedIn: token ? true : false
    };
    this.loggingIn = this.loggingIn.bind(this);
    this.loggingOut = this.loggingOut.bind(this);
  }


  loggingIn(tokenValue) {
    localStorage.setItem('token', tokenValue);
    this.setState({
      token: tokenValue,
      loggedIn: true
    });
  }

  loggingOut(devices) {
    if (devices === 1) {
      logout(this.state.token)
        .then((response) => {
          this.setState({
            token: undefined,
            loggedIn: false
          });
          localStorage.removeItem('token');
        })
        .catch((error) => {
          console.log(error);
        })
    } else {
      logoutAllDevices(this.state.token)
        .then((response) => {
          this.setState({
            token: undefined,
            loggedIn: false
          });
          localStorage.removeItem('token');
        })
        .catch((error) => {
          console.log(error);
        })
    }
  }

  generateDuplicateState() {
    let temp = { ...this.state };
    ['loggedIn', 'signup', 'login', 'fp'].forEach(key => {
      temp[key] = false;
    });
    return temp;
  }

  render() {
    return (
      <div className="app" >
        <header className="app-header">
          <p>
            Task Manager
          </p>
        </header>
        <Routes>
          {/* {this.state.loggedIn && <Route element={() => this.state.loggedIn && <Navigate to='/home' replace={true} />} />} */}
          <Route path='/' element={this.state.loggedIn ? <Navigate to='/home' /> : <FirstPage />} />
          <Route path='/signup' element={this.state.loggedIn ? <Navigate to='/home' />
            : <SignupForm signingUp={this.loggingIn} />
          }
          />
          <Route path='/login' element={this.state.loggedIn ? <Navigate to='/home' />
            : <LoginForm loggingIn={this.loggingIn} />
          }
          />
          <Route
            path='/home'
            element={
              this.state.loggedIn ?
                <TokenContext.Provider value={this.state.token} >
                  <LogoutContext.Provider value={this.loggingOut}>
                    <Home logout={this.loggingOut} />
                  </LogoutContext.Provider>
                </TokenContext.Provider>
                : <Navigate to='..' />
            }
          />
          <Route
            path='/tasks/:id'
            element={
              this.state.loggedIn ?
                <TokenContext.Provider value={this.state.token} >
                  <Home logout={this.loggingOut} />
                </TokenContext.Provider>
                : <Navigate to='../..' />
            }
          />
          <Route
            path='/tasks/:id/form'
            element={
              this.state.loggedIn ?
                <TokenContext.Provider value={this.state.token} >
                  <Home logout={this.loggingOut} />
                </TokenContext.Provider>
                : <Navigate to='../..' />
            }
          />
          <Route
            path='/profile'
            element={
              this.state.loggedIn ?
                <TokenContext.Provider value={this.state.token} >
                  <Home logout={this.loggingOut} />
                </TokenContext.Provider>
                : <Navigate to='..' />
            }
          />
        </Routes>

        <footer className='app-footer'>
          <p>
            Created by Sesha Sai Kumar
          </p>
        </footer>
      </div >
    );
  }
}
export default withCookies(App);
