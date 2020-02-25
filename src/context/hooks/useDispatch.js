import { useContext } from 'react';
import { getStore } from '../registerStore';

export default (storeName) => {
	const store = getStore( storeName );
	if ( store === false ) {
		return {};
	}

	const { actions, Context } = store;
	if ( ! actions || ! Context ) {
		return {};
	}

	const [ state, dispatch ] = useContext(Context);

	return Object.entries(actions).reduce((actions, [actionName, action]) => {
		return {
			...actions,
			[actionName]: (...args) => action(state, dispatch, ...args),
		};
	}, {});
}
