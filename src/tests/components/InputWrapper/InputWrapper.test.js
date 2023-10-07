import * as React from 'react';
import { render } from '@testing-library/react-native';
import { InputWrapper } from '../../../components/InputWrapper';
import { Input } from '../../../components/Input';

describe( 'InputWrapper', () => {
	const renderInput = ( props ) => render( <InputWrapper Input={Input} {...props} /> );

	describe( 'with the default props', () => {
		it( 'renders the TextInput component correctly', async () => {
			const component = renderInput();
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'with a label', () => {
		it( 'renders the TextInput component correctly', async () => {
			const label = 'Label';
			const { getByTestId } = renderInput( { label } );
			expect( getByTestId( 'input-label' ).props.children ).toBe( label );
			expect( getByTestId( 'input' ) ).not.toBeNull();
			expect( getByTestId( 'input-wrapper' ) ).not.toBeNull();
		} );
	} );

	describe( 'when the required prop is set', () => {
		it( 'renders the TextInput component with a mandatory mark next to the label', () => {
			const component = renderInput( { required: true } );
			expect( component ).toMatchSnapshot();
			expect( component.getByTestId( 'input-required' ) ).not.toBeNull();
		} );
	} );
} );
