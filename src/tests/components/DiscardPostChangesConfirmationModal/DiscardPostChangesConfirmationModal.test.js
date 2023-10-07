import React from 'react';
import { render } from '@testing-library/react-native';
import { DiscardPostChangesConfirmationModal } from '../../../components/DiscardPostChangesConfirmationModal';

describe( '<DiscardPostChangesConfirmationModal />', () => {
	let component;
	const testID = 'testing-DiscardPostChangesConfirmationModal-Component';

	const setUp = () => {
		component = render( <DiscardPostChangesConfirmationModal testID={testID} /> );
	};

	beforeEach( () => {
		setUp();
	} );

	it( 'mounts the modal correctly', () => {
		const title = 'Discard Changes?';
		const description = 'If you cancel without saving, you\'ll lose all the changes made.';
		const confirmText = 'Discard';
		const cancelText = 'Keep Editing';

		expect( component.getByText( title ) ).toBeDefined();
		expect( component.getByText( description ) ).toBeDefined();
		expect( component.getByText( confirmText ) ).toBeDefined();
		expect( component.getByText( cancelText ) ).toBeDefined();
	} );
} );
