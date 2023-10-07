import React from 'react';
import { render } from '@testing-library/react-native';
import { LogOutConfirmationModal } from '../../../components/LogOutConfirmationModal';

describe( '<LogOutConfirmationModal />', () => {
	let component;
	const testID = 'testing-CancelPostConfirmationModal-Component';

	const setUp = () => {
		component = render( <LogOutConfirmationModal testID={testID} /> );
	};

	beforeEach( () => {
		setUp();
	} );

	it( 'mounts the modal correctly', () => {
		const title = 'Log Out?';
		const description = 'Are you sure to leave Wilco?';
		const confirmText = 'Yes';
		const cancelText = 'Cancel';

		expect( component.getByText( title ) ).toBeDefined();
		expect( component.getByText( description ) ).toBeDefined();
		expect( component.getByText( confirmText ) ).toBeDefined();
		expect( component.getByText( cancelText ) ).toBeDefined();
	} );
} );
