import React from 'react';
import PropTypes from 'prop-types';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import SnackbarService from '../services/SnackbarService';
import { fonts } from '../Theme';

const theme = {
	...DefaultTheme,
	fonts: {
		regular: fonts.bodyFocus
	}
};

const SnackbarContext = React.createContext( null );

export const SnackbarProvider = ( { children } ) => {
	const snackbarService = new SnackbarService();
	return (
		<SnackbarContext.Provider value={snackbarService}>
			<PaperProvider theme={theme}>
				{children}
			</PaperProvider>
		</SnackbarContext.Provider>
	);
};

SnackbarProvider.propTypes = {
	children: PropTypes.node.isRequired
};

export const useSnackbarService = () => React.useContext( SnackbarContext );
