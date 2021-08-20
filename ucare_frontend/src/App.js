import React, { Fragment } from 'react';
import User from './routes/user';
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
                    <User />
                </Fragment>
            </PersistGate>
        </Provider>
    );
}