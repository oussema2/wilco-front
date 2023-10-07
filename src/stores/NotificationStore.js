import {
	makeObservable, action, observable
} from 'mobx';
import EntityStore from './EntityStore';

export default class NotificationStore extends EntityStore {
	constructor() {
		super();
		this.unreadNotificationCount = 0;

		makeObservable( this, {
			setUnreadCount: action,
			unreadNotificationCount: observable
		} );
	}

	setUnreadCount( count ) {
		this.unreadNotificationCount = count;
	}

	incrementUnreadCount() {
		this.setUnreadCount( this.unreadNotificationCount + 1 );
	}

	decrementUnreadCount() {
		this.setUnreadCount( Math.max( 0, this.unreadNotificationCount - 1 ) );
	}

	deleteNotificationsByPilotId( pilotId ) {
		this.entities = this.entities.filter( ( entity ) => entity.pilot.id !== pilotId );
	}
}
