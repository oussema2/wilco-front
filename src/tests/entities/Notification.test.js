import Notification from '../../entities/Notification';
import Pilot from '../../entities/Pilot';
import NotificationFactory from '../factories/NotificationFactory';
import { NotificationTypeFactory } from '../../factories/NotificationTypeFactory';

describe( 'Notification entity', () => {
	describe( '@notificationAction', () => {
		describe( 'when is for a comment', () => {
			const type = NotificationTypeFactory.build( 'comment' );
			const notification = NotificationFactory.build( { type } );

			it( 'returns the correct action', () => {
				expect( notification.notificationAction ).toEqual( 'commented on your post' );
			} );
		} );

		describe( 'when is for a like', () => {
			const type = NotificationTypeFactory.build( 'like' );
			const notification = NotificationFactory.build( { type } );

			it( 'returns the correct action', () => {
				expect( notification.notificationAction ).toEqual( 'liked your post' );
			} );
		} );

		describe( 'when is for a mention', () => {
			const type = NotificationTypeFactory.build( 'mention' );
			const notification = NotificationFactory.build( { type } );

			it( 'returns the correct action', () => {
				expect( notification.notificationAction ).toEqual( 'mentioned you on a post' );
			} );
		} );
	} );

	describe( '@pilotName', () => {
		const notification = NotificationFactory.build();

		it( 'returns the name', () => {
			expect( notification.pilotName ).toEqual( notification.pilot.name );
		} );
	} );

	describe( '@pilotProfilePictureThumbnailSource()', () => {
		const notification = NotificationFactory.build();
		it( 'returns the pilot profile picture', () => {
			expect( notification.pilotProfilePictureThumbnailSource ).toEqual(
				notification.pilot.profilePictureThumbnailSource
			);
		} );
	} );

	describe( 'fromJSON', () => {
		const pilotJSON = { id: 1, first_name: 'Wilco', last_name: 'Test' };
		const pilot = Pilot.fromJSON( pilotJSON );

		const notificationJSON = {
			id: 1,
			type: 'comment',
			created_at: '2021-06-02T10:05:22.230Z',
			notifiable: { pilot: pilotJSON, post_id: 229 }
		};
		const notification = Notification.fromJSON( notificationJSON );

		const type = NotificationTypeFactory.build( 'like' );

		it( 'creates the notification with the correct properties', () => {
			expect( notification.id ).toEqual( 1 );
			expect( notification.type ).toEqual( type );
			expect( notification.createdAt ).toEqual( new Date( '2021-06-02T10:05:22.230Z' ) );
			expect( notification.postId ).toEqual( 229 );
			expect( notification.pilot ).toEqual( pilot );
			expect( notification.pilot ).toBeInstanceOf( Pilot );
		} );
	} );

	describe( 'toJSON', () => {
		const notification = NotificationFactory.build();
		const json = notification.toJSON();
		const type = NotificationTypeFactory.build( 'like' );

		it( 'returns the notification\'s json', () => {
			expect( json ).toEqual( {
				id: notification.id,
				type,
				created_at: notification.createdAt,
				postId: notification.postId,
				notifiable: { pilot: notification.pilot.toJSON() }
			} );
		} );
	} );
} );
