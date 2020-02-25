const INCR_PAGE = 'INCR_PAGE';
const DECR_PAGE = 'DECR_PAGE';

const initialState = {
	page: 1,
};

const actions = {
	increasePage: (state, dispatch) => {
		dispatch({ type: INCR_PAGE });
	},
	decreasePage: (state, dispatch) => {
		dispatch({ type: DECR_PAGE });
	},
};

const reducer = (state, action) => {
	const { type } = action;
	switch (type) {
		case INCR_PAGE: {
			const { page } = state;
			return {
				...state,
				page: page + 1,
			};
		}
		case DECR_PAGE: {
			const { page } = state;
			return {
				...state,
				page: page - 1,
			};
		}
		default:
			return { ...state };
	}
};

export default {
	initialState,
	actions,
	reducer,
};
