import * as React from 'react';
import { render } from '@testing-library/react-native';
import Fake from '../../screens/Fake';

describe( 'Fake', () => {
	let screen;
	const title = 'Log In title';

	const setUp = ( ) => {
		screen = render( <Fake title={title} /> );
	};

	beforeEach( () => {
		setUp();
	} );

	it( 'renders the Fake screen correctly', async () => {
		expect( screen.queryByTestId( 'fake-text' ) ).toHaveTextContent( title );
		expect( screen.queryByTestId( 'fake-view' ) ).not.toBeNull();

		expect( screen ).toMatchSnapshot();
	} );
} );
