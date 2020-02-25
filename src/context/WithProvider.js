import React from 'react';
import { getStores } from './registerStore';

export default ({ children }) => {
	const providers = Object.entries(getStores()).map(
		([_, { Provider }]) => Provider,
	);

	if (providers.length === 0) {
		return children;
	}

	return providers.reduce((acc, Provider) => {
		return <Provider>{acc}</Provider>;
	}, children);
};
