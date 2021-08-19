import React from 'react';
import { Route, Switch } from "react-router-dom";
import SignIn from '../view/SignIn';
import Home from '../view/Home';
import SignUp from '../view/SignUp';
import Profile from '../view/Profile';
import Patient from '../view/Patient';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Reservation from '../view/Reservation';
import AdminSetting from '../view/AdminSetting';
import Medicine from '../view/medicine';
import Receipt from '../view/Receipt';

export default function Routes() {
    return (
        <Switch>
            <PublicRoute exact path="/" component={SignIn} />
            <PrivateRoute exact path="/Home" component={Home} />
            <PublicRoute exact path="/signUp" component={SignUp} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <PrivateRoute exact path="/patient" component={Patient} />
            <PrivateRoute exact path="/reservation" component={Reservation} />
            <PublicRoute exact path="/adminSetting" component={AdminSetting} />
            <PrivateRoute exact path="/medicine" component={Medicine}/>
            <PrivateRoute exact path="/receipt" component={Receipt}/>
            <PublicRoute exact component={SignIn} />
        </Switch>
    );
}