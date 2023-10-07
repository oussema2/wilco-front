import CreatePostPresenter from '../../presenters/CreatePostPresenter';
import Form from '../../forms/Form';
import PilotFactory from '../factories/PilotFactory';
import AircraftFactory from '../factories/AircraftFactory';
import {
	MESSAGE, FLIGHT, VISIBILITY
} from '../../constants/formFields/postForm';
import FlightFormPresenter from '../../presenters/FlightFormPresenter';
import { ROUTES } from '../../navigation/MainTabNavigator/routes';
import { VISIBILITY_OPTIONS } from '../../constants/visibilityOptions';
import { CANCEL_POST_CONFIRMATION_MODAL, VISIBILITY_PICKER_MODAL } from '../../constants/modals';
import { itOpensConfirmationModalForExecutingAction } from '../sharedExamples/confirmableAction';
import AUTHENTICATED_ROUTES from '../../navigation/AuthenticatedRoutes';
import ExtractorMessageService from '../../services/ExtractorMessageService';

describe( 'CreatePostPresenter', () => {
	const aircrafts = AircraftFactory.buildList( 3 );
	const currentPilot = PilotFactory.build( { aircrafts } );
	const getCurrentPilotFromStore = { execute: jest.fn() };
	const createPost = { execute: jest.fn() };
	const navigation = {
		goBack: jest.fn(),
		navigate: jest.fn()
	};
	const modalService = { open: jest.fn(), close: jest.fn() };
	const actionSheetService = { open: jest.fn() };
	const snackbarService = { showError: jest.fn(), showInfo: jest.fn() };
	const analyticsService = {
		logNewPost: jest.fn(),
		logDeleteAircraft: jest.fn()
	};
	const makeAutoObservable = jest.fn();
	const fetchCommunityTagsFromRemote = { execute: jest.fn() };
	const getCommunityTagsFromStore = { execute: jest.fn() };
	const extractorMessageService = ExtractorMessageService.shared();
	let presenter;

	beforeEach( () => {
		jest.clearAllMocks();
		getCurrentPilotFromStore.execute.mockReturnValue( currentPilot );
		presenter = new CreatePostPresenter( {
			getCurrentPilotFromStore,
			createPost,
			navigation,
			modalService,
			actionSheetService,
			snackbarService,
			analyticsService,
			fetchCommunityTagsFromRemote,
			getCommunityTagsFromStore,
			extractorMessageService,
			makeAutoObservable
		} );
	} );

	describe( 'constructor()', () => {
		it( 'initializes with the correct data', () => {
			expect( presenter.getCurrentPilotFromStore ).toEqual( getCurrentPilotFromStore );
			expect( presenter.createPost ).toEqual( createPost );
			expect( presenter.navigation ).toEqual( navigation );
			expect( presenter.form ).toBeInstanceOf( Form );
			expect( presenter.form ).toMatchSnapshot();
			expect( presenter.photos ).toEqual( [] );
			expect( presenter.flightFormPresenter ).toBeInstanceOf( FlightFormPresenter );
			expect( presenter.flightFormPresenter.form ).toEqual( presenter.form.$( FLIGHT ) );
			expect( makeAutoObservable ).toHaveBeenCalledWith( presenter );
		} );
	} );

	describe( '@onSubmitSuccess()', () => {
		const formValues = {
			title: 'Post title',
			message: 'Post message',
			visibility: 'public',
			communityTags: []
		};

		const expectToLogNewPost = ( {
			hasTitle,
			hasMessage,
			hasSelectedFlight,
			hasManualFlight,
			hasTrack,
			hasAirport,
			hasHashtag,
			hasMention,
			numberOfPhotos,
			visibility,
			communityTags
		} ) => {
			expect( analyticsService.logNewPost ).toHaveBeenCalledWith( {
				hasTitle,
				hasMessage,
				hasSelectedFlight,
				hasManualFlight,
				hasTrack,
				hasAirport,
				hasHashtag,
				hasMention,
				numberOfPhotos,
				visibility,
				communityTags
			} );
		};

		const expectToNavigateToHome = () => {
			expect( navigation.navigate ).toHaveBeenCalledWith( ROUTES.Home.name );
		};

		it( 'starts loading', () => {
			presenter.onSubmitSuccess( { values: () => ( formValues ) } );
			expect( presenter.isCreatingPost ).toBe( true );
		} );

		it( 'finishes loading upon completion', async () => {
			await presenter.onSubmitSuccess( { values: () => ( formValues ) } );
			expect( presenter.isCreatingPost ).toBe( false );
		} );

		describe( 'when photos are selected', () => {
			const form = {
				values: () => ( formValues ),
				clear: jest.fn()
			};

			it( 'creates the post with photos', async () => {
				presenter.photosWereSelected( [
					{ base64: 'photo1Base64' },
					{ base64: 'photo2Base64' }
				] );
				await presenter.onSubmitSuccess( form );

				expect( createPost.execute ).toHaveBeenCalledWith( {
					...formValues, flightParams: null, base64Photos: [ 'photo1Base64', 'photo2Base64' ]
				} );
				expectToNavigateToHome();

				expectToLogNewPost( {
					hasTitle: true,
					hasMessage: true,
					hasSelectedFlight: false,
					hasManualFlight: false,
					hasTrack: false,
					hasAirport: false,
					hasHashtag: false,
					hasMention: false,
					numberOfPhotos: 2,
					visibility: 'public'
				} );
			} );
		} );

		describe( 'when no tag is selected', () => {
			const form = {
				values: () => ( formValues ),
				clear: jest.fn()
			};

			it( 'creates the post without tags', async () => {
				await presenter.onSubmitSuccess( form );

				expect( createPost.execute ).toHaveBeenCalledWith( {
					...formValues, flightParams: null, base64Photos: [], communityTags: []
				} );
				expectToNavigateToHome();
			} );
		} );

		describe( 'when a tag is selected', () => {
			beforeEach( () => {
				presenter.communityTagsPresenter.addNewTag( 'tag 1' );
				presenter.communityTagsPresenter.addNewTag( 'tag 2' );
			} );

			const form = {
				values: () => ( formValues ),
				clear: jest.fn()
			};

			it( 'creates the post with tags', async () => {
				await presenter.onSubmitSuccess( form );

				expect( createPost.execute ).toHaveBeenCalledWith( {
					...formValues, flightParams: null, base64Photos: [], communityTags: [ 'tag 1', 'tag 2' ]
				} );
				expectToNavigateToHome();
			} );
		} );
	} );

	describe( '@rightHeaderButton()', () => {
		it( 'returns the right header button', () => {
			expect( presenter.rightHeaderButton.title ).toEqual( 'Cancel' );
		} );

		const itOpensConfirmationModalForCancelingCreation = () => {
			itOpensConfirmationModalForExecutingAction( {
				triggerer: () => presenter.rightHeaderButton.onPress(),
				modal: CANCEL_POST_CONFIRMATION_MODAL,
				actionExpect: () => {
					expect( navigation.goBack ).toHaveBeenCalledTimes( 1 );
				},
				modalService
			} );
		};

		describe( 'when nothing was filled or added', () => {
			it( 'navigates back', () => {
				presenter.rightHeaderButton.onPress();
				expect( navigation.goBack ).toHaveBeenCalledTimes( 1 );
			} );
		} );

		describe( 'when a title was entered', () => {
			beforeEach( () => presenter.form.set( { title: 'Sample title' } ) );
			itOpensConfirmationModalForCancelingCreation();
		} );

		describe( 'when a message was entered', () => {
			beforeEach( () => presenter.form.set( { message: 'Sample message' } ) );
			itOpensConfirmationModalForCancelingCreation();
		} );

		describe( 'when at least one photo was added', () => {
			beforeEach( () => presenter.photosWereSelected( [ { uri: 'example/photo' } ] ) );
			itOpensConfirmationModalForCancelingCreation();
		} );
	} );

	describe( '@addPhotosButtonTitle()', () => {
		describe( 'when no photos are selected', () => {
			it( 'returns "Add a photo"', () => {
				expect( presenter.addPhotosButtonTitle ).toEqual( 'Add photos' );
			} );
		} );

		describe( 'when one or more photos was selected', () => {
			it( 'returns "Change photos"', () => {
				presenter.photosWereSelected( [ { uri: 'example/photo' }, { uri: 'example/otherPhoto' } ] );
				expect( presenter.addPhotosButtonTitle ).toEqual( 'Change photos' );
			} );
		} );
	} );

	describe( '@isAnyPhotoSelected()', () => {
		describe( 'when no photos are selected', () => {
			it( 'returns false', () => {
				expect( presenter.isAnyPhotoSelected ).toBe( false );
			} );
		} );

		describe( 'when at least one photo was selected', () => {
			it( 'returns true', () => {
				presenter.photosWereSelected( [ { uri: 'example/photo' } ] );
				expect( presenter.isAnyPhotoSelected ).toBe( true );
			} );
		} );
	} );

	describe( '@photosWereSelected()', () => {
		const selectedPhotos = [
			{ uri: 'example/photo/1' },
			{ uri: 'example/photo/2' }
		];

		describe( 'when no photos are selected', () => {
			it( 'sets the given photos as selected', () => {
				presenter.photosWereSelected( selectedPhotos );
				expect( presenter.photos ).toEqual( selectedPhotos );
			} );
		} );

		describe( 'when at least one photo was selected', () => {
			it( 'sets the given photos as selected overwriting the old ones', () => {
				presenter.photosWereSelected( [ { uri: 'example/photo/old' } ] );
				presenter.photosWereSelected( selectedPhotos );
				expect( presenter.photos ).toEqual( selectedPhotos );
			} );
		} );
	} );

	describe( '@removePhoto()', () => {
		const selectedPhotos = [
			{ uri: 'example/photo/1' },
			{ uri: 'example/photo/2' }
		];

		it( 'removes the photo with matching uri', () => {
			const [ photoToRemove, remainingPhoto ] = selectedPhotos;
			presenter.photosWereSelected( selectedPhotos );

			presenter.removePhoto( photoToRemove );

			expect( presenter.photos ).toEqual( [ remainingPhoto ] );
		} );
	} );

	describe( '@photoSources()', () => {
		describe( 'when no photos are selected', () => {
			it( 'returns an empty array', () => {
				expect( presenter.photoSources ).toEqual( [] );
			} );
		} );

		describe( 'when at least one photo was selected', () => {
			it( 'returns the URI sources for the selected photos', () => {
				presenter.photosWereSelected( [
					{ uri: 'example/photo/1', additionalProp: 'test1' },
					{ uri: 'example/photo/2', additionalProp: 'test2' }
				] );
				expect( presenter.photoSources ).toEqual( [
					{ uri: 'example/photo/1' },
					{ uri: 'example/photo/2' }
				] );
			} );
		} );
	} );

	describe( '@buttonTitle()', () => {
		it( 'returns the buttonTitle', () => {
			expect( presenter.buttonTitle ).toBe( 'Post' );
		} );
	} );

	describe( '@isPostButtonDisabled()', () => {
		const validate = () => presenter.form.validate();

		describe( 'when a valid message was entered', () => {
			it( 'returns false', async () => {
				presenter.form.$( MESSAGE ).set( 'Sample message' );
				await validate();
				expect( presenter.isPostButtonDisabled ).toBe( false );
			} );
		} );

		describe( 'when photos were selected', () => {
			it( 'returns false', async () => {
				presenter.photosWereSelected( [ { uri: 'sample/photo' } ] );
				await validate();
				expect( presenter.isPostButtonDisabled ).toBe( false );
			} );
		} );

		describe( 'when neither text nor photos nor were selected or entered', () => {
			it( 'returns true', async () => {
				await validate();
				expect( presenter.isPostButtonDisabled ).toBe( true );
			} );
		} );
	} );

	describe( '@selectedVisibility', () => {
		it( 'returns the default value of visibility', () => {
			const visibility = VISIBILITY_OPTIONS[ 0 ];
			const expectedValue = visibility.name;
			expect( presenter.selectedVisibility ).toBe( expectedValue );
		} );

		it( 'returns the actual value of visibility', () => {
			const visibility = VISIBILITY_OPTIONS[ 1 ];
			presenter.form.set( { visibility: visibility.value } );
			const expectedValue = visibility.name;
			expect( presenter.selectedVisibility ).toBe( expectedValue );
		} );
	} );

	describe( '@visibilityInputWasPressed', () => {
		it( 'opens the visibility picker modal', () => {
			presenter.visibilityInputWasPressed();
			expect( modalService.open ).toHaveBeenCalledWith(
				VISIBILITY_PICKER_MODAL,
				expect.any( Object )
			);
		} );

		describe( 'when an option is selected', () => {
			it( 'fills the form with the selected option and closes the visibility modal', () => {
				const visibilityOnlyMe = VISIBILITY_OPTIONS[ 1 ];

				presenter.visibilityInputWasPressed();
				const { onItemSelected } = modalService.open.mock.calls[ 0 ][ 1 ];

				onItemSelected( visibilityOnlyMe );

				expect( presenter.form.$( VISIBILITY ).value ).toBe( visibilityOnlyMe.value );
				expect( modalService.close ).toHaveBeenCalledWith( VISIBILITY_PICKER_MODAL );
			} );
		} );
	} );

	describe( '@isLoading', () => {
		describe( 'when nothing is loading', () => {
			it( 'returns false', () => {
				expect( presenter.isLoading ).toBe( false );
			} );
		} );

		describe( 'when creating a post', () => {
			it( 'returns true', () => {
				presenter._setIsCreatingPost( true );
				expect( presenter.isLoading ).toBe( true );
			} );
		} );
	} );

	describe( '@placeholderCommunityInputText', () => {
		it( 'returns a placeholder text', () => {
			const expectedPlaceholder = 'Select the communities related to this post';
			expect( presenter.placeholderCommunityInputText ).toEqual( expectedPlaceholder );
		} );
	} );

	describe( '@maxPhotosAllowed()', () => {
		it( 'returns default value', () => {
			expect( presenter.maxPhotosAllowed ).toBe( 10 );
		} );
	} );

	describe( '@onAddFlightButtonPressed()', () => {
		it( 'navigates to the AddFlight screen', () => {
			presenter.onAddFlightButtonPressed();
			expect( navigation.navigate ).toHaveBeenCalledWith( AUTHENTICATED_ROUTES.addFlight.name, {
				previousScreen: AUTHENTICATED_ROUTES.postText.name
			} );
		} );
	} );

	describe( '@onClearFlightPressed()', () => {
		it( 'clears all flight information', async () => {
			presenter.onClearFlightPressed();
			expect( presenter.flightParams ).toBeNull();
			expect( presenter.selectedAircraft ).toBeNull();
			expect( presenter.hasSelectedFlight ).toBe( false );
			expect( presenter.hasManualFlight ).toBe( false );
		} );

		it( 'shows a information message in snackbar', async () => {
			presenter.onClearFlightPressed();
			expect( presenter.snackbarService.showInfo ).toHaveBeenCalledWith( {
				message: 'The flight information was removed from this post.'
			} );
		} );
	} );
} );
