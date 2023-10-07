import React from 'react';
import PropTypes from 'prop-types';
import AnalyticsService from '../services/AnalyticsService';

const AnalyticsContext = React.createContext( null );

export const AnalyticsProvider = ( { children } ) => {
	const analyticsService = new AnalyticsService();
	return (
		<AnalyticsContext.Provider value={analyticsService}>
			{children}
		</AnalyticsContext.Provider>
	);
};

AnalyticsProvider.propTypes = {
	children: PropTypes.node.isRequired
};

export const useAnalyticsService = () => React.useContext( AnalyticsContext );
