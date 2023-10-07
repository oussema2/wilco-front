import React from 'react';
import { render } from '@testing-library/react-native';
import { Input } from '../../../components/Input';

describe( '<Input />', () => {
	let component;
	const testID = 'testing-Input-Component';

	const setUp = ( props ) => {
		component = render( <Input testID={testID} {...props} /> );
	};

	beforeEach( () => {
		setUp();
	} );

	describe( 'with the default props', () => {
		it( 'renders the Input component correctly', () => {
			expect( component.queryByTestId( testID ) ).toBeDefined();

			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'with the isPassword', () => {
		it( 'renders the password visibility switch', () => {
			expect( component.queryByTestId( 'password-switch' ) ).toBeDefined();
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'with the helperText', () => {
		it( 'renders the helper text', () => {
			const helperText = 'Helper text';
			setUp( { helperText } );
			expect( component.queryByTestId( 'helperText-testID' ) ).toHaveTextContent( helperText );
		} );
	} );
} );
