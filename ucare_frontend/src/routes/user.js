import React from 'react';
import { Route } from "react-router-dom";
import SignIn from '../view/SignIn';
import Home from '../view/Home';
import SignUp from '../view/SignUp';

export default function Routes() {
    return (
        <main>
            <Route exact path="/" component={SignIn} />
            <Route exact path="/Home" component={Home} />
            <Route exact path="/signUp" component={SignUp} />
        </main>
    );
}