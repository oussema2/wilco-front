import NotificationStore from '../../stores/NotificationStore';
import PilotFactory from '../factories/PilotFactory';
import NotificationFactory from '../factories/NotificationFactory';

describe( 'NotificationStore', () => {
	let store;

	beforeEach( () => {
		store = new NotificationStore( );
	} );

	describe( '@unreadNotificationCount', () => {
		it( 'returns the unread notification count', () => {
			expect( store.unreadNotificationCount ).toBe( 0 );
		} );
	} );

	describe( '@setUnreadCount', () => {
		it( 'sets the unread notification count', () => {
			store.setUnreadCount( 9 );
			expect( store.unreadNotificationCount ).toBe( 9 );
		} );
	} );

	describe( '@incrementUnreadCount', () => {
		it( 'increments the unread notification count', () => {
			store.incrementUnreadCount();
			expect( store.unreadNotificationCount ).toBe( 1 );
		} );
	} );

	describe( '@decrementUnreadCount', () => {
		it( 'increments the unread notification count', () => {
			store.setUnreadCount( 3 );
			store.decrementUnreadCount();
			expect( store.unreadNotificationCount ).toBe( 2 );
		} );

		it( 'doesn\'t decrement past 0', () => {
			store.setUnreadCount( 0 );
			store.decrementUnreadCount();
			expect( store.unreadNotificationCount ).toBe( 0 );
		} );
	} );

	describe( '@deleteNotificationsByPilotId', () => {
		it( 'deletes notifications from a pilot', () => {
			const currentPilot = PilotFactory.build();
			const otherPilot = PilotFactory.build();
			const notificationFromPilot = NotificationFactory.build( { pilot: currentPilot } );
			const notificationFromOtherPilot = NotificationFactory.build( { pilot: otherPilot } );

			store.update( notificationFromPilot );
			store.update( notificationFromOtherPilot );

			store.deleteNotificationsByPilotId( otherPilot.id );
			expect( store.entities.length ).toBe( 1 );
			expect( store.entities[ 0 ] ).toBe( notificationFromPilot );
		} );
	} );
} );
