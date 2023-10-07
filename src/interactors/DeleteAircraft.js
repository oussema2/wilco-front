export default class DeleteAircraft {
	constructor( { service, pilotStore } ) {
		this.service = service;
		this.pilotStore = pilotStore;
	}

	async execute( aircraftId ) {
		await this.service.remove( aircraftId );
		this.pilotStore.currentPilot.removeAircraft( aircraftId );
	}
}
