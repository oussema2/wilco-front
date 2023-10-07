import DeleteAircraft from '../../interactors/DeleteAircraft';
import AircraftFactory from '../factories/AircraftFactory';
import PilotFactory from '../factories/PilotFactory';

describe( 'DeleteAircraft', () => {
	const service = {
		remove: jest.fn()
	};
	const aircraft = AircraftFactory.build( {} );
	const currentPilot = PilotFactory.build( { aircrafts: [ aircraft ] } );
	const pilotStore = { currentPilot };
	let deleteAircraft;

	beforeEach( () => {
		jest.clearAllMocks();
		deleteAircraft = new DeleteAircraft( { service, pilotStore } );
	} );

	describe( '@execute()', () => {
		it( 'removes the aircraft through the service', async () => {
			await deleteAircraft.execute( aircraft.id );
			expect( service.remove ).toHaveBeenCalledWith( aircraft.id );
		} );

		it( 'removes the aircraft from the store\'s current pilot', async () => {
			await deleteAircraft.execute( aircraft.id );
			expect( currentPilot.aircrafts ).toEqual( [] );
		} );
	} );
} );
