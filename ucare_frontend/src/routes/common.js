import React from 'react';
import { Route, Switch } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

import SignIn from '../view/SignIn';
import Home from '../view/Home';
import SignUp from '../view/SignUp';
import Profile from '../view/Profile';

import Board from '../view/admin/Board';

import Get from '../view/Get';

export default function Routes() {
    return (
        <Switch>
            <PublicRoute exact path="/" component={SignIn} />
            <PublicRoute exact path="/get" component={Get} />
            <PrivateRoute exact path="/Home" component={Home} />
            <PublicRoute exact path="/signUp" component={SignUp} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <PrivateRoute exact path="/board" component={Board} />
        </Switch>
    );
}