import { useContext } from 'react';
import { getStore } from '../registerStore';

export default (storeName) => {
	const store = getStore( storeName );
	if ( store === false ) {
		return {};
	}

	const { Context } = store;
	const [ state ] = useContext(Context);
	return { ...state };
};
