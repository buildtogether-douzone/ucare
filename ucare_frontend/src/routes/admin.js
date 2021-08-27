import React from 'react';
import { Route, Switch } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

import AdminSetting from '../view/admin/Setting';
import Hospital from '../view/admin/Hospital';
import Medicine from '../view/admin/Medicine';
import Disease from '../view/admin/Disease';
import Main from '../view/admin/AdminMain';

export default function Routes() {
    return (
        <Switch>
            <PrivateRoute exact path="/admin/setting" component={AdminSetting} />
            <PrivateRoute exact path="/admin/hospital" component={Hospital} />
            <PrivateRoute exact path="/admin/medicine" component={Medicine} />
            <PrivateRoute exact path="/admin/disease" component={Disease} />
            <PrivateRoute exact path="/admin/main" component={Main} />
        </Switch>
    );
}