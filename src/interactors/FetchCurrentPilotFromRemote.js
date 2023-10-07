export default class FetchCurrentPilotFromRemote {
	constructor( { store, service } ) {
		this.store = store;
		this.service = service;
	}

	async execute() {
		const entity = await this._fetchFromService();
		this._putInStore( entity );
		return entity;
	}

	_fetchFromService() {
		return this.service.fetch( 'me' );
	}

	_putInStore( entity ) {
		this.store.update( entity );
		this.store.setCurrentPilotId( entity.id );
	}
}
