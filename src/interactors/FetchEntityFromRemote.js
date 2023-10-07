export default class FetchEntityFromRemote {
	constructor( { store, service } ) {
		this.store = store;
		this.service = service;
	}

	async execute( entityId ) {
		const entity = await this._fetchFromService( entityId );
		this._putInStore( entity );
		return entity;
	}

	_fetchFromService( entityId ) {
		return this.service.fetch( entityId );
	}

	_putInStore( entity ) {
		this.store.update( entity );
	}
}
