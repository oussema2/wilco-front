import FetchCredentialsFromRemote from '../../interactors/FetchCredentialsFromRemote';

describe( 'FetchCredentialsFromRemote', () => {
	describe( 'execute', () => {
		const defaultRatings = [ { id: 1, name: 'Rating 1' }, { id: 2, title: 'Rating 2' } ];
		const defaultCertificates = [ { id: 1, name: 'Certificate 1' }, { id: 2, title: 'Certificate 2' } ];
		const createInteractor = ( {
			response =
			{ certificates: defaultCertificates, ratings: defaultRatings }
		} = {} ) => {
			const certificateStore = {
				updateAll: jest.fn()
			};
			const ratingStore = {
				updateAll: jest.fn()
			};
			const service = {
				fetchAll: jest.fn(
					() => Promise.resolve( response )
				)
			};

			const interactor = new FetchCredentialsFromRemote(
				{ certificateStore, ratingStore, service } );

			return {
				response, certificateStore, ratingStore, service, interactor
			};
		};

		it( 'calls the service\'s fetchAll method', () => {
			const { interactor, service } = createInteractor();

			interactor.execute();
			expect( service.fetchAll ).toHaveBeenCalledTimes( 1 );
		} );

		describe( 'when the service call succeeds', () => {
			it( 'calls the store\'s save method with the fetched entities', async () => {
				const {
					interactor, response, ratingStore, certificateStore
				} = createInteractor();

				await interactor.execute();
				expect( ratingStore.updateAll ).toHaveBeenCalledWith( response.ratings );
				expect( certificateStore.updateAll ).toHaveBeenCalledWith( response.certificates );
			} );
		} );

		describe( 'when the service call fails', () => {
			it( 'throws the error and stops execution', async () => {
				const error = new Error( 'error' );
				const { interactor, service, ratingStore } = createInteractor();
				service.fetchAll.mockImplementationOnce(
					() => Promise.reject( error )
				);

				await expect( interactor.execute() ).rejects.toBe( error );
				expect( ratingStore.updateAll ).not.toHaveBeenCalled( );
			} );
		} );
	} );
} );
