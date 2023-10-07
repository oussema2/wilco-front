export default class FetchAircraftFlights {
	constructor( { service } ) {
		this.service = service;
	}

	execute( aircraft ) {
		return this._fetchFromService( aircraft );
	}

	_fetchFromService( aircraft ) {
		return this.service.fetchAllNested( 'aircrafts', aircraft.id );
	}
}
