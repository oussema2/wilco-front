import displayErrorInSnackbar from './Helpers/displayErrorInSnackbar';

export default class ConfirmableActionPresenter {
	constructor( {
		action,
		confirmationModal,
		confirmationModalProps,
		successMessage,
		onSuccess = () => {},
		modalService,
		snackbarService
	} ) {
		this._action = action;
		this._confirmationModal = confirmationModal;
		this._confirmationModalProps = confirmationModalProps;
		this._onSuccess = onSuccess;
		this._successMessage = successMessage;
		this._modalService = modalService;
		this._snackbarService = snackbarService;
	}

	trigger() {
		this._modalService.open( this._confirmationModal, {
			...this._confirmationModalProps,
			onConfirmPress: () => this._executeActionAndCloseModal()
		} );
	}

	async _executeActionAndCloseModal() {
		try {
			await this._action();
			if ( this._successMessage ) this._displaySuccessMessage();
			this._onSuccess();
		} catch ( error ) {
			if ( this._snackbarService ) displayErrorInSnackbar( error, this._snackbarService );
		} finally {
			this._modalService.close( this._confirmationModal );
		}
	}

	_displaySuccessMessage() {
		this._snackbarService.showInfo( { message: this._successMessage } );
	}
}
