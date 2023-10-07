import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { TextButton } from '../../../components/TextButton';

describe( '<TextButton />', () => {
	let component;
	const title = 'Button title';
	const testID = 'testing-TextButton-Component';
	const onPress = jest.fn();

	const setUp = ( props ) => {
		component = render( <TextButton testID={testID} title={title} {...props} /> );
	};

	beforeEach( () => {
		jest.clearAllMocks();
		setUp( { testID, title, onPress } );
	} );

	describe( 'with the default props', () => {
		it( 'renders the TextButton component correctly', () => {
			expect( component.queryByTestId( testID ) ).toBeDefined();
			expect( component.queryByTestId( testID ) ).toHaveTextContent( title );

			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'when the variant is desttructive', () => {
		beforeEach( () => {
			component = render( <TextButton title={title} variant="destructive" /> );
		} );

		it( 'renders the destructive TextButton', () => {
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'when button is pressed', () => {
		it( 'calls onPress', () => {
			const button = component.queryByTestId( testID );
			fireEvent.press( button );
			expect( onPress ).toHaveBeenCalledTimes( 1 );
		} );
	} );
} );
