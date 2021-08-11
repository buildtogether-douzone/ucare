import React, { Component } from 'react';
import { Route } from "react-router-dom";
import SignIn from '../view/SignIn';
import Home from '../view/_Home';
import SignUp from '../view/SignUp';

export default class Routes extends Component {
    render() {
        return (
            <main>
                <Route exact path="/" component={SignIn} />
                <Route exact path="/_Home" component={Home} />
                <Route exact path="/signUp" component={SignUp} />
            </main>
        );
    }
}