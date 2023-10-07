import PilotFactory from '../factories/PilotFactory';
import AirportService from '../../services/AirportService';
import Pilot from '../../entities/Pilot';

describe( 'AirportService', () => {
	let service;
	const basePath = 'pilots/me/airports';
	const pilot = PilotFactory.build();
	const buildEntity = Pilot.fromJSON;
	const api = {
		post: jest.fn( () => Promise.resolve( pilot.toJSON() ) )
	};
	const dependencies = { api, basePath, buildEntity };

	beforeEach( () => {
		jest.clearAllMocks();
		service = new AirportService( dependencies );
	} );

	describe( '@update()', () => {
		const params = {
			preferredAirports: [ 'EZE', 'MAD' ]
		};
		const expectedUrl = '1/pilots/me/airports';
		const expectedParams = {
			preferred_airport_names: [ 'EZE', 'MAD' ]
		};

		it( 'updates the preferred airports', async () => {
			await service.update( params );
			expect( api.post ).toHaveBeenCalledWith( expectedUrl, expectedParams );
		} );

		it( 'returns the pilot airports', async () => {
			const result = await service.update( params );
			expect( result ).toEqual( pilot.airports );
		} );
	} );
} );
