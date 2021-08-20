import { createStore } from 'redux';
import drawerManageReducer from './drawerManagement/reducer';

const store = createStore(drawerManageReducer);

export default store;