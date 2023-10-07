import SignUpPresenter from '../../presenters/SignUpPresenter';
import Form from '../../forms/Form';
import {
	EMAIL, PASSWORD, FIRST_NAME, LAST_NAME
} from '../../constants/formFields/signUpForm';
import InputError from '../../errors/InputError';
import { itShowsRequestErrorInSnackbar } from '../sharedExamples/snackbars';

describe( 'SignUpPresenter', () => {
	const signUpUser = { execute: jest.fn() };
	const fetchPilot = { execute: jest.fn() };
	const snackbarService = { showError: jest.fn() };
	const makeAutoObservable = jest.fn();
	const navigation = { goBack: jest.fn() };
	let presenter;

	beforeEach( () => {
		jest.clearAllMocks();
		presenter = new SignUpPresenter( {
			signUpUser,
			fetchPilot,
			snackbarService,
			navigation,
			makeAutoObservable
		} );
	} );

	describe( 'constructor()', () => {
		it( 'creates a form with the correct data', () => {
			expect( presenter.formFirstStep ).toBeInstanceOf( Form );
			expect( presenter.formSecondStep ).toBeInstanceOf( Form );
			expect( presenter.isLoading ).toBe( false );
			expect( makeAutoObservable ).toHaveBeenCalledWith( presenter );
		} );
	} );

	describe( '@title()', () => {
		it( 'returns the "Sign up" title', () => {
			expect( presenter.title ).toBe( 'Sign up' );
		} );
	} );

	describe( '@buttonTitle()', () => {
		it( 'returns the "Create account" title', () => {
			expect( presenter.buttonTitle ).toBe( 'Create account' );
		} );
	} );

	describe( '@isSubmitButtonDisabled()', () => {
		const setValidInputs = () => {
			presenter.formFirstStep.$( FIRST_NAME ).set( 'Valid' );
			presenter.formFirstStep.$( LAST_NAME ).set( 'Name' );
			presenter.formSecondStep.$( EMAIL ).set( 'valid@email.com' );
			presenter.formSecondStep.$( PASSWORD ).set( 'valid_pw' );
		};
		const validate = ( form ) => {
			presenter.setCurrentForm( form );
			form.validate();
		};

		beforeEach( () => {
			setValidInputs();
		} );

		describe( 'when all fields of first step form have valid inputs', () => {
			it( 'returns false', async () => {
				await validate( presenter.formFirstStep );
				expect( presenter.isSubmitButtonDisabled ).toBe( false );
			} );
		} );

		describe( 'when all fields of second step form have valid inputs', () => {
			it( 'returns false', async () => {
				await validate( presenter.formSecondStep );
				expect( presenter.isSubmitButtonDisabled ).toBe( false );
			} );
		} );

		describe( 'when first name is invalid', () => {
			it( 'returns true', async () => {
				presenter.formFirstStep.$( FIRST_NAME ).set( '' );
				await validate( presenter.formFirstStep );
				expect( presenter.isSubmitButtonDisabled ).toBe( true );
			} );
		} );

		describe( 'when last name is invalid', () => {
			it( 'returns true', () => {
				presenter.formFirstStep.$( LAST_NAME ).set( '' );
				expect( presenter.isSubmitButtonDisabled ).toBe( true );
			} );
		} );

		describe( 'when email is invalid', () => {
			it( 'returns true', async () => {
				presenter.formSecondStep.$( EMAIL ).set( 'invalidEmail.com' );
				await validate( presenter.formSecondStep );
				expect( presenter.isSubmitButtonDisabled ).toBe( true );
			} );
		} );

		describe( 'when password is invalid', () => {
			it( 'returns true', async () => {
				presenter.formSecondStep.$( PASSWORD ).set( 'invalid' );
				await validate( presenter.formSecondStep );
				expect( presenter.isSubmitButtonDisabled ).toBe( true );
			} );
		} );
	} );

	describe( '@onSubmitSuccess()', () => {
		it( 'starts loading', () => {
			presenter.onSubmitSuccess( );
			expect( presenter.isLoading ).toBe( true );
		} );

		it( 'calls the signUpUser interactor', async () => {
			await presenter.onSubmitSuccess( );
			expect( signUpUser.execute ).toHaveBeenCalled();
		} );

		it( 'fetches the new pilot from remote', async () => {
			await presenter.onSubmitSuccess( );
			expect( fetchPilot.execute ).toHaveBeenCalled();
		} );

		it( 'finishes loading upon completion', async () => {
			await presenter.onSubmitSuccess( );
			expect( presenter.isLoading ).toBe( false );
		} );

		describe( 'when the request fails', () => {
			itShowsRequestErrorInSnackbar( {
				request: () => presenter.onSubmitSuccess( ),
				snackbarServiceMock: snackbarService,
				expectedMessage: 'The entered email is already being used.',
				beforeRequest: () => {
					signUpUser.execute.mockRejectedValueOnce( new InputError( { name: 'email_in_use' } ) );
				}
			} );
		} );
	} );

	describe( '@onBackButtonPressed', () => {
		describe( 'when user stay on first step', () => {
			it( 'goes back', () => {
				presenter.onBackButtonPressed();
				expect( navigation.goBack ).toHaveBeenCalled();
			} );
		} );

		describe( 'when user stay on second step', () => {
			it( 'goes back', () => {
				presenter.onSubmitFirsStep();
				const expectedStep = presenter.currentStep - 1;
				presenter.onBackButtonPressed();
				expect( presenter.currentStep )
					.toEqual( expectedStep );
			} );
		} );
	} );

	describe( '@forms', () => {
		it( 'returns forms', () => {
			const expectedForms = [ presenter.formFirstStep, presenter.formSecondStep ];
			expect( presenter.forms ).toEqual( expectedForms );
		} );
	} );

	describe( '@onNextClicked', () => {
		it( 'goes to next step', () => {
			const { currentStep } = presenter;
			presenter.onNextClicked();
			const expectedStep = currentStep + 1;
			expect( presenter.currentStep ).toEqual( expectedStep );
		} );
	} );

	describe( '@onSubmitFirsStep', () => {
		it( 'goes to second step', () => {
			const { currentStep } = presenter;
			presenter.onSubmitFirsStep();
			const expectedStep = currentStep + 1;
			expect( presenter.currentStep ).toEqual( expectedStep );
		} );

		it( 'sets second form as current', () => {
			presenter.onSubmitFirsStep();
			expect( presenter.currentForm ).toEqual( presenter.formSecondStep );
		} );
	} );
} );
