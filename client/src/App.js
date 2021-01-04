import React from 'react';
import Header from './components/Header/Header';
import './App.css';
import Home from './components/Home/Home';
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <div className="container d-flex align-items-center flex-column">
                    <Switch>
                        <Route path="/">
                            <Home/>
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    )
}

export default App;
