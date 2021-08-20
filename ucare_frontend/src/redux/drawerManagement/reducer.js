import { ChangeState } from './types';

const initialState = {
    open: true
};

const drawerManageReducer = (state=initialState, action) => {
    switch(action.type){
        case ChangeState:
            return{
                ...state,
                open: !state.open
            }
        default: return state
    }
};

export default drawerManageReducer;