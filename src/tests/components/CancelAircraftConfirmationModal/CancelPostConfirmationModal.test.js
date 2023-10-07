import React from 'react';
import { render } from '@testing-library/react-native';
import { CancelAircraftConfirmationModal } from '../../../components/CancelAircraftConfirmationModal';

describe( '<CancelAircraftConfirmationModal />', () => {
	let component;
	const testID = 'testing-CancelPostConfirmationModal-Component';

	const setUp = () => {
		component = render( <CancelAircraftConfirmationModal testID={testID} /> );
	};

	beforeEach( () => {
		setUp();
	} );

	it( 'mounts the modal correctly', () => {
		const title = 'Cancel Aircraft Creation?';
		const description = 'If you cancel the creation, you\'ll lose all the information.';
		const confirmText = 'Cancel';
		const cancelText = 'Keep creating';

		expect( component.getByText( title ) ).toBeDefined();
		expect( component.getByText( description ) ).toBeDefined();
		expect( component.getByText( confirmText ) ).toBeDefined();
		expect( component.getByText( cancelText ) ).toBeDefined();
	} );
} );
