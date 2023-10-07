import GetFlightTrack from '../../interactors/GetFlightTrack';
import FlightFactory from '../factories/FlightFactory';
import FlightAwareTrackFactory from '../factories/FlightAwareTrackFactory';

describe( 'GetFlightTrack', () => {
	let getFlightTrack;
	const service = {
		fetchFlightTrack: jest.fn()
	};
	const flight = FlightFactory.build();
	const track = FlightAwareTrackFactory.build();

	beforeEach( () => {
		jest.clearAllMocks();
		getFlightTrack = new GetFlightTrack( { service } );
	} );

	describe( '@execute()', () => {
		it( 'fetches the track for the given flight', async () => {
			service.fetchFlightTrack.mockResolvedValueOnce( track );

			await getFlightTrack.execute( { flight } );

			expect( service.fetchFlightTrack ).toHaveBeenCalledWith( {
				externalId: flight.externalId
			} );
			expect( flight.track ).toBe( track );
		} );
	} );
} );
