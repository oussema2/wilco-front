import AUTHENTICATED_ROUTES from '../../navigation/AuthenticatedRoutes';
import { UPDATE_UNREAD_NOTIFICATION_COUNT_TIMEOUT } from '../../constants/theme';

export default class MainTabNavigatorPresenter {
	getUnreadNotificationFromRemoteTimer;

	constructor( {
		fetchUnreadNotificationCountFromRemote,
		getUnreadNotificationCountFromStore,
		subscribeToPushNotifications,
		getCurrentPilotFromStore,
		chatService,
		makeAutoObservable
	} = {} ) {
		this.getUnreadNotificationCountFromStore = getUnreadNotificationCountFromStore;
		this.fetchUnreadNotificationCountFromRemote = fetchUnreadNotificationCountFromRemote;
		this.subscribeToPushNotifications = subscribeToPushNotifications;
		this.getCurrentPilotFromStore = getCurrentPilotFromStore;
		this.chatService = chatService;

		makeAutoObservable( this );

		this._subscribeToPushNotifications();
	}

	get unreadNotificationCount() {
		return this.getUnreadNotificationCountFromStore.execute() || undefined;
	}

	async updateUnreadNotificationCount() {
		await this.fetchUnreadNotificationCountFromRemote.execute();
	}

	postFlightButtonWasPressed = ( { navigation } ) => (
		navigation.navigate( AUTHENTICATED_ROUTES.postTextStack.name )
	);

	_subscribeToPushNotifications() {
		try {
			this.subscribeToPushNotifications.execute();
		} catch ( e ) {}
	}

	get _currentPilot() {
		return this.getCurrentPilotFromStore.execute();
	}

	onForeground = () => {
		this.updateUnreadNotificationCount();
		this.getUnreadNotificationFromRemoteTimer = setInterval(
			() => this.updateUnreadNotificationCount(), UPDATE_UNREAD_NOTIFICATION_COUNT_TIMEOUT
		);
	}

	onBackground = () => {
		clearInterval( this.getUnreadNotificationFromRemoteTimer );
	}

	onMount = () => {
		this.onForeground();
		this.chatService.login( this._currentPilot );
	}

	onUnmount = () => {
		this.onBackground();
		this.chatService.logout();
	}
}
