import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';
import { renderHook } from '@testing-library/react-hooks';
import { AnalyticsProvider, useAnalyticsService } from '../../providers/AnalyticsProvider';
import AnalyticsService from '../../services/AnalyticsService';

describe( '<AnalyticsProvider/>', () => {
	let provider;
	const testData = <Text>test-data</Text>;

	const setUp = () => {
		provider = render( <AnalyticsProvider>{testData}</AnalyticsProvider> );
	};

	beforeEach( () => {
		setUp();
	} );

	it( 'renders children', () => {
		expect( provider.getByText( 'test-data' ) ).toBeDefined();
	} );

	it( 'passes the service as value for the provider', () => {
		const { result } = renderHook( () => useAnalyticsService(), {
			wrapper: AnalyticsProvider
		} );
		expect( result.current ).toBeInstanceOf( AnalyticsService );
	} );
} );
