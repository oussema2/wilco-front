import FetchUnreadNotificationCountFromRemote from '../../interactors/FetchUnreadNotificationCountFromRemote';
import NotificationStore from '../../stores/NotificationStore';

describe( 'FetchUnreadNotificationCountFromRemote', () => {
	let interactor;
	const service = { getUnreadNotifications: jest.fn() };
	const store = new NotificationStore( );

	beforeEach( () => {
		jest.clearAllMocks();
		interactor = new FetchUnreadNotificationCountFromRemote( { store, service } );
	} );

	describe( '@execute()', () => {
		it( 'fetches count from service and puts it in the store', async () => {
			const expectedResponse = {
				'unread_number': 9
			};
			service.getUnreadNotifications.mockReturnValueOnce( expectedResponse );
			await interactor.execute();
			expect( store.unreadNotificationCount ).toBe( 9 );
		} );
	} );
} );
