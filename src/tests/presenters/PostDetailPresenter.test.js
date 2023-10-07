import PostDetailPresenter from '../../presenters/PostDetailPresenter';
import CommentPresenter from '../../presenters/CommentPresenter';
import PostPresenter from '../../presenters/PostPresenter';
import GetEntityFromStore from '../../interactors/GetEntityFromStore';
import EntityStore from '../../stores/EntityStore';
import PostFactory from '../factories/PostFactory';
import CommentFactory from '../factories/CommentFactory';
import MockRootStore from '../mocks/MockRootStore';
import MockModalService from '../mocks/MockModalService';
import MockActionSheetService from '../mocks/MockActionSheetService';
import Form from '../../forms/Form';
import commentFields from '../../forms/commentFields';
import NetworkError from '../../errors/NetworkError';
import { itShowsRequestErrorInSnackbar } from '../sharedExamples/snackbars';
import GetCommentsFromStore from '../../interactors/GetCommentsFromStore';
import PaginationFactory from '../factories/PaginationFactory';
import flushPromises from '../support/flushPromises';

jest.mock( '../../forms/Form' );

describe( 'PostDetailPresenter', () => {
	const post = PostFactory.build();
	let { pilot } = post;
	const postId = post.id;
	const comments = CommentFactory.buildList( 2 );
	const postStore = new EntityStore();
	const commentStore = new EntityStore();
	let getPostFromStore = new GetEntityFromStore( { store: postStore } );
	const getCommentsFromStore = new GetCommentsFromStore( { store: commentStore } );
	const fetchCommentsFromRemote = { execute: jest.fn(), setPagination: jest.fn() };
	const fetchPostFromRemote = { execute: jest.fn() };

	const createComment = { execute: jest.fn() };
	const modalService = new MockModalService();
	const rootStore = new MockRootStore();
	const actionSheetService = new MockActionSheetService();
	const snackbarService = { showError: jest.fn() };
	const makeAutoObservable = jest.fn();
	const navigation = { goBack: jest.fn() };
	const analyticsService = { logNewComment: jest.fn() };
	const keyboard = { dismiss: jest.fn() };
	let presenter;

	beforeEach( () => {
		jest.clearAllMocks();

		const pagination = PaginationFactory.build();
		fetchCommentsFromRemote.pagination = pagination;

		postStore.entities = [ post ];
		commentStore.entities = comments;
		presenter = new PostDetailPresenter( {
			postId,
			getPostFromStore,
			getCommentsFromStore,
			fetchCommentsFromRemote,
			fetchPostFromRemote,
			createComment,
			rootStore,
			modalService,
			actionSheetService,
			navigation,
			snackbarService,
			analyticsService,
			keyboard,
			makeAutoObservable
		} );
	} );

	describe( 'constructor()', () => {
		it( 'initializes with the correct data', () => {
			expect( presenter.postId ).toEqual( postId );
			expect( presenter.isCommenting ).toEqual( false );
			expect( presenter.navigation ).toEqual( navigation );
			expect( presenter.fetchCommentsFromRemote ).toEqual( fetchCommentsFromRemote );
			expect( presenter.getCommentsFromStore ).toEqual( getCommentsFromStore );
			expect( presenter.createComment ).toEqual( createComment );
			expect( presenter.rootStore ).toEqual( rootStore );
			expect( presenter.modalService ).toEqual( modalService );
			expect( presenter.actionSheetService ).toEqual( actionSheetService );
			expect( presenter.keyboard ).toEqual( keyboard );

			expect( presenter.form ).toBeInstanceOf( Form );
			expect( Form ).toHaveBeenCalledWith( { fields: commentFields }, expect.any( Object ) );

			expect( makeAutoObservable ).toHaveBeenCalledWith( presenter );

			expect( presenter.post ).toEqual( post );
		} );
	} );

	describe( '@onSubmitSuccess()', () => {
		const formValues = { text: 'Comment text' };
		const form = {
			values: () => ( formValues ),
			clear: jest.fn()
		};

		it( 'calls the createComment interactor', async () => {
			await presenter.onSubmitSuccess( form );

			expect( createComment.execute ).toHaveBeenCalledWith( { postId, text: formValues.text } );
		} );

		it( 'marks the presenter as commenting', () => {
			presenter.onSubmitSuccess( form );
			expect( presenter.isCommenting ).toBe( true );
		} );

		it( 'marks the presenter as not commenting in upon completion', async () => {
			await presenter.onSubmitSuccess( form );
			expect( presenter.isCommenting ).toBe( false );
		} );

		it( 'logs the new comment event', async () => {
			await presenter.onSubmitSuccess( form );
			expect( analyticsService.logNewComment ).toHaveBeenCalledTimes( 1 );
		} );

		it( 'dismiss keyboard', async () => {
			await presenter.onSubmitSuccess( form );
			expect( keyboard.dismiss ).toHaveBeenCalled();
		} );

		describe( 'when the request fails', () => {
			itShowsRequestErrorInSnackbar( {
				request: () => presenter.onSubmitSuccess( form ),
				snackbarServiceMock: snackbarService,
				expectedMessage: 'Connection error. Please try again.',
				beforeRequest: () => {
					createComment.execute.mockRejectedValueOnce( new NetworkError() );
				}
			} );
		} );
	} );

	describe( '@backButtonWasPressed', () => {
		it( 'goes back', () => {
			presenter.backButtonWasPressed();
			expect( navigation.goBack ).toHaveBeenCalled();
		} );
	} );

	describe( '@commentPresenters()', () => {
		it( 'returns the commentPresenters', () => {
			presenter.commentPresenters.forEach( ( commentPresenter, index ) => {
				expect( commentPresenter.comment ).toEqual( comments[ index ] );
				expect( commentPresenter.modalService ).toEqual( modalService );
				expect( commentPresenter.actionSheetService ).toEqual( actionSheetService );
				expect( commentPresenter.analyticsService ).toEqual( analyticsService );
				expect( commentPresenter ).toBeInstanceOf( CommentPresenter );
			} );
		} );
	} );

	describe( '@postPresenter()', () => {
		it( 'returns the postPresenter', () => {
			expect( presenter.postPresenter.post ).toEqual( post );
			expect( presenter.postPresenter.modalService ).toEqual( modalService );
			expect( presenter.postPresenter.actionSheetService ).toEqual( actionSheetService );
			expect( presenter.postPresenter ).toBeInstanceOf( PostPresenter );
		} );

		describe( 'onDeleteSuccess callback', () => {
			it( 'goes back', () => {
				presenter.postPresenter.onDeleteSuccess();
				expect( navigation.goBack ).toHaveBeenCalled();
			} );
		} );
	} );

	describe( '@title()', () => {
		it( 'returns the title', () => {
			expect( presenter.title ).toEqual( `${pilot.firstName}'s post` );
		} );
	} );

	describe( '@onRefresh()', () => {
		it( 'calls the fetchPostFromRemote interactor', () => {
			presenter.onRefresh();
			expect( presenter.fetchPostFromRemote.execute ).toHaveBeenCalled();
		} );
	} );

	describe( '@isRefreshing()', () => {
		describe( 'when the app is refreshing', () => {
			it( 'returns true', () => {
				presenter.onRefresh();
				expect( presenter.isRefreshing ).toBeTruthy();
			} );
		} );

		describe( 'when the app finished to refreshing', () => {
			it( 'returns false', async () => {
				presenter._setLoadingPost( false );
				await flushPromises();
				expect( presenter.isRefreshing ).toBeFalsy();
			} );
		} );
	} );
} );
