import EntityStore from '../../stores/EntityStore';

describe( 'EntityStore', () => {
	let store;

	beforeEach( () => {
		store = new EntityStore();
	} );

	describe( 'constructor', () => {
		it( 'initializes with an empty list', () => {
			expect( store.all ).toEqual( [] );
		} );
	} );

	describe( '@add', () => {
		it( 'adds the entity to the store', () => {
			const entity = { id: 1, title: 'Title' };
			store.add( entity );

			expect( store.find( entity.id ) ).toEqual( entity );
		} );
	} );

	describe( '@addToFront', () => {
		const firstEntity = { id: 2, title: 'Title 2' };
		const secondEntity = { id: 2, title: 'Title 2' };

		it( 'adds the entities to the beginning of the list', () => {
			store.addToFront( firstEntity );
			store.addToFront( secondEntity );
			expect( store.entities[ 0 ] ).toEqual( secondEntity );
			expect( store.entities[ 1 ] ).toEqual( firstEntity );
		} );
	} );

	describe( '@updateAll', () => {
		describe( 'when the store is empty', () => {
			it( 'adds the entities to the store', () => {
				const newEntities = [ { id: 1, title: 'Title 1' }, { id: 2, title: 'Title 2' } ];
				store.updateAll( newEntities );
				expect( store.all ).toEqual( newEntities );
			} );
		} );

		describe( 'when there are entities in the store', () => {
			describe( 'and the entities to update are not in the store', () => {
				it( 'add new entity in the store', () => {
					const initialEntities = [ { id: 1, title: 'Title 1' }, { id: 2, title: 'Title 2' } ];
					store.updateAll( initialEntities );

					expect( store.all ).toEqual( initialEntities );

					const newEntities = [ { id: 3, title: 'Title 3' } ];
					store.updateAll( newEntities );

					expect( store.all ).toEqual( initialEntities.concat( newEntities ) );
				} );
			} );

			describe( 'and the entities to update are in the store', () => {
				it( 'update entities in the store', () => {
					const initialEntities = [ { id: 1, title: 'Title 1' }, { id: 2, title: 'Title 2' } ];
					store.updateAll( initialEntities );

					expect( store.all ).toEqual( initialEntities );

					const updateEntities = [ { id: 1, title: 'Title 3' }, { id: 2, title: 'Title 2' } ];
					store.updateAll( updateEntities );

					expect( store.all ).toEqual( updateEntities );
				} );
			} );
		} );
	} );

	describe( '@updateSorted', () => {
		describe( 'when the store is empty', () => {
			it( 'adds the entities to the store sorted by descendent id', () => {
				const newEntities = [ { id: 1, title: 'Title 1' }, { id: 2, title: 'Title 2' } ];
				const expectedEntities = newEntities.reverse();
				store.updateSorted( newEntities, ( entity ) => -entity.id );
				expect( store.all ).toEqual( expectedEntities );
			} );

			it( 'adds the entities to the store sorted by ascendent id', () => {
				const newEntities = [ { id: 1, title: 'Title 1' }, { id: 2, title: 'Title 2' } ];
				store.updateSorted( newEntities, ( entity ) => entity.id );
				expect( store.all ).toEqual( newEntities );
			} );

			it( 'adds the entities to the store sorted by descendent date', () => {
				const date = new Date();
				const yesterday = new Date( Date.now() - 86400000 );
				const newEntities = [ { id: 1, title: 'Title 1', date }, { id: 2, title: 'Title 2', date: yesterday } ];
				store.updateSorted( newEntities, ( entity ) => -entity.date.getTime() );
				expect( store.all ).toEqual( newEntities );
			} );

			it( 'adds the entities to the store sorted by ascendent date', () => {
				const date = new Date();
				const yesterday = new Date( Date.now() - 86400000 );
				const newEntities = [ { id: 1, title: 'Title 1', date }, { id: 2, title: 'Title 2', date: yesterday } ];
				store.updateSorted( newEntities, ( entity ) => entity.date.getTime() );

				const expectedEntities	= newEntities.sort( ( a, b ) => new Date( a.date ) - new
				Date( b.date ) );

				expect( store.all ).toEqual( expectedEntities );
			} );
		} );

		describe( 'when there are entities in the store', () => {
			describe( 'and the entities to update are not in the store', () => {
				it( 'add new entity sorted in the store', () => {
					const initialEntities = [ { id: 1, title: 'Title 1' }, { id: 3, title: 'Title 2' } ];
					store.updateSorted( initialEntities, ( entity ) => entity.id );

					expect( store.all ).toEqual( initialEntities );

					const newEntities = [ { id: 2, title: 'Title 3' } ];
					store.updateSorted( newEntities, ( entity ) => entity.id );

					const expectedValue = [ { id: 1, title: 'Title 1' }, { id: 2, title: 'Title 3' }, { id: 3, title: 'Title 2' } ];
					expect( store.all ).toEqual( expectedValue );
				} );
			} );

			describe( 'and the entities to update are in the store', () => {
				it( 'update entities sorted in the store', () => {
					const initialEntities = [ { id: 1, title: 'Title 1' }, { id: 2, title: 'Title 2' } ];
					store.updateSorted( initialEntities, ( entity ) => entity.id );

					expect( store.all ).toEqual( initialEntities );

					const updateEntities = [ { id: 1, title: 'Title 3' }, { id: 2, title: 'Title 2' } ];
					store.updateSorted( updateEntities, ( entity ) => entity.id );

					expect( store.all ).toEqual( updateEntities );
				} );
			} );
		} );
	} );

	describe( '@updateItemSorted', () => {
		describe( 'when there are entities in the store', () => {
			describe( 'and the entities to update are not in the store', () => {
				it( 'adds the item to the store sorted by descendent id', () => {
					const entities = [ { id: 1, title: 'Title 1' }, { id: 2, title: 'Title 2' } ];
					store.updateAll( entities );

					const entity = { id: 3, title: 'Title 3' };
					store.updateItemSorted( entity, ( item ) => -item.id );

					const expectedEntities = [ entity, ...entities ];
					expect( store.all ).toEqual( expectedEntities );
				} );
			} );

			describe( 'and the entities to update are in the store', () => {
				it( 'update entities sorted in the store', () => {
					const firstEntity = { id: 1, title: 'Title 1' };
					const secondEntity = { id: 2, title: 'Title 2' };
					const entities = [ firstEntity, secondEntity ];
					store.updateAll( entities );

					const secondEntityModified = { id: 2, title: 'New title' };
					store.updateItemSorted( secondEntityModified, ( item ) => -item.id );

					const expectedEntities = [ firstEntity, secondEntityModified ];
					expect( store.all ).toEqual( expectedEntities );
				} );
			} );
		} );
	} );

	describe( '@find', () => {
		describe( 'when there is an entity with the passed id in the store', () => {
			it( 'returns the entity', () => {
				const entity = { id: 1, title: 'Title 1' };
				store.add( entity );

				expect( store.find( entity.id ) ).toEqual( entity );
			} );
		} );

		describe( 'when there isn\'t an entity in the store with the passed id', () => {
			it( 'returns null', () => {
				expect( store.find( 3 ) ).toEqual( null );
			} );
		} );
	} );

	describe( '@all', () => {
		describe( 'when there are no entities stored', () => {
			it( 'returns an empty array', () => {
				expect( store.all ).toEqual( [] );
			} );
		} );

		describe( 'when there are entities stored', () => {
			const entities = [ { id: 1, title: 'Title 1' }, { id: 2, title: 'Title 2' } ];

			beforeEach( () => {
				store.updateAll( entities );
			} );

			it( 'returns them', () => {
				expect( store.all ).toEqual( entities );
			} );
		} );
	} );

	describe( '@update', () => {
		const entityToUpdate = { id: 1, name: 'Name' };

		describe( 'when the entity is not stored', () => {
			it( 'creates the entity', () => {
				expect( store.update( entityToUpdate ) ).toEqual( entityToUpdate );
				expect( store.entities.length ).toEqual( 1 );
				expect( store.entities[ 0 ] ).toEqual( entityToUpdate );
			} );

			describe( 'when there are other entities stored', () => {
				it( 'creates the entity', () => {
					store.entities = [ { id: 2, name: 'Another Name' } ];
					expect( store.update( entityToUpdate ) ).toEqual( entityToUpdate );
					expect( store.entities.length ).toEqual( 2 );
					expect( store.entities[ 1 ] ).toEqual( entityToUpdate );
				} );
			} );
		} );

		describe( 'when the entity was stored', () => {
			it( 'updates the entity', () => {
				store.entities = [ { id: 1, name: 'Old Name' } ];
				expect( store.update( entityToUpdate ) ).toEqual( entityToUpdate );
				expect( store.entities.length ).toEqual( 1 );
				expect( store.entities[ 0 ] ).toEqual( {
					id: 1,
					name: 'Name'
				} );
			} );

			it( 'does not update the properties that are undefined in the updated entity', () => {
				store.entities = [ { id: 1, name: 'Old Name', age: 45 } ];
				store.update( { ...entityToUpdate, age: undefined } );
				expect( store.entities[ 0 ] ).toEqual( {
					id: 1,
					name: 'Name',
					age: 45
				} );
			} );

			it( 'updates nested arrays', () => {
				store.entities = [ { id: 1, nested: [ { value: 1, id: 2 } ] } ];
				const newEntity = { id: 1, nested: [ { value: 2, id: 2 } ] };

				expect( store.update( newEntity ) ).toEqual( newEntity );
				expect( store.entities[ 0 ] ).toEqual( newEntity );
			} );

			describe( 'when the entity stored has more properties', () => {
				it( 'does not change those properties', () => {
					store.entities = [ {
						id: 1, name: 'Old Name', age: 53, height: 170
					} ];
					expect( store.update( entityToUpdate ) ).toEqual( store.entities[ 0 ] );
					expect( store.entities.length ).toEqual( 1 );
					expect( store.entities[ 0 ] ).toEqual( {
						id: 1,
						name: 'Name',
						age: 53,
						height: 170
					} );
				} );
			} );

			describe( 'when the entity stored has less properties', () => {
				it( 'adds the additional properties that the updated entity has', () => {
					store.entities = [ { id: 1 } ];
					expect( store.update( entityToUpdate ) ).toEqual( entityToUpdate );
					expect( store.entities.length ).toEqual( 1 );
					expect( store.entities[ 0 ] ).toEqual( {
						id: 1,
						name: 'Name'
					} );
				} );
			} );
		} );
	} );

	describe( '@delete', () => {
		const entityToDelete = { id: 1, name: 'Name' };
		const anotherEntity = { id: 2, name: 'Another name' };

		beforeEach( () => {
			store.entities = [ anotherEntity ];
		} );

		describe( 'when the entity is not stored', () => {
			it( 'does nothing', () => {
				store.delete( entityToDelete.id );
				expect( store.entities.length ).toEqual( 1 );
				expect( store.entities ).toEqual( [ anotherEntity ] );
			} );
		} );

		describe( 'when the entity was stored', () => {
			beforeEach( () => {
				store.entities.push( entityToDelete );
			} );

			it( 'deletes the entity', () => {
				store.delete( entityToDelete.id );
				expect( store.entities.length ).toEqual( 1 );
				expect( store.entities ).toEqual( [ anotherEntity ] );
			} );
		} );
	} );

	describe( '@deleteAll', () => {
		const entities = [
			{ id: 1, name: 'Name' },
			{ id: 2, name: 'Another name' }
		];

		beforeEach( () => {
			store.entities = entities;
		} );

		describe( 'when the entity is not stored', () => {
			it( 'deletes all entities', () => {
				store.deleteAll();
				expect( store.entities ).toEqual( [] );
			} );
		} );
	} );
} );
