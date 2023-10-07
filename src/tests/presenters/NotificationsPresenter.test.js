import GetEntitiesFromStore from '../../interactors/GetEntitiesFromStore';
import NotificationStore from '../../stores/NotificationStore';
import MockRootStore from '../mocks/MockRootStore';
import NotificationsPresenter from '../../presenters/NotificationsPresenter';
import NotificationPresenter from '../../presenters/NotificationPresenter';
import NotificationFactory from '../factories/NotificationFactory';
import PaginationFactory from '../factories/PaginationFactory';
import flushPromises from '../support/flushPromises';
import { NOTIFICATIONS_TABS } from '../../constants/NotificationsTabs';
import { NOTIFICATIONS_TYPES } from '../../constants/NotificationsTypes';
import GetNotificationsByTypeFromStore from '../../interactors/GetNotificationsByTypeFromStore';

describe( 'NotificationsPresenter', () => {
	const fetchNotificationsFromRemote = {
		execute: jest.fn(),
		setPagination: jest.fn(),
		resetPagination: jest.fn()
	};
	const store = new NotificationStore();
	const getNotificationsFromStore = new GetEntitiesFromStore( { store } );
	const getNotificationsByTypeFromStore = new GetNotificationsByTypeFromStore( { store } );
	const clearUnreadNotifications = { execute: jest.fn() };
	const makeAutoObservable = jest.fn();
	const rootStore = new MockRootStore();
	const navigation = { push: jest.fn() };
	const snackbarService = { showError: jest.fn() };
	let presenter;

	beforeEach( () => {
		jest.clearAllMocks();
		presenter = new NotificationsPresenter( {
			fetchNotificationsFromRemote,
			getNotificationsFromStore,
			getNotificationsByTypeFromStore,
			rootStore,
			clearUnreadNotifications,
			navigation,
			snackbarService,
			makeAutoObservable
		} );
	} );

	describe( 'constructor()', () => {
		describe( 'without pagination', () => {
			it( 'initializes with the correct data', () => {
				expect( presenter.fetchNotificationsFromRemote ).toEqual( fetchNotificationsFromRemote );
				expect( presenter.getNotificationsFromStore ).toEqual( getNotificationsFromStore );
				expect( presenter.clearUnreadNotifications ).toEqual( clearUnreadNotifications );
				expect( presenter.navigation ).toEqual( navigation );
				expect( presenter.snackbarService ).toEqual( snackbarService );
				expect( presenter.clearUnreadNotifications.execute ).toHaveBeenCalled();
				expect( presenter.rootStore ).toEqual( rootStore );
				expect( makeAutoObservable ).toHaveBeenCalledWith( presenter );
			} );
		} );

		describe( 'with pagination', () => {
			beforeEach( () => {
				jest.clearAllMocks();
				const pagination = PaginationFactory.build();
				fetchNotificationsFromRemote.pagination = pagination;
				presenter = new NotificationsPresenter( {
					fetchNotificationsFromRemote,
					getNotificationsFromStore,
					rootStore,
					clearUnreadNotifications,
					makeAutoObservable
				} );
			} );

			it( 'initializes with the correct data', () => {
				expect( presenter.fetchNotificationsFromRemote ).toEqual( fetchNotificationsFromRemote );
				expect( presenter.getNotificationsFromStore ).toEqual( getNotificationsFromStore );
				expect( presenter.clearUnreadNotifications ).toEqual( clearUnreadNotifications );
				expect( presenter.clearUnreadNotifications.execute ).toHaveBeenCalled();
				expect( presenter.rootStore ).toEqual( rootStore );
				expect( makeAutoObservable ).toHaveBeenCalledWith( presenter );
			} );
		} );
	} );

	describe( '@notificationPresenters()', () => {
		const notifications = NotificationFactory.buildList( 3 );
		beforeEach( () => {
			store.entities = notifications;
		} );

		const sortedNotifications = notifications.sort( ( a, b ) => b.id - a.id );

		it( 'returns the notificationPresenters', () => {
			presenter.notificationPresenters.forEach( ( notificationPresenter, index ) => {
				expect( notificationPresenter.notification )
					.toEqual( sortedNotifications[ index ] );
				expect( notificationPresenter ).toBeInstanceOf( NotificationPresenter );
			} );
		} );
	} );

	describe( '@mentionNotificationPresenters()', () => {
		const notifications = NotificationFactory
			.buildList( 3, { notificationType: NOTIFICATIONS_TYPES.mention } );

		beforeEach( () => {
			store.entities = notifications;
		} );

		const sortedNotifications = notifications
			.filter( ( entity ) => entity.notificationType === NOTIFICATIONS_TYPES.mention )
			.sort( ( a, b ) => b.id - a.id );

		it( 'returns the mentionNotificationPresenters', () => {
			presenter.mentionNotificationPresenters.forEach( ( notificationPresenter, index ) => {
				expect( notificationPresenter.notification )
					.toEqual( sortedNotifications[ index ] );
				expect( notificationPresenter ).toBeInstanceOf( NotificationPresenter );
			} );
		} );
	} );

	describe( '@hasAnyNotification()', () => {
		describe( 'with notifications', () => {
			beforeEach( () => {
				const notifications = NotificationFactory.buildList( 3 );
				store.entities = notifications;
			} );

			it( 'returns true', () => {
				expect( presenter.hasAnyNotification ).toBeTruthy( );
			} );
		} );

		describe( 'without notifications', () => {
			beforeEach( () => {
				store.entities = [];
			} );

			it( 'returns false', () => {
				expect( presenter.hasAnyNotification ).toBeFalsy( );
			} );
		} );
	} );

	describe( '@hasAnyMention()', () => {
		describe( 'with mentions', () => {
			beforeEach( () => {
				const notifications = NotificationFactory
					.buildList( 3, { notificationType: NOTIFICATIONS_TYPES.mention } );
				store.entities = notifications;
			} );

			it( 'returns true', () => {
				expect( presenter.hasAnyMention ).toBeTruthy( );
			} );
		} );

		describe( 'without mentions', () => {
			beforeEach( () => {
				const notifications = NotificationFactory
					.buildList( 3, { notificationType: NOTIFICATIONS_TYPES.like } );
				store.entities = notifications;
			} );

			it( 'returns false', () => {
				expect( presenter.hasAnyMention ).toBeFalsy( );
			} );
		} );
	} );

	describe( '@mustShowEmptyState()', () => {
		describe( 'with notifications', () => {
			beforeEach( () => {
				const notifications = NotificationFactory.buildList( 3 );
				store.entities = notifications;
			} );

			describe( 'when the app is loading notifications', () => {
				beforeEach( () => {
					presenter.listPresenter.loading = true;
				} );

				it( 'returns false', () => {
					expect( presenter.mustShowEmptyState ).toBeFalsy( );
				} );
			} );

			describe( 'when the app finished to load notifications', () => {
				beforeEach( () => {
					presenter.listPresenter.loading = false;
				} );

				it( 'returns false', () => {
					expect( presenter.mustShowEmptyState ).toBeFalsy( );
				} );
			} );
		} );

		describe( 'without notifications', () => {
			beforeEach( () => {
				store.entities = [];
			} );

			describe( 'when the app is loading notifications', () => {
				beforeEach( () => {
					presenter.listPresenter.loading = true;
				} );

				it( 'returns false', () => {
					expect( presenter.mustShowEmptyState ).toBeFalsy( );
				} );
			} );

			describe( 'when the app finished to load notifications', () => {
				beforeEach( () => {
					presenter.listPresenter.loading = false;
				} );

				it( 'returns true', () => {
					expect( presenter.mustShowEmptyState ).toBeTruthy( );
				} );
			} );
		} );
	} );

	describe( '@mustShowEmptyStateMentions()', () => {
		describe( 'with mentions', () => {
			beforeEach( () => {
				const notifications = NotificationFactory
					.buildList( 5, { notificationType: NOTIFICATIONS_TYPES.mention } );
				store.entities = notifications;
			} );

			describe( 'when the app is loading notifications', () => {
				beforeEach( () => {
					presenter.listPresenter.loading = true;
				} );

				it( 'returns false', () => {
					expect( presenter.mustShowEmptyStateMentions ).toBeFalsy( );
				} );
			} );

			describe( 'when the app finished to load mentions', () => {
				beforeEach( () => {
					presenter.listPresenter.loading = false;
				} );

				it( 'returns false', () => {
					expect( presenter.mustShowEmptyStateMentions ).toBeFalsy( );
				} );
			} );
		} );

		describe( 'without mentions', () => {
			beforeEach( () => {
				const notifications = NotificationFactory
					.buildList( 3, { notificationType: NOTIFICATIONS_TYPES.like } );
				store.entities = notifications;
			} );

			describe( 'when the app is loading mentions', () => {
				beforeEach( () => {
					presenter.listPresenter.loading = true;
				} );

				it( 'returns false', () => {
					expect( presenter.mustShowEmptyStateMentions ).toBeFalsy( );
				} );
			} );

			describe( 'when the app finished to load mentions', () => {
				beforeEach( () => {
					presenter.listPresenter.loading = false;
				} );

				it( 'returns true', () => {
					expect( presenter.mustShowEmptyStateMentions ).toBeTruthy( );
				} );
			} );
		} );
	} );

	describe( '@placeholderNotificationsText()', () => {
		it( 'returns the empty state text for all notifications', () => {
			const expectedText = "You don't have notifications yet. \n"
					+ 'When you have them, they will appear here.';

			expect( presenter.placeholderNotificationsText ).toEqual( expectedText );
		} );
	} );

	describe( '@placeholderMentionsText()', () => {
		it( 'returns the empty state text for mentions', () => {
			const expectedText = 'You have not been mentioned yet. \n'
				+ 'When someone mentions you, \n'
				+ 'it will appear here.';

			expect( presenter.placeholderMentionsText ).toEqual( expectedText );
		} );
	} );

	describe( '@onRefresh()', () => {
		it( 'calls the fetchNotificationsFromRemote interactor', () => {
			presenter.onRefresh();
			expect( presenter.fetchNotificationsFromRemote.resetPagination ).toHaveBeenCalledTimes( 1 );
			expect( presenter.fetchNotificationsFromRemote.execute ).toHaveBeenCalled();
		} );
	} );

	describe( '@isRefreshing()', () => {
		describe( 'when the app is refreshing the notification list', () => {
			it( 'returns true', () => {
				presenter.onRefresh();
				expect( presenter.isRefreshing ).toBeTruthy();
			} );
		} );

		describe( 'when the app finished to refreshing the notification list', () => {
			it( 'returns false', async () => {
				await flushPromises();
				expect( presenter.isRefreshing ).toBeFalsy();
			} );
		} );
	} );

	describe( '@updateScreen()', () => {
		describe( 'when the app is refreshing', () => {
			it( 'resets pagination', () => {
				presenter.updateScreen();
				expect( fetchNotificationsFromRemote.execute ).toHaveBeenCalled();
			} );
		} );
	} );

	describe( '@setTabIndex()', () => {
		describe( 'when user press on inactive tab', () => {
			it( 'changes current tab index', () => {
				presenter.setTabIndex( NOTIFICATIONS_TABS.mentions.index );
				expect( presenter.tabIndex ).toBe( NOTIFICATIONS_TABS.mentions.index );
			} );
		} );
	} );

	describe( '@handleLoadMore()', () => {
		describe( 'when user go to the end of the list', () => {
			describe( 'when exists more notifications to load', () => {
				beforeEach( () => {
					fetchNotificationsFromRemote.pagination.isLastPage = false;
				} );

				it( 'gets more notifications from ws', () => {
					presenter.handleLoadMore();
					expect( fetchNotificationsFromRemote.execute ).toHaveBeenCalled();
				} );
			} );

			describe( 'when does not exists more notifications to load', () => {
				beforeEach( () => {
					fetchNotificationsFromRemote.pagination.isLastPage = true;
				} );

				it( 'does nothing', () => {
					presenter.handleLoadMore();
					expect( fetchNotificationsFromRemote.execute ).not.toHaveBeenCalled();
				} );
			} );
		} );
	} );
} );
