import Form from '../forms/Form';
import fields from '../forms/logInFields';
import displayErrorInSnackbar from './Helpers/displayErrorInSnackbar';
import { CUSTOM_ERROR_MESSAGES } from '../constants/CustomErrorMessages';

export default class LogInPresenter {
		isLoggingIn = false;

		constructor( {
			logInUser,
			fetchPilot,
			makeAutoObservable,
			navigation,
			snackbarService,
			keyboard
		} = {} ) {
			this.logInUser = logInUser;
			this.fetchPilot = fetchPilot;
			this.navigation = navigation;
			this.formHooks = {
				onSuccess: this.onSubmitSuccess
			};

			this.form = new Form( { fields }, { hooks: this.formHooks } );
			this.snackbarService = snackbarService;
			this.keyboard = keyboard;
			this._invalidCredentialsWereSubmitted = false;

			makeAutoObservable( this );
		}

		onSubmitSuccess = async ( form ) => {
			this._setIsLoggingIn( true );
			this._setInvalidCredentialsWereSubmitted( false );
			const {
				email,
				password
			} = form.values();
			try {
				await this.logInUser.execute( {
					email,
					password
				} );
				await this.fetchPilot.execute();
			} catch ( error ) {
				this._onLoginError( error );
			} finally {
				this._setIsLoggingIn( false );
				this._dismissKeyboard();
			}
		};

		get title() {
			return 'Login';
		}

		get buttonTitle() {
			return 'Log In';
		}

		clear = () => {
			this.form.clear();
		};

		get backButtonWasPressed() {
			return () => this.navigation.goBack();
		}

		get forgotPasswordWasPressed() {
			return () => this.navigation.navigate( 'ForgotPassword' );
		}

		get invalidCredentialsWereSubmitted() {
			return this._invalidCredentialsWereSubmitted;
		}

		get isSubmitButtonDisabled() {
			return !this.form.isValid;
		}

		_setIsLoggingIn( isLoggingIn ) {
			this.isLoggingIn = isLoggingIn;
		}

		_dismissKeyboard() {
			this.keyboard.dismiss();
		}

		_onLoginError( error ) {
			displayErrorInSnackbar( error, this.snackbarService, this._errorMessages );
			if ( this._isInvalidCredentialsError( error ) ) {
				this._setInvalidCredentialsWereSubmitted( true );
			}
		}

		get _errorMessages() {
			return {
				...CUSTOM_ERROR_MESSAGES,
				user_not_found: 'Email or password is incorrect.',
				invalid_password: 'Email or password is incorrect.'
			};
		}

		_isInvalidCredentialsError( error ) {
			return error.errorName === 'user_not_found' || error.errorName === 'invalid_password';
		}

		_setInvalidCredentialsWereSubmitted( invalidCredentialsWereSubmitted ) {
			this._invalidCredentialsWereSubmitted = invalidCredentialsWereSubmitted;
		}
}
