import NotificationService from '../../services/NotificationService';

describe( 'NotificationService', () => {
	let service;
	const api = {
		put: jest.fn(),
		delete: jest.fn(),
		get: jest.fn()
	};
	const dependencies = { api };

	beforeEach( () => {
		jest.clearAllMocks();
		service = new NotificationService( dependencies );
	} );

	describe( 'constructor()', () => {
		it( 'initializes with the provided values', () => {
			expect( service.api ).toBe( dependencies.api );
		} );
	} );

	describe( '@putFirebaseToken()', () => {
		const token = 'firebaseRegistrationToken';

		it( 'registers the provided token', async () => {
			await service.putFirebaseToken( token );
			expect( api.put ).toHaveBeenCalledWith( '1/users/me/device', { device: { token } } );
		} );
	} );

	describe( '@deleteFirebaseToken()', () => {
		const token = 'firebaseRegistrationToken';

		it( 'deletes the token', async () => {
			await service.deleteFirebaseToken( token );
			expect( api.delete ).toHaveBeenCalledWith( '1/users/me/device' );
		} );
	} );

	describe( '@getUnreadNotifications()', () => {
		it( 'gets unread notifications count', async () => {
			await service.getUnreadNotifications();
			expect( api.get ).toHaveBeenCalledWith( '1/pilots/me/unread_number' );
		} );
	} );
} );
