import { renderHook } from '@testing-library/react-hooks';
import { makeAutoObservable } from 'mobx';
import mockUseRootStore from '../mocks/mockUseRootStore';
import mockUseActionSheetService from '../mocks/mockUseActionSheetService';
import mockUseSnackbarService from '../mocks/mockUseSnackbarService';
import CreatePostPresenter from '../../presenters/CreatePostPresenter';
import useCreatePostWireframe from '../../wireframes/useCreatePostWireframe';
import CreatePost from '../../interactors/CreatePost';
import GetCurrentPilotFromStore from '../../interactors/GetCurrentPilotFromStore';
import mockUseModalService from '../mocks/mockUseModalService';
import PostService from '../../services/PostService';
import Api from '../../services/Api';
import mockUseAnalyticsService from '../mocks/mockUseAnalyticsService';
import FetchEntitiesFromRemote from '../../interactors/FetchEntitiesFromRemote';
import GetEntitiesFromStore from '../../interactors/GetEntitiesFromStore';
import ExtractorMessageService from '../../services/ExtractorMessageService';

jest.mock( '../../presenters/CreatePostPresenter' );
jest.mock( '../../interactors/CreatePost' );
jest.mock( '../../interactors/GetCurrentPilotFromStore' );
jest.mock( '../../interactors/GetEntitiesFromStore' );
jest.mock( '../../interactors/FetchEntitiesFromRemote' );
jest.mock( '../../services/PostService' );
jest.mock( '../../services/Api' );
jest.mock( 'mobx' );

const mockNavigation = {};
jest.mock( '@react-navigation/native', () => ( {
	...jest.requireActual( '@react-navigation/native' ),
	useNavigation: () => mockNavigation
} ) );

describe( 'useCreatePostWireframe', () => {
	let rootStore;
	let navigation;
	let modalService;
	let actionSheetService;
	let snackbarService;
	let analyticsService;

	beforeEach( () => {
		rootStore = mockUseRootStore();
		navigation = mockNavigation;
		modalService = mockUseModalService();
		actionSheetService = mockUseActionSheetService();
		snackbarService = mockUseSnackbarService();
		analyticsService = mockUseAnalyticsService();
	} );

	it( 'returns an instance of CreatePostPresenter', () => {
		const { result } = renderHook( () => useCreatePostWireframe() );

		expect( result.current ).toBeInstanceOf( CreatePostPresenter );
		expect( CreatePostPresenter ).toHaveBeenCalledWith( {
			getCurrentPilotFromStore: expect.any( GetCurrentPilotFromStore ),
			createPost: expect.any( CreatePost ),
			fetchCommunityTagsFromRemote: expect.any( FetchEntitiesFromRemote ),
			getCommunityTagsFromStore: expect.any( GetEntitiesFromStore ),
			extractorMessageService: expect.any( ExtractorMessageService ),
			navigation,
			modalService,
			actionSheetService,
			snackbarService,
			analyticsService,
			makeAutoObservable
		} );
		expect( CreatePost ).toHaveBeenCalledWith( {
			postService: expect.any( PostService ),
			postStore: rootStore.postStore,
			pilotStore: rootStore.pilotStore
		} );
		expect( PostService ).toHaveBeenCalledWith( {
			api: expect.any( Api )
		} );
		expect( Api ).toHaveBeenCalledWith( {
			authenticationStore: rootStore.authenticationStore
		} );
		expect( GetCurrentPilotFromStore ).toHaveBeenCalledWith( {
			store: rootStore.pilotStore
		} );
	} );
} );
