import * as React from 'react';
import { render } from '@testing-library/react-native';
import mockUseView from '../../mocks/mockUseView';
import EditPost from '../../../screens/EditPost/EditPost';
import * as useEditPostWireframe from '../../../wireframes/useEditPostWireframe';
import * as useMentionInputWireframe from '../../../wireframes/useMentionInputWireframe';
import Form from '../../../forms/Form';
import fields from '../../../forms/postFields';
import CommunityTagsPresenter from '../../../presenters/CommunityTagsPresenter';
import PilotFactory from '../../factories/PilotFactory';
import MentionInputPresenter from '../../../presenters/MentionInput/MentionInputPresenter';

jest.useFakeTimers();

describe( 'EditPost', () => {
	let screen;

	const route = { params: { postId: 1 } };

	const form = new Form( { fields } );
	const rightHeaderButton = {
		title: 'rightHeaderButtonTitle',
		onPress: () => {}
	};
	const hasPhotos = false;
	const photoSources = [];
	const selectedAircraft = null;
	const selectedFlight = null;
	const selectedVisibility = 'Only me';
	const imagesTitle = 'Photo';
	const addPhotosButtonTitle = 'Add photos button title';
	const visibilityInputWasPressed = jest.fn();
	const submitButtonTitle = 'Submit button title';
	const messageTooltipPopover = 'You can mention a person using @name, add an airport identifier by using the +ICAO code or add #hashtags.';
	const isSubmitButtonDisabled = false;

	const fetchCommunityTagsFromRemote = { execute: jest.fn() };
	const getCommunityTagsFromStore = { execute: jest.fn() };

	const fetchHashtagsFromRemote = { execute: jest.fn() };
	const getHashtagsFromStore = { execute: jest.fn() };
	const fetchPilotsFromRemote = { execute: jest.fn() };
	const getPilotsFromStore = { execute: jest.fn() };
	const mentionInputPresenter = new MentionInputPresenter( {
		fetchHashtagsFromRemote, getHashtagsFromStore, fetchPilotsFromRemote, getPilotsFromStore
	} );

	const communityTagsPresenter = new CommunityTagsPresenter( {
		pilot: PilotFactory.build(),
		form,
		fetchCommunityTagsFromRemote,
		getCommunityTagsFromStore,
		makeAutoObservable() {}
	} );

	const setUp = ( view = {}, props ) => {
		mockUseView(
			useEditPostWireframe,
			{
				form,
				rightHeaderButton,
				hasPhotos,
				photoSources,
				selectedAircraft,
				selectedFlight,
				selectedVisibility,
				visibilityInputWasPressed,
				addPhotosButtonTitle,
				submitButtonTitle,
				isSubmitButtonDisabled,
				communityTagsPresenter,
				mentionInputPresenter,
				...view
			}
		);

		mockUseView(
			useMentionInputWireframe,
			{
				...view
			} );

		screen = render( <EditPost route={route} {...props} /> );
	};

	beforeEach( () => {
		jest.clearAllMocks();
		setUp();
	} );

	it( 'renders the EditPost screen correctly', () => {
		expect( screen.queryByTestId( 'title-header' ) ).toHaveTextContent( 'Edit post' );
		expect( screen.queryByTestId( 'rightButton-TextButton' ) ).toHaveTextContent( rightHeaderButton.title );

		expect( screen.queryByTestId( 'title-input' ) ).not.toBeNull();
		expect( screen.queryByTestId( 'message-input' ) ).not.toBeNull();
		expect( screen.queryByTestId( 'photo-carousel' ) ).toBeNull();
		expect( screen.queryByTestId( 'selected-aircraft-text' ) ).toBeNull();
		expect( screen.queryByTestId( 'selected-flight-item' ) ).toBeNull();

		expect( screen.queryByTestId( 'image-title-testID' ) ).toHaveTextContent( imagesTitle );
		expect( screen.queryByTestId( 'add-photos-button' ) ).toHaveTextContent( 'Add photos' );
		expect( screen.queryByTestId( 'visibility-input' ) ).toHaveTextContent( selectedVisibility );

		expect( screen.queryByTestId( 'community-input' ) ).not.toBeNull();
		expect( screen.queryByTestId( 'tags-component' ) ).not.toBeNull();

		expect( screen.queryByTestId( 'submit-button' ) ).toHaveTextContent( submitButtonTitle );
		expect( screen.queryByTestId( 'submit-button' ) ).not.toBeDisabled();

		expect( screen.queryByTestId( 'messageTooltipPopover-testID' ) ).toHaveTextContent( messageTooltipPopover );

		expect( screen ).toMatchSnapshot();
	} );

	describe( 'when there are photos selected', () => {
		it( 'renders the photo carousel', () => {
			setUp( { hasPhotos: true } );
			expect( screen.queryByTestId( 'photo-carousel' ) ).not.toBeNull();
			expect( screen.queryByTestId( 'add-photos-button' ) ).toHaveTextContent( addPhotosButtonTitle );
		} );
	} );

	describe( 'when there is a flight selected', () => {
		const makeAndModel = 'Sample make and model';
		const tailNumber = 'Sample tail number';
		const flight = {
			from: 'Orig',
			to: 'Dest',
			departureTime: '19:39',
			arrivalTime: '21:17',
			date: 'Feb. 5'
		};

		it( 'renders the flight info with its aircraft', () => {
			setUp( {
				selectedAircraft: { makeAndModel, tailNumber },
				selectedFlight: flight
			} );

			expect( screen.queryByTestId( 'selected-aircraft-text' ) ).toHaveTextContent( makeAndModel );
			expect( screen.queryByTestId( 'selected-aircraft-text' ) ).toHaveTextContent( tailNumber );
			expect( screen.queryByTestId( 'selected-flight-item' ) ).toHaveTextContent( flight.from );
			expect( screen.queryByTestId( 'selected-flight-item' ) ).toHaveTextContent( flight.to );
			expect( screen.queryByTestId( 'selected-flight-item' ) ).toHaveTextContent( flight.departureTime );
			expect( screen.queryByTestId( 'selected-flight-item' ) ).toHaveTextContent( flight.arrivalTime );
		} );

		describe( 'when the flight\'s aircraft does not have tail number', () => {
			it( 'renders the "Post manually" text in its place', () => {
				setUp( {
					selectedAircraft: { makeAndModel },
					selectedFlight: flight
				} );

				expect( screen.queryByTestId( 'selected-aircraft-text' ) ).toHaveTextContent( 'Post manually' );
			} );
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

	describe( 'when the submit button is disabled', () => {
		it( 'renders the button as disabled', () => {
			setUp( { isSubmitButtonDisabled: true } );
			expect( screen.queryByTestId( 'submit-button' ) ).toBeDisabled();
		} );
	} );
} );
