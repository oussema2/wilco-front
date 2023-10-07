import AircraftService from '../../services/AircraftService';
import Aircraft from '../../entities/Aircraft';
import AircraftFactory from '../factories/AircraftFactory';

describe( 'AircraftService', () => {
	let service;
	const basePath = 'pilots/me/aircrafts';
	const aircraft = AircraftFactory.build();
	const buildEntity = Aircraft.fromJSON;
	const api = {
		post: jest.fn( () => Promise.resolve( aircraft.toJSON() ) ),
		patch: jest.fn( () => Promise.resolve( aircraft.toJSON() ) )
	};
	const dependencies = { api, basePath, buildEntity };

	beforeEach( () => {
		jest.clearAllMocks();
		service = new AircraftService( dependencies );
	} );

	describe( '@create()', () => {
		const params = {
			makeAndModel: 'make and model',
			tailNumber: '123fds',
			base64Picture: 'picture'
		};
		const expectedUrl = '1/pilots/me/aircrafts';
		const expectedParams = {
			aircraft: {
				make_and_model: params.makeAndModel,
				tail_number: params.tailNumber,
				base_64_picture: params.base64Picture
			}
		};

		it( 'creates the aircraft', async () => {
			await service.create( params );
			expect( api.post ).toHaveBeenCalledWith( expectedUrl, expectedParams );
		} );
	} );

	describe( '@remove', () => {
		const aircraftId = 4;
		const expectedUrl = `1/aircrafts/${aircraftId}/remove`;

		it( 'removes the aircraft', async () => {
			await service.remove( aircraftId );
			expect( api.post ).toHaveBeenCalledWith( expectedUrl );
		} );
	} );

	describe( '@patch()', () => {
		const aircraftId = 4;
		const params = {
			makeAndModel: 'make and model',
			tailNumber: '123fds',
			base64Picture: 'picture'
		};
		const expectedUrl = `1/aircrafts/${aircraftId}`;
		const expectedParams = {
			aircraft: {
				make_and_model: params.makeAndModel,
				tail_number: params.tailNumber,
				base_64_picture: params.base64Picture
			}
		};

		it( 'updates the aircraft', async () => {
			await service.patch( aircraftId, params );
			expect( api.patch ).toHaveBeenCalledWith( expectedUrl, expectedParams );
		} );

		it( 'returns the aircraft entity built from the response', async () => {
			const result = await service.patch( aircraftId, params );
			expect( result ).toEqual( aircraft );
		} );
	} );
} );
