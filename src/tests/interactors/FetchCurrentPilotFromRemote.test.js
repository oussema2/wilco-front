import FetchCurrentPilotFromRemote from '../../interactors/FetchCurrentPilotFromRemote';

describe( 'FetchCurrentPilotFromRemote', () => {
	describe( 'execute', () => {
		const entityId = 1;
		const defaultEntity = { id: entityId, title: 'Title 1' };
		const createInteractor = ( { entity = defaultEntity } = {} ) => {
			const store = {
				update: jest.fn(),
				setCurrentPilotId: jest.fn()
			};
			const service = {
				fetch: jest.fn(
					() => Promise.resolve( entity )
				)
			};

			const interactor = new FetchCurrentPilotFromRemote( { store, service } );

			return {
				entity, store, service, interactor
			};
		};

		it( 'calls the service\'s fetch method', () => {
			const { interactor, service } = createInteractor();

			interactor.execute();
			expect( service.fetch ).toHaveBeenCalledWith( 'me' );
		} );

		describe( 'when the service call succeeds', () => {
			it( 'calls the store\'s save method with the fetched entity', async () => {
				const { interactor, entity, store } = createInteractor();

				await interactor.execute();
				expect( store.update ).toHaveBeenCalledWith( entity );
				expect( store.setCurrentPilotId ).toHaveBeenCalledWith( entity.id );
			} );
		} );

		describe( 'when the service call fails', () => {
			it( 'throws the error and stops execution', async () => {
				const error = new Error( 'error' );
				const { interactor, service, store } = createInteractor();
				service.fetch.mockImplementationOnce(
					() => Promise.reject( error )
				);

				await expect( interactor.execute() ).rejects.toBe( error );
				expect( store.update ).not.toHaveBeenCalled( );
				expect( store.setCurrentPilotId ).not.toHaveBeenCalled( );
			} );
		} );
	} );
} );
