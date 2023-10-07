import { renderHook } from '@testing-library/react-hooks';
import { makeAutoObservable } from 'mobx';
import NotificationsPresenter from '../../presenters/NotificationsPresenter';
import useNotificationsWireframe from '../../wireframes/useNotificationsWireframe';
import FetchEntitiesFromRemote from '../../interactors/FetchEntitiesFromRemote';
import GetEntitiesFromStore from '../../interactors/GetEntitiesFromStore';
import NotificationService from '../../services/NotificationService';
import Api from '../../services/Api';
import mockUseRootStore from '../mocks/mockUseRootStore';
import ClearUnreadNotifications from '../../interactors/ClearUnreadNotifications';
import NotificationBuilder from '../../builders/NotificationBuilder';
import GetNotificationsByTypeFromStore from '../../interactors/GetNotificationsByTypeFromStore';
import mockUseAnalyticsService from '../mocks/mockUseAnalyticsService';

jest.mock( '../../presenters/NotificationsPresenter' );
jest.mock( '../../interactors/FetchEntitiesFromRemote' );
jest.mock( '../../interactors/GetEntitiesFromStore' );
jest.mock( '../../interactors/ClearUnreadNotifications' );
jest.mock( '../../interactors/GetNotificationsByTypeFromStore' );
jest.mock( '../../services/NotificationService' );
jest.mock( '../../services/Api' );
jest.mock( '../../builders/NotificationBuilder' );

const mockNavigation = {};
const useFocusEffect = {};
jest.mock( '@react-navigation/native', () => ( {
	...jest.requireActual( '@react-navigation/native' ),
	useNavigation: () => mockNavigation,
	useFocusEffect: () => useFocusEffect
} ) );

describe( 'useNotificationsWireframe', () => {
	let rootStore;
	let navigation;
	let analyticsService;

	beforeEach( () => {
		rootStore = mockUseRootStore();
		navigation = mockNavigation;
		analyticsService = mockUseAnalyticsService();
	} );

	it( 'returns an instance of NotificationsPresenter', () => {
		const { result } = renderHook( () => useNotificationsWireframe() );

		expect( result.current ).toBeInstanceOf( NotificationsPresenter );
		expect( NotificationsPresenter ).toHaveBeenCalledWith( {
			fetchNotificationsFromRemote: expect.any( FetchEntitiesFromRemote ),
			getNotificationsFromStore: expect.any( GetEntitiesFromStore ),
			clearUnreadNotifications: expect.any( ClearUnreadNotifications ),
			getNotificationsByTypeFromStore: expect.any( GetNotificationsByTypeFromStore ),
			navigation,
			rootStore,
			analyticsService,
			makeAutoObservable
		} );

		expect( FetchEntitiesFromRemote ).toHaveBeenCalledWith( {
			store: rootStore.notificationStore,
			service: expect.any( NotificationService )
		} );

		expect( GetEntitiesFromStore ).toHaveBeenCalledWith( {
			store: rootStore.notificationStore
		} );

		expect( ClearUnreadNotifications ).toHaveBeenCalledWith( {
			store: rootStore.notificationStore
		} );

		expect( NotificationService ).toHaveBeenCalledWith( {
			api: expect.any( Api ),
			basePath: 'pilots/me/notifications',
			buildEntity: expect.any( NotificationBuilder ).build
		} );

		expect( NotificationBuilder ).toHaveBeenCalledWith( {
			pilotStore: rootStore.pilotStore
		} );

		expect( Api ).toHaveBeenCalledWith( {
			authenticationStore: rootStore.authenticationStore
		} );
	} );
} );
