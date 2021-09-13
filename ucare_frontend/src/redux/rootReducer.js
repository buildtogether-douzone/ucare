import { combineReducers } from 'redux';
import drawerManageReducer from './drawerManagement/reducer';
import viewManageReducer from './viewManagement/reducer';

const rootReducer = combineReducers({
    drawerManageReducer,
    viewManageReducer
});

export default rootReducer;