import FlightService from '../../services/FlightService';

describe( 'FlightService', () => {
	const api = {
		get: jest.fn()
	};
	const buildEntity = jest.fn( ( x ) => x );
	const basePath = 'flights';
	let service;

	beforeEach( () => {
		jest.clearAllMocks();
		service = new FlightService( { api, buildEntity, basePath } );
	} );

	describe( '@fetchAllNested', () => {
		const nestedEntityName = 'aircrafts';
		const nestedEntityId = 7;
		const flightsResponse = [ { id: 1 }, { id: 2 } ];

		beforeEach( () => {
			api.get.mockResolvedValueOnce( flightsResponse );
		} );

		it( 'fetches latest flights', async () => {
			const expectedFlights = flightsResponse.map(
				( flight ) => ( { ...flight, aircraft_id: 7 } )
			);
			const flights = await service.fetchAllNested( nestedEntityName, nestedEntityId );

			expect( api.get ).toHaveBeenCalledWith( '1/aircrafts/7/latest_flights' );
			expect( buildEntity ).toHaveBeenCalledTimes( 2 );
			expect( flights ).toEqual( expectedFlights );
		} );
	} );

	describe( '@fetchFlightTrack', () => {
		const externalId = 8;
		const trackJSON = { track_base_64: 'base64string' };

		beforeEach( () => {
			api.get.mockResolvedValueOnce( trackJSON );
		} );

		it( 'fetches the flight\'s track', async () => {
			const track = await service.fetchFlightTrack( { externalId } );

			expect( api.get ).toHaveBeenCalledWith( '1/flights/8/track?width=390&height=270' );
			expect( track.trackBase64 ).toBe( trackJSON.track_base_64 );
		} );
	} );
} );
