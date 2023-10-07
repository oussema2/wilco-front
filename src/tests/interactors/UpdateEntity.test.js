import UpdateEntity from '../../interactors/UpdateEntity';
import EntityStore from '../../stores/EntityStore';
import PilotFactory from '../factories/PilotFactory';

describe( 'UpdateEntity', () => {
	let updateEntity;
	const service = { patch: jest.fn() };
	const store = new EntityStore();

	beforeEach( () => {
		jest.clearAllMocks();
		updateEntity = new UpdateEntity( { store, service } );
	} );

	describe( '@execute()', () => {
		it( 'updates the entity in remote and the store', async () => {
			const entity = PilotFactory.build( { firstName: 'old name' } );
			const newParams = { ...entity, firstName: 'new name' };

			store.add( entity );
			service.patch.mockResolvedValueOnce( PilotFactory.build( { ...newParams } ) );

			await updateEntity.execute( entity.id, newParams );

			expect( store.find( entity.id ) ).toEqual( newParams );
		} );
	} );
} );
