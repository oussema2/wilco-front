import React from 'react';
import PropTypes from 'prop-types';
import RootStore from '../stores/RootStore';

const RootStoreContext = React.createContext( null );

export const RootStoreProvider = ( { children } ) => {
	const rootStore = RootStore.shared();
	return (
		<RootStoreContext.Provider value={rootStore}>
			{children}
		</RootStoreContext.Provider>
	);
};

RootStoreProvider.propTypes = {
	children: PropTypes.node.isRequired
};

RootStoreProvider.defaultProps = {
};

export const useRootStore = () => React.useContext( RootStoreContext );
