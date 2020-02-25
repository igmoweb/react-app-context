import _get from 'lodash/get';
import React, { createContext, useReducer } from 'react';

const stores = {};
window.globalStores = window.globalStores || {};

export default (
	name,
	{ actions = {}, reducer = () => {}, initialState = {} },
) => {
	const Context = createContext();

	const Provider = (props) => {
		const [state, dispatch] = useReducer(reducer, initialState);
		window.globalStores[name] = { ...state };
		stores[name].state = { ...state };
		return (
			<Context.Provider value={[state, dispatch]}>
				{props.children}
			</Context.Provider>
		);
	};

	Provider.displayName = `${name}Store`;

	stores[name] = {
		Provider,
		Context,
		actions,
		reducer,
		state: initialState,
	};
};

export const getStores = () => {
	return stores;
};

export const getStore = (store) => {
	return _get(stores, store, {});
};
