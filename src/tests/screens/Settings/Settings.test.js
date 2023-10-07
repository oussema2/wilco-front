import * as React from 'react';
import { render } from '@testing-library/react-native';
import mockUseView from '../../mocks/mockUseView';
import * as useSettingsWireframe from '../../../wireframes/useSettingsWireframe';
import Settings from '../../../screens/Settings/Settings';
import { palette } from '../../../Theme';

jest.mock( '@intercom/intercom-react-native', () => {} );

jest.mock( '@react-navigation/native', () => ( {
	...jest.requireActual( '@react-navigation/native' ),
	useScrollToTop: () => jest.fn()
} ) );

jest.mock( '@react-native-firebase/auth', () => ( {
	auth: jest.fn( () => {} )
} ) );

describe( 'Settings', () => {
	let screen;
	const title = 'Settings';
	const logOutText = 'Log Out';
	const invitePeopleText = 'Invite people to join';
	const helpText = 'Support Center';
	const deleteAccountText = 'Delete my account';
	const accountSectionText = 'Account';
	const aboutSectionText = 'About';
	const backButtonWasPressed = jest.fn();

	const setUp = ( view = {} ) => {
		mockUseView(
			useSettingsWireframe,
			{
				...view,
				backButtonWasPressed
			}
		);

		screen = render( <Settings /> );
	};

	beforeEach( () => {
		setUp();
	} );

	it( 'renders the Settings screen correctly', () => {
		const deleteAccountNode = screen.queryByTestId( 'delete-Account-Title' );
		const deleteAccountDivisorLineNode = screen.queryByTestId( 'delete-Account-DivisorLine' );

		const helpTitleNode = screen.queryByTestId( 'help-Title' );
		const helpDivisorLineNode = screen.queryByTestId( 'help-DivisorLine' );
		const invitePeopleTitleNode = screen.queryByTestId( 'invitePeople-Title' );
		const invitePeopleDivisorLineNode = screen.queryByTestId( 'invitePeople-DivisorLine' );
		const logOutTitleNode = screen.queryByTestId( 'logOut-Title' );

		expect( screen.queryByTestId( 'settings-screen' ) ).not.toBeNull();
		expect( screen.queryByTestId( 'settings-navigation-bar-testID' ) ).not.toBeNull();
		expect( screen.queryByTestId( 'backArrow-image' ) ).not.toBeNull( );
		expect( screen.queryByTestId( 'title-text' ) ).toHaveTextContent( title );
		expect( screen.queryByTestId( 'rightPlaceholder-view' ) ).not.toBeNull();
		expect( screen.queryByTestId( 'rightIcon-testID' ) ).toBeNull();

		expect( screen.queryByTestId( 'accountSection' ) ).not.toBeNull();
		expect( screen.queryByTestId( 'accountSection-Title' ) ).not.toBeNull();
		expect( screen.queryByTestId( 'accountSection-Title' ) ).toHaveTextContent( accountSectionText );

		expect( screen.queryByTestId( 'delete-Account-Item' ) ).not.toBeNull();
		expect( screen.queryByTestId( 'delete-Account-Image' ) ).not.toBeNull();
		expect( deleteAccountNode ).toHaveTextContent( deleteAccountText );
		expect( deleteAccountNode ).toHaveStyle( {
			color: palette.error.default,
			fontSize: 14
		} );

		expect( deleteAccountDivisorLineNode ).not.toBeNull();
		expect( deleteAccountDivisorLineNode ).toHaveStyle( {
			borderColor: palette.bluescale.lightBlue
		} );

		expect( screen.queryByTestId( 'aboutSection' ) ).not.toBeNull();
		expect( screen.queryByTestId( 'aboutSection-Title' ) ).not.toBeNull();
		expect( screen.queryByTestId( 'aboutSection-Title' ) ).toHaveTextContent( aboutSectionText );

		expect( screen.queryByTestId( 'help-Item' ) ).not.toBeNull();
		expect( screen.queryByTestId( 'help-Image' ) ).not.toBeNull();
		expect( helpTitleNode ).toHaveTextContent( helpText );
		expect( helpTitleNode ).toHaveStyle( {
			color: palette.grayscale.black,
			fontSize: 14
		} );

		expect( helpDivisorLineNode ).not.toBeNull();
		expect( helpDivisorLineNode ).toHaveStyle( {
			borderColor: palette.bluescale.lightBlue
		} );

		expect( screen.queryByTestId( 'invitePeople-Item' ) ).not.toBeNull();
		expect( screen.queryByTestId( 'invitePeople-Image' ) ).not.toBeNull();
		expect( invitePeopleTitleNode ).toHaveTextContent( invitePeopleText );
		expect( invitePeopleTitleNode ).toHaveStyle( {
			color: palette.grayscale.black,
			fontSize: 14
		} );

		expect( invitePeopleDivisorLineNode ).not.toBeNull();
		expect( invitePeopleDivisorLineNode ).toHaveStyle( {
			borderColor: palette.bluescale.lightBlue
		} );

		expect( screen.queryByTestId( 'logOut-Item' ) ).not.toBeNull();
		expect( screen.queryByTestId( 'logOut-Image' ) ).not.toBeNull();
		expect( logOutTitleNode ).toHaveTextContent( logOutText );
		expect( logOutTitleNode ).toHaveStyle( {
			color: palette.error.default,
			fontSize: 18
		} );
	} );
} );
