import React from 'react';
import { Route, Switch } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

import NurseMain from '../view/nurse/NurseMain';

export default function Routes() {
    return (
        <Switch>
            <PrivateRoute exact path="/nurse/main" component={NurseMain} /> 
        </Switch>
    );
}