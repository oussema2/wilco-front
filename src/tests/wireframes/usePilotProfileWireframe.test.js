import { renderHook } from '@testing-library/react-hooks';
import PilotProfilePresenter from '../../presenters/PilotProfilePresenter';
import usePilotProfileWireframe from '../../wireframes/usePilotProfileWireframe';
import GetEntityFromStore from '../../interactors/GetEntityFromStore';
import GetCurrentPilotFromStore from '../../interactors/GetCurrentPilotFromStore';
import FetchEntityFromRemote from '../../interactors/FetchEntityFromRemote';
import mockUseRootStore from '../mocks/mockUseRootStore';
import PilotService from '../../services/PilotService';
import GetPostsByPilotFromStore from '../../interactors/GetPostsByPilotFromStore';
import mockUseModalService from '../mocks/mockUseModalService';
import mockUseActionSheetService from '../mocks/mockUseActionSheetService';
import mockUseSnackbarService from '../mocks/mockUseSnackbarService';
import mockUseAnalyticsService from '../mocks/mockUseAnalyticsService';
import FetchNestedPostsFromRemote from '../../interactors/FetchNestedPostsFromRemote';
import BlockUser from '../../interactors/BlockUser';

jest.mock( '../../presenters/PilotProfilePresenter' );
jest.mock( '../../interactors/GetCurrentPilotFromStore' );
jest.mock( '../../interactors/GetEntityFromStore' );
jest.mock( '../../interactors/GetPostsByPilotFromStore' );
jest.mock( '../../interactors/FetchEntityFromRemote' );
jest.mock( '../../interactors/FetchNestedPostsFromRemote' );
jest.mock( '../../interactors/BlockUser' );
jest.mock( '../../services/PostService' );
jest.mock( '../../builders/PostBuilder' );
jest.mock( '../../services/Api' );

const mockNavigation = {};
const useFocusEffect = {};
jest.mock( '@react-navigation/native', () => ( {
	useNavigation: () => mockNavigation,
	useFocusEffect: () => useFocusEffect
} ) );

describe( 'usePilotProfileWireframe', () => {
	let rootStore;
	let analyticsService;
	let modalService;
	let actionSheetService;
	let snackbarService;
	let navigation;

	beforeEach( () => {
		rootStore = mockUseRootStore();
		analyticsService = mockUseAnalyticsService();
		modalService = mockUseModalService();
		actionSheetService = mockUseActionSheetService();
		snackbarService = mockUseSnackbarService();
		navigation = mockNavigation;
	} );

	it( 'returns an instance of PilotProfilePresenter', () => {
		const pilotId = 1;
		const { result } = renderHook( () => usePilotProfileWireframe( { pilotId } ) );

		expect( result.current ).toBeInstanceOf( PilotProfilePresenter );
		expect( PilotProfilePresenter ).toHaveBeenCalledWith( {
			pilotId,
			navigation,
			rootStore,
			fetchPostsFromRemote: expect.any( FetchNestedPostsFromRemote ),
			getPostsFromStore: expect.any( GetPostsByPilotFromStore ),
			analyticsService,
			getPilotFromStore: expect.any( GetEntityFromStore ),
			getCurrentPilotFromStore: expect.any( GetCurrentPilotFromStore ),
			fetchPilotFromRemote: expect.any( FetchEntityFromRemote ),
			blockUser: expect.any( BlockUser ),
			modalService,
			actionSheetService,
			snackbarService
		} );

		expect( GetEntityFromStore ).toHaveBeenCalledWith( {
			store: rootStore.pilotStore
		} );

		expect( GetCurrentPilotFromStore ).toHaveBeenCalledWith( {
			store: rootStore.pilotStore
		} );

		expect( FetchEntityFromRemote ).toHaveBeenCalledWith( {
			store: rootStore.pilotStore,
			service: expect.any( PilotService )
		} );

		expect( BlockUser ).toHaveBeenCalledWith( {
			pilotService: expect.any( PilotService ),
			pilotStore: rootStore.pilotStore,
			postStore: rootStore.postStore,
			commentStore: rootStore.commentStore,
			notificationStore: rootStore.notificationStore
		} );
	} );
} );
