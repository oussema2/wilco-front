import * as React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import { TextInput } from '../../../components';

describe( 'TextInput', () => {
	describe( 'with the default props', () => {
		it( 'renders the TextInput component correctly', async () => {
			const component = render( <TextInput /> );
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'with a label', () => {
		it( 'renders the TextInput component correctly', async () => {
			const label = 'Label';
			const { getByTestId } = render( <TextInput inputProps={{ label }} /> );
			expect( getByTestId( 'input-label' ).props.children ).toBe( label );
			expect( getByTestId( 'input' ) ).not.toBeNull();
			expect( getByTestId( 'textInput' ) ).not.toBeNull();
		} );
	} );

	describe( 'when the value prop is set', () => {
		it( 'displays the value', () => {
			const value = 'Test value';
			const { getByTestId } = render( <TextInput inputProps={{ value }} /> );
			expect( getByTestId( 'input' ).props.value ).toBe( value );
		} );
	} );

	describe( 'when the error prop is set', () => {
		it( 'renders the TextInput component with error style and the given error message', () => {
			const component = render( <TextInput error="Invalid format" /> );
			expect( component.queryByText( 'Invalid format' ) ).not.toBeNull();
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'when the disabled prop is set', () => {
		it( 'disables the input', () => {
			const { getByTestId } = render( <TextInput inputProps={{ disabled: true }} /> );
			expect( getByTestId( 'input' ).props.editable ).toBe( false );
		} );
	} );

	describe( 'when the isPassword prop is set', () => {
		it( 'renders the TextInput component with secure text entry', () => {
			const component = render( <TextInput isPassword /> );
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'when the required prop is set', () => {
		it( 'renders the TextInput component with a mandatory mark next to the label', () => {
			const component = render( <TextInput required /> );
			expect( component ).toMatchSnapshot();
			expect( component.getByTestId( 'input-required' ) ).not.toBeNull();
		} );
	} );

	describe( 'with the autoCapitalize prop', () => {
		it( 'renders the TextInput component with the given capitalize option', () => {
			const component = render( <TextInput autoCapitalize="words" /> );
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'when the onFocus prop is set', () => {
		describe( 'and the text input is focused', () => {
			it( 'is calls the passed onFocus callback', () => {
				const onFocusMock = jest.fn();
				const { getByTestId } = render( <TextInput inputProps={{ onFocus: onFocusMock }} /> );
				fireEvent( getByTestId( 'input' ), 'focus' );
				expect( onFocusMock ).toHaveBeenCalledTimes( 1 );
			} );
		} );
	} );

	describe( 'when the onBlur prop is set', () => {
		describe( 'and the text input is blurred', () => {
			it( 'is calls the passed onBlur callback', () => {
				const onBlurMock = jest.fn();
				const { getByTestId } = render( <TextInput inputProps={{ onBlur: onBlurMock }} /> );
				fireEvent( getByTestId( 'input' ), 'blur' );
				expect( onBlurMock ).toHaveBeenCalledTimes( 1 );
			} );
		} );
	} );

	describe( 'when the onChange prop is set', () => {
		it( 'is passed to the TextInput element', () => {
			const onChange = () => {};
			const { getByTestId } = render( <TextInput inputProps={{ onChange }} /> );
			expect( getByTestId( 'input' ).props.onChangeText ).toBe( onChange );
		} );
	} );
} );
