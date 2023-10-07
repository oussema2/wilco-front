import { renderHook } from '@testing-library/react-hooks';
import { makeAutoObservable } from 'mobx';
import EditAircraftPresenter from '../../presenters/EditAircraftPresenter';
import useEditAircraftWireframe from '../../wireframes/useEditAircraftWireframe';
import mockUseRootStore from '../mocks/mockUseRootStore';
import mockUseSnackbarService from '../mocks/mockUseSnackbarService';
import mockUseModalService from '../mocks/mockUseModalService';
import Api from '../../services/Api';
import AircraftService from '../../services/AircraftService';
import GetEntityFromStore from '../../interactors/GetEntityFromStore';
import UpdateAircraft from '../../interactors/UpdateAircraft';
import Aircraft from '../../entities/Aircraft';
import mockUseAnalyticsService from '../mocks/mockUseAnalyticsService';

jest.mock( '../../presenters/EditAircraftPresenter' );
jest.mock( '../../services/Api' );
jest.mock( '../../services/AircraftService' );
jest.mock( '../../interactors/GetEntityFromStore' );
jest.mock( '../../interactors/UpdateAircraft' );
jest.mock( 'mobx' );

const mockNavigation = {};
jest.mock( '@react-navigation/native', () => ( {
	...jest.requireActual( '@react-navigation/native' ),
	useNavigation: () => mockNavigation
} ) );

describe( 'useEditAircraftWireframe', () => {
	let root;
	let snackbarService;
	let modalService;
	let analyticsService;
	let navigation;
	const aircraftId = 1;
	const previousScreen = 'previous screen';

	beforeEach( () => {
		root = mockUseRootStore();
		snackbarService = mockUseSnackbarService();
		analyticsService = mockUseAnalyticsService();
		modalService = mockUseModalService();
		navigation = mockNavigation;
	} );

	it( 'returns an instance of EditAircraftPresenter', () => {
		const { result } = renderHook( () => useEditAircraftWireframe( {
			aircraftId, previousScreen
		} ) );

		expect( result.current ).toBeInstanceOf( EditAircraftPresenter );
		expect( EditAircraftPresenter ).toHaveBeenCalledWith( {
			aircraftId,
			previousScreen,
			getAircraftFromStore: expect.any( GetEntityFromStore ),
			updateAircraft: expect.any( UpdateAircraft ),
			navigation,
			snackbarService,
			analyticsService,
			modalService,
			makeAutoObservable
		} );
		expect( GetEntityFromStore ).toHaveBeenCalledWith( {
			store: root.aircraftStore
		} );
		expect( UpdateAircraft ).toHaveBeenCalledWith( {
			store: root.aircraftStore, service: expect.any( AircraftService )
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
