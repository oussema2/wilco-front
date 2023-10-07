import ReportUserPresenter, { REPORT_REASON_OPTIONS } from '../../presenters/ReportUserPresenter';
import PilotFactory from '../factories/PilotFactory';

const reportedPilotId = 123;
const reasonValue = 'spam';
const detailsValue = 'I reported this user';
const validValues = {
	reason: reasonValue,
	details: detailsValue
};
const invalidValues = {
	details: detailsValue
};

const currentPilot = PilotFactory.build();
const getCurrentPilotMock = { execute: jest.fn( () => currentPilot ) };

const alertMessagesServiceMock = {
	showConfirmationAlert: jest.fn( () => {} )
};

const snackbarServiceMock = {
	showSuccess: jest.fn( () => {} ),
	showError: jest.fn( () => {} )
};

const reportUserMock = {
	execute: jest.fn(
		() => Promise.resolve()
	)
};

const navigationServiceMock = {
	navigate: jest.fn(),
	goBack: jest.fn()
};

const createPresenter = () => {
	const presenter = new ReportUserPresenter( {
		alertMessagesService: alertMessagesServiceMock,
		snackbarService: snackbarServiceMock,
		getCurrentPilot: getCurrentPilotMock,
		reportUser: reportUserMock,
		navigationService: navigationServiceMock
	} );

	return presenter;
};

describe( 'ReportUserPresenter', () => {
	describe( 'Send button', () => {
		test( 'by default is disabled', () => {
			const presenter = createPresenter();
			expect( presenter.sendButtonEnabled ).toEqual( false );
		} );

		test( 'is enabled when the form is valid', () => {
			const presenter = createPresenter();
			presenter.form.set( validValues );
			presenter.form.validate();

			expect( presenter.sendButtonEnabled ).toEqual( true );
		} );

		test( 'is disabled when the form is not valid', () => {
			const presenter = createPresenter();
			presenter.form.set( invalidValues );
			presenter.form.validate();

			expect( presenter.sendButtonEnabled ).toEqual( false );
		} );
	} );

	describe( 'reportReasonOptions', () => {
		test( 'returns the report reason options', () => {
			const presenter = createPresenter();
			const { reportReasonOptions } = presenter;

			expect( reportReasonOptions ).toEqual( REPORT_REASON_OPTIONS );
		} );
	} );

	describe( 'onCrossPressed', () => {
		test( 'calls showConfirmationAlert', () => {
			const presenter = createPresenter();
			presenter.onCrossPressed();

			expect( alertMessagesServiceMock.showConfirmationAlert ).toHaveBeenCalled();
		} );
	} );

	describe( 'onReportSent', () => {
		test( "changes button label to 'Sending...' when loading", () => {
			const presenter = createPresenter();
			presenter.onReportSent( reportedPilotId );

			expect( presenter.sendButtonLabel ).toEqual( 'Sending...' );
		} );

		test( 'calls the reportUser interactor with the correct parameters', () => {
			const presenter = createPresenter();
			presenter.form.set( validValues );
			presenter.form.validate();
			presenter.onReportSent( reportedPilotId );

			const attributes = {
				reason: reasonValue,
				details: detailsValue,
				reported_pilot_id: reportedPilotId,
				reporting_pilot_id: currentPilot.id
			};

			expect( reportUserMock.execute ).toHaveBeenCalledWith( { attributes } );
		} );

		test( 'calls showSuccessMessage after reporting the user profile successfully', async () => {
			const presenter = createPresenter();
			await presenter.onReportSent( reportedPilotId );

			expect( snackbarServiceMock.showSuccess ).toHaveBeenCalled();
		} );

		test( 'calls showErrorMessage if an error occurred while reporting the user', async () => {
			reportUserMock.execute.mockImplementationOnce( () => Promise.reject() );

			const presenter = createPresenter();
			presenter.form.set( validValues );
			presenter.form.validate();
			await presenter.onReportSent( reportedPilotId );

			expect( snackbarServiceMock.showError ).toHaveBeenCalled();
		} );

		test( "changes button label back to 'Save' when an error ocurrs", async () => {
			reportUserMock.execute.mockImplementationOnce( () => Promise.reject() );

			const presenter = createPresenter();
			presenter.form.set( validValues );
			presenter.form.validate();
			await presenter.onReportSent( reportedPilotId );

			expect( presenter.sendButtonLabel ).toEqual( 'Send' );
		} );
	} );
} );
