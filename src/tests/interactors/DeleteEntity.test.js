import DeleteEntity from '../../interactors/DeleteEntity';

describe( 'DeleteEntity', () => {
	const entityService = {
		delete: jest.fn()
	};
	const entityStore = {
		delete: jest.fn()
	};
	let deleteEntity;

	beforeEach( () => {
		jest.clearAllMocks();
		deleteEntity = new DeleteEntity( { entityService, entityStore } );
	} );

	describe( '@execute()', () => {
		const entityId = 1;

		it( 'deletes the entity', async () => {
			await deleteEntity.execute( entityId );

			expect( entityService.delete ).toHaveBeenCalledWith( entityId );
			expect( entityStore.delete ).toHaveBeenCalledWith( entityId );
		} );
	} );
} );
