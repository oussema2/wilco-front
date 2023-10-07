import { renderHook } from '@testing-library/react-hooks';
import { makeAutoObservable } from 'mobx';
import mockUseRootStore from '../mocks/mockUseRootStore';
import mockUseActionSheetService from '../mocks/mockUseActionSheetService';
import mockUseSnackbarService from '../mocks/mockUseSnackbarService';
import FetchAircraftFlights from '../../interactors/FetchAircraftFlights';
import GetCurrentPilotFromStore from '../../interactors/GetCurrentPilotFromStore';
import mockUseModalService from '../mocks/mockUseModalService';
import FlightService from '../../services/FlightService';
import AircraftService from '../../services/AircraftService';
import Api from '../../services/Api';
import FlightBuilder from '../../builders/FlightBuilder';
import GetFlightTrack from '../../interactors/GetFlightTrack';
import DeleteAircraft from '../../interactors/DeleteAircraft';
import Aircraft from '../../entities/Aircraft';
import mockUseAnalyticsService from '../mocks/mockUseAnalyticsService';
import useAddFlightWireframe from '../../wireframes/useAddFlightWireframe';
import AddFlightPresenter from '../../presenters/AddFlightPresenter';

jest.mock( '../../presenters/AddFlightPresenter' );
jest.mock( '../../interactors/GetCurrentPilotFromStore' );
jest.mock( '../../interactors/FetchAircraftFlights' );
jest.mock( '../../interactors/GetFlightTrack' );
jest.mock( '../../interactors/DeleteAircraft' );
jest.mock( '../../interactors/GetEntitiesFromStore' );
jest.mock( '../../interactors/FetchEntitiesFromRemote' );
jest.mock( '../../services/PostService' );
jest.mock( '../../services/FlightService' );
jest.mock( '../../services/AircraftService' );
jest.mock( '../../services/Api' );
jest.mock( '../../builders/FlightBuilder' );
jest.mock( 'mobx' );

const mockNavigation = {};
jest.mock( '@react-navigation/native', () => ( {
	...jest.requireActual( '@react-navigation/native' ),
	useNavigation: () => mockNavigation
} ) );

describe( 'useAddFlightWireframe', () => {
	let rootStore;
	let navigation;
	let modalService;
	let actionSheetService;
	let snackbarService;
	let analyticsService;
	const previousScreen = 'previous screen';

	beforeEach( () => {
		rootStore = mockUseRootStore();
		navigation = mockNavigation;
		modalService = mockUseModalService();
		actionSheetService = mockUseActionSheetService();
		snackbarService = mockUseSnackbarService();
		analyticsService = mockUseAnalyticsService();
	} );

	it( 'returns an instance of AddFlightPresenter', () => {
		const { result } = renderHook( () => useAddFlightWireframe( { previousScreen } ) );

		expect( result.current ).toBeInstanceOf( AddFlightPresenter );

		expect( AddFlightPresenter ).toHaveBeenCalledWith( {
			getCurrentPilotFromStore: expect.any( GetCurrentPilotFromStore ),
			fetchAircraftFlights: expect.any( FetchAircraftFlights ),
			getFlightTrack: expect.any( GetFlightTrack ),
			deleteAircraft: expect.any( DeleteAircraft ),
			previousScreen,
			navigation,
			modalService,
			actionSheetService,
			snackbarService,
			analyticsService,
			makeAutoObservable
		} );

		expect( FetchAircraftFlights ).toHaveBeenCalledWith( {
			service: expect.any( FlightService )
		} );

		expect( GetFlightTrack ).toHaveBeenCalledWith( {
			service: expect.any( FlightService )
		} );

		expect( DeleteAircraft ).toHaveBeenCalledWith( {
			service: expect.any( AircraftService ),
			pilotStore: rootStore.pilotStore
		} );

		expect( FlightService ).toHaveBeenCalledWith( {
			api: expect.any( Api ),
			basePath: 'flights',
			buildEntity: expect.any( FlightBuilder ).build
		} );

		expect( AircraftService ).toHaveBeenCalledWith( {
			api: expect.any( Api ),
			basePath: 'pilots/me/aircrafts',
			buildEntity: Aircraft.fromJSON
		} );

		expect( FlightBuilder ).toHaveBeenCalledWith( {
			aircraftStore: rootStore.aircraftStore, flightStore: rootStore.flightStore
		} );

		expect( Api ).toHaveBeenCalledWith( {
			authenticationStore: rootStore.authenticationStore
		} );

		expect( GetCurrentPilotFromStore ).toHaveBeenCalledWith( {
			store: rootStore.pilotStore
		} );
	} );
} );
