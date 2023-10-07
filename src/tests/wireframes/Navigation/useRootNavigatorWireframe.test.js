import { renderHook } from '@testing-library/react-hooks';
import mockUseRootStore from '../../mocks/mockUseRootStore';
import RootNavigatorPresenter from '../../../presenters/Navigation/RootNavigatorPresenter';
import useRootNavigatorWireframe from '../../../wireframes/Navigation/useRootNavigatorWireframe';
import FetchCurrentPilotFromRemote from '../../../interactors/FetchCurrentPilotFromRemote';
import EntityService from '../../../services/EntityService';
import Api from '../../../services/Api';
import PushNotificationsService from '../../../services/PushNotificationsService';
import PilotBuilder from '../../../builders/PilotBuilder';
import mockUseAnalyticsService from '../../mocks/mockUseAnalyticsService';

jest.mock( '../../../interactors/FetchCurrentPilotFromRemote' );
jest.mock( '../../../services/EntityService' );
jest.mock( '../../../services/Api' );
jest.mock( '../../../services/PushNotificationsService' );
jest.mock( '../../../builders/PilotBuilder' );
jest.mock( '../../../navigation/RootNavigation', () => ( {} ) );
jest.mock( '@react-native-firebase/auth', () => ( {
	auth: jest.fn( () => {} )
} ) );
jest.mock( '@react-native-firebase/messaging', () => () => ( {
	onNotificationOpenedApp: () => jest.fn(),
	getInitialNotification: () => Promise.resolve()
} ) );
describe( 'useRootNavigatorWireframe', () => {
	let rootStore;
	let navigation;
	let analyticsService;

	beforeEach( () => {
		rootStore = mockUseRootStore();
		analyticsService = mockUseAnalyticsService();
		navigation = {};
	} );

	it( 'returns an instance of RootNavigatorPresenter', () => {
		const { result } = renderHook( () => useRootNavigatorWireframe() );

		expect( result.current ).toBeInstanceOf( RootNavigatorPresenter );
		expect( result.current.authenticationStore ).not.toBeNull();
		expect( result.current.fetchPilot ).toBeInstanceOf( FetchCurrentPilotFromRemote );
		expect( result.current.pushNotificationsService ).toBeInstanceOf( PushNotificationsService );
	} );

	it( 'correctly creates the dependencies', () => {
		renderHook( () => useRootNavigatorWireframe() );

		expect( FetchCurrentPilotFromRemote ).toHaveBeenCalledWith( {
			service: expect.any( EntityService ),
			store: rootStore.pilotStore
		} );
		expect( PilotBuilder ).toHaveBeenCalledWith( {
			aircraftStore: rootStore.aircraftStore
		} );
		expect( Api ).toHaveBeenCalledWith( {
			authenticationStore: rootStore.authenticationStore
		} );

		expect( PushNotificationsService ).toHaveBeenCalledWith( {
			notificationStore: rootStore.notificationStore,
			navigation,
			analyticsService
		} );
	} );
} );
