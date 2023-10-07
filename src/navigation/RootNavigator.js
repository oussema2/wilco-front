/* eslint-disable react/prop-types */
import React from 'react';
import { observer } from 'mobx-react-lite';
import useRootNavigatorWireframe from '../wireframes/Navigation/useRootNavigatorWireframe';
import AuthenticatedNavigator from './AuthenticatedNavigator';
import UnauthenticatedNavigator from './UnauthenticatedNavigator';

const RootNavigator = () => {
	const presenter = useRootNavigatorWireframe();

	return presenter && !presenter.isLoading && (
		presenter.isUserAuthenticated
			? <AuthenticatedNavigator />
			: <UnauthenticatedNavigator />
	);
};

export default observer( RootNavigator );
