import { makeAutoObservable, runInAction } from 'mobx';
import Form from '../forms/Form';
import { FIELDS } from '../forms/reportUserFormFields';

export const REPORT_REASON_OPTIONS = [
	{ label: 'They used inappropriate language', value: 'inappropriate_language' },
	{ label: 'They shared inappropriate content', value: 'inappropriate_content' },
	{ label: 'They are spamming me', value: 'spam' },
	{ label: 'Their profile is fake', value: 'fake_profile' },
	{ label: 'Something else', value: 'other' }
];

export default class ReportUserPresenter {
	isSendingReport = false;

	cancelButton = {
		text: 'Cancel',
		onPress: () => {},
		style: 'cancel'
	};

	confirmButton = {
		text: 'Yes',
		onPress: () => { this.navigationService.goBack(); }
	};

	constructor( {
		alertMessagesService,
		snackbarService,
		getCurrentPilot,
		reportUser,
		navigationService
	} ) {
		this.alertMessagesService = alertMessagesService;
		this.snackbarService = snackbarService;
		this.getCurrentPilot = getCurrentPilot;
		this.reportUser = reportUser;
		this.navigationService = navigationService;

		this.form = new Form(
			{ fields: FIELDS },
			{ options: { showErrorsOnChange: false, validateOnChange: true, validationDebounceWait: 0 } }
		);

		makeAutoObservable( this );
	}

	// eslint-disable-next-line class-methods-use-this
	get reportReasonOptions() {
		return REPORT_REASON_OPTIONS;
	}

	get sendButtonEnabled() {
		return !this.isSendingReport && this.form.isValid;
	}

	get sendButtonLabel() {
		return this.isSendingReport ? 'Sending...' : 'Send';
	}

	onCrossPressed = () => {
		this.alertMessagesService.showConfirmationAlert( {
			title: 'Report User',
			message: 'Are you sure you want to close?',
			cancelButton: this.cancelButton,
			confirmButton: this.confirmButton
		} );
	}

	onReportSent = ( pilotId ) => {
		this.isSendingReport = true;
		const { id: currentPilotId } = this.getCurrentPilot.execute();

		const attributes = {
			reported_pilot_id: pilotId,
			reporting_pilot_id: currentPilotId,
			...this.form.values()
		};

		return this
			.reportUser
			.execute( { attributes } )
			.then( () => {
				this.snackbarService.showSuccess( { message: 'Your report has been sent' } );
			} )
			.catch( () => {
				this.snackbarService.showError( { message: 'Your report hasn\'t been sent' } );
			} )
			.finally( () => {
				runInAction( () => {
					this.isSendingReport = false;
				} );
				this.navigationService.goBack();
			} );
	}
}
