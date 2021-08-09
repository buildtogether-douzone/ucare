import React, { Component } from 'react';
import { Route,  BrowserRouter as Router  } from "react-router-dom";
import SignIn from './view/SignIn';
import Home from './view/Home';

export default class Routes extends Component {
    render() {
        return (
            <Router>
                <main>
                    <Route exact path="/" component={SignIn} />
                    <Route exact path="/Home" component={Home} />
                </main>
            </Router>
        );
    }
}