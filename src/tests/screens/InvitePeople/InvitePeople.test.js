import * as React from 'react';
import { render } from '@testing-library/react-native';
import mockUseView from '../../mocks/mockUseView';
import * as useInvitePeopleWireframe from '../../../wireframes/useInvitePeopleWireframe';
import InvitePeople from '../../../screens/InvitePeople/InvitePeople';

jest.mock( '@react-navigation/native', () => ( {
	...jest.requireActual( '@react-navigation/native' ),
	useScrollToTop: () => jest.fn()
} ) );

describe( 'InvitePeople', () => {
	let screen;
	const title = 'Invite people title';
	const subtitle = 'Invite people subtitle';
	const buttonTitle = 'Invite button title';

	const presenter = {
		title,
		subtitle,
		buttonTitle,
		backButtonWasPressed: jest.fn(),
		shareButtonWasPressed: jest.fn()
	};

	const setUp = ( view = {} ) => {
		mockUseView(
			useInvitePeopleWireframe,
			{
				...view
			}
		);

		screen = render( <InvitePeople /> );
	};

	beforeEach( () => {
		setUp( presenter );
	} );

	it( 'renders the Settings screen correctly', () => {
		expect( screen.queryByTestId( 'invite-people-screen' ) ).not.toBeNull();
		expect( screen.queryByTestId( 'invite-people-navigation-bar-testID' ) ).not.toBeNull();
		expect( screen.queryByTestId( 'backArrow-image' ) ).not.toBeNull();
		expect( screen.queryByTestId( 'title-text' ) ).toHaveTextContent( title );
		expect( screen.queryByTestId( 'subtitle-text' ) ).toHaveTextContent( subtitle );
		expect( screen.queryByTestId( 'rightPlaceholder-view' ) ).not.toBeNull();
		expect( screen.queryByTestId( 'rightIcon-testID' ) ).toBeNull();
		expect( screen.queryByTestId( 'image-invite-people' ) ).not.toBeNull();
		expect( screen.queryByTestId( 'share-button-testID' ) ).not.toBeNull();
		expect( screen.queryByTestId( 'share-button-testID' ) ).toHaveTextContent( buttonTitle );
	} );
} );
