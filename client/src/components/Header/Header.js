import React from 'react';
import { withRouter } from 'react-router-dom'
import './Header.css';

function Header(props) {

    const redirectToSignUp = () => {
        props.history.push('/signup');
    };

    const redirectToSignIn = () => {
        props.history.push('/signin');
    };

    const logout = () => {
        localStorage.clear();
        props.history.push('/');
    };

    const renderLogout = () => {
        if(localStorage.getItem('username')) {
            return (
                <div>
                    Hello, {" " + localStorage.getItem('username')}
                    <button className="btn btn-danger header-btn" onClick={logout} style={{marginLeft: "10px"}}>Logout</button>
                </div>

            )
        }
    };

    const renderSignBtns = () => {
        if(!localStorage.getItem('username')) {
            return (
                <div>
                    <button className="btn btn-secondary header-btn" onClick={redirectToSignIn}>Sign In</button>
                    <button className="btn btn-light header-btn"  onClick={redirectToSignUp} >Sign Up</button>
                </div>
            )
        }
    };

    return(
        <nav className="navbar navbar-dark bg-primary">
            <div className="row col-12 d-flex justify-content-center text-white">
                <span className="h3">Welcome to "Share the code" application</span>
                <div className="ml-auto">
                    {renderLogout()}
                    {renderSignBtns()}
                </div>
            </div>
        </nav>
    )
}

export default withRouter( Header );