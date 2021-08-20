import React from 'react';
import { Route, Switch } from "react-router-dom";
import SignIn from '../view/SignIn';
import Home from '../view/Home';
import SignUp from '../view/SignUp';
import Profile from '../view/Profile';
import NewPatient from '../view/NewPatient';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Reservation from '../view/Reservation';
import AdminSetting from '../view/AdminSetting';
import Medicine from '../view/Medicine';
import Disease from '../view/Disease';
import Receipt from '../view/Receipt';
import SearchPatient from '../view/SearchPatient';
import PatientList from '../view/PatientList';

export default function Routes() {
    return (
        <Switch>
            <PublicRoute exact path="/" component={SignIn} />
            <PrivateRoute exact path="/Home" component={Home} />
            <PublicRoute exact path="/signUp" component={SignUp} />
            <PrivateRoute exact path="/profile" component={Profile} />
            <PrivateRoute exact path="/patient" component={NewPatient} />
            <PrivateRoute exact path="/reservation" component={Reservation} />
            <PublicRoute exact path="/adminSetting" component={AdminSetting} />
            <PublicRoute exact path="/medicine" component={Medicine}/>
            <PublicRoute exact path="/disease" component={Disease}/>
            <PrivateRoute exact path="/receipt" component={Receipt}/>
            <PrivateRoute exact path="/search" component={SearchPatient}/>
            <PrivateRoute exact path="/patientList" component={PatientList}/>
            <PublicRoute exact component={SignIn} />
        </Switch>
    );
}