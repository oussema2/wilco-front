import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';
import { renderHook } from '@testing-library/react-hooks';
import { ModalProvider, useModalService } from '../../providers/ModalProvider';
import ModalService from '../../services/ModalService';

describe( '<ModalProvider/>', () => {
	let provider;
	const testData = <Text>test-data</Text>;

	const setUp = () => {
		provider = render( <ModalProvider>{testData}</ModalProvider> );
	};

	beforeEach( () => {
		setUp();
	} );

	it( 'renders children', () => {
		expect( provider.getByText( 'test-data' ) ).toBeDefined();
	} );

	it( 'passes the modal service as value for the provider', () => {
		const { result } = renderHook( () => useModalService(), {
			wrapper: ModalProvider
		} );
		expect( result.current ).toBeInstanceOf( ModalService );
	} );
} );
