export default class UpdatePilot {
	constructor( { store, service } ) {
		this.store = store;
		this.service = service;
	}

	async execute( entityId, params ) {
		const entity = await this._updateInService( entityId, params );
		this._putInStore( entity );
		this.store.currentPilot.setCertificates( entity.certificates );
		this.store.currentPilot.setRatings( entity.ratings );
		this.store.currentPilot.setRoles( entity.roles );
		return entity;
	}

	_updateInService( entityId, params ) {
		return this.service.patch( entityId, params );
	}

	_putInStore( entity ) {
		this.store.update( entity );
	}
}
