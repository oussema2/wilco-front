import EntityService from './EntityService';
import FlightAwareTrack from '../entities/FlightAwareTrack';

export default class FlightService extends EntityService {
	async fetchAllNested( nestedEntityName, nestedEntityId ) {
		const path = `${this.apiVersion}/${nestedEntityName}/${nestedEntityId}/latest_flights`;
		const flightsResponse = await this.api.get( path );
		return flightsResponse
			.map( ( flightJSON ) => ( { ...flightJSON, aircraft_id: nestedEntityId } ) )
			.map( ( flightJSON ) => this.buildEntity( flightJSON ) );
	}

	async fetchFlightTrack( { externalId } ) {
		const entityResponse = await this.api.get( `${this.baseEntityPath}/${externalId}/track?width=390&height=270` );
		return FlightAwareTrack.fromJSON( entityResponse );
	}
}
