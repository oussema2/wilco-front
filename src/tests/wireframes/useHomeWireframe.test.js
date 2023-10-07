import { renderHook } from '@testing-library/react-hooks';
import { makeAutoObservable } from 'mobx';
import mockUseRootStore from '../mocks/mockUseRootStore';
import mockUseModalService from '../mocks/mockUseModalService';
import mockUseActionSheetService from '../mocks/mockUseActionSheetService';
import mockUseSnackbarService from '../mocks/mockUseSnackbarService';
import HomePresenter from '../../presenters/HomePresenter';
import useHomeWireframe from '../../wireframes/useHomeWireframe';
import GetEntitiesFromStore from '../../interactors/GetEntitiesFromStore';
import PostService from '../../services/PostService';
import PostBuilder from '../../builders/PostBuilder';
import Api from '../../services/Api';
import FetchPostsFromRemote from '../../interactors/FetchPostsFromRemote';
import mockUseAnalyticsService from '../mocks/mockUseAnalyticsService';
import FetchEntitiesFromRemote from '../../interactors/FetchEntitiesFromRemote';
import TooltipManager from '../../stores/TooltipManager';
import FetchMyFeedPostsFromRemote from '../../interactors/FetchMyFeedPostsFromRemote';
import GetCurrentPilotFromStore from '../../interactors/GetCurrentPilotFromStore';

jest.mock( '../../presenters/HomePresenter' );
jest.mock( '../../interactors/FetchEntitiesFromRemote' );
jest.mock( '../../interactors/GetEntitiesFromStore' );
jest.mock( '../../interactors/FetchMyFeedPostsFromRemote' );
jest.mock( '../../services/PostService' );
jest.mock( '../../builders/PostBuilder' );
jest.mock( '../../stores/TooltipManager' );
jest.mock( '../../services/Api' );
jest.mock( 'mobx' );

const mockNavigation = {};
jest.mock( '@react-navigation/native', () => ( {
	...jest.requireActual( '@react-navigation/native' ),
	useNavigation: () => mockNavigation
} ) );

describe( 'useHomeWireframe', () => {
	let rootStore;
	let modalService;
	let actionSheetService;
	let snackbarService;
	let analyticsService;
	let navigation;

	beforeEach( () => {
		rootStore = mockUseRootStore();
		modalService = mockUseModalService();
		actionSheetService = mockUseActionSheetService();
		snackbarService = mockUseSnackbarService();
		analyticsService = mockUseAnalyticsService();
		navigation = mockNavigation;
	} );

	it( 'returns an instance of HomePresenter', () => {
		const { result } = renderHook( () => useHomeWireframe( ) );

		expect( result.current ).toBeInstanceOf( HomePresenter );
		expect( HomePresenter ).toHaveBeenCalledWith( {
			fetchPostsFromRemote: expect.any( FetchPostsFromRemote ),
			fetchMyFeedPostsFromRemote: expect.any( FetchMyFeedPostsFromRemote ),
			getPostsFromStore: expect.any( GetEntitiesFromStore ),
			getMyFeedPostsFromStore: expect.any( GetEntitiesFromStore ),
			getCurrentPilotFromStore: expect.any( GetCurrentPilotFromStore ),
			fetchCommunityTagsFromRemote: expect.any( FetchEntitiesFromRemote ),
			getCommunityTagsFromStore: expect.any( GetEntitiesFromStore ),
			tooltipManager: expect.any( TooltipManager ),
			navigation,
			modalService,
			rootStore,
			actionSheetService,
			snackbarService,
			analyticsService,
			makeAutoObservable
		} );
		expect( FetchPostsFromRemote ).toHaveBeenCalledWith( {
			store: rootStore.postStore,
			service: expect.any( PostService ),
			clearStoreOnPullToRefresh: true
		} );
		expect( GetEntitiesFromStore ).toHaveBeenCalledWith( {
			store: rootStore.postStore
		} );
		expect( PostBuilder ).toHaveBeenCalledWith( {
			pilotStore: rootStore.pilotStore,
			aircraftStore: rootStore.aircraftStore,
			commentStore: rootStore.commentStore
		} );
		expect( PostService ).toHaveBeenCalledWith( {
			api: expect.any( Api ),
			buildItem: expect.any( PostBuilder ).build
		} );
		expect( Api ).toHaveBeenCalledWith( {
			authenticationStore: rootStore.authenticationStore
		} );
	} );
} );
