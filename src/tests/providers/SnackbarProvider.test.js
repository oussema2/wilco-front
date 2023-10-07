import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';
import { renderHook } from '@testing-library/react-hooks';
import { SnackbarProvider, useSnackbarService } from '../../providers/SnackbarProvider';
import SnackbarService from '../../services/SnackbarService';

describe( '<SnackbarProvider/>', () => {
	let provider;
	const testData = <Text>test-data</Text>;

	const setUp = () => {
		provider = render( <SnackbarProvider>{testData}</SnackbarProvider> );
	};

	beforeEach( () => {
		setUp();
	} );

	it( 'renders children', () => {
		expect( provider.getByText( 'test-data' ) ).toBeDefined();
	} );

	it( 'passes the action sheet service as value for the provider', () => {
		const { result } = renderHook( () => useSnackbarService(), {
			wrapper: SnackbarProvider
		} );
		expect( result.current ).toBeInstanceOf( SnackbarService );
	} );
} );
