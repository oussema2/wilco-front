import * as analyticsProvider from '../../providers/AnalyticsProvider';
import AnalyticsService from '../../services/AnalyticsService';

const mockUseAnalyticsService = ( { service = new AnalyticsService() } = {} ) => {
	const mockAnalyticsService = service;

	jest.spyOn( analyticsProvider, 'useAnalyticsService' );
	analyticsProvider.useAnalyticsService.mockImplementation( () => mockAnalyticsService );

	return mockAnalyticsService;
};

export default mockUseAnalyticsService;
