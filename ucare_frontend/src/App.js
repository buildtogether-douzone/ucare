import React, { Fragment } from 'react';
import User from './routes/user';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider } from 'react-redux';
import store from './redux/store';

export default function App() {

    return (
        <Provider store={store}>
            <Fragment>
                <CssBaseline />
                <User />
            </Fragment>
        </Provider>
    );
}