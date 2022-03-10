import React from "react";
import GoogleLogin from "react-google-login";
import { Link } from "react-router-dom";
import login from "../../services/loginService";
import loginByGoogleOauth from "../../services/oauthService";
import './LoginForm.scss';

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Email: '',
            Pass: '',
            hasError: false,
            errorMsg: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.responseGoogle = this.responseGoogle.bind(this);
    }

    handleChange(event) {
        let temp = { ...this.state };
        temp[event.target.id] = event.target.value;
        this.setState({ ...temp });
    }

    submitForm() {
        login({
            "email": this.state.Email,
            "password": this.state.Pass
        }).then(response => {
            if (response.error) {
                return this.setState({
                    hasError: true,
                    errorMsg: response.error
                })
            }
            this.props.loggingIn(response.token)
        }).catch(error => {
            console.log(error);
        })
    }

    responseGoogle(response) {
        if (response.tokenId) {
            loginByGoogleOauth(response.tokenId, response.profileObj.email)
                .then(response => {
                    if (response.error) {
                        return this.setState({
                            hasError: true,
                            errorMsg: response.error
                        })
                    }
                    this.props.loggingIn(response.token)
                }).catch(error => {
                    console.log(error);
                })
        }
    }

    render() {
        return (
            <div className="container login-container">
                <GoogleLogin
                    clientId="241232693993-khtaa2fvmjqa8b4fk1juh8aj0rnlcm7f.apps.googleusercontent.com"
                    buttonText="Login with Google"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                    cookiePolicy={'single_host_origin'}
                />
                <div className="table">
                    <div className="row">
                        <div className="cell">
                            Email
                        </div>
                        <div className="cell">:</div>
                        <div className="cell">
                            <input
                                name="email"
                                className="email"
                                id="Email"
                                value={this.state.Email}
                                onChange={this.handleChange}
                                placeholder="please enter your email"
                            />
                            <span className="req">*</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="cell">
                            Password
                        </div>
                        <div className="cell">:</div>
                        <div className="cell">
                            <input
                                name="pass"
                                type="password"
                                className="pass"
                                id="Pass"
                                value={this.state.Pass}
                                onChange={this.handleChange}
                                placeholder="please enter your password"
                            />
                            <span className="req">*</span>
                        </div>
                    </div>
                </div>
                <div className="err">
                    {this.state.errorMsg}
                </div>
                <div className="row actions">
                    <div className="cell">
                        <button id="login" onClick={this.submitForm}>Login</button>
                    </div>
                </div>
                <hr />
                <button>
                    <Link to='../' className='router-link'> &lt;=go-back</Link>
                </button>
            </div>
        );
    }
}

export default LoginForm;