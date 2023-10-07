import { renderHook } from '@testing-library/react-hooks';
import MainTabNavigatorPresenter from '../../../presenters/Navigation/MainTabNavigatorPresenter';
import useMainTabNavigatorWireframe from '../../../wireframes/Navigation/useMainTabNavigatorWireframe';
import mockUseRootStore from '../../mocks/mockUseRootStore';
import FetchUnreadNotificationCountFromRemote from '../../../interactors/FetchUnreadNotificationCountFromRemote';
import GetUnreadNotificationCountFromStore from '../../../interactors/GetUnreadNotificationCountFromStore';
import SubscribeToPushNotifications from '../../../interactors/SubscribeToPushNotifications';
import PushNotificationsService from '../../../services/PushNotificationsService';
import NotificationService from '../../../services/NotificationService';
import Api from '../../../services/Api';
import NotificationBuilder from '../../../builders/NotificationBuilder';
import ChatService from '../../../services/ChatService';

jest.mock( '../../../interactors/FetchUnreadNotificationCountFromRemote' );
jest.mock( '../../../interactors/GetUnreadNotificationCountFromStore' );
jest.mock( '../../../interactors/SubscribeToPushNotifications' );
jest.mock( '../../../interactors/GetCurrentPilotFromStore' );
jest.mock( '../../../services/NotificationService' );
jest.mock( '../../../services/Api' );

describe( 'useMainTabNavigatorWireframe', () => {
	let rootStore;

	beforeEach( () => {
		rootStore = mockUseRootStore();
	} );

	it( 'returns an instance of MainTabNavigatorPresenter', () => {
		const { result } = renderHook( () => useMainTabNavigatorWireframe() );

		expect( result.current ).toBeInstanceOf( MainTabNavigatorPresenter );
		expect( result.current.fetchUnreadNotificationCountFromRemote ).toBeInstanceOf(
			FetchUnreadNotificationCountFromRemote
		);
		expect( result.current.getUnreadNotificationCountFromStore ).toBeInstanceOf(
			GetUnreadNotificationCountFromStore
		);
		expect( result.current.subscribeToPushNotifications ).toBeInstanceOf(
			SubscribeToPushNotifications
		);
		expect( result.current.chatService ).toBeInstanceOf(
			ChatService
		);

		expect( FetchUnreadNotificationCountFromRemote ).toHaveBeenCalledWith( {
			store: rootStore.notificationStore,
			service: expect.any( NotificationService )
		} );

		expect( GetUnreadNotificationCountFromStore ).toHaveBeenCalledWith( {
			store: rootStore.notificationStore
		} );

		expect( SubscribeToPushNotifications ).toHaveBeenCalledWith( {
			pushNotificationsService: expect.any( PushNotificationsService ),
			notificationService: expect.any( NotificationService )
		} );

		expect( NotificationService ).toHaveBeenCalledWith( {
			api: expect.any( Api ),
			basePath: 'pilots/me/notifications',
			buildEntity: expect.any( NotificationBuilder ).build
		} );

		expect( Api ).toHaveBeenCalledWith( {
			authenticationStore: rootStore.authenticationStore
		} );
	} );
} );
