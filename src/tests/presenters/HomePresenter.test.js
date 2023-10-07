import GetEntitiesFromStore from '../../interactors/GetEntitiesFromStore';
import HomePresenter from '../../presenters/HomePresenter';
import EntityStore from '../../stores/EntityStore';
import MockRootStore from '../mocks/MockRootStore';
import MockModalService from '../mocks/MockModalService';
import MockActionSheetService from '../mocks/MockActionSheetService';
import PaginationFactory from '../factories/PaginationFactory';
import AUTHENTICATED_ROUTES from '../../navigation/AuthenticatedRoutes';
import HomePostListPresenter from '../../presenters/HomePostListPresenter';

describe( 'HomePresenter', () => {
	const fetchPostsFromRemote = {
		execute: jest.fn(),
		setPagination: jest.fn(),
		resetPagination: jest.fn()
	};
	const store = new EntityStore();
	const getPostsFromStore = new GetEntitiesFromStore( { store } );
	const navigation = { push: jest.fn(), navigate: jest.fn() };
	const makeAutoObservable = jest.fn();
	const rootStore = new MockRootStore();
	const modalService = new MockModalService();
	const actionSheetService = new MockActionSheetService();
	const snackbarService = { showError: jest.fn() };
	const tooltipManager = { setHomePreferencesTooltipAsSeen: jest.fn() };
	const analyticsService = 'fake analytics service';
	let presenter;

	beforeEach( () => {
		jest.clearAllMocks();
		presenter = new HomePresenter( {
			fetchPostsFromRemote,
			getPostsFromStore,
			navigation,
			modalService,
			rootStore,
			actionSheetService,
			snackbarService,
			tooltipManager,
			analyticsService,
			makeAutoObservable
		} );
	} );

	describe( 'constructor()', () => {
		describe( 'without pagination', () => {
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
					analyticsService,
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

	describe( '@onTooltipClosed()', () => {
		it( 'calls to setHomePreferencesTooltipAsSeen', () => {
			presenter.onTooltipClosed();
			expect( tooltipManager.setHomePreferencesTooltipAsSeen ).toHaveBeenCalled();
		} );
	} );

	describe( '@onPreferencesButtonPressed()', () => {
		it( 'navigates to Preferences Screen', () => {
			presenter.onPreferencesButtonPressed();
			expect( navigation.navigate ).toHaveBeenCalledWith( AUTHENTICATED_ROUTES.preferences.name );
		} );
	} );

	describe( '@setTabIndex()', () => {
		it( 'set current active tab', () => {
			const expectedTabIndex = 1;
			presenter.setTabIndex( expectedTabIndex );
			expect( presenter.tabIndex ).toBe( expectedTabIndex );
		} );
	} );

	describe( '@hasAnyTag()', () => {
		describe( 'when there are tags selected', () => {
			beforeEach( () => {
				presenter.filterPostsPresenter._items = [ 'tag 1' ];
			} );
			it( 'returns true', () => {
				expect( presenter.hasAnyTag ).toBe( true );
			} );
		} );

		describe( 'when there are not tags selected', () => {
			beforeEach( () => {
				presenter.filterPostsPresenter._items = [];
			} );
			it( 'returns false', () => {
				expect( presenter.hasAnyTag ).toBe( false );
			} );
		} );
	} );

	describe( '@hasAnyHashtag()', () => {
		describe( 'when there are hashtags selected', () => {
			beforeEach( () => {
				presenter.hashtags = [ 'hashtag 1', 'hashtag 2' ];
			} );
			it( 'returns true', () => {
				expect( presenter.hasAnyHashtag ).toBe( true );
			} );
		} );

		describe( 'when there are not hashtags selected', () => {
			beforeEach( () => {
				presenter.hashtags = [];
			} );
			it( 'returns false', () => {
				expect( presenter.hasAnyHashtag ).toBe( false );
			} );
		} );
	} );

	describe( '@onTooltipButtonPressed()', () => {
		it( 'navigates to Preferences Screen', () => {
			presenter.onTooltipButtonPressed();
			expect( navigation.navigate ).toHaveBeenCalledWith( AUTHENTICATED_ROUTES.preferences.name );
		} );
	} );

	describe( '@homePostListPresenter()', () => {
		it( 'returns a homePostListPresenter instance', () => {
			expect( presenter.homePostListPresenter ).toBeInstanceOf( HomePostListPresenter );
		} );
	} );

	describe( '@myFeedListPresenter()', () => {
		it( 'returns a homePostListPresenter instance', () => {
			expect( presenter.myFeedListPresenter ).toBeInstanceOf( HomePostListPresenter );
		} );
	} );

	describe( '@isHomePreferencesTooltipWasSeen()', () => {
		describe( 'when the user didn\'t saw the tooltip', () => {
			it( 'returns false', () => {
				expect( presenter.isHomePreferencesTooltipWasSeen ).toBeFalsy();
			} );
		} );

		describe( 'when the user saw the tooltip', () => {
			beforeEach( () => {
				presenter.tooltipManager.isHomePreferencesTooltipWasSeen = jest.fn()
					.mockReturnValue( true );
			} );

			it( 'returns true', () => {
				expect( presenter.isHomePreferencesTooltipWasSeen ).toBeTruthy();
			} );
		} );
	} );

	describe( '@onHashtagLinkPressed()', () => {
		it( 'adds a new hashtag to filter posts', () => {
			presenter.onHashtagLinkPressed( 'new_hashtag' );
			expect( presenter.hashtags ).toStrictEqual( [ 'new_hashtag' ] );
		} );
	} );

	describe( '@onRemoveHashtagPressed()', () => {
		it( 'removes a hashtag', () => {
			presenter.onRemoveHashtagPressed( 'new_hashtag' );
			expect( presenter.hashtags ).toStrictEqual( [] );
		} );
	} );
} );
