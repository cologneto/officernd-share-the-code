import React, {useState} from 'react';
import axios from 'axios';
import './LoginForm.css';
import {API_BASE_URL, ACCESS_TOKEN_NAME} from '../../constants/apiConstants';
import { withRouter } from "react-router-dom";




function LoginForm(props) {
    const [state , setState] = useState({
        username : "",
        password : "",
        successMessage: null
    })


    axios.interceptors.response.use(response => {
        return response;
    }, error => {
        if (error.response.status === 401) {
            props.showError("Username does not exists");
        }
        return error;
    });

    const handleChange = (e) => {
        const {id , value} = e.target
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        const payload = {
            "username": state.username,
            "password": state.password,
        };

        axios.post(API_BASE_URL+'/api/auth/signin', payload)
            .then(function (response) {
                if(response.status === 200){
                    setState(prevState => ({
                        ...prevState,
                        'successMessage' : 'Login successful. Redirecting to home page..'
                    }))
                    localStorage.setItem(ACCESS_TOKEN_NAME, response.data.accessToken);
                    localStorage.setItem('userId', response.data.id);
                    localStorage.setItem('username', response.data.username);
                    localStorage.setItem('roles', response.data.roles);
                    redirectToHome();
                    props.showError(null)
                }
                else if(response.status === 204){
                    props.showError("Username and password do not match");
                }
                else{
                    props.showError("Username does not exists");
                }
            })
    }
    const redirectToHome = () => {
        props.updateTitle('Home')
        props.history.push('/');
        props.showError(null);
    }
    const redirectToSignUp = () => {
        props.history.push('/signup');
        props.updateTitle('Sign In');
        props.showError(null);
    }
    return(
        <div className="card col-12 col-lg-4 login-card mt-2 hv-center">
            <form>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputEmail1">Username</label>
                    <input type="text"
                           className="form-control"
                           id="username"
                           placeholder="Enter username"
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
                <div className="form-check">
                </div>
                <button
                    type="submit"
                    className="btn btn-primary"
                    onClick={handleSubmitClick}
                >Submit</button>
            </form>
            <div className="alert alert-success mt-2" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
            <div className="registerMessage">
                <span>Dont have an account? </span>
                <span className="loginText" onClick={() => redirectToSignUp()}>Sign Up</span>
            </div>
        </div>
    )
}

export default withRouter(LoginForm);