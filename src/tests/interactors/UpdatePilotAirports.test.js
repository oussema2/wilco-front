import PilotFactory from '../factories/PilotFactory';
import PilotStore from '../../stores/PilotStore';
import UpdatePilotAirports from '../../interactors/UpdatePilotAirports';

describe( 'UpdatePilotAirports', () => {
	let updatePilot;
	const service = { update: jest.fn() };
	const store = new PilotStore();
	const currentPilot = PilotFactory.build( );
	store.setCurrentPilotId( currentPilot.id );

	beforeEach( () => {
		updatePilot = new UpdatePilotAirports( { store, service } );
	} );

	describe( '@execute()', () => {
		it( 'updates the pilot preferred airports in remote and the store', async () => {
			const entity = PilotFactory.build( { preferredAirports: [ 'EZE' ] } );
			store.setCurrentPilotId( entity.id );
			store.add( entity );

			const newAirportParams = [ 'EZE', 'MAD' ];
			service.update.mockResolvedValueOnce( newAirportParams );

			await updatePilot.execute( newAirportParams );
			expect( store.find( entity.id ).airports ).toEqual( newAirportParams );
		} );
	} );
} );
