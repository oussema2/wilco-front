import { makeAutoObservable } from 'mobx';
import { renderHook } from '@testing-library/react-hooks';
import EditPilotProfilePresenter from '../../presenters/EditPilotProfilePresenter';
import useEditPilotProfileWireframe from '../../wireframes/useEditPilotProfileWireframe';
import GetCurrentPilotFromStore from '../../interactors/GetCurrentPilotFromStore';
import DeleteAircraft from '../../interactors/DeleteAircraft';
import mockUseRootStore from '../mocks/mockUseRootStore';
import mockUseModalService from '../mocks/mockUseModalService';
import mockUseActionSheetService from '../mocks/mockUseActionSheetService';
import mockUseSnackbarService from '../mocks/mockUseSnackbarService';
import PilotService from '../../services/PilotService';
import FetchCredentialsFromRemote from '../../interactors/FetchCredentialsFromRemote';
import UpdatePilot from '../../interactors/UpdatePilot';
import mockUseAnalyticsService from '../mocks/mockUseAnalyticsService';
import FetchEntitiesFromRemote from '../../interactors/FetchEntitiesFromRemote';
import GetEntitiesFromStore from '../../interactors/GetEntitiesFromStore';
import EntityService from '../../services/EntityService';

jest.mock( '../../presenters/EditPilotProfilePresenter' );
jest.mock( '../../interactors/GetCurrentPilotFromStore' );
jest.mock( '../../interactors/GetEntitiesFromStore' );
jest.mock( '../../interactors/FetchEntitiesFromRemote' );
jest.mock( '../../interactors/UpdatePilot' );
jest.mock( '../../interactors/DeleteAircraft' );

const mockNavigation = {};
jest.mock( '@react-navigation/native', () => ( {
	useNavigation: () => mockNavigation
} ) );

describe( 'useEditPilotProfileWireframe', () => {
	let navigation;
	let rootStore;
	let modalService;
	let actionSheetService;
	let snackbarService;
	let analyticsService;

	beforeEach( () => {
		navigation = mockNavigation;
		rootStore = mockUseRootStore();
		modalService = mockUseModalService();
		actionSheetService = mockUseActionSheetService();
		snackbarService = mockUseSnackbarService();
		analyticsService = mockUseAnalyticsService();
	} );

	it( 'returns an instance of EditPilotProfilePresenter', () => {
		const { result } = renderHook( () => useEditPilotProfileWireframe( ) );

		expect( result.current ).toBeInstanceOf( EditPilotProfilePresenter );
		expect( EditPilotProfilePresenter ).toHaveBeenCalledWith( {
			navigation,
			modalService,
			actionSheetService,
			snackbarService,
			fetchCredentialsFromRemote: expect.any( FetchCredentialsFromRemote ),
			fetchCommunityTagsFromRemote: expect.any( FetchEntitiesFromRemote ),
			getCommunityTagsFromStore: expect.any( GetEntitiesFromStore ),
			analyticsService,
			getCurrentPilotFromStore: expect.any( GetCurrentPilotFromStore ),
			updatePilot: expect.any( UpdatePilot ),
			deleteAircraft: expect.any( DeleteAircraft ),
			fetchRolesFromRemote: expect.any( FetchEntitiesFromRemote ),
			getRolesFromStore: expect.any( GetEntitiesFromStore ),
			makeAutoObservable
		} );

		expect( GetCurrentPilotFromStore ).toHaveBeenCalledWith( {
			store: rootStore.pilotStore
		} );

		expect( UpdatePilot ).toHaveBeenCalledWith( {
			store: rootStore.pilotStore,
			service: expect.any( PilotService )
		} );

		expect( FetchEntitiesFromRemote ).toHaveBeenCalledWith( {
			service: expect.any( EntityService ),
			store: rootStore.communityTagStore
		} );

		expect( GetEntitiesFromStore ).toHaveBeenCalledWith( {
			store: rootStore.communityTagStore
		} );
	} );
} );
