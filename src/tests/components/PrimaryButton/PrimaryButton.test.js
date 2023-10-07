import * as React from 'react';
import { render } from '@testing-library/react-native';

import { PrimaryButton } from '../../../components';

describe( 'PrimaryButton', () => {
	describe( 'with the default props', () => {
		it( 'renders the PrimaryButton component correctly', async () => {
			const component = render( <PrimaryButton size="big" /> );
			expect( component.queryByTestId( 'primaryButton' ) ).not.toBeNull();
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'with button styles', () => {
		it( 'renders the button correctly', async () => {
			const buttonStyle = { backgroundColor: 'red' };
			const component = render( <PrimaryButton buttonStyle={buttonStyle} /> );
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'with title', () => {
		it( 'renders the title correctly', async () => {
			const title = 'title';
			const component = render( <PrimaryButton title={title} /> );
			expect( component.queryAllByText( title ) ).not.toBeNull();
			expect( component ).toMatchSnapshot();
		} );
	} );
} );
