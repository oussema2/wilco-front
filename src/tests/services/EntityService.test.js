import EntityService from '../../services/EntityService';

describe( 'EntityService', () => {
	describe( 'constructor', () => {
		it( 'initializes with the provided values', () => {
			const api = 'api';
			const basePath = '/base/path';
			const buildEntity = 'build';

			const service = new EntityService( { api, basePath, buildEntity } );

			expect( service.api ).toBe( api );
			expect( service.basePath ).toBe( basePath );
			expect( service.buildEntity ).toBe( buildEntity );
		} );
	} );

	const createService = ( { paths } = {} ) => {
		const returnedItems = [ { id: 10, name: 'Test 1' }, { id: 2, name: 'Name 2' } ];

		const api = {
			get: jest.fn( () => Promise.resolve( { data: { data: returnedItems } } ) ),
			post: jest.fn(
				( _, attributes ) => Promise.resolve(
					{ data: { data: { id: 1, ...attributes } } }
				)
			),
			delete: jest.fn( () => Promise.resolve( { data: { data: returnedItems } } ) ),
			patch: jest.fn( () => Promise.resolve( { data: { data: returnedItems } } ) )
		};

		const basePath = 'entities';
		const buildEntity = jest.fn(
			( { id, name } ) => ( { id, name: `Entity - ${name}` } )
		);

		const service = new EntityService( {
			api, basePath, buildEntity, paths
		} );

		return {
			service, api, basePath, returnedItems, buildEntity
		};
	};

	describe( 'delete', () => {
		const id = 10;
		const attributes = { id, name: 'Test 1' };

		it( 'calls the api delete method with the correct path for the passed id', async () => {
			const { service, api, basePath } = createService();

			await service.delete( id );
			expect( api.delete ).toHaveBeenCalledWith( `1/${basePath}/${id}` );
		} );

		it( 'returns the deleted entity built correctly', async () => {
			const { service, api, buildEntity } = createService();

			api.delete.mockImplementationOnce(
				() => Promise.resolve( attributes )
			);

			const expectedEntity = buildEntity( attributes );
			const result = await service.delete( id );

			expect( result ).toEqual( expectedEntity );
		} );
	} );

	describe( 'fetch', () => {
		const id = 10;
		const attributes = { id, name: 'Test 1' };

		it( 'calls the api get method with the correct path for the passed id', async () => {
			const { service, api, basePath } = createService();

			await service.fetch( id );
			expect( api.get ).toHaveBeenCalledWith( `1/${basePath}/${id}` );
		} );

		it( 'returns the fetched entity built correctly', async () => {
			const { service, api, buildEntity } = createService();

			api.get.mockImplementationOnce(
				() => Promise.resolve( attributes )
			);

			const expectedEntity = buildEntity( attributes );
			const result = await service.fetch( id );

			expect( result ).toEqual( expectedEntity );
		} );
	} );

	describe( 'fetchAllNested', () => {
		const id = 10;
		const entities = [ { id, name: 'Test 1' }, { id: id + 1, name: 'Test 2' } ];
		const nestedEntityName = 'parent_entities';
		const nestedEntityId = 12;

		it( 'returns the fetched entities', async () => {
			const {
				service, api, buildEntity, basePath
			} = createService();

			api.get.mockImplementationOnce(
				() => Promise.resolve( entities )
			);

			const expectedEntities = entities.map( ( entity ) => buildEntity( entity ) );
			const results = await service.fetchAllNested( nestedEntityName, nestedEntityId );

			expect( results.entities ).toEqual( expectedEntities );
			expect( api.get ).toHaveBeenCalledWith(
				`1/${nestedEntityName}/${nestedEntityId}/${basePath}?page=1&per_page=999999`
			);
		} );
	} );

	describe( 'patch', () => {
		const id = 10;
		const attributes = { id, name: 'Test 1' };

		it( 'calls the api patch method with the correct path for the passed id', async () => {
			const { service, api, basePath } = createService();

			await service.patch( id, attributes );
			expect( api.patch ).toHaveBeenCalledWith( `1/${basePath}/${id}`, attributes );
		} );

		it( 'returns the patched entity built correctly', async () => {
			const { service, api, buildEntity } = createService();

			api.patch.mockImplementationOnce(
				() => Promise.resolve( attributes )
			);

			const expectedEntity = buildEntity( attributes );
			const result = await service.patch( id, attributes );

			expect( result ).toEqual( expectedEntity );
		} );
	} );
} );
