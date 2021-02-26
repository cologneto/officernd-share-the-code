import React, {useState} from 'react';
import axios from 'axios';
import './RegistrationForm.css';
import {API_BASE_URL, ACCESS_TOKEN_NAME} from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";

function RegistrationForm(props) {
    const [state , setState] = useState({
        email : "",
        username : "",
        password : "",
        confirmPassword: "",
        roles: [],
        successMessage: null
    })
    const handleChange = (e) => {
        const {id , value} = e.target
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }
    const sendDetailsToServer = (isAdmin) => {
        if(state.email.length && state.password.length)
        {

            props.showError(null);
            const payload = {
                email : state.email,
                username : state.username,
                password : state.password,
                roles: isAdmin ? ['admin'] : ['user']
        }

        axios.post(API_BASE_URL+'/api/auth/signup', payload)
            .then(function (response) {
                if(response.status === 200){
                    setState(prevState => ({
                        ...prevState,
                        'successMessage' : 'Registration successful. Redirecting to home page..'
                    }))

                    localStorage.setItem(ACCESS_TOKEN_NAME, response.data.accessToken);
                    localStorage.setItem('userId', response.data.id);
                    localStorage.setItem('username', response.data.username);
                    localStorage.setItem('roles', response.data.roles);
                    redirectToHome();
                    props.showError(null)
                } else{
                    props.showError("Some error ocurred");
                }
            })
            .catch(function (error) {
                console.log(error.response.data);
            });
        } else {
            props.showError('Please enter valid username and password')
        }

    }
    const redirectToHome = () => {
        props.updateTitle('Home')
        props.history.push('/');
        props.showError(null);
    }
    const redirectToLogin = () => {
        props.updateTitle('Sign In')
        props.history.push('/signin');
        props.showError(null);
    }
    const handleUserSubmitClick = (e) => {
        e.preventDefault();
        if(state.password === state.confirmPassword) {
            sendDetailsToServer(false);
        } else {
            props.showError('Passwords do not match');
        }
    }

    const handleAdminSubmitClick = (e) => {
        e.preventDefault();
        if(state.password === state.confirmPassword) {
            sendDetailsToServer(true);
        } else {
            props.showError('Passwords do not match');
        }
    }

    return(
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email"
                           className="form-control"
                           id="email"
                           aria-describedby="emailHelp"
                           placeholder="Enter email"
                           value={state.email}
                           onChange={handleChange}
                    />
                    <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputEmail1">Username</label>
                    <input type="email"
                           className="form-control"
                           id="username"
                           placeholder="Enter email"
                           value={state.username}
                           onChange={handleChange}
                    />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password"
                           className="form-control"
                           id="password"
                           placeholder="Password"
                           value={state.password}
                           onChange={handleChange}
                    />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Confirm Password</label>
                    <input type="password"
                           className="form-control"
                           id="confirmPassword"
                           placeholder="Confirm Password"
                           value={state.confirmPassword}
                           onChange={handleChange}
                    />
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleUserSubmitClick}
                    style={{marginRight: '10px'}}
                >
                    Register user
                </button>
                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleAdminSubmitClick}
                >
                    Register admin
                </button>
            </form>
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
            <div className="mt-2">
                <span>Already have an account? </span>
                <span className="loginText" onClick={() => redirectToLogin()}>Login here</span>
            </div>

        </div>
    )
}

export default withRouter(RegistrationForm);

