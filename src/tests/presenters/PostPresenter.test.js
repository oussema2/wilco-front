import PostPresenter from '../../presenters/PostPresenter';
import PostFlightPresenter from '../../presenters/PostFlightPresenter';
import PostActionBarPresenter from '../../presenters/PostActionBarPresenter';
import DateToDisplay from '../../presenters/ToDisplay/DateToDisplay';
import GetCurrentPilotFromStore from '../../interactors/GetCurrentPilotFromStore';
import EntityStore from '../../stores/EntityStore';
import PilotStore from '../../stores/PilotStore';
import PilotFactory from '../factories/PilotFactory';
import PostFactory from '../factories/PostFactory';
import MockActionSheetService from '../mocks/MockActionSheetService';
import MockModalService from '../mocks/MockModalService';
import { DELETE_POST_CONFIRMATION_MODAL, REPORT_CONFIRMATION_MODAL } from '../../constants/modals';
import PostFlightFactory from '../factories/PostFlightFactory';
import AUTHENTICATED_ROUTES from '../../navigation/AuthenticatedRoutes';
import NetworkError from '../../errors/NetworkError';
import { itOpensConfirmationModalForExecutingAction } from '../sharedExamples/confirmableAction';
import CommentPresenter from '../../presenters/CommentPresenter';
import CommentFactory from '../factories/CommentFactory';
import GetCommentsFromStore from '../../interactors/GetCommentsFromStore';

jest.useFakeTimers();

