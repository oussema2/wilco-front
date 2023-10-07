import * as React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import { TextArea } from '../../../components/TextArea';

describe( 'TextArea', () => {
	describe( 'with the default props', () => {
		it( 'renders the TextArea component correctly', async () => {
			const component = render( <TextArea /> );
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'with a label', () => {
		it( 'renders the TextArea component correctly', async () => {
			const label = 'Label';
			const { getByTestId } = render( <TextArea inputProps={{ label }} /> );
			expect( getByTestId( 'input-label' ).props.children ).toBe( label );
			expect( getByTestId( 'input' ) ).not.toBeNull();
			expect( getByTestId( 'textArea' ) ).not.toBeNull();
		} );
	} );

	describe( 'when the value prop is set', () => {
		it( 'displays the value', () => {
			const value = 'Test value';
			const { getByTestId } = render( <TextArea inputProps={{ value }} /> );
			expect( getByTestId( 'input' ).props.value ).toBe( value );
		} );
	} );

	describe( 'when the disabled prop is set', () => {
		it( 'disables the input', () => {
			const { getByTestId } = render( <TextArea inputProps={{ disabled: true }} /> );
			expect( getByTestId( 'input' ).props.editable ).toBe( false );
		} );
	} );

	describe( 'when the required prop is set', () => {
		it( 'renders the TextArea component with a mandatory mark next to the label', () => {
			const component = render( <TextArea required /> );
			expect( component ).toMatchSnapshot();
			expect( component.getByTestId( 'input-required' ) ).not.toBeNull();
		} );
	} );

	describe( 'when the onFocus prop is set', () => {
		describe( 'and the text input is focused', () => {
			it( 'is calls the passed onFocus callback', () => {
				const onFocusMock = jest.fn();
				const { getByTestId } = render( <TextArea inputProps={{ onFocus: onFocusMock }} /> );
				fireEvent( getByTestId( 'input' ), 'focus' );
				expect( onFocusMock ).toHaveBeenCalledTimes( 1 );
			} );
		} );
	} );

	describe( 'when the onBlur prop is set', () => {
		describe( 'and the text input is blurred', () => {
			it( 'is calls the passed onBlur callback', () => {
				const onBlurMock = jest.fn();
				const { getByTestId } = render( <TextArea inputProps={{ onBlur: onBlurMock }} /> );
				fireEvent( getByTestId( 'input' ), 'blur' );
				expect( onBlurMock ).toHaveBeenCalledTimes( 1 );
			} );
		} );
	} );

	describe( 'when the onChange prop is set', () => {
		it( 'is passed to the TextArea element', () => {
			const onChange = () => {};
			const { getByTestId } = render( <TextArea inputProps={{ onChange }} /> );
			expect( getByTestId( 'input' ).props.onChangeText ).toBe( onChange );
		} );
	} );
} );
