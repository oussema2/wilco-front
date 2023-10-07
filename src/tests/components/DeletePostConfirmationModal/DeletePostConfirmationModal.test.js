import React from 'react';
import { render } from '@testing-library/react-native';
import { DeletePostConfirmationModal } from '../../../components/DeletePostConfirmationModal';

describe( '<DeletePostConfirmationModal />', () => {
	let component;

	const setUp = () => {
		component = render( <DeletePostConfirmationModal /> );
	};

	beforeEach( () => {
		setUp();
	} );

	it( 'mounts the modal correctly', () => {
		const title = 'Delete Post?';
		const description = 'You’ll permanently delete this post with no chance of recovery.';

		expect( component.queryByText( title ) ).toBeDefined();
		expect( component.queryByText( description ) ).toBeDefined();

		expect( component ).toMatchSnapshot();
	} );
} );
