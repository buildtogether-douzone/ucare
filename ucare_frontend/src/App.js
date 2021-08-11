import React, { Fragment } from 'react';
import User from './route/user';
import CssBaseline from '@material-ui/core/CssBaseline';

export default function App() {

    return (
        <Fragment>
            <CssBaseline />
            <User />
        </Fragment>
    );
}