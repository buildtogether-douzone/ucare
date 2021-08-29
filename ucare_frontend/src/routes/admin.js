import React from 'react';
import { Route, Switch } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

import Main from '../view/admin/AdminMain';

export default function Routes() {
    return (
        <Switch>
            <PrivateRoute exact path="/admin/main" component={Main} />
        </Switch>
    );
}