describe( 'PostPresenter', () => {
	const post = PostFactory.build();
	const comments = CommentFactory.buildList( 2 );
	let { pilot } = post;
	const postId = post.id;
	const postStore = new EntityStore();
	const commentStore = new EntityStore();
	postStore.entities = [ post ];
	const pilotStore = new PilotStore();
	const getCurrentPilotFromStore = new GetCurrentPilotFromStore( { store: pilotStore } );
	const getCommentsFromStore = new GetCommentsFromStore( { store: commentStore } );
	const likePost = { execute: jest.fn() };
	const unlikePost = { execute: jest.fn() };
	const deletePost = { execute: jest.fn() };
	const createReport = { execute: jest.fn() };
	const actionSheetService = new MockActionSheetService();
	const modalService = new MockModalService();
	const snackbarService = { showError: jest.fn(), showInfo: jest.fn() };
	const analyticsService = {
		logDeletePost: jest.fn(),
		logReportPost: jest.fn()
	};
	const makeAutoObservable = jest.fn();
	const navigation = { push: jest.fn(), navigate: jest.fn() };
	let presenter;

	const createPresenter = ( params ) => {
		presenter = new PostPresenter( {
			post,
			likePost,
			unlikePost,
			deletePost,
			getCurrentPilotFromStore,
			getCommentsFromStore,
			createReport,
			actionSheetService,
			modalService,
			navigation,
			snackbarService,
			analyticsService,
			makeAutoObservable,
			...params
		} );
	};

	beforeEach( () => {
		jest.clearAllMocks();
		jest.clearAllTimers();
		postStore.entities = [ post ];
		commentStore.entities = comments;
		createPresenter();
	} );

	describe( 'constructor()', () => {
		it( 'initializes with the correct data', () => {
			expect( presenter.post ).toEqual( post );
			expect( presenter.deletePost ).toEqual( deletePost );
			expect( presenter.getCurrentPilotFromStore ).toEqual( getCurrentPilotFromStore );
			expect( presenter.actionSheetService ).toEqual( actionSheetService );
			expect( presenter.modalService ).toEqual( modalService );
			expect( presenter.onDeleteSuccess ).toEqual( undefined );

			expect( makeAutoObservable ).toHaveBeenCalledWith( presenter );

			expect( presenter.flightPresenter ).toBeInstanceOf( PostFlightPresenter );
			expect( presenter.flightPresenter.postFlight ).toEqual( post.flight );

			expect( presenter.actionBarPresenter ).toBeInstanceOf( PostActionBarPresenter );
			expect( presenter.actionBarPresenter.post ).toEqual( post );
			expect( presenter.actionBarPresenter.likePost ).toEqual( likePost );
			expect( presenter.actionBarPresenter.unlikePost ).toEqual( unlikePost );
		} );

		describe( 'when the post has no flight', () => {
			beforeEach( () => {
				post.flight = undefined;
				presenter = new PostPresenter( {
					post,
					likePost,
					unlikePost,
					deletePost,
					getCurrentPilotFromStore,
					actionSheetService,
					modalService,
					makeAutoObservable
				} );
			} );

			it( 'initializes without flight presenter', () => {
				expect( presenter.flightPresenter ).toBeNull();
			} );
		} );
	} );

	describe( '@likeButtonWasPressed', () => {
		describe( 'when there is a like or unlike in progress', () => {
			it( 'cancels the like or unlike', () => {
				presenter.likeButtonWasPressed();
				presenter.likeButtonWasPressed();
				jest.runAllTimers();
				expect( likePost.execute ).not.toHaveBeenCalled();
				expect( unlikePost.execute ).not.toHaveBeenCalled();
			} );
		} );

		describe( 'when there is no like in progress', () => {
			it( 'calls the like or unlike post interactor after a timeout', () => {
				presenter.likeButtonWasPressed();
				jest.runAllTimers();
				expect( likePost.execute ).toHaveBeenCalledWith( postId );
			} );
		} );
	} );

	describe( '@postOptionsWasPressed()', () => {
		describe( 'when the post is from the current pilot', () => {
			beforeEach( () => {
				pilotStore.entities = [ pilot ];
				pilotStore.currentPilotId = pilot.id;
			} );

			it( 'opens the action sheet with the delete and edit option', () => {
				presenter.postOptionsWasPressed();
				expect( actionSheetService.open ).toHaveBeenCalledWith( {
					actions: [
						{ title: 'Delete', type: 'destructive', onPress: expect.any( Function ) },
						{ title: 'Edit', type: 'default', onPress: expect.any( Function ) }
					]
				} );
			} );

			describe( 'action sheet delete option onPress callback', () => {
				beforeEach( () => {
					actionSheetService.open.mockImplementationOnce( ( { actions } ) => {
						actions[ 0 ].onPress();
					} );
				} );

				itOpensConfirmationModalForExecutingAction( {
					triggerer: () => presenter.postOptionsWasPressed(),
					modal: DELETE_POST_CONFIRMATION_MODAL,
					modalProps: {
						confirmationButtonOptions: {
							title: 'Delete',
							type: 'destructive'
						}
					},
					actionExpect: () => {
						expect( deletePost.execute ).toHaveBeenCalledWith( postId );
					},
					successMessage: 'Post deleted.',
					mockActionForFailure: () => {
						deletePost.execute.mockRejectedValueOnce( new NetworkError() );
					},
					modalService,
					snackbarService,
					additionalExamples: ( { triggerAndConfirm, flushPromises } ) => {
						it( 'logs the delete post event', async () => {
							triggerAndConfirm();
							await flushPromises();
							expect( analyticsService.logDeletePost ).toHaveBeenCalledTimes( 1 );
						} );

						describe( 'when an onDeleteSuccess callback is passed', () => {
							const onDeleteSuccess = jest.fn();
							beforeEach( () => createPresenter( { onDeleteSuccess } ) );

							it( 'calls the onDeleteSuccess callback', async () => {
								triggerAndConfirm();
								await flushPromises();
								expect( onDeleteSuccess ).toHaveBeenCalledTimes( 1 );
							} );
						} );
					}
				} );
			} );

			describe( 'action sheet edit option onPress callback', () => {
				beforeEach( () => {
					actionSheetService.open.mockImplementationOnce( ( { actions } ) => {
						actions[ 1 ].onPress();
					} );
				} );

				it( 'navigates to the edit post screen', () => {
					presenter.postOptionsWasPressed();
					expect( navigation.navigate ).toHaveBeenCalledWith(
						AUTHENTICATED_ROUTES.editPostStack.name,
						{ screen: AUTHENTICATED_ROUTES.editPost.name, params: { postId } }
					);
				} );
			} );
		} );

		describe( 'when the post is not from the current pilot', () => {
			beforeEach( () => {
				pilot = PilotFactory.build();
				pilotStore.entities = [ pilot ];
				pilotStore.currentPilotId = pilot.id;
			} );

			it( 'opens the action sheet with the report option', () => {
				presenter.postOptionsWasPressed();
				expect( actionSheetService.open ).toHaveBeenCalledWith( {
					actions: [
						{ title: 'Report', type: 'destructive', onPress: expect.any( Function ) }
					]
				} );
			} );

			describe( 'action sheet onPress callback', () => {
				beforeEach( () => {
					actionSheetService.open.mockImplementationOnce( ( { actions } ) => {
						actions[ 0 ].onPress();
					} );
				} );

				itOpensConfirmationModalForExecutingAction( {
					triggerer: () => presenter.postOptionsWasPressed(),
					modal: REPORT_CONFIRMATION_MODAL,
					modalProps: {
						reportableName: 'Post'
					},
					actionExpect: () => {
						expect( createReport.execute ).toHaveBeenCalledWith( { reportableId: postId } );
					},
					successMessage: 'Post reported.',
					mockActionForFailure: () => {
						createReport.execute.mockRejectedValueOnce( new NetworkError() );
					},
					modalService,
					snackbarService
				} );
			} );
		} );
	} );

	describe( '@pilotWasPressed', () => {
		describe( 'when the post is from the current pilot', () => {
			beforeEach( () => {
				pilotStore.entities = [ post.pilot ];
				pilotStore.currentPilotId = post.pilot.id;
			} );
			it( 'navigates to my profile screen', () => {
				presenter.pilotWasPressed();

				expect( navigation.push ).toHaveBeenCalledWith(
					AUTHENTICATED_ROUTES.pilotProfile.name,
					{ enableBackButton: true }
				);
			} );
		} );

		describe( 'when the post is not from the current pilot', () => {
			beforeEach( () => {
				pilot = PilotFactory.build();
				pilotStore.entities = [ pilot ];
				pilotStore.currentPilotId = pilot.id;
			} );

			it( 'navigates to the pilot profile screen with the comment\'s pilot ID', () => {
				presenter.pilotWasPressed();
				expect( navigation.push ).toHaveBeenCalledWith(
					AUTHENTICATED_ROUTES.pilotProfile.name,
					{ enableBackButton: true, pilotId: post.pilot.id }
				);
			} );
		} );
	} );

	describe( '@dateToDisplay()', () => {
		const expectedDate = new DateToDisplay( { date: post.createdAt } ).displayShort;
		it( 'returns the post dateToDisplay', () => {
			expect( presenter.dateToDisplay ).toEqual( expectedDate );
		} );
	} );

	describe( '@numberOfLikes()', () => {
		it( 'returns the post numberOfLikes', () => {
			expect( presenter.numberOfLikes ).toEqual( post.numberOfLikes );
		} );
	} );

	describe( '@numberOfComments()', () => {
		it( 'returns the post numberOfComments', () => {
			expect( presenter.numberOfComments ).toEqual( post.numberOfComments );
		} );
	} );

	describe( '@pilotName()', () => {
		it( 'returns the post pilotName', () => {
			expect( presenter.pilotName ).toEqual( post.pilot.name );
		} );
	} );

	describe( '@isEdited()', () => {
		it( 'returns whether the post is edited or not', () => {
			expect( presenter.isEdited ).toEqual( post.edited );
		} );
	} );

	describe( '@pilotProfilePictureSource()', () => {
		it( 'returns the pilot profile picture', () => {
			expect( presenter.pilotProfilePictureSource ).toEqual( post.pilot.profilePictureSource );
		} );
	} );

	describe( '@text()', () => {
		it( 'returns the post text', () => {
			expect( presenter.text ).toEqual( post.text );
		} );
	} );

	describe( '@title()', () => {
		it( 'returns the post title', () => {
			expect( presenter.title ).toEqual( post.title );
		} );
	} );

	describe( '@likeOrUnlikeInProgress()', () => {
		describe( 'when like button was not pressed', () => {
			it( 'returns false', () => {
				expect( presenter.likeOrUnlikeInProgress ).toBe( false );
			} );
		} );

		describe( 'when like button was pressed', () => {
			it( 'returns true', () => {
				presenter.likeButtonWasPressed();
				expect( presenter.likeOrUnlikeInProgress ).toBe( true );
			} );
		} );
	} );

	describe( '@liked()', () => {
		it( 'returns whether the post is liked', () => {
			expect( presenter.liked ).toEqual( post.liked );
		} );
	} );

	describe( '@hasImages()', () => {
		describe( 'when the post has no photo urls or track url', () => {
			it( 'returns false', () => {
				const postWithoutImages = PostFactory.build( {
					photoUrls: null,
					flight: PostFlightFactory.build( { trackUrl: null } )
				} );

				createPresenter( { post: postWithoutImages } );

				expect( presenter.hasImages ).toEqual( false );
			} );
		} );

		describe( 'when the post has photo urls', () => {
			it( 'returns true', () => {
				const postWithImages = PostFactory.build( {
					flight: PostFlightFactory.build( { trackUrl: null } )
				} );

				createPresenter( { post: postWithImages } );

				expect( presenter.hasImages ).toEqual( true );
			} );
		} );

		describe( 'when the post has a track url', () => {
			it( 'returns true', () => {
				const postWithTrack = PostFactory.build( {
					photoUrls: null
				} );

				createPresenter( { post: postWithTrack } );

				expect( presenter.hasImages ).toEqual( true );
			} );
		} );
	} );

	describe( '@imageSources()', () => {
		describe( 'when the post has no photo urls or track url', () => {
			it( 'returns an empty array', () => {
				const postWithoutImages = PostFactory.build( {
					photoUrls: null,
					flight: PostFlightFactory.build( { trackUrl: null } )
				} );

				createPresenter( { post: postWithoutImages } );

				expect( presenter.imageSources ).toEqual( [] );
			} );
		} );

		describe( 'when the post has photo urls', () => {
			it( 'returns the post photo sources', () => {
				const postWithImages = PostFactory.build( {
					flight: PostFlightFactory.build( { trackUrl: null } )
				} );

				createPresenter( { post: postWithImages } );

				expect( presenter.imageSources ).toEqual( post.photoSources );
			} );
		} );

		describe( 'when the post has a track url', () => {
			it( 'returns its source', () => {
				const postWithTrack = PostFactory.build( { photoUrls: null } );

				createPresenter( { post: postWithTrack } );

				expect( presenter.imageSources ).toEqual( [ postWithTrack.trackSource ] );
			} );
		} );

		describe( 'when the post has a track url and photos', () => {
			it( 'returns them with the track source in first place', () => {
				const postWithTrackAndPhotos = PostFactory.build( );

				createPresenter( { post: postWithTrackAndPhotos } );

				expect( presenter.imageSources ).toEqual( [
					...postWithTrackAndPhotos.photoSources,
					postWithTrackAndPhotos.trackSource
				] );
			} );
		} );
	} );

	describe( '@imagePreviewSources()', () => {
		describe( 'when the post has no photo preview urls or track url', () => {
			it( 'returns an empty array', () => {
				const postWithoutImages = PostFactory.build( {
					photoPreviewUrls: null,
					flight: PostFlightFactory.build( { trackUrl: null } )
				} );

				createPresenter( { post: postWithoutImages } );

				expect( presenter.imagePreviewSources ).toEqual( [] );
			} );
		} );

		describe( 'when the post has photo preview urls', () => {
			it( 'returns the post photo preview sources', () => {
				const postWithImages = PostFactory.build( {
					flight: PostFlightFactory.build( { trackUrl: null } )
				} );

				createPresenter( { post: postWithImages } );

				expect( presenter.imagePreviewSources ).toEqual( post.photoPreviewSources );
			} );
		} );

		describe( 'when the post has a track url', () => {
			it( 'returns its source', () => {
				const postWithTrack = PostFactory.build( { photoPreviewUrls: null } );

				createPresenter( { post: postWithTrack } );

				expect( presenter.imagePreviewSources ).toEqual( [ postWithTrack.trackSource ] );
			} );
		} );

		describe( 'when the post has a track url and preview photos', () => {
			it( 'returns them with the track source in first place', () => {
				const postWithTrackAndPhotos = PostFactory.build( );

				createPresenter( { post: postWithTrackAndPhotos } );

				expect( presenter.imagePreviewSources ).toEqual( [
					...postWithTrackAndPhotos.photoPreviewSources,
					postWithTrackAndPhotos.trackSource
				] );
			} );
		} );
	} );

	describe( '@hasAnyCommunityTag', () => {
		describe( 'without tags', () => {
			beforeEach( () => {
				const postWithoutTags = PostFactory.build( { communityTags: [] } );
				createPresenter( { post: postWithoutTags } );
			} );

			it( 'returns false', () => {
				expect( presenter.hasAnyCommunityTag ).toBeFalsy( );
			} );
		} );

		describe( 'with tags', () => {
			beforeEach( () => {
				const postWithTags = PostFactory.build( { communityTags: [ 'tag 1' ] } );
				createPresenter( { post: postWithTags } );
			} );

			it( 'returns true', () => {
				expect( presenter.hasAnyCommunityTag ).toBeTruthy( );
			} );
		} );
	} );

	describe( '@previewCommentPresenters()', () => {
		it( 'returns the previewCommentPresenters', () => {
			presenter.previewCommentPresenters.forEach( ( commentPresenter, index ) => {
				expect( commentPresenter.comment ).toEqual( comments[ index ] );
				expect( commentPresenter.modalService ).toEqual( modalService );
				expect( commentPresenter.actionSheetService ).toEqual( actionSheetService );
				expect( commentPresenter.analyticsService ).toEqual( analyticsService );
				expect( commentPresenter ).toBeInstanceOf( CommentPresenter );
			} );
		} );
	} );

	describe( '@communityTags()', () => {
		it( 'returns the communities of the post', () => {
			expect( presenter.communityTags ).toBe( post.communityTags );
		} );
	} );

	describe( '@airports()', () => {
		it( 'returns the airports of the post', () => {
			expect( presenter.airports ).toBe( post.airports );
		} );
	} );
} );
