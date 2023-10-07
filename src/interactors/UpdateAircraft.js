import UpdateEntity from './UpdateEntity';
import { mapAircraftRequestError } from './Helpers/aircrafts';

export default class UpdateAircraft extends UpdateEntity {
	async execute( aircraftId, params ) {
		try {
			const updatedAircraft = await super.execute( aircraftId, params );
			return updatedAircraft;
		} catch ( error ) {
			throw mapAircraftRequestError( error );
		}
	}
}
