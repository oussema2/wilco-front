import EntityService from './EntityService';

export default class AircraftService extends EntityService {
	async create( { makeAndModel, tailNumber, base64Picture } ) {
		const aircraftResponse = await this.api.post(
			this.baseEntityPath,
			this._buildAircraftBody( { makeAndModel, tailNumber, base64Picture } )
		);
		return this.buildEntity( aircraftResponse );
	}

	async remove( aircraftId ) {
		const aircraftResponse = await this.api.post( `1/aircrafts/${aircraftId}/remove` );
		return this.buildEntity( aircraftResponse );
	}

	async patch( aircraftId, { makeAndModel, tailNumber, base64Picture } ) {
		const aircraftResponse = await this.api.patch(
			`1/aircrafts/${aircraftId}`,
			this._buildAircraftBody( { makeAndModel, tailNumber, base64Picture } )
		);
		return this.buildEntity( aircraftResponse );
	}

	_buildAircraftBody( { makeAndModel, tailNumber, base64Picture } ) {
		return {
			aircraft: {
				make_and_model: makeAndModel,
				tail_number: tailNumber,
				base_64_picture: base64Picture
			}
		};
	}
}
