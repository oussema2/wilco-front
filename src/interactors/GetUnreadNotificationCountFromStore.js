export default class GetUnreadNotificationCountFromStore {
	constructor( { store } ) {
		this.store = store;
	}

	execute() {
		return this.store.unreadNotificationCount;
	}
}
