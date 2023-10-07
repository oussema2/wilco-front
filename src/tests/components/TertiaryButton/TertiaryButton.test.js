import * as React from 'react';
import { render } from '@testing-library/react-native';

import { TertiaryButton } from '../../../components/TertiaryButton';

describe( 'TertiaryButton', () => {
	describe( 'with the default props', () => {
		it( 'renders the TertiaryButton component correctly', async () => {
			const component = render( <TertiaryButton size="big" /> );
			expect( component.queryByTestId( 'tertiaryButton-component' ) ).not.toBeNull();
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'with button styles', () => {
		it( 'renders the button correctly', async () => {
			const buttonStyle = { backgroundColor: 'red' };
			const component = render( <TertiaryButton buttonStyle={buttonStyle} /> );
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'with title', () => {
		it( 'renders the title correctly', async () => {
			const title = 'title';
			const component = render( <TertiaryButton title={title} /> );
			expect( component.queryAllByText( title ) ).not.toBeNull();
			expect( component ).toMatchSnapshot();
		} );
	} );
} );
