import SubscribeToPushNotifications from '../../interactors/SubscribeToPushNotifications';

describe( 'SubscribeToPushNotifications', () => {
	let interactor;
	const pushNotificationsService = { getToken: jest.fn() };
	const notificationService = { putFirebaseToken: jest.fn() };

	beforeEach( () => {
		jest.clearAllMocks();
		interactor = new SubscribeToPushNotifications( {
			pushNotificationsService, notificationService
		} );
	} );

	describe( '@execute()', () => {
		it( 'gets the token and posts it to the notification service', async () => {
			const token = 'test token';
			pushNotificationsService.getToken.mockResolvedValueOnce( token );
			notificationService.putFirebaseToken.mockResolvedValueOnce();

			await interactor.execute();

			expect( notificationService.putFirebaseToken ).toHaveBeenCalledWith( token );
		} );
	} );
} );
