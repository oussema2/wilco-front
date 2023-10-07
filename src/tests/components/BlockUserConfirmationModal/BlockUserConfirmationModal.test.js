import React from 'react';
import { render } from '@testing-library/react-native';
import { BlockUserConfirmationModal } from '../../../components/BlockUserConfirmationModal';

describe( '<BlockUserConfirmationModal />', () => {
	let component;
	const testID = 'testing-BlockUserConfirmationModal-Component';

	const setUp = () => {
		component = render( <BlockUserConfirmationModal testID={testID} /> );
	};

	beforeEach( () => {
		setUp();
	} );

	it( 'mounts the modal correctly', () => {
		const title = 'Block User?';
		const description = 'By blocking, you’ll prevent any interaction with the user.\n There’s no chance of recovery.';
		const confirmText = 'Block';
		const cancelText = 'Cancel';

		expect( component.getByText( title ) ).toBeDefined();
		expect( component.getByText( description ) ).toBeDefined();
		expect( component.getByText( confirmText ) ).toBeDefined();
		expect( component.getByText( cancelText ) ).toBeDefined();
	} );
} );
