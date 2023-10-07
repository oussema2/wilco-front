import React from 'react';
import PropTypes from 'prop-types';
import ActionSheetService from '../services/ActionSheetService';

const ActionSheetContext = React.createContext( null );

export const ActionSheetProvider = ( { children } ) => {
	const actionSheetService = new ActionSheetService();
	return (
		<ActionSheetContext.Provider value={actionSheetService}>
			{children}
		</ActionSheetContext.Provider>
	);
};

ActionSheetProvider.propTypes = {
	children: PropTypes.node.isRequired
};

export const useActionSheetService = () => React.useContext( ActionSheetContext );
