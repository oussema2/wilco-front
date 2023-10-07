import React from 'react';
import { render } from '@testing-library/react-native';
import { ReportConfirmationModal } from '../../../components/ReportConfirmationModal';

describe( '<ReportConfirmationModal />', () => {
	let component;

	const setUp = () => {
		component = render( <ReportConfirmationModal reportableName="Post" /> );
	};

	beforeEach( () => {
		setUp();
	} );

	it( 'mounts the modal correctly', () => {
		const title = 'Report Post?';
		const description = 'You’ll report this post in order for an admin to check it.';

		expect( component.queryByText( title ) ).toBeDefined();
		expect( component.queryByText( description ) ).toBeDefined();

		expect( component ).toMatchSnapshot();
	} );
} );
