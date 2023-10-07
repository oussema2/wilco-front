import DateToDisplay from './ToDisplay/DateToDisplay';

export default class NotificationPresenter {
	constructor( {
		notification,
		navigation,
		analyticsService,
		makeAutoObservable
	} = {} ) {
		this.notification = notification;
		this.navigation = navigation;
		this.analyticsService = analyticsService;

		makeAutoObservable( this );
	}

	get dateToDisplay() {
		return new DateToDisplay( { date: this.notification.createdAt } ).displayShort;
	}

	get notificationAction() {
		return this.notification.notificationAction;
	}

	get pilotName() {
		return this.notification.pilotName;
	}

	get notificationPictureSource() {
		return this.notification.pilotProfilePictureThumbnailSource;
	}

	notificationWasPressed = () => {
		this.notification.navigate( this.navigation );
		this.analyticsService.logOpenPushNotification( { type: this.notification?.notificationType } );
	}
}
