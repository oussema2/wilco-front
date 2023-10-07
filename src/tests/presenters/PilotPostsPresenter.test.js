import PilotFactory from '../factories/PilotFactory';
import PilotPostsPresenter from '../../presenters/PilotPostsPresenter';
import GetPostsByPilotFromStore from '../../interactors/GetPostsByPilotFromStore';
import MockRootStore from '../mocks/MockRootStore';
import MockModalService from '../mocks/MockModalService';
import MockActionSheetService from '../mocks/MockActionSheetService';
import Pilot from '../../entities/Pilot';
import PostPresenter from '../../presenters/PostPresenter';
import PostFactory from '../factories/PostFactory';
import EntityStore from '../../stores/EntityStore';

describe( 'PilotPostsPresenter', () => {
	let presenter;
	const pilot = PilotFactory.build();
	const posts = PostFactory.buildList( 4, { pilot } );
	const store = new EntityStore();
	const navigation = { goBack: jest.fn(), navigate: jest.fn(), push: jest.fn() };
	const fetchPostsFromRemote = { execute: jest.fn(), setPagination: jest.fn() };
	const getPostsFromStore = new GetPostsByPilotFromStore( { store } );
	const rootStore = new MockRootStore();
	const modalService = new MockModalService();
	const actionSheetService = new MockActionSheetService();
	const makeAutoObservable = jest.fn();
	const snackbarService = { showError: jest.fn() };
	const analyticsService = 'fake analytics service';

	beforeEach( () => {
		jest.clearAllMocks();
		presenter = new PilotPostsPresenter( {
			pilot,
			makeAutoObservable,
			fetchPostsFromRemote,
			getPostsFromStore,
			navigation,
			modalService,
			rootStore,
			actionSheetService,
			snackbarService,
			analyticsService
		} );
	} );

	describe( 'constructor()', () => {
		it( 'initializes with the correct data', () => {
			expect( presenter.pilot ).toEqual( pilot );
			expect( presenter.pilot ).toBeInstanceOf( Pilot );
			expect( presenter.getPostsFromStore ).toBeInstanceOf( GetPostsByPilotFromStore );
			expect( presenter.fetchPostsFromRemote ).toEqual( fetchPostsFromRemote );
			expect( presenter.navigation ).toEqual( navigation );
			expect( presenter.modalService ).toEqual( modalService );
			expect( presenter.rootStore ).toEqual( rootStore );
			expect( presenter.actionSheetService ).toEqual( actionSheetService );
			expect( presenter.snackbarService ).toEqual( snackbarService );
			expect( presenter.analyticsService ).toEqual( analyticsService );
			expect( makeAutoObservable ).toHaveBeenCalledWith( presenter );
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

	describe( '@hasAnyPost()', () => {
		describe( 'when there are posts created by me', () => {
			beforeEach( () => {
				store.updateAll( posts );
			} );

			it( 'returns true', () => {
				expect( presenter.hasAnyPost ).toBe( true );
			} );
		} );

		describe( 'when there are no posts in store', () => {
			beforeEach( () => {
				store.entities = [];
			} );

			it( 'returns false', () => {
				expect( presenter.hasAnyPost ).toBe( false );
			} );
		} );

		describe( 'when all posts are from another pilot', () => {
			beforeEach( () => {
				const otherPilot = PilotFactory.build();
				const otherPilotPosts = PostFactory.buildList( 4, { otherPilot } );
				store.updateAll( otherPilotPosts );
			} );

			it( 'returns false', () => {
				expect( presenter.hasAnyPost ).toBe( false );
			} );
		} );

		describe( 'when all posts are from other pilots', () => {
			beforeEach( () => {
				const otherPilot = PilotFactory.build();
				const otherPilotPosts = PostFactory.buildList( 4, { otherPilot } );
				store.updateAll( otherPilotPosts );

				const newOtherPilot = PilotFactory.build();
				const newOtherPosts = PostFactory.buildList( 5, { newOtherPilot } );
				store.updateAll( newOtherPosts );
			} );

			it( 'returns false', () => {
				expect( presenter.hasAnyPost ).toBe( false );
			} );
		} );

		describe( 'when there are posts created by me and by other pilots', () => {
			beforeEach( () => {
				store.updateAll( posts );

				const otherPilot = PilotFactory.build();
				const otherPilotPosts = PostFactory.buildList( 4, { otherPilot } );
				store.updateAll( otherPilotPosts );

				const newOtherPilot = PilotFactory.build();
				const newOtherPosts = PostFactory.buildList( 5, { newOtherPilot } );
				store.updateAll( newOtherPosts );
			} );

			it( 'returns true', () => {
				expect( presenter.hasAnyPost ).toBe( true );
			} );
		} );
	} );
} );
