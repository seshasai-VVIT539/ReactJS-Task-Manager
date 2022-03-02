import React from 'react';
import { Link } from 'react-router-dom';
import signUp from '../../services/signupService';
import './SignupForm.scss';

class SignupForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: '',
            Email: '',
            Pass1: '',
            Pass2: '',
            Age: 10,
            hasError: false,
            errorMsg: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }

    handleChange(event) {
        const id = event.target.id;
        let temp = { ...this.state };
        temp[id] = event.target.value;
        this.setState({ ...temp });
    }

    submitForm() {
        signUp({
            "name": this.state.Name,
            "email": this.state.Email,
            "password": this.state.Pass1,
            "age": this.state.Age
        }).then(response => {
            if (response.error) {
                return this.setState({
                    hasError: true,
                    errorMsg: response.error
                })
            }
            this.props.signingUp(response.token)
        }).catch(error => {
            console.log(error);
        })
    }

    resetForm() {
        let temp = { ...this.state };
        Object.keys(this.state).forEach((key) => {
            temp[key] = '';
        })
        temp.Age = 10;
        temp.hasError = false;
        this.setState({
            ...temp
        }, () => {
            console.log(this.state)
        });
    }

    render() {
        return (
            <div className="container signup-container">
                <div className="table">
                    <div className="row">
                        <div className="cell">
                            Name
                        </div>
                        <div className="cell">:</div>
                        <div className="cell">
                            <input
                                name="name"
                                className="name"
                                id="Name"
                                value={this.state.Name}
                                onChange={this.handleChange}
                                placeholder="please enter your name"
                            />
                            <span className="req">*</span>
                        </div>
                        <div></div>
                    </div>
                    <div className="row">
                        <div className="cell">
                            Email
                        </div>
                        <div className="cell">:</div>
                        <div className="cell">
                            <input
                                name="email"
                                type="email"
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
                                name="pass1"
                                type="password"
                                className="pass1"
                                id="Pass1"
                                value={this.state.Pass1}
                                onChange={this.handleChange}
                                placeholder="please enter your password"
                            />
                            <span className="req">*</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="cell">
                            Re-enter Password
                        </div>
                        <div className="cell">:</div>
                        <div className="cell">
                            <input
                                name="pass2"
                                type="password"
                                className="pass2"
                                id="Pass2"
                                value={this.state.Pass2}
                                onChange={this.handleChange}
                                placeholder="Re-enter your password"
                            />
                            <span className="req">*</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="cell">
                            Age
                        </div>
                        <div className="cell">:</div>
                        <div className="cell">
                            <input
                                name="age"
                                className="age"
                                id="Age"
                                type="number"
                                min="1"
                                value={this.state.Age}
                                onChange={this.handleChange}
                                placeholder="Enter your age"
                            />
                        </div>
                    </div>
                    <div className="row actions">
                        <div className="cell">
                            <button id="signup" onClick={this.submitForm}>Sign-up</button>
                        </div>
                        <div className="cell"></div>
                        <div className="cell">
                            <button id="reset" onClick={this.resetForm}>Reset</button>
                        </div>
                    </div>
                </div>
                <div className='err'>
                    {this.state.errorMsg}
                </div>
                <hr />
                <button>
                    <Link to='../' className='router-link'> &lt;=go-back</Link>
                </button>
            </div>
        );
    }
}

export default SignupForm;