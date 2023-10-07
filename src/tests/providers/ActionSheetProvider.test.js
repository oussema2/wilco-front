import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';
import { renderHook } from '@testing-library/react-hooks';
import { ActionSheetProvider, useActionSheetService } from '../../providers/ActionSheetProvider';
import ActionSheetService from '../../services/ActionSheetService';

describe( '<ActionSheetProvider/>', () => {
	let provider;
	const testData = <Text>test-data</Text>;

	const setUp = () => {
		provider = render( <ActionSheetProvider>{testData}</ActionSheetProvider> );
	};

	beforeEach( () => {
		setUp();
	} );

	it( 'renders children', () => {
		expect( provider.getByText( 'test-data' ) ).toBeDefined();
	} );

	it( 'passes the action sheet service as value for the provider', () => {
		const { result } = renderHook( () => useActionSheetService(), {
			wrapper: ActionSheetProvider
		} );
		expect( result.current ).toBeInstanceOf( ActionSheetService );
	} );
} );
