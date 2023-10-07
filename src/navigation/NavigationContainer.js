import React from 'react';
import PropTypes from 'prop-types';
import { NavigationContainer as Container } from '@react-navigation/native';
import navigation from './RootNavigation';
import { useAnalyticsService } from '../providers/AnalyticsProvider';

const NavigationContainer = ( { children } ) => {
	const analyticsService = useAnalyticsService();

	return (
		<Container ref={navigation.ref} onStateChange={analyticsService.onNavigationStateChange}>
			{children}
		</Container>
	);
};

NavigationContainer.propTypes = {
	children: PropTypes.node.isRequired
};

export default NavigationContainer;
