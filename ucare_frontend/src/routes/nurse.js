import React from 'react';
import { Route, Switch } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

import Reservation from '../view/Reservation';
import Receipt from '../view/Receipt';
import SearchPatient from '../view/SearchPatient';
import PatientList from '../view/PatientList';
import Patient from '../view/Patient';
import NewPatient from '../view/NewPatient';

export default function Routes() {
    return (
        <Switch>
            <PrivateRoute exact path="/patient" component={NewPatient} />
            <PrivateRoute exact path="/patient/:patientNo" component={Patient} />
            <PrivateRoute exact path="/reservation" component={Reservation} />
            <PrivateRoute exact path="/receipt" component={Receipt}/>
            <PrivateRoute exact path="/receipt/:patientNo" component={Receipt}/>
            <PrivateRoute exact path="/search" component={SearchPatient}/>
            <PrivateRoute exact path="/patientList" component={PatientList}/>
        </Switch>
    );
}