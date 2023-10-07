import * as React from 'react';
import { render } from '@testing-library/react-native';
import mockUseView from '../../mocks/mockUseView';
import * as useResetPasswordWireframe from '../../../wireframes/useResetPasswordWireframe';
import Form from '../../../forms/Form';
import fields from '../../../forms/resetPasswordFields';
import ResetPassword from '../../../screens/ResetPassword/ResetPassword';

jest.mock( '@react-native-firebase/auth', () => ( {
	auth: jest.fn( () => {} )
} ) );

describe( 'ResetPassword', () => {
	let screen;
	const title = 'New Password';
	const buttonTitle = 'Create';
	const form = new Form( { fields } );

	const setUp = ( view = {} ) => {
		mockUseView(
			useResetPasswordWireframe,
			{
				title,
				buttonTitle,
				form,
				...view
			} );

		screen = render( <ResetPassword /> );
	};

	describe( 'when the view is not loading', () => {
		beforeEach( () => {
			setUp( { isLoading: false } );
		} );

		it( 'renders the ResetPassword screen correctly', async () => {
			expect( screen.queryByTestId( 'title-header' ) ).toHaveTextContent( title );
			expect( screen.queryByTestId( 'create-button' ) ).toHaveTextContent( buttonTitle );

			expect( screen.queryByTestId( 'password-input' ) ).not.toBeNull();
			expect( screen.queryByTestId( 'confirm-password-input' ) ).not.toBeNull();

			expect( screen ).toMatchSnapshot();
		} );

		it( 'does not render the screen loader', () => {
			expect( screen.queryByTestId( 'screenLoader' ) ).toBeNull();
		} );
	} );

	describe( 'when the view is loading', () => {
		beforeEach( () => {
			setUp( { isLoading: true } );
		} );

		it( 'renders the ResetPassword screen correctly', async () => {
			expect( screen.queryByTestId( 'title-header' ) ).toHaveTextContent( title );
			expect( screen.queryByTestId( 'create-button' ) ).toHaveTextContent( buttonTitle );

			expect( screen.queryByTestId( 'password-input' ) ).not.toBeNull();
			expect( screen.queryByTestId( 'confirm-password-input' ) ).not.toBeNull();

			expect( screen ).toMatchSnapshot();
		} );

		it( 'renders the screen loader', () => {
			expect( screen.queryByTestId( 'screenLoader' ) ).not.toBeNull();
		} );
	} );
} );
