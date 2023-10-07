import React from 'react';
import { render } from '@testing-library/react-native';
import { CancelPostConfirmationModal } from '../../../components/CancelPostConfirmationModal';

describe( '<CancelPostConfirmationModal />', () => {
	let component;
	const testID = 'testing-CancelPostConfirmationModal-Component';

	const setUp = () => {
		component = render( <CancelPostConfirmationModal testID={testID} /> );
	};

	beforeEach( () => {
		setUp();
	} );

	it( 'mounts the modal correctly', () => {
		const title = 'Cancel Post Creation?';
		const description = 'If you cancel the creation, you\'ll lose all the information.';
		const confirmText = 'Cancel';
		const cancelText = 'Keep posting';

		expect( component.getByText( title ) ).toBeDefined();
		expect( component.getByText( description ) ).toBeDefined();
		expect( component.getByText( confirmText ) ).toBeDefined();
		expect( component.getByText( cancelText ) ).toBeDefined();
	} );
} );
