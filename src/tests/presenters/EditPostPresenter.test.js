/* eslint-disable jest/expect-expect */
import EditPostPresenter from '../../presenters/EditPostPresenter';
import PostFactory from '../factories/PostFactory';
import PostFlightFactory from '../factories/PostFlightFactory';
import AircraftFactory from '../factories/AircraftFactory';
import Form from '../../forms/Form';
import { VISIBILITY_OPTIONS } from '../../constants/visibilityOptions';
import { DISCARD_POST_CHANGES_CONFIRMATION_MODAL, VISIBILITY_PICKER_MODAL } from '../../constants/modals';
import { PrivacyTypeFactory } from '../../factories/VisibilityTypeFactory';
import { itOpensConfirmationModalForExecutingAction } from '../sharedExamples/confirmableAction';
import { itShowsRequestErrorInSnackbar } from '../sharedExamples/snackbars';
import NetworkError from '../../errors/NetworkError';
import flushPromises from '../support/flushPromises';
import FlightToDisplay from '../../entitiesToDisplay/FlightsToDisplay';
import AUTHENTICATED_ROUTES from '../../navigation/AuthenticatedRoutes';

describe( 'EditPostPresenter', () => {
	const publicVisibility = PrivacyTypeFactory.build( 'public' );
	const onlyMeVisibility = PrivacyTypeFactory.build( 'only_me' );

	const updatePost = { execute: jest.fn() };
	const navigation = { goBack: jest.fn(), navigate: jest.fn() };
	const modalService = { open: jest.fn(), close: jest.fn() };
	const snackbarService = { showInfo: jest.fn(), showError: jest.fn() };
	const fetchCommunityTagsFromRemote = { execute: jest.fn() };
	const getCommunityTagsFromStore = { execute: jest.fn() };
	const makeAutoObservable = jest.fn();

	let post;
	let getPostFromStore;
	let presenter;

	const createPresenter = () => {
		getPostFromStore = { execute: jest.fn( () => post ) };
		presenter = new EditPostPresenter( {
			postId: post.id,
			getPostFromStore,
			updatePost,
			navigation,
			modalService,
			snackbarService,
			fetchCommunityTagsFromRemote,
			getCommunityTagsFromStore,
			makeAutoObservable
		} );
	};

	const setUp = ( postProps = {} ) => {
		jest.clearAllMocks();
		post = PostFactory.build( postProps );
		createPresenter();
	};

	const fillInputs = ( values ) => {
		presenter.form.set( values );
	};

	beforeEach( () => {
		setUp();
		createPresenter();
	} );

	describe( 'constructor()', () => {
		it( 'initializes correctly', () => {
			expect( presenter.form ).toBeInstanceOf( Form );
			expect( makeAutoObservable ).toHaveBeenCalledWith( presenter, expect.any( Object ) );
		} );

		it( 'fetches the communities from remote', async () => {
			expect( fetchCommunityTagsFromRemote.execute ).toHaveBeenCalled();
		} );

		const visibility = publicVisibility;

		it( 'autofills with the title, message and visibility of the post', () => {
			const title = 'Sample title';
			const text = 'Sample message';

			setUp( { title, text, visibility } );
			expect( presenter.form.values() ).toEqual( {
				title,
				message: text,
				visibility: visibility.id
			} );
		} );

		describe( 'when the post has community tags', () => {
			it( 'autofills with the communities of the post', () => {
				const communityTags = [ 'tag 1', 'tag 2' ];

				setUp( { communityTags } );
				expect( presenter.communityTagsPresenter.tags ).toEqual( communityTags );
			} );
		} );

		describe( 'when the post has no community tags', () => {
			it( 'autofills with empty array', () => {
				const communityTags = [];

				setUp( { communityTags } );
				expect( presenter.communityTagsPresenter.tags ).toEqual( communityTags );
			} );
		} );

		describe( 'when the post has no title nor message', () => {
			it( 'autofills title and message with empty strings', () => {
				setUp( { title: null, text: null } );
				expect( presenter.form.values() ).toEqual( {
					title: '',
					message: '',
					visibility: visibility.id
				} );
			} );
		} );
	} );

	describe( '@rightHeaderButton()', () => {
		it( 'returns a button with "Cancel" title and a press handler', () => {
			expect( presenter.rightHeaderButton ).toEqual( {
				title: 'Cancel',
				onPress: expect.any( Function )
			} );
		} );

		describe( 'when the handler is called', () => {
			const itOpensConfirmationModalForCancelingCreation = () => {
				itOpensConfirmationModalForExecutingAction( {
					triggerer: () => presenter.rightHeaderButton.onPress(),
					modal: DISCARD_POST_CHANGES_CONFIRMATION_MODAL,
					actionExpect: () => {
						expect( navigation.goBack ).toHaveBeenCalledTimes( 1 );
					},
					modalService
				} );
			};

			beforeEach( () => setUp( {
				title: 'Old title',
				text: 'Old message',
				visibility: onlyMeVisibility
			} ) );

			describe( 'when nothing was changed', () => {
				it( 'calls the navigation to go back', () => {
					presenter.rightHeaderButton.onPress();
					expect( navigation.goBack ).toHaveBeenCalledTimes( 1 );
				} );
			} );

			describe( 'when title was changed', () => {
				beforeEach( () => fillInputs( { title: 'New title' } ) );
				itOpensConfirmationModalForCancelingCreation();
			} );

			describe( 'when message was changed', () => {
				beforeEach( () => fillInputs( { message: 'New message' } ) );
				itOpensConfirmationModalForCancelingCreation();
			} );

			describe( 'when visibility was changed', () => {
				beforeEach( () => fillInputs( { visibility: publicVisibility } ) );
				itOpensConfirmationModalForCancelingCreation();
			} );

			describe( 'when community tags were changed', () => {
				beforeEach( () => presenter.communityTagsPresenter.addNewTag( 'New tag' ) );
				itOpensConfirmationModalForCancelingCreation();
			} );

			describe( 'when images were changed', () => {
				beforeEach( () => {
					const selectedPhotos = [
						{ uri: 'example/photo/1' }
					];
					presenter.photosWereSelected( selectedPhotos );
				} );

				itOpensConfirmationModalForCancelingCreation();
			} );
		} );
	} );

	describe( '@hasPhotos()', () => {
		describe( 'when the post with the given ID has no photos', () => {
			beforeEach( () => setUp( { photoPreviewUrls: [] } ) );

			it( 'returns false', () => {
				expect( presenter.hasPhotos ).toBe( false );
			} );
		} );

		describe( 'when the post with the given ID has photos', () => {
			beforeEach( () => setUp( {
				photoPreviewUrls: [ 'some/image/preview/url', 'another/image/preview/url' ]
			} ) );

			it( 'returns true', () => {
				expect( presenter.hasPhotos ).toBe( true );
			} );
		} );
	} );

	describe( '@photoSources()', () => {
		describe( 'when the post with the given ID has no photos', () => {
			beforeEach( () => setUp( { photoPreviewUrls: [] } ) );

			it( 'returns an empty array', () => {
				expect( presenter.photoSources ).toEqual( [] );
			} );
		} );

		describe( 'when the post with the given ID has photos', () => {
			const [ firstUrl, secondUrl ] = [ 'some/image/preview/url', 'another/image/preview/url' ];

			beforeEach( () => setUp( { photoPreviewUrls: [ firstUrl, secondUrl ] } ) );

			it( 'returns the array of sources for the post photos', () => {
				expect( presenter.photoSources ).toEqual( [ { uri: firstUrl }, { uri: secondUrl } ] );
			} );
		} );
	} );

	describe( 'selected flight display', () => {
		const makeAndModel = 'Sample make and model';
		const tailNumber = 'Sample tail number';
		const aircraft = AircraftFactory.build( { makeAndModel, tailNumber } );
		const flight = PostFlightFactory.build( {
			from: 'Orig',
			to: 'Dest',
			departureTime: new Date( 2021, 12, 20, 14, 42, 34 ),
			arrivalTime: new Date( 2021, 12, 20, 17, 23, 45 ),
			aircraft
		} );

		const setUpWithFlight = () => setUp( { flight } );
		const setUpWithoutFlight = () => setUp( { flight: null } );

		describe( '@selectedFlight', () => {
			describe( 'when the post has a flight', () => {
				it( 'returns display information of the flight', () => {
					setUpWithFlight();
					expect( presenter.selectedFlight ).toEqual(
						new FlightToDisplay( { flight } )
					);
				} );
			} );

			describe( 'when the post has no flight', () => {
				it( 'returns undefined', () => {
					setUpWithoutFlight();
					expect( presenter.selectedFlight ).toBeNull();
				} );
			} );
		} );
	} );

	describe( 'Visibility selection', () => {
		const visibilityOptionByName = ( visibilityName ) => (
			VISIBILITY_OPTIONS.find( ( visibility ) => visibility.name === visibilityName )
		);

		const stubVisibilitySelection = ( visibilityName ) => {
			modalService.open.mockImplementationOnce( ( _, { onItemSelected } ) => {
				onItemSelected( visibilityOptionByName( visibilityName ) );
			} );
		};

		const selectVisibility = ( visibilityName ) => {
			stubVisibilitySelection( visibilityName );
			presenter.visibilityInputWasPressed();
		};

		describe( '@selectedVisibility()', () => {
			describe( 'when no visibility was selected', () => {
				describe( 'when the post has public visibility', () => {
					it( 'returns "Everyone" visibility', () => {
						setUp( { visibility: publicVisibility } );
						expect( presenter.selectedVisibility ).toEqual( 'Everyone' );
					} );
				} );

				describe( 'when the post has only_me visibility', () => {
					it( 'returns "Only me" visibility', () => {
						setUp( { visibility: onlyMeVisibility } );
						expect( presenter.selectedVisibility ).toEqual( 'Only me' );
					} );
				} );
			} );

			describe( 'when public visibility was selected', () => {
				it( 'returns "Everyone" visibility', () => {
					selectVisibility( 'Everyone' );
					expect( presenter.selectedVisibility ).toEqual( 'Everyone' );
				} );
			} );

			describe( 'when only me visibility was selected', () => {
				it( 'returns "Only me" visibility', () => {
					selectVisibility( 'Only me' );
					expect( presenter.selectedVisibility ).toEqual( 'Only me' );
				} );
			} );
		} );

		describe( '@visibilityInputWasPressed()', () => {
			const expectVisibilityPickerModalToHaveBeenOpenedWith = ( { visibility } ) => {
				expect( modalService.open ).toHaveBeenCalledWith( VISIBILITY_PICKER_MODAL, {
					data: VISIBILITY_OPTIONS,
					initialItem: visibilityOptionByName( visibility ),
					onItemSelected: expect.any( Function )
				} );
			};

			describe( 'when no visibility was selected', () => {
				describe( 'when the post has public visibility', () => {
					it( 'opens the visibility picker modal, with "Everyone" visibility selected', () => {
						setUp( { visibility: publicVisibility } );
						presenter.visibilityInputWasPressed();
						expectVisibilityPickerModalToHaveBeenOpenedWith( { visibility: 'Everyone' } );
					} );
				} );

				describe( 'when the post has only_me visibility', () => {
					it( 'opens the visibility picker modal, with "Only me" visibility selected', () => {
						setUp( { visibility: onlyMeVisibility } );
						presenter.visibilityInputWasPressed();
						expectVisibilityPickerModalToHaveBeenOpenedWith( { visibility: 'Only me' } );
					} );
				} );
			} );

			describe( 'when public visibility was selected', () => {
				it( 'opens the visibility picker modal, with "Everyone" visibility selected', () => {
					selectVisibility( 'Everyone' );
					presenter.visibilityInputWasPressed();
					expectVisibilityPickerModalToHaveBeenOpenedWith( { visibility: 'Everyone' } );
				} );
			} );

			describe( 'when only me visibility was selected', () => {
				it( 'opens the visibility picker modal, with "Only me" visibility selected', () => {
					selectVisibility( 'Only me' );
					presenter.visibilityInputWasPressed();
					expectVisibilityPickerModalToHaveBeenOpenedWith( { visibility: 'Only me' } );
				} );
			} );

			describe( 'when a visibility option is picked in the modal', () => {
				it( 'closes the modal', () => {
					selectVisibility( 'Only me' );
					expect( modalService.close ).toHaveBeenCalledWith( VISIBILITY_PICKER_MODAL );
				} );
			} );
		} );
	} );

	describe( '@submitButtonTitle()', () => {
		it( 'returns the "Save" title', () => {
			expect( presenter.submitButtonTitle ).toEqual( 'Save' );
		} );
	} );

	describe( '@isSubmitButtonDisabled()', () => {
		beforeEach( () => setUp( {
			title: 'Old title',
			text: 'Old message',
			visibility: onlyMeVisibility
		} ) );

		const itReturns = ( boolean ) => {
			it( `returns ${boolean}`, () => {
				expect( presenter.isSubmitButtonDisabled ).toBe( boolean );
			} );
		};

		describe( 'when nothing was changed', () => {
			itReturns( true );
		} );

		describe( 'when title was changed', () => {
			beforeEach( () => fillInputs( { title: 'New title' } ) );

			itReturns( false );
		} );

		describe( 'when message was changed', () => {
			beforeEach( () => fillInputs( { message: 'New message' } ) );

			itReturns( false );
		} );

		describe( 'when visibility was changed', () => {
			beforeEach( () => fillInputs( { visibility: publicVisibility } ) );

			itReturns( false );
		} );

		describe( 'when both title and message are empty', () => {
			const eraseTitleAndMessage = () => fillInputs( { title: '', message: '' } );

			describe( 'and the post has neither photos nor flight', () => {
				beforeEach( () => {
					setUp( { photoPreviewUrls: [], flight: null } );
					eraseTitleAndMessage();
				} );

				itReturns( true );
			} );

			describe( 'but the post has photos', () => {
				beforeEach( () => {
					setUp( { photoPreviewUrls: [ 'some/url' ], flight: null } );
					eraseTitleAndMessage();
				} );

				itReturns( false );
			} );

			describe( 'but the post has a flight', () => {
				beforeEach( () => {
					setUp( { photoPreviewUrls: [], flight: PostFlightFactory.build() } );
					eraseTitleAndMessage();
				} );

				itReturns( false );
			} );
		} );
	} );

	describe( '@_onSubmitSuccess', () => {
		const title = 'Submitted title';
		const message = 'Submitted message';
		const visibility = 'public';
		const formValues = {
			title, message, visibility
		};
		const form = { values: () => formValues };

		const submit = () => presenter._onSubmitSuccess( form );

		const itUnsetsTheLoadingIndicator = () => {
			it( 'unsets the loading indicator', async () => {
				await submit();
				expect( presenter.isLoading ).toBe( false );
			} );
		};

		it( 'sets the loading indicator', () => {
			submit();
			expect( presenter.isLoading ).toBe( true );
		} );

		it( 'calls the update post interactor with the entered data', async () => {
			const { communityTags } = post;
			await submit();
			expect( updatePost.execute ).toHaveBeenCalledWith( post.id,
				{
					...formValues,
					communityTags,
					base64AddPhotos: [],
					deletePhotos: [],
					deleteFlight: false
				} );
		} );

		describe( 'when the request finishes successfully', () => {
			it( 'displays a "Post edited" snackbar message upon completion', async () => {
				await submit();
				expect( snackbarService.showInfo ).toHaveBeenCalledWith( {
					message: 'Post edited.'
				} );
			} );

			it( 'calls the navigation to go back upon completion', async () => {
				await submit();
				expect( navigation.goBack ).toHaveBeenCalledTimes( 1 );
			} );

			itUnsetsTheLoadingIndicator();
		} );

		describe( 'when the request fails', () => {
			beforeEach( () => {
				updatePost.execute.mockRejectedValueOnce( new NetworkError() );
			} );

			itShowsRequestErrorInSnackbar( {
				request: () => submit(),
				snackbarServiceMock: snackbarService,
				expectedMessage: 'Connection error. Please try again.'
			} );

			it( 'does not call the navigation', async () => {
				await submit();
				expect( navigation.goBack ).not.toHaveBeenCalled();
			} );

			itUnsetsTheLoadingIndicator();
		} );

		describe( 'when the changes were already submitted', () => {
			it( 'does not call the update post interactor', async () => {
				submit();
				submit();
				await flushPromises();
				expect( updatePost.execute ).toHaveBeenCalledTimes( 1 );
			} );
		} );
	} );

	describe( '@removePhoto()', () => {
		beforeEach( () => setUp( { photoPreviewUrls: [] } ) );

		const selectedPhotos = [
			{ uri: 'example/photo/1' },
			{ uri: 'example/photo/2' }
		];

		it( 'removes the photo with matching uri', () => {
			const [ photoToRemove, remainingPhoto ] = selectedPhotos;
			presenter.photosWereSelected( selectedPhotos );

			presenter.removePhoto( photoToRemove );

			expect( presenter.photoSources ).toEqual( [ remainingPhoto ] );
		} );
	} );

	describe( '@addPhotosButtonTitle()', () => {
		it( 'returns "Add new photos"', () => {
			expect( presenter.addPhotosButtonTitle ).toEqual( 'Add new photos' );
		} );
	} );

	describe( '@photosWereSelected()', () => {
		beforeEach( () => setUp( { photoPreviewUrls: [] } ) );

		const selectedPhotos = [
			{ uri: 'example/photo/1' },
			{ uri: 'example/photo/2' }
		];

		describe( 'when no photos are selected', () => {
			it( 'sets the given photos as selected', () => {
				presenter.photosWereSelected( selectedPhotos );
				expect( presenter.photoSources ).toEqual( selectedPhotos );
			} );
		} );

		describe( 'when at least one photo was selected', () => {
			it( 'sets the given photos as selected', () => {
				const oldPhoto = [ { uri: 'example/photo/old' } ];
				presenter.photosWereSelected( oldPhoto );
				presenter.photosWereSelected( selectedPhotos );
				expect( presenter.photoSources ).toEqual( oldPhoto.concat( selectedPhotos ) );
			} );
		} );
	} );

	describe( '@placeholderCommunityInputText', () => {
		it( 'returns a placeholder text', () => {
			const expectedPlaceholder = 'Select the communities related to this post';
			expect( presenter.placeholderCommunityInputText ).toEqual( expectedPlaceholder );
		} );
	} );

	describe( '@photosAllowed()', () => {
		beforeEach( () => setUp( { photoPreviewUrls: [] } ) );

		describe( 'when user does`t select any photo', () => {
			beforeEach( () => {
				const selectedPhotos = [];
				presenter.photosWereSelected( selectedPhotos );
			} );

			it( 'returns default value', () => {
				expect( presenter.photosAllowed ).toBe( 10 - presenter.photoSources.length );
			} );
		} );

		describe( 'when user select any photo', () => {
			beforeEach( () => {
				const selectedPhotos = [
					{ uri: 'example/photo/1' },
					{ uri: 'example/photo/2' }
				];
				presenter.photosWereSelected( selectedPhotos );
			} );

			it( 'returns photosAllowed value', () => {
				expect( presenter.photosAllowed ).toBe( 8 );
			} );
		} );
	} );

	describe( '@onAddFlightButtonPressed()', () => {
		it( 'navigates to the AddFlight screen', () => {
			presenter.onAddFlightButtonPressed();
			expect( navigation.navigate ).toHaveBeenCalledWith( AUTHENTICATED_ROUTES.addFlight.name, {
				previousScreen: AUTHENTICATED_ROUTES.editPost.name
			} );
		} );
	} );

	describe( '@onClearFlightPressed()', () => {
		it( 'clears all flight information', async () => {
			presenter.onClearFlightPressed();
			expect( presenter.flightParams ).toBeNull();
			expect( presenter.selectedAircraft ).toBeNull();
		} );

		it( 'shows a information message in snackbar', async () => {
			presenter.onClearFlightPressed();
			expect( snackbarService.showInfo ).toHaveBeenCalledWith( {
				message: 'The flight information was removed from this post.'
			} );
		} );
	} );

	describe( '@onAircraftFlightSelected()', () => {
		it( 'sets flightParams and aircraft data', async () => {
			const expectedFlightData = {
				flightParams: PostFlightFactory.build(),
				aircraft: AircraftFactory.build()
			};

			presenter.onAircraftFlightSelected( expectedFlightData );
			expect( presenter.flightParams ).toBe( expectedFlightData.flightParams );
			expect( presenter.selectedAircraft ).toBe( expectedFlightData.aircraft );
		} );
	} );
} );
