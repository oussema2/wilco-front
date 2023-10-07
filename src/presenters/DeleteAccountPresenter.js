import ConfirmableActionPresenter from './ConfirmableActionPresenter';
import { DELETE_ACCOUNT_CONFIRMATION_MODAL } from '../constants/modals';
import displayErrorInSnackbar from './Helpers/displayErrorInSnackbar';
import Form from '../forms/Form';
import fields from '../forms/confirmationDeleteAccountFields';
import AUTHENTICATED_ROUTES from '../navigation/AuthenticatedRoutes';
import { CUSTOM_ERROR_MESSAGES } from '../constants/CustomErrorMessages';

export default class DeleteAccountPresenter {
	loading = false;

	constructor( {
		navigation,
		modalService,
		deleteAccount,
		snackbarService,
		makeAutoObservable
	} = {} ) {
		this._navigation = navigation;
		this._modalService = modalService;
		this._deleteAccount = deleteAccount;
		this._snackbarService = snackbarService;

		this.formHooks = {
			onSuccess: this._onSubmitSuccess
		};

		this.form = new Form( { fields }, { hooks: this.formHooks } );

		makeAutoObservable( this );
	}

	get backButtonWasPressed() {
		return () => this._navigation.goBack();
	}

	get isLoading() {
		return this.loading;
	}

	onDeleteButtonPressed = () => {
		this._navigation.navigate( AUTHENTICATED_ROUTES.confirmationDeleteAccount.name );
	}

	_onSubmitSuccess = async () => {
		this.deleteAccountWasPressed();
	};

	deleteAccountWasPressed = () => {
		new ConfirmableActionPresenter( {
			action: () => this._delete(),
			confirmationModal: DELETE_ACCOUNT_CONFIRMATION_MODAL,
			modalService: this._modalService
		} ).trigger();
	}

	async _delete() {
		const { password } = this.form.values();
		try {
			this._setLoading( true );
			this._modalService.close( DELETE_ACCOUNT_CONFIRMATION_MODAL );
			await this._deleteAccount.execute( { password } );
			this._displaySuccessMessage();
		} catch ( error ) {
			this._onDeleteAccountError( error );
		} finally {
			this._setLoading( false );
		}
	}

	_onDeleteAccountError( error ) {
		displayErrorInSnackbar( error, this._snackbarService, this._errorMessages );
	}

	get _errorMessages() {
		return {
			...CUSTOM_ERROR_MESSAGES,
			user_not_found: 'The email is incorrect.',
			invalid_password: 'Password is incorrect.'
		};
	}

	_displaySuccessMessage() {
		this._snackbarService.showSuccess( { message: 'Your account was successfully deleted. We hope to have you back soon.' } );
	}

	_setLoading( loading ) {
		this.loading = loading;
	}
}
