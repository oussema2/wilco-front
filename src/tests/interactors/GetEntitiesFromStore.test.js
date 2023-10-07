import GetEntitiesFromStore from '../../interactors/GetEntitiesFromStore';

describe( 'GetEntitiesFromStore', () => {
	describe( '@execute()', () => {
		it( 'returns the entities from the store', () => {
			const entities = [ { id: 1, title: 'Title 1' }, { id: 2, title: 'Title 2' } ];
			const store = {
				all: entities
			};

			const interactor = new GetEntitiesFromStore( { store } );
			const result = interactor.execute();

			expect( result ).toEqual( entities );
		} );
	} );
} );
