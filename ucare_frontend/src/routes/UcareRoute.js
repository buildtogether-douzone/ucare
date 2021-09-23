import React from 'react';
import { Route, Switch } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

import SignIn from '../view/SignIn';
import Home from '../view/Home';
import Profile from '../view/Profile';

import Board from '../view/admin/Board';

import DoctorMain from '../view/doctor/DoctorMain';
import NurseMain from '../view/nurse/NurseMain';
import Main from '../view/admin/AdminMain';

export default function Routes() {
    return (
        <Switch>
            <PublicRoute exact path="/" component={SignIn} />
            <PrivateRoute exact path="/Home" component={Home}/>
            <PrivateRoute exact path="/profile" component={Profile}/>
            <PrivateRoute exact path="/board" component={Board}/>
            <PrivateRoute exact path="/doctor/main" component={DoctorMain} role={"의사"}/>
            <PrivateRoute exact path="/nurse/main" component={NurseMain} role={"간호사"}/> 
            <PrivateRoute exact path="/admin/main" component={Main} role={"관리자"} />
            <PublicRoute exact component={SignIn} />
        </Switch>
    );
}