import NotificationBuilder from '../../builders/NotificationBuilder';
import NotificationFactory from '../factories/NotificationFactory';
import PilotFactory from '../factories/PilotFactory';
import Notification from '../../entities/Notification';

describe( 'NotificationBuilder', () => {
	let builder;
	const notification = NotificationFactory.build();
	const notificationJSON = notification.toJSON();
	const pilotStore = { update: jest.fn() };

	beforeEach( () => {
		jest.clearAllMocks();
		builder = new NotificationBuilder( { pilotStore } );
	} );

	describe( 'build', () => {
		const buildNotification = () => builder.build( notificationJSON );

		it( 'returns a notification instance', () => {
			expect( buildNotification() ).toBeInstanceOf( Notification );
		} );

		it( 'makes the notification\'s pilot reference their store', () => {
			const storedPilot = PilotFactory.build();
			pilotStore.update.mockReturnValueOnce( storedPilot );

			const result = buildNotification();

			expect( result.pilot ).toEqual( storedPilot );
			expect( pilotStore.update ).toHaveBeenCalledWith( notification.pilot );
		} );
	} );
} );
