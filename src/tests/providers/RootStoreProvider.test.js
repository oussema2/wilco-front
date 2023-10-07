import React from 'react';
import { render } from '@testing-library/react-native';
import { Text } from 'react-native';
import { RootStoreProvider } from '../../providers/RootStoreProvider';

describe( '<RootStoreProvider/>', () => {
	let provider;

	const testData = <Text testID="test-text">test-data</Text>;

	beforeEach( () => {
		provider = render( <RootStoreProvider>{testData}</RootStoreProvider> );
	} );

	it( 'renders children', () => {
		expect( provider.queryByTestId( 'test-text' ) ).not.toBeNull();
	} );
} );
