import DeleteAccountPresenter from '../../presenters/DeleteAccountPresenter';
import { itOpensConfirmationModalForExecutingAction } from '../sharedExamples/confirmableAction';
import {
	DELETE_ACCOUNT_CONFIRMATION_MODAL
} from '../../constants/modals';
import NetworkError from '../../errors/NetworkError';
import AUTHENTICATED_ROUTES from '../../navigation/AuthenticatedRoutes';

describe( 'DeleteAccountPresenter', () => {
	const navigation = { navigate: jest.fn(), goBack: jest.fn() };
	const makeAutoObservable = jest.fn();
	const modalService = { open: jest.fn(), close: jest.fn() };
	const snackbarService = { showError: jest.fn(), showInfo: jest.fn(), showSuccess: jest.fn() };
	const deleteAccount = { execute: jest.fn() };
	let presenter;

	beforeEach( () => {
		jest.clearAllMocks();
		presenter = new DeleteAccountPresenter( {
			navigation,
			modalService,
			deleteAccount,
			snackbarService,
			makeAutoObservable
		} );
	} );

	describe( '@backButtonWasPressed', () => {
		it( 'calls the navigation to go back', () => {
			presenter.backButtonWasPressed();
			expect( navigation.goBack ).toHaveBeenCalled();
		} );
	} );

	describe( '@deleteAccountWasPressed', () => {
		itOpensConfirmationModalForExecutingAction( {
			triggerer: () => presenter.deleteAccountWasPressed(),
			modal: DELETE_ACCOUNT_CONFIRMATION_MODAL,
			actionExpect: () => {
				expect( deleteAccount.execute ).toHaveBeenCalled();
			},
			mockActionForFailure: () => {
				deleteAccount.execute.mockRejectedValueOnce( new NetworkError() );
			},
			modalService,
			snackbarService,
			additionalExamples: ( { triggerAndConfirm, flushPromises } ) => {
				describe( '@isLoading', () => {
					describe( 'when it did not finish the request to web service', () => {
						it( 'returns true', () => {
							triggerAndConfirm();
							expect( presenter.isLoading ).toBe( true );
						} );
					} );

					describe( 'when it finished the request to web service', () => {
						it( 'returns false', async () => {
							triggerAndConfirm();
							await flushPromises();
							expect( presenter.isLoading ).toBe( false );
						} );

						it( 'displays a snackbar message upon completion', async () => {
							triggerAndConfirm();
							await flushPromises();
							expect( snackbarService.showSuccess ).toHaveBeenCalledWith( {
								message: 'Your account was successfully deleted. We hope to have you back soon.'
							} );
						} );
					} );
				} );
			}
		} );
	} );

	describe( '@onDeleteButtonPressed', () => {
		it( 'navigates to confirmationDeleteAccount screen', () => {
			presenter.onDeleteButtonPressed();
			expect( navigation.navigate )
				.toHaveBeenCalledWith( AUTHENTICATED_ROUTES.confirmationDeleteAccount.name );
		} );
	} );
} );
