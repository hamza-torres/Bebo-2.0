import { USER_ACTION_TYPES } from './user.types';

const INITIAL_STATE = {
	currentUser: null,
	mode: 'light',
};

export const userReducer = (state = INITIAL_STATE, action) => {
	const { type, payload } = action;

	switch (type) {
		case USER_ACTION_TYPES.SET_CURRENT_USER:
			return { ...state, currentUser: payload };
		case USER_ACTION_TYPES.SET_MODE:
			return { ...state, mode: state.mode === 'light' ? 'dark' : 'light' };
		default:
			return state;
	}
};
