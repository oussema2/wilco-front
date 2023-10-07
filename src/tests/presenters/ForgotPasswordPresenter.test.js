import Form from '../../forms/Form';
import ForgotPasswordPresenter from '../../presenters/ForgotPasswordPresenter';
import { itShowsRequestErrorInSnackbar } from '../sharedExamples/snackbars';
import NetworkError from '../../errors/NetworkError';
import { EMAIL } from '../../constants/formFields/forgotPasswordForm';

describe( 'ForgotPasswordPresenter', () => {
	const snackbarService = { showError: jest.fn(), showSuccess: jest.fn() };
	const sendPasswordResetEmail = { execute: jest.fn() };
	const keyboard = { dismiss: jest.fn() };
	const makeAutoObservable = jest.fn();
	const navigation = { goBack: jest.fn() };
	let presenter;

	beforeEach( () => {
		jest.clearAllMocks();
		presenter = new ForgotPasswordPresenter( {
			sendPasswordResetEmail, makeAutoObservable, snackbarService, keyboard, navigation
		} );
	} );

	describe( 'constructor()', () => {
		it( 'creates a form with the correct data', () => {
			expect( presenter.form ).toBeInstanceOf( Form );
			expect( makeAutoObservable ).toHaveBeenCalledWith( presenter );
			expect( presenter.isSendingEmail ).toBe( false );
		} );
	} );

	describe( '@onSubmitSuccess()', () => {
		const formValues = {
			email: 'test@wilco.com'
		};
		const form = {
			values: () => ( formValues ),
			clear: jest.fn()
		};

		it( 'calls the sendPasswordResetEmail interactor', async () => {
			await presenter.onSubmitSuccess( form );

			expect( sendPasswordResetEmail.execute ).toHaveBeenCalledWith( formValues );
		} );

		it( 'marks the presenter as sending email', () => {
			presenter.onSubmitSuccess( form );
			expect( presenter.isSendingEmail ).toBe( true );
		} );

		it( 'marks the presenter as not sending email upon completion', async () => {
			await presenter.onSubmitSuccess( form );
			expect( presenter.isSendingEmail ).toBe( false );
		} );

		it( 'dismiss keyboard', async () => {
			await presenter.onSubmitSuccess( form );
			expect( keyboard.dismiss ).toHaveBeenCalled();
		} );

		describe( 'when the request not fails', () => {
			it( 'shows successful message', async () => {
				await presenter.onSubmitSuccess( form );
				expect( keyboard.dismiss ).toHaveBeenCalled();
				expect( snackbarService.showSuccess ).toHaveBeenCalledWith( { message: 'If you have an account with that email address, you will receive an email to reset your password.' } );
			} );
		} );

		describe( 'when the request fails', () => {
			itShowsRequestErrorInSnackbar( {
				request: () => presenter.onSubmitSuccess( form ),
				snackbarServiceMock: snackbarService,
				expectedMessage: 'Connection error. Please try again.',
				beforeRequest: () => {
					sendPasswordResetEmail.execute.mockRejectedValueOnce( new NetworkError() );
				}
			} );
		} );
	} );

	describe( '@title()', () => {
		it( 'returns the title', () => {
			expect( presenter.title ).toBe( 'Forgot password' );
		} );
	} );

	describe( '@buttonTitle()', () => {
		it( 'returns the buttonTitle', () => {
			expect( presenter.buttonTitle ).toBe( 'Submit' );
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

	describe( '@isSubmitButtonDisabled()', () => {
		const setValidInputs = () => {
			presenter.form.$( EMAIL ).set( 'valid@email.com' );
		};

		const validate = () => presenter.form.validate();

		describe( 'when email is valid', () => {
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
	} );
} );
