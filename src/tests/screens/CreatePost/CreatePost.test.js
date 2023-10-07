import * as React from 'react';
import { render } from '@testing-library/react-native';
import mockUseView from '../../mocks/mockUseView';
import CreatePost from '../../../screens/CreatePost/CreatePost';
import * as useCreatePostWireframe from '../../../wireframes/useCreatePostWireframe';
import * as useMentionInputWireframe from '../../../wireframes/useMentionInputWireframe';
import Form from '../../../forms/Form';
import fields from '../../../forms/postFields';
import CommunityTagsPresenter from '../../../presenters/CommunityTagsPresenter';
import PilotFactory from '../../factories/PilotFactory';

const useFocusEffect = {};
jest.mock( '@react-navigation/native', () => ( {
	...jest.requireActual( '@react-navigation/native' ),
	useFocusEffect: () => useFocusEffect
} ) );
jest.useFakeTimers();

describe( 'CreatePost', () => {
	let screen;
	const route = { params: { newAircraftId: undefined } };
	const title = 'Create post';
	const addPhotosButtonTitle = 'Add photos';
	const buttonTitle = 'Post button title';
	const messageTooltipPopover = 'You can mention a person using @name, add an airport identifier by using the +ICAO code or add #hashtags.';
	const isPostButtonDisabled = false;
	const rightHeaderButton = {
		title: 'rightHeaderButtonTitle',
		onPress: () => {}
	};
	const isAnyPhotoSelected = false;
	const photosWereSelected = jest.fn();
	const photoSources = [];
	const removePhoto = jest.fn();
	const form = new Form( { fields } );
	const flightFormPresenter = {
		departureTime: 'Yesterday, 21:45',
		arrivalTime: 'Today, 07:38',
		onDepartureTimePressed: jest.fn(),
		onArrivalTimePressed: jest.fn()
	};

	const fetchCommunityTagsFromRemote = { execute: jest.fn() };
	const getCommunityTagsFromStore = { execute: jest.fn() };

	const communityTagsPresenter = new CommunityTagsPresenter( {
		pilot: PilotFactory.build(),
		form,
		fetchCommunityTagsFromRemote,
		getCommunityTagsFromStore,
		makeAutoObservable() {}
	} );

	const setUp = ( view = {}, props ) => {
		mockUseView(
			useCreatePostWireframe,
			{
				buttonTitle,
				isPostButtonDisabled,
				rightHeaderButton,
				form,
				addPhotosButtonTitle,
				isAnyPhotoSelected,
				photosWereSelected,
				photoSources,
				removePhoto,
				flightFormPresenter,
				communityTagsPresenter,
				...view
			} );

		mockUseView(
			useMentionInputWireframe,
			{
				...view
			} );

		screen = render( <CreatePost route={route} {...props} /> );
	};

	beforeEach( () => {
		jest.clearAllMocks();
		setUp();
	} );

	it( 'renders the CreatePost screen correctly', () => {
		expect( screen.queryByTestId( 'title-header' ) ).toHaveTextContent( title );
		expect( screen.queryByTestId( 'rightButton-TextButton' ) ).toHaveTextContent( rightHeaderButton.title );
		expect( screen.queryByTestId( 'add-photos-button' ) ).toHaveTextContent( addPhotosButtonTitle );
		expect( screen.queryByTestId( 'post-button' ) ).toHaveTextContent( buttonTitle );
		expect( screen.queryByTestId( 'post-button' ) ).not.toBeDisabled();
		expect( screen.queryByTestId( 'community-input' ) ).not.toBeNull();
		expect( screen.queryByTestId( 'tags-component' ) ).not.toBeNull();
		expect( screen.queryByTestId( 'title-input' ) ).not.toBeNull();
		expect( screen.queryByTestId( 'message-input' ) ).not.toBeNull();
		expect( screen.queryByTestId( 'visibility-input' ) ).not.toBeNull();
		expect( screen.queryByTestId( 'photo-carousel' ) ).toBeNull();
		expect( screen.queryByTestId( 'messageTooltipPopover-testID' ) ).toHaveTextContent( messageTooltipPopover );
	} );

	describe( 'when there are photos selected', () => {
		it( 'renders the photo carousel', () => {
			setUp( { isAnyPhotoSelected: true } );
			expect( screen.queryByTestId( 'photo-carousel' ) ).not.toBeNull();
		} );
	} );

	describe( 'when the post is being created', () => {
		beforeEach( () => {
			setUp( { isLoading: true } );
		} );

		it( 'renders the screen loader', () => {
			expect( screen.queryByTestId( 'screenLoader' ) ).not.toBeNull();
		} );
	} );

	describe( 'when the post button is disabled', () => {
		it( 'renders the button as disabled', () => {
			setUp( { isPostButtonDisabled: true } );
			expect( screen.queryByTestId( 'post-button' ) ).toBeDisabled();
		} );
	} );

	describe( 'when the post does not have community tags', () => {
		it( 'does not render tags', () => {
			expect( screen.queryByTestId( 'item0-testID' ) ).toBeNull();
		} );
	} );

	describe( 'when the post has community tags', () => {
		it( 'renders the community tags', () => {
			communityTagsPresenter.addNewTag( 'tag 1' );
			expect( screen.queryByTestId( 'item0-testID' ) ).toBeDefined();
		} );
	} );
} );
