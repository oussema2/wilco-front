import Form from '../../forms/Form';
import ResetPasswordPresenter from '../../presenters/ResetPasswordPresenter';
import { itShowsRequestErrorInSnackbar } from '../sharedExamples/snackbars';
import NetworkError from '../../errors/NetworkError';
import UNAUTHENTICATED_ROUTES from '../../navigation/UnauthenticatedRoutes';
import { PASSWORD, CONFIRM_PASSWORD } from '../../constants/formFields/resetPasswordForm';

describe( 'ResetPasswordPresenter', () => {
	const snackbarService = { showError: jest.fn(), showSuccess: jest.fn() };
	const confirmPasswordReset = { execute: jest.fn() };
	const keyboard = { dismiss: jest.fn() };
	const makeAutoObservable = jest.fn();
	const navigation = { goBack: jest.fn(), navigate: jest.fn() };
	const rootStore = { authenticationStore: { isAuthenticated: true } };
	const oobCode = 'testCode';
	let presenter;

	beforeEach( () => {
		jest.clearAllMocks();
		presenter = new ResetPasswordPresenter( {
			makeAutoObservable,
			snackbarService,
			keyboard,
			navigation,
			confirmPasswordReset,
			oobCode,
			rootStore
		} );
	} );

	describe( 'constructor()', () => {
		it( 'creates a form with the correct data', () => {
			expect( presenter.form ).toBeInstanceOf( Form );
			expect( makeAutoObservable ).toHaveBeenCalledWith( presenter );
			expect( presenter.isLoading ).toBe( false );
		} );
	} );

	describe( '@onSubmitSuccess()', () => {
		const formValues = {
			password: '12345677',
			oobCode
		};
		const form = {
			values: () => ( formValues ),
			clear: jest.fn()
		};

		it( 'calls the confirmPasswordReset interactor', async () => {
			await presenter.onSubmitSuccess( form );

			expect( confirmPasswordReset.execute ).toHaveBeenCalledWith( formValues );
		} );

		it( 'marks the presenter as loading', () => {
			presenter.onSubmitSuccess( form );
			expect( presenter.isLoading ).toBe( true );
		} );

		it( 'marks the presenter as not loading upon completion', async () => {
			await presenter.onSubmitSuccess( form );
			expect( presenter.isLoading ).toBe( false );
		} );

		it( 'dismiss keyboard', async () => {
			await presenter.onSubmitSuccess( form );
			expect( keyboard.dismiss ).toHaveBeenCalled();
		} );

		describe( 'when the request finish correctly', () => {
			describe( 'when the user is not authenticated', () => {
				it( 'navigates to logIn screen', async () => {
					presenter.rootStore.authenticationStore.isAuthenticated = false;
					await presenter.onSubmitSuccess( form );
					expect( navigation.navigate ).toHaveBeenCalledWith( UNAUTHENTICATED_ROUTES.logIn.name );
				} );
			} );

			describe( 'when the user is authenticated', () => {
				it( 'goes back', async () => {
					presenter.rootStore.authenticationStore.isAuthenticated = true;
					await presenter.onSubmitSuccess( form );
					expect( navigation.goBack ).toHaveBeenCalled();
				} );
			} );
		} );

		describe( 'when the request fails', () => {
			itShowsRequestErrorInSnackbar( {
				request: () => presenter.onSubmitSuccess( form ),
				snackbarServiceMock: snackbarService,
				expectedMessage: 'Connection error. Please try again.',
				beforeRequest: () => {
					confirmPasswordReset.execute.mockRejectedValueOnce( new NetworkError() );
				}
			} );
		} );
	} );

	describe( '@title()', () => {
		it( 'returns the title', () => {
			expect( presenter.title ).toBe( 'New password' );
		} );
	} );

	describe( '@buttonTitle()', () => {
		it( 'returns the buttonTitle', () => {
			expect( presenter.buttonTitle ).toBe( 'Create' );
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
			presenter.form.$( PASSWORD ).set( '12345678' );
			presenter.form.$( CONFIRM_PASSWORD ).set( '12345678' );
		};

		const validate = () => presenter.form.validate();

		describe( 'when all fields have valid inputs', () => {
			it( 'returns false', async () => {
				setValidInputs();
				await validate();
				expect( presenter.isSubmitButtonDisabled ).toBe( false );
			} );
		} );

		describe( 'when confirm password is invalid', () => {
			it( 'returns true', async () => {
				setValidInputs();
				presenter.form.$( CONFIRM_PASSWORD ).set( '123456789' );
				await validate();
				expect( presenter.isSubmitButtonDisabled ).toBe( true );
			} );
		} );

		describe( 'when password is invalid', () => {
			it( 'returns true', async () => {
				setValidInputs();
				presenter.form.$( PASSWORD ).set( '1234567' );
				presenter.form.$( CONFIRM_PASSWORD ).set( '1234567' );
				await validate();
				expect( presenter.isSubmitButtonDisabled ).toBe( true );
			} );
		} );
	} );
} );
