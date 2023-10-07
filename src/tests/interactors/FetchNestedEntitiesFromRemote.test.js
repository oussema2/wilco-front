import FetchNestedEntitiesFromRemote from '../../interactors/FetchNestedEntitiesFromRemote';
import PaginationFactory from '../factories/PaginationFactory';

describe( 'FetchNestedEntitiesFromRemote', () => {
	describe( 'execute', () => {
		const nestedEntityName = 'entities';
		const defaultEntities = [ { id: 1, title: 'Title 1' }, { id: 2, title: 'Title 2' } ];
		const defaultPagination = PaginationFactory.build( );
		const nestedEntity = { id: 10 };
		const createInteractor = ( {
			response =
			{ entities: defaultEntities, pagination: defaultPagination }
		} = {} ) => {
			const store = {
				updateAll: jest.fn(),
				setPagination: jest.fn()
			};
			const service = {
				fetchAllNested: jest.fn(
					() => Promise.resolve( response )
				)
			};

			const interactor = new FetchNestedEntitiesFromRemote( { store, service, nestedEntityName } );

			return {
				response, store, service, interactor
			};
		};

		it( 'calls the service\'s fetchAllNested method', () => {
			const { interactor, service } = createInteractor();

			interactor.execute( nestedEntity );
			expect( service.fetchAllNested )
				.toHaveBeenCalledWith( nestedEntityName, nestedEntity.id, null );
		} );

		describe( 'when the service call succeeds', () => {
			it( 'calls the store\'s save method with the fetched entities', async () => {
				const { interactor, response, store } = createInteractor();

				await interactor.execute( nestedEntity );
				expect( store.updateAll ).toHaveBeenCalledWith( response.entities );
			} );
		} );

		describe( 'when the service call fails', () => {
			it( 'throws the error and stops execution', async () => {
				const error = new Error( 'error' );
				const { interactor, service, store } = createInteractor();
				service.fetchAllNested.mockImplementationOnce(
					() => Promise.reject( error )
				);

				await expect( interactor.execute( nestedEntity ) ).rejects.toBe( error );
				expect( store.updateAll ).not.toHaveBeenCalled( );
			} );
		} );
	} );
} );
