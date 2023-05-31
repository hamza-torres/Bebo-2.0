import { USER_ACTION_TYPES } from './user.types';

const INITIAL_STATE = {
	currentUser: null,
	mode: 'light',
	img: null,
};

export const userReducer = (state = INITIAL_STATE, action) => {
	const { type, payload } = action;

	switch (type) {
		case USER_ACTION_TYPES.SET_CURRENT_USER:
			return { ...state, currentUser: payload };
		case USER_ACTION_TYPES.SET_MODE:
			return { ...state, mode: state.mode === 'light' ? 'dark' : 'light' };
		case USER_ACTION_TYPES.SET_IMG:
			return { ...state, img: payload };
		default:
			return state;
	}
};
