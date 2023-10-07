import * as React from 'react';
import { render } from '@testing-library/react-native';
import mockUseView from '../../mocks/mockUseView';
import * as useForgotPasswordWireframe from '../../../wireframes/useForgotPasswordWireframe';
import Form from '../../../forms/Form';
import fields from '../../../forms/forgotPasswordFields';
import ForgotPassword from '../../../screens/ForgotPassword/ForgotPassword';

jest.mock( '@react-native-firebase/auth', () => ( {
	auth: jest.fn( () => {} )
} ) );

describe( 'ForgotPassword', () => {
	let screen;
	const title = 'Forgot password';
	const subTitle = 'Please enter your email and we’ll help you set a new password.';
	const buttonTitle = 'Submit';
	const form = new Form( { fields } );

	const setUp = ( view = {} ) => {
		mockUseView(
			useForgotPasswordWireframe,
			{
				title,
				buttonTitle,
				form,
				...view
			} );

		screen = render( <ForgotPassword /> );
	};

	describe( 'when the app is not sending email', () => {
		beforeEach( () => {
			setUp( { isSendingEmail: false } );
		} );

		it( 'renders the ForgotPassword screen correctly', async () => {
			expect( screen.queryByTestId( 'title-header' ) ).toHaveTextContent( title );
			expect( screen.queryByTestId( 'subtitle-forgotPassword-testID' ) ).toHaveTextContent( subTitle );
			expect( screen.queryByTestId( 'helpMe-button' ) ).toHaveTextContent( buttonTitle );

			expect( screen.queryByTestId( 'email-input' ) ).not.toBeNull();

			expect( screen ).toMatchSnapshot();
		} );

		it( 'does not render the screen loader', () => {
			expect( screen.queryByTestId( 'screenLoader' ) ).toBeNull();
		} );
	} );

	describe( 'when the app is sending email', () => {
		beforeEach( () => {
			setUp( { isSendingEmail: true } );
		} );

		it( 'renders the ForgotPassword screen correctly', async () => {
			expect( screen.queryByTestId( 'title-header' ) ).toHaveTextContent( title );
			expect( screen.queryByTestId( 'subtitle-forgotPassword-testID' ) ).toHaveTextContent( subTitle );
			expect( screen.queryByTestId( 'helpMe-button' ) ).toHaveTextContent( buttonTitle );

			expect( screen.queryByTestId( 'email-input' ) ).not.toBeNull();

			expect( screen ).toMatchSnapshot();
		} );

		it( 'renders the screen loader', () => {
			expect( screen.queryByTestId( 'screenLoader' ) ).not.toBeNull();
		} );
	} );
} );
