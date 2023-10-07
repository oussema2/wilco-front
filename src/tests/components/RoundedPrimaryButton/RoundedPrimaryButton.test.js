import * as React from 'react';
import { render } from '@testing-library/react-native';

import { RoundedPrimaryButton } from '../../../components/RoundedPrimaryButton';

describe( 'RoundedPrimaryButton', () => {
	describe( 'with the default props', () => {
		it( 'renders the PrimaryButton component correctly', async () => {
			const component = render( <RoundedPrimaryButton /> );
			expect( component.queryByTestId( 'roundedPrimaryButton' ) ).not.toBeNull();
			expect( component ).toMatchSnapshot();
		} );
	} );
} );
