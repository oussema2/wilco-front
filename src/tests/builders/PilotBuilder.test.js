import PilotBuilder from '../../builders/PilotBuilder';
import PilotFactory from '../factories/PilotFactory';
import AircraftFactory from '../factories/AircraftFactory';
import Pilot from '../../entities/Pilot';
import PostFlightFactory from '../factories/PostFlightFactory';

describe( 'PilotBuilder', () => {
	let builder;
	const pilot = PilotFactory.build();
	const latestFlights = [
		PostFlightFactory.build()
	];
	pilot.latestFlights = latestFlights;
	const pilotJSON = pilot.toJSON();
	const aircraftStore = { update: jest.fn() };

	beforeEach( () => {
		jest.clearAllMocks();
		builder = new PilotBuilder( { aircraftStore } );
	} );

	describe( 'build', () => {
		const buildPilot = () => builder.build( pilotJSON );

		it( 'returns a pilot instance', () => {
			expect( buildPilot() ).toBeInstanceOf( Pilot );
		} );

		it( 'makes the pilot\'s aircraft reference their store', () => {
			const storedAircraft = AircraftFactory.build();
			aircraftStore.update.mockReturnValueOnce( storedAircraft );

			const result = buildPilot();

			expect( result.aircrafts[ 0 ] ).toEqual( storedAircraft );
			expect( aircraftStore.update ).toHaveBeenCalledWith( pilot.aircrafts[ 0 ] );
		} );

		it( 'makes the aircraft of the latest flights reference their store', () => {
			const storedAircraft = latestFlights[ 0 ].aircraft;
			aircraftStore.update.mockReturnValueOnce( storedAircraft );

			const result = buildPilot();

			expect( result.latestFlights[ 0 ].aircraft ).toEqual( storedAircraft );
			expect( aircraftStore.update ).toHaveBeenCalledWith( pilot.latestFlights[ 0 ].aircraft );
		} );
	} );
} );
