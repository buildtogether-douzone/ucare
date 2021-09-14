import React, { Fragment } from 'react';
import UcareRoute from './routes/UcareRoute';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './redux/store';
import { RecoilRoot } from 'recoil';

const { store, persist } = configureStore();
export default function App() {
    return (
        <RecoilRoot>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persist}>
                    <Fragment>
                        <CssBaseline />
                        <UcareRoute />
                    </Fragment>
                </PersistGate>
            </Provider>
        </RecoilRoot>
    );
}