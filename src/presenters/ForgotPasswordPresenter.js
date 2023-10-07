import Form from '../forms/Form';
import fields from '../forms/forgotPasswordFields';
import displayErrorInSnackbar from './Helpers/displayErrorInSnackbar';

export default class ForgotPasswordPresenter {
		isSendingEmail = false;

		constructor( {
			makeAutoObservable,
			navigation,
			snackbarService,
			keyboard,
			rootStore,
			sendPasswordResetEmail
		} = {} ) {
			this.formHooks = {
				onSuccess: this.onSubmitSuccess
			};

			this.navigation = navigation;
			this.snackbarService = snackbarService;
			this.keyboard = keyboard;
			this.rootStore = rootStore;
			this.sendPasswordResetEmail = sendPasswordResetEmail;
			this.form = new Form( { fields }, { hooks: this.formHooks } );

			makeAutoObservable( this );
		}

		onSubmitSuccess = async ( form ) => {
			this._setIsSendingEmail( true );
			const {
				email
			} = form.values();
			try {
				await this.sendPasswordResetEmail.execute( { email } );
				this._displayEmailSentMessage();
			} catch ( error ) {
				this._onError( { error, email } );
			} finally {
				this._setIsSendingEmail( false );
				this._dismissKeyboard();
			}
		};

		get title() {
			return 'Forgot password';
		}

		get buttonTitle() {
			return 'Submit';
		}

		clear = () => {
			this.form.clear();
		};

		get backButtonWasPressed() {
			return () => this.navigation.goBack();
		}

		get isSubmitButtonDisabled() {
			return !this.form.isValid;
		}

		_setIsSendingEmail( isSendingEmail ) {
			this.isSendingEmail = isSendingEmail;
		}

		_dismissKeyboard() {
			this.keyboard.dismiss();
		}

		_onError( { error, email } ) {
			if ( this._isUserNotFoundError( { error } ) ) this._displayEmailSentMessage( { email } );
			else displayErrorInSnackbar( error, this.snackbarService, this._errorMessages );
		}

		_isUserNotFoundError( { error } ) {
			return error.errorName === 'user_not_found';
		}

		_displayEmailSentMessage() {
			this.snackbarService.showSuccess( { message: 'If you have an account with that email address, you will receive an email to reset your password.' } );
		}

		get _errorMessages() {
			return {
				invalid_email: 'The email is invalid.',
				user_not_found: 'Email is incorrect.'
			};
		}
}
