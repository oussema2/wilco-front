import FetchNestedCommentsFromRemote from '../../interactors/FetchNestedCommentsFromRemote';
import CommentFactory from '../factories/CommentFactory';
import PostFactory from '../factories/PostFactory';
import PaginationFactory from '../factories/PaginationFactory';

describe( 'FetchNestedCommentsFromRemote', () => {
	describe( 'execute', () => {
		const nestedEntityName = 'post';
		const defaultEntities = CommentFactory.buildList( 2 );
		const nestedEntity = PostFactory.build();
		const defaultPagination = PaginationFactory.build( );
		const createInteractor = ( {
			response =
			{ entities: defaultEntities, pagination: defaultPagination }
		} = {} ) => {
			const store = {
				updateSorted: jest.fn(),
				setPagination: jest.fn()
			};
			const service = {
				fetchAllNested: jest.fn(
					() => Promise.resolve( response )
				)
			};

			const interactor = new FetchNestedCommentsFromRemote( { store, service, nestedEntityName } );

			return {
				response, store, service, interactor
			};
		};

		describe( 'when the service call succeeds', () => {
			it( 'calls the store\'s save method with the fetched entities', async () => {
				const { interactor, store } = createInteractor();

				await interactor.execute( nestedEntity );
				expect( store.updateSorted ).toHaveBeenCalled( );
			} );

			it( 'adds the comments to the post', async () => {
				const { interactor } = createInteractor();

				await interactor.execute( nestedEntity );
				expect( nestedEntity.comments.length ).toBe( 2 );
				expect( nestedEntity.comments[ 0 ] ).toBe( defaultEntities[ 0 ] );
				expect( nestedEntity.comments[ 1 ] ).toBe( defaultEntities[ 1 ] );
			} );
		} );
	} );
} );
