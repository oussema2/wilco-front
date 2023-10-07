import GetEntityFromStore from '../../interactors/GetEntityFromStore';

describe( 'GetEntityFromStore', () => {
	describe( 'execute()', () => {
		it( 'returns the entity from the store', () => {
			const entityId = 1;
			const entity = { id: entityId, title: 'Title 1' };
			const store = {
				find: jest.fn( () => entity )
			};

			const interactor = new GetEntityFromStore( { store } );
			const result = interactor.execute( entityId );

			expect( result ).toBe( entity );
			expect( store.find ).toHaveBeenCalledWith( entityId );
		} );
	} );
} );
