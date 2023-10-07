import * as React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import { TouchableInput } from '../../../components/TouchableInput';

describe( 'TouchableInput', () => {
	const testID = 'testID';
	const value = 'Sample value';

	describe( 'with the default props', () => {
		it( 'renders the TouchableInput component correctly', () => {
			const component = render( <TouchableInput testID={testID} value={value} /> );
			expect( component.queryByTestId( testID ) ).not.toBeNull();
			expect( component.queryByTestId( 'touchable-input-label' ) ).not.toBeNull();
			expect( component.queryByTestId( 'touchable-input-text' ) ).toHaveTextContent( value );
			expect( component.queryByTestId( 'touchable-input-error' ) ).not.toBeNull();
			expect( component.queryByTestId( 'touchable-input-icon' ) ).not.toBeNull();
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'when the label prop is set', () => {
		it( 'renders the TouchableInput component with the label', async () => {
			const component = render( <TouchableInput testID={testID} value={value} label="Sample label" /> );
			expect( component.getByTestId( 'touchable-input-label' ) ).toHaveTextContent( 'Sample label' );
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'when the error prop is set', () => {
		it( 'renders the TouchableInput component with error style and the given error message', () => {
			const component = render( <TouchableInput testID={testID} value={value} error="Sample error" /> );
			expect( component.getByTestId( 'touchable-input-error' ) ).toHaveTextContent( 'Sample error' );
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'when the required prop is set', () => {
		it( 'renders the TouchableInput component with a mandatory mark next to the label', () => {
			const component = render( <TouchableInput testID={testID} value={value} required /> );
			expect( component.getByTestId( 'touchable-input-required' ) ).not.toBeNull();
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'when the onPress prop is set', () => {
		describe( 'and the text container is pressed', () => {
			it( 'calls the passed onPress callback', () => {
				const onPressMock = jest.fn();
				const { getByTestId } = render(
					<TouchableInput testID={testID} value={value} onPress={onPressMock} />
				);
				fireEvent.press( getByTestId( 'touchable-input-text' ) );
				expect( onPressMock ).toHaveBeenCalledTimes( 1 );
			} );
		} );
	} );

	describe( 'when a placeholder is provided', () => {
		const placeholder = 'Sample placeholder';

		describe( 'and there\'s a value to display', () => {
			it( 'displays the value', () => {
				const { getByText } = render(
					<TouchableInput value={value} placeholder={placeholder} />
				);

				expect( getByText( value ) ).toBeDefined();
			} );
		} );

		describe( 'and there\'s no value to display', () => {
			it( 'displays the placeholder', () => {
				const { getByText } = render(
					<TouchableInput value="" placeholder={placeholder} />
				);

				expect( getByText( placeholder ) ).toBeDefined();
			} );
		} );
	} );
} );
