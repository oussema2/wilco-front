import * as React from 'react';
import { render, cleanup } from '@testing-library/react-native';
import { Subtitle } from '../../../components/Subtitle';
import { palette } from '../../../Theme';

afterEach( cleanup );

describe( 'Subtitle', () => {
	const testID = 'testing-subtitle-component';
	const text = 'A Subtitle';

	describe( 'with the default props', () => {
		it( 'renders the Subtitle component correctly', () => {
			const component = render( <Subtitle testID={testID} text={text} /> );

			expect( component.queryByTestId( testID ) ).toHaveTextContent( text );

			const subTitleText = component.getByText( text );
			expect( subTitleText ).toHaveStyle( {
				fontSize: 18
			} );
		} );

		it( 'renders the Subtitle correctly with custom styles', () => {
			const component = render( <Subtitle
				testID={testID}
				text={text}
				style={{ color: palette.subtitle.default }}
			/> );

			expect( component.queryByTestId( testID ) ).toHaveTextContent( text );

			const subTitleText = component.getByText( text );

			expect( subTitleText ).toHaveStyle( {
				fontSize: 18,
				color: palette.subtitle.default
			} );
		} );
	} );
} );
