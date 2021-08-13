import React from 'react';
import { Route, Switch } from "react-router-dom";
import SignIn from '../view/SignIn';
import Home from '../view/Home';
import SignUp from '../view/SignUp';

export default function Routes() {
    return (
        <Switch>
            <Route exact path="/" component={SignIn} />
            <Route exact path="/Home" component={Home} />
            <Route exact path="/signUp" component={SignUp} />
            <Route exact component={SignIn} />
        </Switch>
    );
}