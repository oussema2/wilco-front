import * as React from 'react';
import { render, cleanup } from '@testing-library/react-native';
import { Title } from '../../../components/Title';
import noop from '../../../helpers/noop';

afterEach( cleanup );

describe( 'Title', () => {
	const testID = 'testing-title-component';
	const text = 'A title';

	describe( 'with the default props', () => {
		it( 'renders the Title component correctly', () => {
			const component = render( <Title testID={testID} text={text} /> );

			expect( component.queryByTestId( testID ) ).toHaveTextContent( text );
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'with a required prop', () => {
		it( 'renders the Title component correctly', () => {
			const component = render( <Title testID={testID} text={text} required /> );
			expect( component.queryByTestId( 'required-testID' ) ).toBeDefined();
			expect( component.queryByTestId( 'required-testID' ) ).toHaveTextContent( '*' );
		} );
	} );

	describe( 'with a rightText prop', () => {
		it( 'renders right text correctly', () => {
			const exampleText = 'example-testID';
			const component = render( <Title
				testID={testID}
				text={text}
				rightText={exampleText}
				rightAction={noop}
			/> );
			expect( component.queryByTestId( 'right-text-testID' ) ).toBeDefined();
			expect( component.queryByTestId( 'right-text-testID' ) ).toHaveTextContent( exampleText );
		} );
	} );

	describe( 'without a rightText prop', () => {
		it( 'does not render the right text', () => {
			const component = render( <Title
				testID={testID}
				text={text}
				rightAction={noop}
			/> );
			expect( component.queryByTestId( 'right-text-testID' ) ).toBeNull();
		} );
	} );
} );
