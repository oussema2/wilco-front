import FetchAircraftFlights from '../../interactors/FetchAircraftFlights';
import AircraftFactory from '../factories/AircraftFactory';

describe( 'FetchAircraftFlights', () => {
	const service = { fetchAllNested: jest.fn() };
	let fetchAircraftFlights;

	beforeEach( () => {
		jest.clearAllMocks();
		fetchAircraftFlights = new FetchAircraftFlights( { service } );
	} );

	describe( '@execute()', () => {
		const aircraft = AircraftFactory.build();

		it( 'fetches the flights', async () => {
			await fetchAircraftFlights.execute( aircraft );

			expect( service.fetchAllNested ).toHaveBeenCalledWith( 'aircrafts', aircraft.id );
		} );
	} );
} );
