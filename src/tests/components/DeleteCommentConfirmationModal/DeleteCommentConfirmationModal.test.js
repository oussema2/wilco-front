import React from 'react';
import { render } from '@testing-library/react-native';
import { DeleteCommentConfirmationModal } from '../../../components/DeleteCommentConfirmationModal';

describe( '<DeleteCommentConfirmationModal />', () => {
	let component;

	const setUp = () => {
		component = render( <DeleteCommentConfirmationModal /> );
	};

	beforeEach( () => {
		setUp();
	} );

	it( 'mounts the modal correctly', () => {
		const title = 'Delete Comment?';
		const description = 'You’ll permanently delete this comment with no chance of recovery.';

		expect( component.queryByText( title ) ).toBeDefined();
		expect( component.queryByText( description ) ).toBeDefined();

		expect( component ).toMatchSnapshot();
	} );
} );
