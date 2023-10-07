export default class GetNotificationsByTypeFromStore {
	constructor( { store } ) {
		this.store = store;
	}

	execute( type ) {
		return this.entities.filter( ( entity ) => entity.notificationType === type );
	}

	get entities() {
		return this.store.all;
	}
}
