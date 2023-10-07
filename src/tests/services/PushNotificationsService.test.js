import PushNotificationsService from '../../services/PushNotificationsService';
import NotificationFactory from '../factories/NotificationFactory';

describe( 'PushNotificationsService', () => {
	const mockMessaging = {
		requestPermission: jest.fn(),
		onNotificationOpenedApp: jest.fn(),
		getInitialNotification: jest.fn(),
		getToken: jest.fn()
	};
	const messaging = () => ( mockMessaging );

	const storageService = {
		getInt: jest.fn(),
		setInt: jest.fn()
	};

	const navigation = {
		navigate: jest.fn(),
		dispatch: jest.fn()
	};

	const notificationStore = {
		setUnreadCount: jest.fn()
	};

	let service;

	beforeEach( () => {
		jest.clearAllMocks();
		service = new PushNotificationsService( {
			messaging, storageService, navigation, notificationStore
		} );
	} );

	describe( '@initialize()', () => {
		it( 'requests user permission to display notifications', async () => {
			await service.initialize();
			expect( mockMessaging.requestPermission ).toHaveBeenCalledTimes( 1 );
		} );

		it( 'subscribes to the app opened from notification event', async () => {
			await service.initialize();

			expect( mockMessaging.onNotificationOpenedApp ).toHaveBeenCalledTimes( 1 );
		} );

		describe( 'when the app was opened from a notification', () => {
			it( 'triggers a navigation', async () => {
				mockMessaging.getInitialNotification.mockReturnValueOnce( 'a notification' );
				await service.initialize();
				const notification = NotificationFactory.build( );
				notification.navigate( navigation );
				expect( navigation.dispatch ).toHaveBeenCalled();
			} );
		} );

		describe( 'when the app wasn\'t opened from a notification', () => {
			it( 'doesn\'t trigger any navigation', async () => {
				await service.initialize();
				expect( navigation.navigate ).not.toHaveBeenCalled();
			} );
		} );
	} );

	describe( '@getToken()', () => {
		it( 'returns the firebase registration token', async () => {
			const token = 'registration token';
			mockMessaging.getToken.mockResolvedValueOnce( token );

			const result = await service.getToken();

			expect( result ).toBe( token );
		} );
	} );
} );
