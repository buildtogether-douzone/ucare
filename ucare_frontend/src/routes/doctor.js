import React from 'react';
import { Route, Switch } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

import DoctorMain from '../view/doctor/DoctorMain';

export default function Routes() {
    return (
        <Switch>
            <PrivateRoute exact path="/doctor/main" component={DoctorMain} /> 
        </Switch>
    );
}