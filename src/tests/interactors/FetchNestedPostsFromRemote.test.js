import PaginationFactory from '../factories/PaginationFactory';
import FetchNestedPostsFromRemote from '../../interactors/FetchNestedPostsFromRemote';
import PostFactory from '../factories/PostFactory';

describe( 'FetchNestedPostsFromRemote', () => {
	describe( 'execute', () => {
		const nestedEntityName = 'pilots';
		const postsEntities = PostFactory.buildList( 3 );
		const defaultPagination = PaginationFactory.build( );
		const nestedEntity = { id: 10 };
		const createInteractor = ( {
			response =
			{ entities: postsEntities, pagination: defaultPagination }
		} = {} ) => {
			const store = {
				updateAll: jest.fn(),
				setPagination: jest.fn(),
				updateSorted: jest.fn()
			};
			const service = {
				fetchAllNested: jest.fn(
					() => Promise.resolve( response )
				)
			};

			const interactor = new FetchNestedPostsFromRemote( { store, service, nestedEntityName } );

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
				const { interactor, store } = createInteractor();

				await interactor.execute( nestedEntity );
				expect( store.updateSorted ).toHaveBeenCalled();
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
				expect( store.updateSorted ).not.toHaveBeenCalled( );
			} );
		} );
	} );
} );
