import Pilot from '../entities/Pilot';

export default class PilotBuilder {
	constructor( { aircraftStore } ) {
		this.aircraftStore = aircraftStore;
	}

	getStoredAircraft( aircraft ) {
		return this.aircraftStore.update( aircraft );
	}

	build = ( pilotJson ) => {
		const pilot = Pilot.fromJSON( pilotJson );
		pilot.aircrafts = pilot.aircrafts.map( ( aircraft ) => this.getStoredAircraft( aircraft ) );
		this._setStoredAircraftToLatestFlights( pilot );
		return pilot;
	}

	_setStoredAircraftToLatestFlights( pilot ) {
		pilot.latestFlights?.forEach( this._setAircraftToPostFlight );
	}

	_setAircraftToPostFlight = ( flight ) => {
		if ( this._hasAircraft( flight ) ) {
			flight.aircraft = this.getStoredAircraft( flight.aircraft ) || flight.aircraft;
		}
	}

	_hasAircraft( flight ) {
		return flight?.aircraft;
	}
}
