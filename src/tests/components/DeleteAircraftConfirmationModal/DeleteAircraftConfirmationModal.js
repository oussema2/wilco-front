import React from 'react';
import { render } from '@testing-library/react-native';
import { DeleteAircraftConfirmationModal } from '../../../components/DeleteAircraftConfirmationModal';

describe( '<DeleteAircraftConfirmationModal />', () => {
	let component;

	const setUp = () => {
		component = render( <DeleteAircraftConfirmationModal /> );
	};

	beforeEach( () => {
		setUp();
	} );

	it( 'mounts the modal correctly', () => {
		const title = 'Delete Aircraft?';
		const description = 'You’ll permanently delete this aircraft with no chance of recovery.';

		expect( component.queryByText( title ) ).toBeDefined();
		expect( component.queryByText( description ) ).toBeDefined();

		expect( component ).toMatchSnapshot();
	} );
} );
