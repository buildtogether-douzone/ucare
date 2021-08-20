import { createStore } from 'redux';
import rootReducer from './drawerManagement';
import { persistStore, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';

const persistConfig = {
    key: 'root',
    storage: storageSession
};

const enhancedReducer = persistReducer(persistConfig, rootReducer);

export default function configureStore(){
    const store = createStore(enhancedReducer);
    const persist = persistStore(store);
    return {store, persist};
}