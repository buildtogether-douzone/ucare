import React, { Fragment } from 'react';
import Common from './routes/common';
import Admin from './routes/admin';
import Doctor from './routes/doctor';
import Nurse from './routes/nurse';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './redux/store';

const { store, persist } = configureStore();
export default function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persist}>
                <Fragment>
                    <CssBaseline />
                    <Common />
                    <Admin />
                    <Doctor />
                    <Nurse />
                </Fragment>
            </PersistGate>
        </Provider>
    );
}