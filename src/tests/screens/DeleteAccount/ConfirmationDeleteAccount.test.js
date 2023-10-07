import * as React from 'react';
import { render } from '@testing-library/react-native';
import mockUseView from '../../mocks/mockUseView';
import * as useDeleteAccountWireframe from '../../../wireframes/useDeleteAccountWireframe';
import ConfirmationDeleteAccount from '../../../screens/DeleteAccount/ConfirmationDeleteAccount';
import Form from '../../../forms/Form';
import fields from '../../../forms/confirmationDeleteAccountFields';

jest.mock( '@react-native-firebase/auth', () => ( {
	auth: jest.fn( () => {} )
} ) );

jest.mock( '@react-navigation/native', () => ( {
	...jest.requireActual( '@react-navigation/native' ),
	useScrollToTop: () => jest.fn()
} ) );

describe( 'ConfirmationDeleteAccount', () => {
	let screen;
	const titleText = 'Delete account';
	const buttonText = 'Delete my account';
	const subtitleText = 'Enter your current password to confirm deletion of your account.';
	const backButtonWasPressed = jest.fn();
	const form = new Form( { fields } );

	const setUp = ( view = {} ) => {
		mockUseView(
			useDeleteAccountWireframe,
			{
				...view,
				form,
				backButtonWasPressed
			}
		);

		screen = render( <ConfirmationDeleteAccount /> );
	};

	beforeEach( () => {
		setUp();
	} );

	it( 'renders the ConfirmationDeleteAccount screen correctly', () => {
		expect( screen.queryByTestId( 'confirmation-delete-account-screen' ) ).not.toBeNull();
		expect( screen.queryByTestId( 'confirmation-delete-account-navigation-bar-testID' ) ).not.toBeNull();
		expect( screen.queryByTestId( 'backArrow-image' ) ).not.toBeNull( );
		expect( screen.queryByTestId( 'title-text' ) ).toHaveTextContent( titleText );
		expect( screen.queryByTestId( 'subtitle-testID' ) ).toHaveTextContent( subtitleText );
		expect( screen.queryByTestId( 'rightPlaceholder-view' ) ).not.toBeNull();
		expect( screen.queryByTestId( 'rightIcon-testID' ) ).toBeNull();
		expect( screen.queryByTestId( 'image-exclamation-triangle' ) ).not.toBeNull( );
		expect( screen.queryByTestId( 'confirmation-delete-account-button-testID' ) ).toHaveTextContent( buttonText );
	} );
} );
