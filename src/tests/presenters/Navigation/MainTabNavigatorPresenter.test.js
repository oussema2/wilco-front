import MainTabNavigatorPresenter from '../../../presenters/Navigation/MainTabNavigatorPresenter';
import NotificationStore from '../../../stores/NotificationStore';
import GetUnreadNotificationCountFromStore
	from '../../../interactors/GetUnreadNotificationCountFromStore';
import FetchUnreadNotificationCountFromRemote
	from '../../../interactors/FetchUnreadNotificationCountFromRemote';
import PilotFactory from '../../factories/PilotFactory';

describe( 'MainTabNavigatorPresenter', () => {
	const makeAutoObservable = jest.fn();
	const notificationStore = new NotificationStore();
	const fetchUnreadNotificationCountFromRemote = new FetchUnreadNotificationCountFromRemote( {
		store: notificationStore,
		service: { getUnreadNotifications: jest.fn().mockReturnValue( { unread_number: 5 } ) }
	} );
	const subscribeToPushNotifications = { execute: jest.fn() };
	const pilot = PilotFactory.build();
	const getCurrentPilotFromStore = { execute: jest.fn().mockReturnValue( pilot ) };
	const chatService = { login: jest.fn(), logout: jest.fn() };

	const getUnreadNotificationCountFromStore = new GetUnreadNotificationCountFromStore( {
		store: notificationStore
	} );

	let presenter;

	beforeEach( () => {
		jest.clearAllMocks();
		presenter = new MainTabNavigatorPresenter( {
			fetchUnreadNotificationCountFromRemote,
			getUnreadNotificationCountFromStore,
			subscribeToPushNotifications,
			getCurrentPilotFromStore,
			chatService,
			makeAutoObservable
		} );
	} );

	describe( 'constructor()', () => {
		it( 'creates the presenter with the correct data', () => {
			expect( makeAutoObservable ).toHaveBeenCalledWith( presenter );
			expect( subscribeToPushNotifications.execute ).toHaveBeenCalledTimes( 1 );
		} );
	} );

	describe( '@postFlightButtonWasPressed()', () => {
		const navigation = {
			navigate: jest.fn()
		};

		it( 'navigates to the PostText screen', () => {
			presenter.postFlightButtonWasPressed( { navigation } );
			expect( navigation.navigate ).toHaveBeenCalledWith( 'CreatePostStack' );
		} );
	} );

	describe( '@unreadNotificationCount', () => {
		describe( 'when there are no unread notifications', () => {
			it( 'returns undefined', () => {
				notificationStore.setUnreadCount( 0 );
				const count = presenter.unreadNotificationCount;
				expect( count ).toBeUndefined();
			} );
		} );

		describe( 'when there are unread notifications', () => {
			it( 'returns the amount of unread notifications', () => {
				notificationStore.setUnreadCount( 1 );
				const count = presenter.unreadNotificationCount;
				expect( count ).toBe( 1 );
			} );
		} );
	} );

	describe( '@updateUnreadNotificationCount()', () => {
		it( 'fetches unread notification count', async () => {
			await presenter.updateUnreadNotificationCount();
			const count = presenter.unreadNotificationCount;
			expect( count ).toBe( 5 );
		} );
	} );

	describe( 'onMount', () => {
		it( 'logs into the chat service', () => {
			presenter.onMount();

			expect( chatService.login ).toHaveBeenCalledWith( pilot );
		} );
	} );

	describe( 'onUmount', () => {
		test( 'logs out of the chat service', () => {
			presenter.onUnmount();

			expect( chatService.logout ).toHaveBeenCalled();
		} );
	} );
} );
