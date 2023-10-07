import Form from '../forms/Form';
import fields from '../forms/resetPasswordFields';
import displayErrorInSnackbar from './Helpers/displayErrorInSnackbar';
import UNAUTHENTICATED_ROUTES from '../navigation/UnauthenticatedRoutes';

export default class ResetPasswordPresenter {
		isLoading = false;

		constructor( {
			makeAutoObservable,
			navigation,
			snackbarService,
			keyboard,
			rootStore,
			confirmPasswordReset,
			oobCode
		} = {} ) {
			this.formHooks = {
				onSuccess: this.onSubmitSuccess
			};

			this.navigation = navigation;
			this.snackbarService = snackbarService;
			this.keyboard = keyboard;
			this.rootStore = rootStore;
			this.confirmPasswordReset = confirmPasswordReset;
			this.oobCode = oobCode;
			this.form = new Form( { fields }, { hooks: this.formHooks } );

			makeAutoObservable( this );
		}

		onSubmitSuccess = async ( form ) => {
			this._setIsLoading( true );
			const {
				password
			} = form.values();
			try {
				await this.confirmPasswordReset.execute( { password, oobCode: this.oobCode } );
				this._displayChangesSavedMessage();
				this._navigateAfterResetPassword();
			} catch ( error ) {
				this._onError( error );
			} finally {
				this._setIsLoading( false );
				this._dismissKeyboard();
			}
		};

		get title() {
			return 'New password';
		}

		get buttonTitle() {
			return 'Create';
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

		_navigateAfterResetPassword() {
			const { isAuthenticated } = this.rootStore.authenticationStore;
			if ( isAuthenticated ) {
				this.navigation.goBack();
			} else {
				this.navigation.navigate( UNAUTHENTICATED_ROUTES.logIn.name );
			}
		}

		_setIsLoading( isLoading ) {
			this.isLoading = isLoading;
		}

		_dismissKeyboard() {
			this.keyboard.dismiss();
		}

		_onError( error ) {
			displayErrorInSnackbar( error, this.snackbarService, this._errorMessages );
		}

		_displayChangesSavedMessage() {
			this.snackbarService.showSuccess( { message: 'Great! You’ve got a new password' } );
		}

		get _errorMessages() {
			return {
				invalid_email: 'The email is invalid.',
				user_not_found: 'Email is incorrect.',
				expired_action_code: 'The link has expired.',
				invalid_action_code: 'The link is invalid. It could be damaged, expired, or has already been used.',
				weak_password: 'The new password is not strong enough'
			};
		}
}
