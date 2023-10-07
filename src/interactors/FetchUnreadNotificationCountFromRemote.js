export default class FetchUnreadNotificationCountFromRemote {
	constructor( { store, service } ) {
		this.store = store;
		this.service = service;
	}

	async execute() {
		const count = await this._fetchFromService();
		this._putInStore( count );
		return count;
	}

	async _fetchFromService() {
		const response = await this.service.getUnreadNotifications();
		return response?.unread_number;
	}

	_putInStore( count ) {
		this.store.setUnreadCount( count );
	}
}
