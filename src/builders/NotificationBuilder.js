import Notification from '../entities/Notification';

export default class NotificationBuilder {
	constructor( { pilotStore } ) {
		this.pilotStore = pilotStore;
	}

	getStoredPilot( pilot ) {
		return this.pilotStore.update( pilot );
	}

	build = ( notificationJson ) => {
		const notification = Notification.fromJSON( notificationJson );
		notification.pilot = this.getStoredPilot( notification.pilot );
		return notification;
	}
}
