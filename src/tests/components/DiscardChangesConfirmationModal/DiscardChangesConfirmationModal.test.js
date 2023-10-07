import React from 'react';
import { render } from '@testing-library/react-native';
import { DiscardChangesConfirmationModal } from '../../../components/DiscardChangesConfirmationModal';

describe( '<DiscardChangesConfirmationModal />', () => {
	let component;
	const testID = 'testing-DiscardChangesConfirmationModal-Component';

	const setUp = () => {
		component = render( <DiscardChangesConfirmationModal testID={testID} /> );
	};

	beforeEach( () => {
		setUp();
	} );

	it( 'mounts the modal correctly', () => {
		const title = 'Discard changes?';
		const description = 'If you go back now, you will lose your changes.';
		const confirmText = 'Discard';
		const cancelText = 'Keep editing';

		expect( component.getByText( title ) ).toBeDefined();
		expect( component.getByText( description ) ).toBeDefined();
		expect( component.getByText( confirmText ) ).toBeDefined();
		expect( component.getByText( cancelText ) ).toBeDefined();
	} );
} );
