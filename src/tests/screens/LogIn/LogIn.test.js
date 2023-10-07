import * as React from 'react';
import { render } from '@testing-library/react-native';
import mockUseView from '../../mocks/mockUseView';
import LogIn from '../../../screens/LogIn/LogIn';
import * as useLogInWireframe from '../../../wireframes/useLogInWireframe';
import Form from '../../../forms/Form';
import fields from '../../../forms/logInFields';

jest.mock( '@react-native-firebase/auth', () => ( {
	auth: jest.fn( () => {} )
} ) );

describe( 'LogIn', () => {
	let screen;
	const title = 'Log In title';
	const buttonTitle = 'Log In button title';
	const form = new Form( { fields } );
	const toggleLogIn = jest.fn();
	const invalidCredentialsWereSubmitted = false;

	const setUp = ( view = {} ) => {
		mockUseView(
			useLogInWireframe,
			{
				title,
				buttonTitle,
				toggleLogIn,
				form,
				invalidCredentialsWereSubmitted,
				...view
			} );

		screen = render( <LogIn /> );
	};

	describe( 'when the view is not logging in', () => {
		beforeEach( () => {
			setUp( { isLoggingIn: false } );
		} );

		it( 'renders the LogIn screen correctly', async () => {
			expect( screen.queryByTestId( 'title-header' ) ).toHaveTextContent( title );
			expect( screen.queryByTestId( 'logIn-button' ) ).toHaveTextContent( buttonTitle );

			expect( screen.queryByTestId( 'email-input' ) ).not.toBeNull();
			expect( screen.queryByTestId( 'password-input' ) ).not.toBeNull();

			expect( screen ).toMatchSnapshot();
		} );

		it( 'does not render the screen loader', () => {
			expect( screen.queryByTestId( 'screenLoader' ) ).toBeNull();
		} );

		// TODO: fix this test so that it adapts to the validation on blur.

		// eslint-disable-next-line jest/no-commented-out-tests
		// describe( 'when the form has validation errors', () => {
		// 	eslint-disable-next-line jest/no-commented-out-tests
		// 	it( 'shows the messages of the errors', async () => {
		// 		const emailInput = screen.queryAllByTestId( 'input' )[ 0 ];
		// 		const passwordInput = screen.queryAllByTestId( 'input' )[ 1 ];
		// 		await act( async () => {
		// 			fireEvent( emailInput, 'change', 'invalid email' );
		// 			fireEvent( passwordInput, 'change', 'a password' );
		// 			fireEvent( passwordInput, 'change', '' );
		// 		} );
		// 		expect( screen.queryByText( 'This email does not have a valid format.' ) ).not.toBeNull();
		// 		expect( screen.queryByText( 'This field is mandatory.' ) ).not.toBeNull();
		// 	} );
		// } );

		describe( 'when invalid credentials were submitted', () => {
			it( 'shows the inputs with error color', () => {
				setUp( { isLoggingIn: false, invalidCredentialsWereSubmitted: true } );
				expect( screen ).toMatchSnapshot();
			} );
		} );
	} );

	describe( 'when the view is logging in', () => {
		beforeEach( () => {
			setUp( { isLoggingIn: true } );
		} );

		it( 'renders the LogIn screen correctly', async () => {
			expect( screen.queryByTestId( 'title-header' ) ).toHaveTextContent( title );
			expect( screen.queryByTestId( 'logIn-button' ) ).toHaveTextContent( buttonTitle );

			expect( screen.queryByTestId( 'email-input' ) ).not.toBeNull();
			expect( screen.queryByTestId( 'password-input' ) ).not.toBeNull();

			expect( screen ).toMatchSnapshot();
		} );

		it( 'renders the screen loader', () => {
			expect( screen.queryByTestId( 'screenLoader' ) ).not.toBeNull();
		} );
	} );
} );
