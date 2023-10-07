import LogInPresenter from '../../presenters/LogInPresenter';
import Form from '../../forms/Form';
import NetworkError from '../../errors/NetworkError';
import { itShowsRequestErrorInSnackbar } from '../sharedExamples/snackbars';
import {
	EMAIL, PASSWORD
} from '../../constants/formFields/logInForm';

// jest.mock( '../../forms/Form' );

describe( 'LogInPresenter', () => {
	const logInUser = { execute: jest.fn() };
	const fetchPilot = { execute: jest.fn() };
	const snackbarService = { showError: jest.fn() };
	const keyboard = { dismiss: jest.fn() };
	const makeAutoObservable = jest.fn();
	const navigation = { goBack: jest.fn(), navigate: jest.fn() };
	let presenter;

	beforeEach( () => {
		jest.clearAllMocks();
		presenter = new LogInPresenter( {
			logInUser, fetchPilot, makeAutoObservable, snackbarService, keyboard, navigation
		} );
	} );

	describe( 'constructor()', () => {
		it( 'creates a form with the correct data', () => {
			expect( presenter.form ).toBeInstanceOf( Form );
			expect( makeAutoObservable ).toHaveBeenCalledWith( presenter );
			expect( presenter.isLoggingIn ).toBe( false );
			expect( presenter.invalidCredentialsWereSubmitted ).toBe( false );
		} );
	} );

	describe( '@onSubmitSuccess()', () => {
		const formValues = {
			email: 'test@wilco.com',
			password: 'password'
		};
		const form = {
			values: () => ( formValues ),
			clear: jest.fn()
		};

		it( 'calls the logInUser interactor', async () => {
			await presenter.onSubmitSuccess( form );

			expect( logInUser.execute ).toHaveBeenCalledWith( formValues );
		} );

		it( 'calls the fetchPilot interactor', async () => {
			await presenter.onSubmitSuccess( form );

			expect( fetchPilot.execute ).toHaveBeenCalled();
		} );

		it( 'marks the presenter as logging in', () => {
			presenter.onSubmitSuccess( form );
			expect( presenter.isLoggingIn ).toBe( true );
		} );

		it( 'marks the presenter as not logging in upon completion', async () => {
			await presenter.onSubmitSuccess( form );
			expect( presenter.isLoggingIn ).toBe( false );
		} );

		it( 'dismiss keyboard', async () => {
			await presenter.onSubmitSuccess( form );
			expect( keyboard.dismiss ).toHaveBeenCalled();
		} );

		describe( 'when the request fails', () => {
			itShowsRequestErrorInSnackbar( {
				request: () => presenter.onSubmitSuccess( form ),
				snackbarServiceMock: snackbarService,
				expectedMessage: 'Connection error. Please try again.',
				beforeRequest: () => {
					logInUser.execute.mockRejectedValueOnce( new NetworkError() );
				}
			} );

			describe( 'when invalid credentials are submitted', () => {
				const mockLoginError = ( errorName ) => {
					logInUser.execute.mockRejectedValueOnce( { errorName } );
				};
				const submit = () => presenter.onSubmitSuccess( form );

				describe( 'when invalid email is submitted', () => {
					it( 'sets the invalid credentials submitted indicator', async () => {
						mockLoginError( 'user_not_found' );
						await submit();
						expect( presenter.invalidCredentialsWereSubmitted ).toBe( true );
					} );
				} );

				describe( 'when invalid password is submitted', () => {
					it( 'sets the invalid credentials submitted indicator', async () => {
						mockLoginError( 'invalid_password' );
						await submit();
						expect( presenter.invalidCredentialsWereSubmitted ).toBe( true );
					} );
				} );

				describe( 'but then new credentials are submitted again', () => {
					it( 'clears the invalid credentials submitted indicator on submit', async () => {
						mockLoginError( 'user_not_found' );
						await submit();
						submit();
						expect( presenter.invalidCredentialsWereSubmitted ).toBe( false );
					} );
				} );
			} );
		} );
	} );

	describe( '@title()', () => {
		it( 'returns the title', () => {
			expect( presenter.title ).toBe( 'Login' );
		} );
	} );

	describe( '@buttonTitle()', () => {
		it( 'returns the buttonTitle', () => {
			expect( presenter.buttonTitle ).toBe( 'Log In' );
		} );
	} );

	describe( '@clear()', () => {
		it( 'clears the form', async () => {
			presenter.form.clear = jest.fn();
			await presenter.clear();
			expect( presenter.form.clear ).toHaveBeenCalledTimes( 1 );
		} );
	} );

	describe( '@backButtonWasPressed', () => {
		it( 'goes back', () => {
			presenter.backButtonWasPressed();
			expect( navigation.goBack ).toHaveBeenCalled();
		} );
	} );

	describe( '@forgotPasswordWasPressed', () => {
		it( 'navigates to the ForgotPassword screen', () => {
			presenter.forgotPasswordWasPressed();
			expect( navigation.navigate ).toHaveBeenCalledWith( 'ForgotPassword' );
		} );
	} );

	describe( '@isSubmitButtonDisabled()', () => {
		const setValidInputs = () => {
			presenter.form.$( EMAIL ).set( 'valid@email.com' );
			presenter.form.$( PASSWORD ).set( 'valid_password' );
		};

		const validate = () => presenter.form.validate();

		describe( 'when all fields have valid inputs', () => {
			it( 'returns false', async () => {
				setValidInputs();
				await validate();
				expect( presenter.isSubmitButtonDisabled ).toBe( false );
			} );
		} );

		describe( 'when email is invalid', () => {
			it( 'returns true', async () => {
				setValidInputs();
				presenter.form.$( EMAIL ).set( 'invalid.mail.com' );
				await validate();
				expect( presenter.isSubmitButtonDisabled ).toBe( true );
			} );
		} );

		describe( 'when password is invalid', () => {
			it( 'returns true', async () => {
				setValidInputs();
				presenter.form.$( PASSWORD ).set( 'invalid' );
				await validate();
				expect( presenter.isSubmitButtonDisabled ).toBe( true );
			} );
		} );
	} );
} );
