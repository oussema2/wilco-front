import { makeAutoObservable } from 'mobx';
import Pilot from './Pilot';
import { NotificationTypeFactory } from '../factories/NotificationTypeFactory';
import { NOTIFICATIONS_TYPES } from '../constants/NotificationsTypes';

export default class Notification {
	constructor( {
		id,
		type,
		createdAt,
		postId,
		pilot,
		notificationType
	} ) {
		this.id = id;
		this.type = type;
		this.createdAt = createdAt;
		this.pilot = pilot;
		this.postId = postId;
		this.notificationType = notificationType;

		makeAutoObservable( this );
	}

	get notificationAction() {
		return this.type.action();
	}

	get pilotName() {
		return this.pilot.name;
	}

	get pilotProfilePictureThumbnailSource() {
		return this.pilot.profilePictureThumbnailSource;
	}

	toJSON() {
		const pilot = this.pilot.toJSON();

		return {
			id: this.id,
			type: this.type,
			created_at: this.createdAt,
			postId: this.postId,
			notifiable: { pilot }
		};
	}

	navigate( navigation ) {
		this.type.navigate( navigation, this );
	}

	static fromJSON( data ) {
		let pilot = {};

		if ( data.type !== NOTIFICATIONS_TYPES.newPreferredPost ) {
			pilot = data.notifiable.pilot && Pilot.fromJSON( data.notifiable.pilot );
		}

		const type = NotificationTypeFactory.build( data.type );

		const postId = type.getPostId( data.notifiable );

		return new Notification( {
			id: data.id,
			type,
			createdAt: new Date( data.created_at ),
			postId,
			pilot,
			notificationType: data.type
		} );
	}
}
