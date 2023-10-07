import * as React from 'react';
import { render } from '@testing-library/react-native';
import EditPilotProfile from '../../../screens/EditPilotProfile/EditPilotProfile';
import mockUseView from '../../mocks/mockUseView';
import * as useEditPilotProfileWireframe from '../../../wireframes/useEditPilotProfileWireframe';
import Form from '../../../forms/Form';
import fields from '../../../forms/editProfileFields';
import PilotInfoPresenter from '../../../presenters/PilotInfoPresenter';
import CredentialsPresenter from '../../../presenters/CredentialsPresenter';
import PilotFactory from '../../factories/PilotFactory';
import CommunityTagsPresenter from '../../../presenters/CommunityTagsPresenter';
import mockUseModalService from '../../mocks/mockUseModalService';

const useFocusEffect = {};
jest.mock( '@react-navigation/native', () => ( {
	...jest.requireActual( '@react-navigation/native' ),
	useFocusEffect: () => useFocusEffect
} ) );

describe( 'EditPilotProfile', () => {
	let screen;
	const rightHeaderButton = {
		title: 'Cancel',
		onPress: jest.fn()
	};
	const onProfilePhotoSelected = jest.fn();
	const form = new Form( { fields } );
	const fetchCommunityTagsFromRemote = { execute: jest.fn() };
	const getCommunityTagsFromStore = { execute: jest.fn() };

	const pilotInfoPresenter = new PilotInfoPresenter( {
		navigation: { navigate() {} },
		pilot: PilotFactory.build(),
		form,
		makeAutoObservable() {}
	} );
	const credentialsPresenter = new CredentialsPresenter( {
		pilot: PilotFactory.build(),
		form,
		makeAutoObservable() {}
	} );

	const communityTagsPresenter = new CommunityTagsPresenter( {
		pilot: PilotFactory.build(),
		form,
		fetchCommunityTagsFromRemote,
		getCommunityTagsFromStore,
		makeAutoObservable() {}
	} );

	const rolesSelectionPresenter = {
		isRolesSelectionModalVisible: false
	};

	const profilePhoto = { uri: 'test/uri' };

	mockUseModalService();

	const setUp = ( ) => {
		mockUseView( useEditPilotProfileWireframe, {
			rightHeaderButton,
			onProfilePhotoSelected,
			pilotInfoPresenter,
			credentialsPresenter,
			communityTagsPresenter,
			profilePhoto,
			rolesSelectionPresenter,
			form
		} );

		screen = render( <EditPilotProfile /> );
	};

	beforeEach( () => {
		setUp();
	} );

	it( 'renders the EditPilotProfile screen correctly', () => {
		expect( screen.getByText( 'Edit profile' ) ).toBeDefined();
		expect( screen.queryByTestId( 'rightButton-TextButton' ) ).toHaveTextContent( 'Cancel' );
		expect( screen.getByText( 'Change profile photo' ) ).toBeDefined();
		expect( screen.getByText( 'First name' ) ).toBeDefined();
		expect( screen.getByText( 'Last name' ) ).toBeDefined();
		expect( screen.getByText( 'Banner' ) ).toBeDefined();
		expect( screen.getByText( 'Save' ) ).toBeDefined();
		expect( screen.queryByTestId( 'roles-input' ) ).toBeDefined();
		expect( screen.queryByTestId( 'section-PilotInfo' ) ).toBeDefined();
		expect( screen.queryByTestId( 'checkbox-certificates' ) ).toBeDefined();
		expect( screen.queryByTestId( 'checkbox-ratings' ) ).toBeDefined();
		expect( screen.queryByTestId( 'pilotInfo-CertificatesTitle' ) ).toBeDefined();
		expect( screen.queryByTestId( 'pilotInfo-RatingsTitle' ) ).toBeDefined();
		expect( screen.getByText( 'Credentials' ) ).toBeDefined();
		expect( screen.getByText( 'Ratings / Endorsements' ) ).toBeDefined();
		expect( screen.getByText( 'Total Hours' ) ).toBeDefined();
	} );

	// TODO: complete this test when we find a solution for testing the validation on blur.

	// eslint-disable-next-line jest/no-commented-out-tests
	// describe( 'when the form has validation errors', () => {
	// 	eslint-disable-next-line jest/no-commented-out-tests
	// 	it( 'shows the messages of the errors', () => {

	// 	} );
	// } );
} );
