import React from 'react';
import { render } from '@testing-library/react-native';
import { DiscardPostFilterChangesConfirmationModal } from '../../../components/DiscardPostFilterChangesConfirmationModal';

describe( '<DiscardPostFilterChangesConfirmationModal />', () => {
	let component;
	const testID = 'testing-DiscardPostFilterChangesConfirmationModal-Component';

	const setUp = () => {
		component = render( <DiscardPostFilterChangesConfirmationModal testID={testID} /> );
	};

	beforeEach( () => {
		setUp();
	} );

	it( 'mounts the modal correctly', () => {
		const title = 'Discard Changes?';
		const description = 'To avoid losing the changes made, please apply them before going back.';
		const confirmText = 'Discard';
		const cancelText = 'Keep Editing';

		expect( component.getByText( title ) ).toBeDefined();
		expect( component.getByText( description ) ).toBeDefined();
		expect( component.getByText( confirmText ) ).toBeDefined();
		expect( component.getByText( cancelText ) ).toBeDefined();
	} );
} );
