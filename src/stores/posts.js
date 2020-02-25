import axios from 'axios';
import { addQueryArgs } from '@wordpress/url';

const PRE_FETCH_POSTS = 'PRE_FETCH_POSTS';
const FETCHED_POSTS = 'FETCHED_POSTS';
const FETCH_POSTS_ERROR = 'FETCH_POSTS_ERROR';
const SELECT_POST = 'SELECT_POST';

const initialState = {
	posts: {},
	isLoading: false,
	currentPost: 0,
	error: '',
};

const baseURL = 'https://demo.wp-api.org/wp-json/wp/v2/posts';

const actions = {
	fetchPosts: async (state, dispatch, page = 1) => {
		const url = addQueryArgs(baseURL, { page });
		dispatch({ type: PRE_FETCH_POSTS, page });
		axios
			.get(url)
			.then(({ data }) => {
				dispatch({ type: FETCHED_POSTS, posts: data, page });
			})
			.catch(({ message }) => {
				dispatch({ type: FETCH_POSTS_ERROR, message });
			});
	},
	selectPost: (state, dispatch, id) => {
		dispatch({ type: SELECT_POST, id });
	},
};

const reducer = (state, action) => {
	const { type } = action;
	switch (type) {
		case FETCHED_POSTS: {
			const { posts } = action;
			return {
				...state,
				posts: posts.reduce((posts, post) => {
					const { id } = post;
					return {
						...posts,
						[id]: post,
					};
				}, {}),
			};
		}
		case SELECT_POST: {
			const { posts } = state;
			const { id } = action;

			if (!posts[id]) {
				return {
					...state,
					currentPost: 0,
				};
			}
			return {
				...state,
				currentPost: id,
			};
		}
		case FETCH_POSTS_ERROR: {
			const { message } = action;
			return {
				error: message,
				...state,
			};
		}
		default:
			return { ...state };
	}
};

export default {
	actions,
	reducer,
	initialState,
};
