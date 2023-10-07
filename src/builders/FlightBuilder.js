import Flight from '../entities/Flight';

export default class FlightBuilder {
	constructor( { aircraftStore, flightStore } ) {
		this.aircraftStore = aircraftStore;
		this.flightStore = flightStore;
	}

	getStoredAircraft( aircraftId ) {
		return this.aircraftStore.find( aircraftId );
	}

	build = ( flightJson ) => {
		const flight = this.flightStore.update( Flight.fromJSON( flightJson ) );
		const aircraft = this.getStoredAircraft( flight.aircraftId );
		aircraft.addFlight( flight );
		return flight;
	}
}
