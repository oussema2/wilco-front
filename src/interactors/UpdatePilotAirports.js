export default class UpdatePilotAirports {
	constructor( { store, service } ) {
		this.store = store;
		this.service = service;
	}

	async execute( params ) {
		const airports = await this._updateInService( params );
		this.store.currentPilot.setAirports( airports );
	}

	_updateInService( params ) {
		return this.service.update( params );
	}
}
