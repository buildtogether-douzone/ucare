import React from 'react';
import { Route, Switch } from "react-router-dom";
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Reservation from '../view/nurse/Reservation';
import Receipt from '../view/nurse/Receipt';
import SearchPatient from '../view/nurse/SearchPatient';
import PatientList from '../view/nurse/PatientList';
import NewPatient from '../view/nurse/NewPatient';

export default function Routes() {
    return (
        <Switch>
            <PrivateRoute exact path="/nurse/patient" component={NewPatient} />
            <PrivateRoute exact path="/nurse/reservation" component={Reservation} />
            <PrivateRoute exact path="/nurse/receipt" component={Receipt}/>
            <PrivateRoute exact path="/nurse/receipt/:patientNo" component={Receipt}/>
            <PrivateRoute exact path="/nurse/search" component={SearchPatient}/>
            <PrivateRoute exact path="/nurse/patientList" component={PatientList}/>
        </Switch>
    );
}