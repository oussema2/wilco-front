import FetchEntitiesFromRemote from '../../interactors/FetchEntitiesFromRemote';
import PaginationFactory from '../factories/PaginationFactory';

describe( 'FetchEntitiesFromRemote', () => {
	describe( 'execute', () => {
		const defaultEntities = [ { id: 1, title: 'Title 1' }, { id: 2, title: 'Title 2' } ];
		const defaultPagination = PaginationFactory.build( );
		const createInteractor = ( {
			response = { entities: defaultEntities, pagination: defaultPagination },
			clearStoreOnPullToRefresh = false
		} = {} ) => {
			const store = {
				updateAll: jest.fn(),
				deleteAll: jest.fn()
			};
			const service = {
				fetchAll: jest.fn(
					() => Promise.resolve( response )
				)
			};

			const interactor = new FetchEntitiesFromRemote( {
				store,
				service,
				clearStoreOnPullToRefresh
			} );

			return {
				response, store, service, interactor
			};
		};

		it( 'calls the service\'s fetchAll method', () => {
			const { store, interactor, service } = createInteractor();

			interactor.execute();
			expect( service.fetchAll ).toHaveBeenCalledTimes( 1 );
			expect( store.deleteAll ).not.toHaveBeenCalled();
			expect( interactor.clearStoreOnPullToRefresh ).toBeFalsy();
		} );

		describe( 'when the service call succeeds', () => {
			it( 'calls the store\'s save method with the fetched entities', async () => {
				const { interactor, response, store } = createInteractor();

				await interactor.execute();
				expect( store.updateAll ).toHaveBeenCalledWith( response.entities );
			} );
		} );

		describe( 'when the service call fails', () => {
			it( 'throws the error and stops execution', async () => {
				const error = new Error( 'error' );
				const { interactor, service, store } = createInteractor();
				service.fetchAll.mockImplementationOnce(
					() => Promise.reject( error )
				);

				await expect( interactor.execute() ).rejects.toBe( error );
				expect( store.updateAll ).not.toHaveBeenCalled( );
			} );
		} );

		describe( 'when clearStoreOnPullToRefresh is true', () => {
			it( 'calls the store\'s deleteAll method', async () => {
				const { interactor, store } = createInteractor(
					{ clearStoreOnPullToRefresh: true }
				);

				await interactor.execute();
				expect( store.deleteAll ).toHaveBeenCalled();
			} );
		} );

		describe( 'when clearStoreOnPullToRefresh is false', () => {
			it( 'doesn\'t call the store\'s deleteAll method', async () => {
				const { interactor, store } = createInteractor(
					{ clearStoreOnPullToRefresh: false }
				);

				await interactor.execute();
				expect( store.deleteAll ).not.toHaveBeenCalled();
			} );
		} );

		describe( 'when user want to reset pagination', () => {
			it( 'resets pagination', async () => {
				const { interactor } = createInteractor(
					{ clearStoreOnPullToRefresh: false }
				);

				interactor.pagination.page = 2;

				interactor.resetPagination();
				expect( interactor.pagination.page ).toBe( 0 );
			} );
		} );
	} );
} );
