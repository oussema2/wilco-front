import GetUnreadNotificationCountFromStore from '../../interactors/GetUnreadNotificationCountFromStore';
import NotificationStore from '../../stores/NotificationStore';

describe( 'GetUnreadNotificationCountFromStore', () => {
	let interactor;
	const store = new NotificationStore();

	beforeEach( () => {
		interactor = new GetUnreadNotificationCountFromStore( { store } );
	} );

	describe( '@execute()', () => {
		it( 'returns the unread notification count', () => {
			store.setUnreadCount( 3 );
			const result = interactor.execute();
			expect( result ).toBe( 3 );
		} );
	} );
} );
