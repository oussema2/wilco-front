import { values } from 'lodash';
import NotificationPresenterBuilder from './Builders/NotificationPresenterBuilder';
import ListPresenter from './ListPresenter';
import { NOTIFICATIONS_TABS } from '../constants/NotificationsTabs';
import { NOTIFICATIONS_TYPES } from '../constants/NotificationsTypes';
import { NewPreferredPostNotificationType } from '../entities/NewPreferredPostNotificationType';

export default class NotificationsPresenter {
	tabIndex = NOTIFICATIONS_TABS.all.index;

	constructor( {
		makeAutoObservable,
		fetchNotificationsFromRemote,
		getNotificationsFromStore,
		getNotificationsByTypeFromStore,
		clearUnreadNotifications,
		navigation,
		snackbarService,
		rootStore,
		analyticsService
	} = {} ) {
		this.fetchNotificationsFromRemote = fetchNotificationsFromRemote;
		this.getNotificationsFromStore = getNotificationsFromStore;
		this.getNotificationsByTypeFromStore = getNotificationsByTypeFromStore;
		this.clearUnreadNotifications = clearUnreadNotifications;
		this.rootStore = rootStore;
		this.navigation = navigation;
		this.snackbarService = snackbarService;
		this.analyticsService = analyticsService;

		this.listPresenter = new ListPresenter( {
			fetchFromRemote: fetchNotificationsFromRemote,
			fetchFromRemoteCallback: this._fetchFromRemoteCallback,
			snackbarService,
			makeAutoObservable
		} );

		makeAutoObservable( this );

		this._clearUnreadNotifications();
	}

	setTabIndex( index ) {
		this.tabIndex = index;
	}

	get notificationPresenters() {
		const filteredNotifications = this._notifications.filter(
			( notification ) => !( notification.type instanceof NewPreferredPostNotificationType )
		);
		return filteredNotifications.map( ( notification ) => NotificationPresenterBuilder.build( {
			notification,
			navigation: this.navigation,
			analyticsService: this.analyticsService
		} ) );
	}

	get hasAnyNotification() {
		return this.notificationPresenters?.length > 0;
	}

	get hasAnyMention() {
		return this.mentionNotificationPresenters?.length > 0;
	}

	get mentionNotificationPresenters() {
		return this._mentionNotifications.map( ( notification ) => (
			NotificationPresenterBuilder.build( {
				notification,
				navigation: this.navigation,
				analyticsService: this.analyticsService
			} )
		) );
	}

	onRefresh() {
		this.listPresenter.onRefresh();
	}

	handleLoadMore() {
		this.listPresenter.handleLoadMore();
	}

	get isRefreshing() {
		return this.listPresenter.isRefreshing;
	}

	get isLoading() {
		return this.listPresenter.isLoading;
	}

	get mustShowEmptyState() {
		return !this.isLoading && !this.hasAnyNotification;
	}

	get mustShowEmptyStateMentions() {
		return !this.isLoading && !this.hasAnyMention;
	}

	get placeholderNotificationsText() {
		return "You don't have notifications yet. \n"
				+ 'When you have them, they will appear here.';
	}

	get placeholderMentionsText() {
		return 'You have not been mentioned yet. \n'
			+ 'When someone mentions you, \n'
			+ 'it will appear here.';
	}

	get _notifications() {
		return this.getNotificationsFromStore.execute().slice()
			.sort( ( a, b ) => b.id - a.id );
	}

	get _mentionNotifications() {
		return this.getNotificationsByTypeFromStore.execute( NOTIFICATIONS_TYPES.mention ).slice()
			.sort( ( a, b ) => b.id - a.id );
	}

	_clearUnreadNotifications() {
		this.clearUnreadNotifications.execute();
	}

	updateScreen() {
		this.listPresenter.pagination.reset();
		this.listPresenter.fetchData();
		this._clearUnreadNotifications();
	}

	_fetchFromRemoteCallback = async () => {
		await this.fetchNotificationsFromRemote.execute( this._paramsByType );
	};

	get _paramsByType() {
		return values( NOTIFICATIONS_TABS )[ this.tabIndex ].filterParams;
	}
}
