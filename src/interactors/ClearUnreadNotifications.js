export default class ClearUnreadNotifications {
	constructor( { store } ) {
		this.store = store;
	}

	async execute() {
		this._clearFromStore();
	}

	_clearFromStore() {
		this.store.setUnreadCount( 0 );
	}
}
