import { renderHook } from '@testing-library/react-hooks';
import { makeAutoObservable } from 'mobx';
import mockUseRootStore from '../mocks/mockUseRootStore';
import mockUseModalService from '../mocks/mockUseModalService';
import mockUseSnackbarService from '../mocks/mockUseSnackbarService';
import usePreferencesWireframe from '../../wireframes/usePreferencesWireframe';
import PreferencesPresenter from '../../presenters/PreferencesPresenter';
import GetCurrentPilotFromStore from '../../interactors/GetCurrentPilotFromStore';
import UpdatePilotAirports from '../../interactors/UpdatePilotAirports';
import mockUseAnalyticsService from '../mocks/mockUseAnalyticsService';

jest.mock( '../../presenters/PreferencesPresenter' );
jest.mock( '../../interactors/GetCurrentPilotFromStore' );
jest.mock( '../../interactors/UpdatePilotAirports' );
jest.mock( 'mobx' );

const mockNavigation = {};
jest.mock( '@react-navigation/native', () => ( {
	...jest.requireActual( '@react-navigation/native' ),
	useNavigation: () => mockNavigation
} ) );

describe( 'usePreferencesWireframe', () => {
	let rootStore;
	let modalService;
	let snackbarService;
	let navigation;
	let analyticsService;

	beforeEach( () => {
		rootStore = mockUseRootStore();
		modalService = mockUseModalService();
		snackbarService = mockUseSnackbarService();
		analyticsService = mockUseAnalyticsService();
		navigation = mockNavigation;
	} );

	it( 'returns an instance of PreferencesPresenter', () => {
		const { result } = renderHook( () => usePreferencesWireframe() );

		expect( result.current ).toBeInstanceOf( PreferencesPresenter );
		expect( PreferencesPresenter ).toHaveBeenCalledWith( {
			makeAutoObservable,
			rootStore,
			navigation,
			modalService,
			snackbarService,
			analyticsService,
			getCurrentPilotFromStore: expect.any( GetCurrentPilotFromStore ),
			updatePilotAirports: expect.any( UpdatePilotAirports )
		} );
	} );
} );
