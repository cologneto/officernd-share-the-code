import React, {useState} from 'react';
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import LoginForm from './components/LoginForm/LoginForm';
import CreateSnippet from './components/CreateSnippet/CreateSnippet';
import AlertComponent from './components/AlertComponent/AlertComponent';
import './App.css';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

function App() {
    const [title, updateTitle] = useState(null);
    const [errorMessage, updateErrorMessage] = useState(null);
    return (
        <Router>
            <div className="App">
                <Header title={title}/>
                <div className="container d-flex align-items-center flex-column">
                    <Switch>
                        <Route path="/" exact={true}>
                            <Home/>
                        </Route>
                        <Route path="/signup">
                            <RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle}/>
                        </Route>
                        <Route path="/signin">
                            <LoginForm showError={updateErrorMessage} updateTitle={updateTitle}/>
                        </Route>
                        <Route path="/createSnippet">
                            <CreateSnippet showError={updateErrorMessage} updateTitle={updateTitle}/>
                        </Route>
                    </Switch>
                    <AlertComponent errorMessage={errorMessage} hideError={updateErrorMessage}/>
                </div>

            </div>
        </Router>
    )
}

export default App;
