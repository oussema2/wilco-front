import { mapAircraftRequestError } from './Helpers/aircrafts';

export default class CreateAircraft {
	constructor( { aircraftStore, pilotStore, aircraftService } ) {
		this.aircraftStore = aircraftStore;
		this.pilotStore = pilotStore;
		this.aircraftService = aircraftService;
	}

	async execute( params ) {
		try {
			const aircraft = await this._createAircraft( params );
			this._addAircraftToCurrentPilot( aircraft );
			return aircraft;
		} catch ( error ) {
			throw mapAircraftRequestError( error );
		}
	}

	_createAircraft( params ) {
		return this.aircraftService.create( params );
	}

	_addAircraftToCurrentPilot( aircraft ) {
		const storedAircraft = this.aircraftStore.update( aircraft );
		this.pilotStore.currentPilot.addAircraft( storedAircraft );
	}
}
