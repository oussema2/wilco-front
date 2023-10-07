import ReportUser from '../../interactors/ReportUser';

describe( 'ReportUser', () => {
	const createInteractor = () => {
		const pilotService = {
			reportUser: jest.fn(
				() => Promise.resolve()
			)
		};

		const interactor = new ReportUser( { pilotService } );

		return {
			interactor, pilotService
		};
	};

	const attributes = {
		reason: 'spam',
		details: 'I reported this user',
		reported_pilot_id: 123,
		reporting_pilot_id: 111
	};

	describe( 'execute', () => {
		it( 'calls the service to report the pilot', async () => {
			const { interactor, pilotService } = createInteractor();

			await interactor.execute( { attributes } );
			expect( pilotService.reportUser ).toHaveBeenCalledWith( attributes );
		} );
	} );
} );
