import * as React from 'react';
import { render } from '@testing-library/react-native';
import mockUseView from '../../mocks/mockUseView';
import * as useDeleteAccountWireframe from '../../../wireframes/useDeleteAccountWireframe';
import DeleteAccount from '../../../screens/DeleteAccount/DeleteAccount';

jest.mock( '@react-native-firebase/auth', () => ( {
	auth: jest.fn( () => {} )
} ) );

jest.mock( '@react-navigation/native', () => ( {
	...jest.requireActual( '@react-navigation/native' ),
	useScrollToTop: () => jest.fn()
} ) );

describe( 'DeleteAccount', () => {
	let screen;
	const titleText = 'Delete account';
	const subtitleText = 'If you delete your account, you will lose:';
	const otherInformationText = '\u2022 Access to your profile information \u2022 All of the content you’ve made';
	const warningText = 'Once the account is deleted, you won’t be able to recover it.';
	const buttonText = 'Delete my account';
	const backButtonWasPressed = jest.fn();

	const setUp = ( view = {} ) => {
		mockUseView(
			useDeleteAccountWireframe,
			{
				...view,
				backButtonWasPressed
			}
		);

		screen = render( <DeleteAccount /> );
	};

	beforeEach( () => {
		setUp();
	} );

	it( 'renders the DeleteAccount screen correctly', () => {
		expect( screen.queryByTestId( 'delete-account-screen' ) ).not.toBeNull();
		expect( screen.queryByTestId( 'delete-account-navigation-bar-testID' ) ).not.toBeNull();
		expect( screen.queryByTestId( 'backArrow-image' ) ).not.toBeNull( );
		expect( screen.queryByTestId( 'title-text' ) ).toHaveTextContent( titleText );
		expect( screen.queryByTestId( 'rightPlaceholder-view' ) ).not.toBeNull();
		expect( screen.queryByTestId( 'rightIcon-testID' ) ).toBeNull();

		expect( screen.queryByTestId( 'image-exclamation-triangle' ) ).not.toBeNull( );
		expect( screen.queryByTestId( 'image-exclamation-circle' ) ).not.toBeNull( );

		expect( screen.queryByTestId( 'subtitle-testID' ) ).toHaveTextContent( subtitleText );
		expect( screen.queryByTestId( 'other-information-testID' ) ).toHaveTextContent( otherInformationText );
		expect( screen.queryByTestId( 'warning-testID' ) ).toHaveTextContent( warningText );
		expect( screen.queryByTestId( 'delete-account-button-testID' ) ).toHaveTextContent( buttonText );
	} );
} );
