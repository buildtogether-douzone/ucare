import React, { Fragment } from 'react';
import User from './routes/user';
import CssBaseline from '@material-ui/core/CssBaseline';

export default function App() {

    return (
        <Fragment>
            <CssBaseline />
            <User />
        </Fragment>
    );
}