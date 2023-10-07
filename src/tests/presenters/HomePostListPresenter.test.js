import GetEntitiesFromStore from '../../interactors/GetEntitiesFromStore';
import HomePresenter from '../../presenters/HomePresenter';
import PostPresenter from '../../presenters/PostPresenter';
import EntityStore from '../../stores/EntityStore';
import PostFactory from '../factories/PostFactory';
import MockRootStore from '../mocks/MockRootStore';
import MockModalService from '../mocks/MockModalService';
import MockActionSheetService from '../mocks/MockActionSheetService';
import PaginationFactory from '../factories/PaginationFactory';
import HomePostListPresenter from '../../presenters/HomePostListPresenter';
import flushPromises from '../support/flushPromises';

describe( 'HomePostListPresenter', () => {
	const fetchPostsFromRemote = {
		execute: jest.fn(),
		setPagination: jest.fn(),
		resetPagination: jest.fn()
	};

	let getCurrentPilotFromStore = {
		execute: jest.fn()
			.mockReturnValueOnce( { airports: [] } )
			.mockReturnValueOnce( { airports: [ 'JFK' ] } )
	};

	const posts = PostFactory.buildList( 4 );
	const store = new EntityStore();
	const getPostsFromStore = new GetEntitiesFromStore( { store } );
	const navigation = { push: jest.fn(), navigate: jest.fn() };
	const makeAutoObservable = jest.fn();
	const rootStore = new MockRootStore();
	const modalService = new MockModalService();
	const actionSheetService = new MockActionSheetService();
	const snackbarService = { showError: jest.fn() };
	const analyticsService = 'fake analytics';
	let presenter;

	beforeEach( () => {
		jest.clearAllMocks();
		presenter = new HomePostListPresenter( {
			fetchPostsFromRemote,
			getPostsFromStore,
			getCurrentPilotFromStore,
			navigation,
			modalService,
			rootStore,
			actionSheetService,
			snackbarService,
			makeAutoObservable,
			tags: [],
			hashtags: []
		} );
	} );

	describe( 'constructor()', () => {
		describe( 'without pagination', () => {
			it( 'initializes with the correct data', () => {
				expect( presenter.fetchPostsFromRemote ).toEqual( fetchPostsFromRemote );
				expect( presenter.getCurrentPilotFromStore ).toEqual( getCurrentPilotFromStore );
				expect( presenter.getPostsFromStore ).toEqual( getPostsFromStore );
				expect( presenter.navigation ).toEqual( navigation );
				expect( presenter.modalService ).toEqual( modalService );
				expect( presenter.rootStore ).toEqual( rootStore );
				expect( presenter.actionSheetService ).toEqual( actionSheetService );

				expect( makeAutoObservable ).toHaveBeenCalledWith( presenter );
			} );
		} );

		describe( 'with pagination', () => {
			beforeEach( () => {
				jest.clearAllMocks();
				const pagination = PaginationFactory.build();
				fetchPostsFromRemote.pagination = pagination;
				presenter = new HomePresenter( {
					fetchPostsFromRemote,
					getPostsFromStore,
					navigation,
					modalService,
					rootStore,
					actionSheetService,
					snackbarService,
					makeAutoObservable
				} );
			} );

			it( 'initializes with the correct data', () => {
				expect( presenter.fetchPostsFromRemote ).toEqual( fetchPostsFromRemote );
				expect( presenter.getPostsFromStore ).toEqual( getPostsFromStore );
				expect( presenter.homePostListPresenter.fetchPostsFromRemote.execute ).toHaveBeenCalled( );
				expect( presenter.navigation ).toEqual( navigation );
				expect( presenter.modalService ).toEqual( modalService );
				expect( presenter.rootStore ).toEqual( rootStore );
				expect( presenter.actionSheetService ).toEqual( actionSheetService );

				expect( makeAutoObservable ).toHaveBeenCalledWith( presenter );
			} );
		} );
	} );

	describe( '@commentButtonWasPressed()', () => {
		const postId = 1;
		it( 'pushes the PostDetail screen scrolling to the comments', () => {
			presenter.commentButtonWasPressed( postId );
			expect( presenter.navigation.push ).toHaveBeenCalledWith( 'PostDetail', { postId, scrollToFirstComment: true } );
		} );
	} );

	describe( '@contentWasPressed()', () => {
		const postId = 1;
		it( 'pushes the PostDetail screen', () => {
			presenter.contentWasPressed( postId );
			expect( presenter.navigation.push ).toHaveBeenCalledWith( 'PostDetail', { postId, scrollToFirstComment: false } );
		} );
	} );

	describe( '@postPresenters()', () => {
		it( 'returns the postPresenters', () => {
			presenter.postPresenters.forEach( ( postPresenter, index ) => {
				expect( postPresenter.post ).toEqual( posts[ index ] );
				expect( postPresenter.modalService ).toEqual( modalService );
				expect( postPresenter.rootStore ).toEqual( rootStore );
				expect( postPresenter.actionSheetService ).toEqual( actionSheetService );
				expect( postPresenter.navigation ).toEqual( navigation );
				expect( postPresenter.snackbarService ).toEqual( snackbarService );
				expect( postPresenter.analyticsService ).toEqual( analyticsService );
				expect( postPresenter ).toBeInstanceOf( PostPresenter );
			} );
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
				await flushPromises();
				expect( presenter.isRefreshing ).toBeFalsy();
			} );
		} );
	} );

	describe( '@onRefresh()', () => {
		it( 'calls the fetchPostsFromRemote interactor', () => {
			presenter.onRefresh();
			expect( presenter.fetchPostsFromRemote.resetPagination ).toHaveBeenCalledTimes( 1 );
			expect( presenter.fetchPostsFromRemote.execute ).toHaveBeenCalled();
		} );
	} );

	describe( '@resetPaginationAndFetch()', () => {
		it( 'calls the fetchPostsFromRemote interactor', () => {
			presenter.resetPaginationAndFetch();
			expect( presenter.fetchPostsFromRemote.resetPagination ).toHaveBeenCalledTimes( 1 );
			expect( presenter.fetchPostsFromRemote.execute ).toHaveBeenCalled();
		} );
	} );

	describe( '@placeholderText()', () => {
		describe( 'When there aren\'t set up preferences', () => {
			it( 'should return the correct placeholder', () => {
				expect( presenter.placeholderText ).toBe( 'Posts from your preferred airports will appear here. Please set them up via your preferences.' );
			} );
		} );
		describe( 'When there are set up preferences', () => {
			it( 'should return the correct placeholder', () => {
				expect( presenter.placeholderText ).toBe( "For now, we didn't find any post that matches your preferences." );
			} );
		} );
	} );

	describe( '@fetchData()', () => {
		it( 'calls to fetchPostsFromRemote interactor', () => {
			presenter.fetchData();
			expect( presenter.fetchPostsFromRemote.execute ).toBeCalledWith( {
				community_tags: presenter.tags,
				hashtags: presenter.hashtags
			} );
		} );
	} );

	describe( '@isLoading', () => {
		describe( 'when the app is fetching posts from remote', () => {
			it( 'returns true', () => {
				presenter.fetchData();
				expect( presenter.isLoading ).toBe( true );
			} );
		} );

		describe( 'when the app is not fetching posts from remote', () => {
			it( 'returns false', async () => {
				await flushPromises();
				expect( presenter.isLoading )
					.toBe( false );
			} );
		} );
	} );
} );
