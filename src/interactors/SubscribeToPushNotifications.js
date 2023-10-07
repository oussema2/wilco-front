export default class SubscribeToPushNotifications {
	constructor( { pushNotificationsService, notificationService } ) {
		this.pushNotificationsService = pushNotificationsService;
		this.notificationService = notificationService;
	}

	async execute() {
		const token = await this._getToken();
		await this._postToken( token );
	}

	async _getToken() {
		return this.pushNotificationsService.getToken();
	}

	async _postToken( token ) {
		this.notificationService.putFirebaseToken( token );
	}
}
