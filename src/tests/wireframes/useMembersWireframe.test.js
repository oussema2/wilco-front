import { renderHook } from '@testing-library/react-hooks';
import { makeAutoObservable } from 'mobx';
import mockUseSnackbarService from '../mocks/mockUseSnackbarService';
import mockUseRootStore from '../mocks/mockUseRootStore';
import GetEntitiesFromStore from '../../interactors/GetEntitiesFromStore';
import Api from '../../services/Api';
import MembersPresenter from '../../presenters/MembersPresenter';
import useMembersWireframe from '../../wireframes/useMembersWireframe';
import PilotService from '../../services/PilotService';
import FetchEntitiesFromRemote from '../../interactors/FetchEntitiesFromRemote';
import GetCurrentPilotFromStore from '../../interactors/GetCurrentPilotFromStore';

jest.mock( '../../presenters/MembersPresenter' );
jest.mock( '../../interactors/FetchEntitiesFromRemote' );
jest.mock( '../../interactors/GetEntitiesFromStore' );
jest.mock( '../../interactors/GetCurrentPilotFromStore' );
jest.mock( '../../services/Api' );
jest.mock( 'mobx' );

const mockNavigation = {};
jest.mock( '@react-navigation/native', () => ( {
	...jest.requireActual( '@react-navigation/native' ),
	useNavigation: () => mockNavigation
} ) );

describe( 'useMembersWireframe', () => {
	let rootStore;
	let navigation;
	let snackbarService;

	beforeEach( () => {
		rootStore = mockUseRootStore();
		navigation = mockNavigation;
		snackbarService = mockUseSnackbarService();
	} );

	it( 'returns an instance of MembersPresenter', () => {
		const { result } = renderHook( () => useMembersWireframe( ) );

		expect( result.current ).toBeInstanceOf( MembersPresenter );
		expect( MembersPresenter ).toHaveBeenCalledWith( {
			fetchPilotsFromRemote: expect.any( FetchEntitiesFromRemote ),
			getPilotsFromStore: expect.any( GetEntitiesFromStore ),
			getCurrentPilotFromStore: expect.any( GetCurrentPilotFromStore ),
			navigation,
			snackbarService,
			rootStore,
			makeAutoObservable
		} );

		expect( FetchEntitiesFromRemote ).toHaveBeenCalledWith( {
			store: rootStore.pilotStore,
			service: expect.any( PilotService )
		} );

		expect( GetEntitiesFromStore ).toHaveBeenCalledWith( {
			store: rootStore.pilotStore
		} );

		expect( Api ).toHaveBeenCalledWith( {
			authenticationStore: rootStore.authenticationStore
		} );
	} );
} );
