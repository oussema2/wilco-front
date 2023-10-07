import EntityService from './EntityService';

export default class AirportService extends EntityService {
	async update( { preferredAirports } ) {
		const params = { preferred_airport_names: preferredAirports };
		const preferencesResponse = await this.api.post( this.baseEntityPath, params );
		return preferencesResponse.airports;
	}
}
