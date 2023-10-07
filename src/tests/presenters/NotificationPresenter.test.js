import NotificationFactory from '../factories/NotificationFactory';
import NotificationPresenter from '../../presenters/NotificationPresenter';
import DateToDisplay from '../../presenters/ToDisplay/DateToDisplay';

describe( 'NotificationPresenter', () => {
	let presenter;
	const notification = NotificationFactory.build();
	const makeAutoObservable = jest.fn();
	const navigation = { navigate: jest.fn(), push: jest.fn(), dispatch: jest.fn() };
	const analyticsService = { logOpenPushNotification: jest.fn() };

	beforeEach( () => {
		presenter = new NotificationPresenter( {
			notification,
			navigation,
			analyticsService,
			makeAutoObservable
		} );
	} );

	describe( 'constructor()', () => {
		it( 'initializes with the correct data', () => {
			expect( presenter.notification ).toEqual( notification );

			expect( makeAutoObservable ).toHaveBeenCalledWith( presenter );
		} );
	} );

	describe( '@dateToDisplay()', () => {
		const expectedDate = new DateToDisplay( { date: notification.createdAt } ).displayShort;
		it( 'returns the notification dateToDisplay', () => {
			expect( presenter.dateToDisplay ).toEqual( expectedDate );
		} );
	} );

	describe( '@notificationAction', () => {
		it( 'returns the notification\'s text', () => {
			expect( presenter.notificationAction ).toBe( notification.notificationAction );
		} );
	} );

	describe( '@pilotName', () => {
		it( 'returns the pilot\'s name', () => {
			expect( presenter.pilotName ).toBe( notification.pilotName );
		} );
	} );

	describe( '@notificationPictureSource()', () => {
		it( 'returns the notification picture', () => {
			expect( presenter.notificationPictureSource ).toEqual(
				notification.pilotProfilePictureThumbnailSource
			);
		} );
	} );

	describe( '@notificationWasPressed', () => {
		it( 'navigates to the post detail screen', () => {
			presenter.notificationWasPressed();

			expect( navigation.dispatch ).toHaveBeenCalledTimes( 1 );
		} );

		it( 'logs the notification pressed event', () => {
			presenter.notificationWasPressed();

			expect( analyticsService.logOpenPushNotification )
				.toHaveBeenCalledWith( { type: notification.notificationType } );
		} );
	} );
} );
