import firebaseMessaging from '@react-native-firebase/messaging';
import Notification from '../entities/Notification';

export default class PushNotificationsService {
	constructor( {
		messaging = firebaseMessaging,
		navigation,
		notificationStore,
		fetchPostsFromRemote,
		analyticsService
	} = {} ) {
		this.messaging = messaging;
		this.notificationStore = notificationStore;
		this.fetchPostsFromRemote = fetchPostsFromRemote;
		this.navigation = navigation;
		this.analyticsService = analyticsService;
	}

	initialize() {
		this._requestUserPermission();
		this._setOnAppOpenedFromBackgroundNotificationHandler();
		this._handleInitialNotification();
	}

	async getToken() {
		return this.messaging().getToken();
	}

	_requestUserPermission() {
		this.messaging().requestPermission();
	}

	_setOnAppOpenedFromBackgroundNotificationHandler() {
		this.messaging().onNotificationOpenedApp(
			async ( message ) => this._navigateToNotificationLocation( message )
		);
	}

	async _handleInitialNotification() {
		const initialNotification = await this.messaging().getInitialNotification();
		if ( initialNotification ) {
			this._navigateToNotificationLocation( initialNotification );
		}
	}

	async _navigateToNotificationLocation( message ) {
		try {
			const data = JSON.parse( message?.data?.json );
			const notification = Notification.fromJSON( data );
			notification.navigate( this.navigation );
			this.analyticsService.logOpenPushNotification( { type: data?.type } );
		} catch ( e ) {
		}
	}
}
