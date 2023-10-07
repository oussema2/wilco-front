import { renderHook } from '@testing-library/react-hooks';
import { makeAutoObservable } from 'mobx';
import AddAircraftPresenter from '../../presenters/AddAircraftPresenter';
import useAddAircraftWireframe from '../../wireframes/useAddAircraftWireframe';
import mockUseRootStore from '../mocks/mockUseRootStore';
import mockUseSnackbarService from '../mocks/mockUseSnackbarService';
import mockUseModalService from '../mocks/mockUseModalService';
import CreateAircraft from '../../interactors/CreateAircraft';
import Api from '../../services/Api';
import AircraftService from '../../services/AircraftService';
import Aircraft from '../../entities/Aircraft';
import mockUseAnalyticsService from '../mocks/mockUseAnalyticsService';

jest.mock( '../../presenters/AddAircraftPresenter' );
jest.mock( '../../interactors/CreateAircraft' );
jest.mock( '../../services/AircraftService' );
jest.mock( '../../services/Api' );
jest.mock( 'mobx' );

const mockNavigation = {};
jest.mock( '@react-navigation/native', () => ( {
	...jest.requireActual( '@react-navigation/native' ),
	useNavigation: () => mockNavigation
} ) );

describe( 'useAddAircraftWireframe', () => {
	let root;
	let snackbarService;
	let navigation;
	let modalService;
	let analyticsService;
	const previousScreen = 'previous screen';

	beforeEach( () => {
		root = mockUseRootStore();
		snackbarService = mockUseSnackbarService();
		analyticsService = mockUseAnalyticsService();
		modalService = mockUseModalService();
		navigation = mockNavigation;
	} );

	it( 'returns an instance of AddAircraftPresenter', () => {
		const { result } = renderHook( () => useAddAircraftWireframe( { previousScreen } ) );

		expect( result.current ).toBeInstanceOf( AddAircraftPresenter );
		expect( AddAircraftPresenter ).toHaveBeenCalledWith( {
			navigation,
			previousScreen,
			createAircraft: expect.any( CreateAircraft ),
			snackbarService,
			analyticsService,
			modalService,
			makeAutoObservable
		} );
		expect( CreateAircraft ).toHaveBeenCalledWith( {
			aircraftService: expect.any( AircraftService ),
			aircraftStore: root.aircraftStore,
			pilotStore: root.pilotStore
		} );
		expect( AircraftService ).toHaveBeenCalledWith( {
			api: expect.any( Api ),
			basePath: 'pilots/me/aircrafts',
			buildEntity: Aircraft.fromJSON
		} );
		expect( Api ).toHaveBeenCalledWith( {
			authenticationStore: root.authenticationStore
		} );
	} );
} );
