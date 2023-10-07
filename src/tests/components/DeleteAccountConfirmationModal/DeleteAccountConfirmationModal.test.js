import React from 'react';
import { render } from '@testing-library/react-native';
import { DeleteAccountConfirmationModal } from '../../../components/DeleteAccountConfirmationModal';

describe( '<DeleteAccountConfirmationModal />', () => {
	let component;
	const testID = 'testing-DeleteAccountConfirmationModal-Component';

	const setUp = () => {
		component = render( <DeleteAccountConfirmationModal testID={testID} /> );
	};

	beforeEach( () => {
		setUp();
	} );

	it( 'mounts the modal correctly', () => {
		const title = 'Delete Account?';
		const description = 'You’ll permanently delete your account with no chance of recovery.';
		const confirmText = 'Delete';
		const cancelText = 'Cancel';

		expect( component.getByText( title ) ).toBeDefined();
		expect( component.getByText( description ) ).toBeDefined();
		expect( component.getByText( confirmText ) ).toBeDefined();
		expect( component.getByText( cancelText ) ).toBeDefined();
	} );
} );
