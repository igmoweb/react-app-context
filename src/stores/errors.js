const ADD_ERROR = 'ADD_ERROR';

const actions = {
	addError: (state, dispatch, message) => {
		dispatch({ type: ADD_ERROR, message });
	},
};

const reducer = (state, action) => {
	const { type } = action;
	switch (type) {
		case ADD_ERROR: {
			const {error} = action;
			const {errors} = state;
			return {
				...state,
				errors: [
					...errors,
					error,
				],
			};
		}
		default:
			return { ...state };
	}
};

const initialState = {
	errors: [],
};

export default {
	actions,
	reducer,
	initialState,
};
