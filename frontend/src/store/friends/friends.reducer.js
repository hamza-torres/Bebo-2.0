import { FRIENDS_ACTION_TYPES } from "./friends.types";
export const FRIENDS_INITIAL_STATE = {
    friends: [],
}


export const friendsReducer = (state = FRIENDS_INITIAL_STATE, action = {}) => {
    const { type, payload } = action;
    switch (type) {
            case FRIENDS_ACTION_TYPES.SET_FRIENDS:
                return {
                    ...state,
                    friends: payload,
                };    
        default:
            return state;
    }
}