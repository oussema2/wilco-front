import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import { PasswordVisibilitySwitch } from '../../../components/PasswordVisibilitySwitch';

describe( '<PasswordVisibilitySwitch />', () => {
	let component;
	const testID = 'testing-PasswordVisibilitySwitch-Component';
	const onChange = jest.fn();

	const setUp = ( props ) => {
		component = render( <PasswordVisibilitySwitch
			testID={testID}
			passwordVisible={false}
			onChange={onChange}
			{...props}
		/> );
	};

	beforeEach( () => {
		setUp();
	} );

	it( 'renders the switch correctly', () => {
		expect( component.queryByTestId( testID ) ).toBeDefined();
		expect( component ).toMatchSnapshot();
	} );

	describe( 'when the passwordVisible prop is false', () => {
		it( 'renders with the correct icon', () => {
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'when the passwordVisible prop is true', () => {
		it( 'renders with the correct icon', () => {
			setUp( { passwordVisible: true } );
			expect( component ).toMatchSnapshot();
		} );
	} );

	describe( 'when the icon is pressed', () => {
		it( 'calls the onChange callback', () => {
			fireEvent.press( component.getByTestId( testID ) );
			expect( onChange ).toHaveBeenCalledTimes( 1 );
		} );
	} );
} );
