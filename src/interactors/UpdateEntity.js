export default class UpdateEntity {
	constructor( { store, service } ) {
		this.store = store;
		this.service = service;
	}

	async execute( entityId, params ) {
		const entity = await this._updateInService( entityId, params );
		this._putInStore( entity );
		return entity;
	}

	_updateInService( entityId, params ) {
		return this.service.patch( entityId, params );
	}

	_putInStore( entity ) {
		this.store.update( entity );
	}
}
