import FetchEntityFromRemote from '../../interactors/FetchEntityFromRemote';

describe( 'FetchEntityFromRemote', () => {
	describe( 'execute', () => {
		const entityId = 1;
		const defaultEntity = { id: entityId, title: 'Title 1' };
		const createInteractor = ( { entity = defaultEntity } = {} ) => {
			const store = {
				update: jest.fn()
			};
			const service = {
				fetch: jest.fn(
					() => Promise.resolve( entity )
				)
			};

			const interactor = new FetchEntityFromRemote( { store, service } );

			return {
				entity, store, service, interactor
			};
		};

		it( 'calls the service\'s fetch method', () => {
			const { interactor, service } = createInteractor();

			interactor.execute( entityId );
			expect( service.fetch ).toHaveBeenCalledWith( entityId );
		} );

		describe( 'when the service call succeeds', () => {
			it( 'calls the store\'s save method with the fetched entity', async () => {
				const { interactor, entity, store } = createInteractor();

				await interactor.execute( entityId );
				expect( store.update ).toHaveBeenCalledWith( entity );
			} );
		} );

		describe( 'when the service call fails', () => {
			it( 'throws the error and stops execution', async () => {
				const error = new Error( 'error' );
				const { interactor, service, store } = createInteractor();
				service.fetch.mockImplementationOnce(
					() => Promise.reject( error )
				);

				await expect( interactor.execute( entityId ) ).rejects.toBe( error );
				expect( store.update ).not.toHaveBeenCalled( );
			} );
		} );
	} );
} );
