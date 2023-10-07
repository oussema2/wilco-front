import React from 'react';
import PropTypes from 'prop-types';
import { RootStoreProvider } from './RootStoreProvider';
import { ActionSheetProvider } from './ActionSheetProvider';
import { ModalProvider } from './ModalProvider';
import { SnackbarProvider } from './SnackbarProvider';
import { AnalyticsProvider } from './AnalyticsProvider';

const AppProvider = ( { children } ) => (
	<RootStoreProvider>
		<AnalyticsProvider>
			<ActionSheetProvider>
				<ModalProvider>
					<SnackbarProvider>
						{children}
					</SnackbarProvider>
				</ModalProvider>
			</ActionSheetProvider>
		</AnalyticsProvider>
	</RootStoreProvider>
);

AppProvider.propTypes = {
	children: PropTypes.node.isRequired
};

AppProvider.defaultProps = {
};

export default AppProvider;
