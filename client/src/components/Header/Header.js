import React from 'react';
import { withRouter } from 'react-router-dom'
import './Header.css';

function Header(props) {

    const redirectToSignUp = () => {
        props.history.push('/signup');
    }

    return(
        <nav className="navbar navbar-dark bg-primary">
            <div className="row col-12 d-flex justify-content-center text-white">
                <span className="h3">Welcome to "Share the code" application</span>
                <div className="ml-auto">
                    <button className="btn btn-danger header-btn">Logout</button>
                    <button className="btn btn-secondary header-btn">Login</button>
                    <button className="btn btn-light header-btn"  onClick={redirectToSignUp} >Sign Up</button>
                </div>
            </div>
        </nav>
    )
}

export default withRouter( Header );