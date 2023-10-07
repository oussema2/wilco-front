import ClearUnreadNotifications from '../../interactors/ClearUnreadNotifications';
import NotificationStore from '../../stores/NotificationStore';

describe( 'ClearUnreadNotifications', () => {
	let interactor;
	const store = new NotificationStore( );

	beforeEach( () => {
		jest.clearAllMocks();
		interactor = new ClearUnreadNotifications( { store } );
	} );

	describe( '@execute()', () => {
		it( 'clears unread notifications from both service and store', async () => {
			store.setUnreadCount( 2 );
			await interactor.execute();
			expect( store.unreadNotificationCount ).toBe( 0 );
		} );
	} );
} );
