import CreateReport from '../../interactors/CreateReport';

describe( 'CreateReport', () => {
	const reportableService = {
		report: jest.fn()
	};
	let createReport;

	beforeEach( () => {
		jest.clearAllMocks();
		createReport = new CreateReport( { reportableService } );
	} );

	describe( '@execute()', () => {
		const reportableId = 2;

		it( 'reports the reportable entity through the service', async () => {
			await createReport.execute( { reportableId } );
			expect( reportableService.report ).toHaveBeenCalledWith( reportableId );
		} );
	} );
} );
