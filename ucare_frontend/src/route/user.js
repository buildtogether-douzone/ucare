import React, { Component } from 'react';
import { Route,  BrowserRouter as Router  } from "react-router-dom";
import SignIn from '../view/SignIn';
import Home from '../view/Home';
import SignUp from '../view/SignUp';

export default class Routes extends Component {
    render() {
        return (
            <Router>
                <main>
                    <Route exact path="/" component={SignIn} />
                    <Route exact path="/Home" component={Home} />
                    <Route exact path="/signUp" component={SignUp} />
                </main>
            </Router>
        );
    }
}