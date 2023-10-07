export default class GetFlightTrack {
	constructor( { service } ) {
		this.service = service;
	}

	async execute( { flight } ) {
		const track = await this._fetchTrack( flight );
		flight.addTrack( track );
	}

	_fetchTrack( flight ) {
		return this.service.fetchFlightTrack( { externalId: flight.externalId } );
	}
}
