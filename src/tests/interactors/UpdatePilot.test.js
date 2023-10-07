import PilotFactory from '../factories/PilotFactory';
import UpdatePilot from '../../interactors/UpdatePilot';
import PilotStore from '../../stores/PilotStore';

describe( 'UpdatePilot', () => {
	let updatePilot;
	const service = { patch: jest.fn() };
	const store = new PilotStore();
	const currentPilot = PilotFactory.build( );
	store.setCurrentPilotId( currentPilot.id );

	beforeEach( () => {
		jest.clearAllMocks();
		updatePilot = new UpdatePilot( { store, service } );
	} );

	describe( '@execute()', () => {
		it( 'updates the pilot in remote and the store', async () => {
			const entity = PilotFactory.build( { firstName: 'old name' } );

			store.setCurrentPilotId( entity.id );
			const newParams = { ...entity, firstName: 'new name' };
			store.add( entity );
			service.patch.mockResolvedValueOnce( PilotFactory.build( { ...newParams } ) );

			await updatePilot.execute( entity.id, newParams );
			expect( store.find( entity.id ) ).toEqual( newParams );
		} );
	} );
} );
