import React from 'react';
import PropTypes from 'prop-types';
import ModalService from '../services/ModalService';

const ModalContext = React.createContext( null );

export const ModalProvider = ( { children } ) => {
	const modalService = new ModalService();
	return (
		<ModalContext.Provider value={modalService}>
			{children}
		</ModalContext.Provider>
	);
};

ModalProvider.propTypes = {
	children: PropTypes.node.isRequired
};

export const useModalService = () => React.useContext( ModalContext );
