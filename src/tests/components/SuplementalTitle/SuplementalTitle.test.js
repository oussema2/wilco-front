import React from 'react';
import { render } from '@testing-library/react-native';
import { SuplementalTitle } from '../../../components/SuplementalTitle';

describe( '<SuplementalTitle />', () => {
	const testID = 'testing-SuplementalTitle-component';
	const text = 'A title';

	describe( 'with the default props', () => {
		it( 'renders the SuplementalTitle component correctly', () => {
			const component = render(
				<SuplementalTitle testID={testID} text={text} />
			);

			expect( component.queryByTestId( testID ) ).toHaveTextContent( text );
			expect( component ).toMatchSnapshot();
		} );
	} );
} );
