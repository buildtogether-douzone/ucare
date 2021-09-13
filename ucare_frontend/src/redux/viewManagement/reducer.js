import { VIEW_STATE } from './types';

const initialState = {
    reload: false
};

const viewManageReducer = (state=initialState, action) => {
    switch(action.type){
        case VIEW_STATE:
            return{
                ...state,
                reload: !state.reload
            }
        default: return state
    }
};

export default viewManageReducer;