import flushPromises from '../support/flushPromises';
import { itShowsRequestErrorInSnackbar } from './snackbars';

/* eslint-disable jest/expect-expect */
/* eslint-disable jest/no-export */

export const itOpensConfirmationModalForExecutingAction = ( {
	triggerer,
	modal,
	modalProps,
	actionExpect,
	successMessage,
	mockActionForFailure,
	modalService,
	snackbarService,
	additionalExamples = () => {}
} ) => {
	it( 'opens a modal asking for confirmation before performing the action', () => {
		triggerer();
		expect( modalService.open ).toHaveBeenCalledWith(
			modal,
			{
				...modalProps,
				onConfirmPress: expect.any( Function )
			}
		);
	} );

	describe( 'confirmation modal onPress callback', () => {
		const itClosesTheConfirmationModal = () => {
			it( 'closes the confirmation modal', async () => {
				triggerer();
				await flushPromises();
				expect( modalService.close ).toHaveBeenCalledWith( modal );
			} );
		};

		beforeEach( () => {
			modalService.open.mockImplementationOnce( ( _, { onConfirmPress } ) => {
				onConfirmPress();
			} );
		} );

		it( 'executes the action', async () => {
			triggerer();
			await flushPromises();
			actionExpect();
		} );

		itClosesTheConfirmationModal();

		if ( successMessage ) {
			it( 'shows an informative message in snackbar', async () => {
				triggerer();
				await flushPromises();
				expect( snackbarService.showInfo ).toHaveBeenCalledWith( { message: successMessage } );
			} );
		}

		if ( mockActionForFailure ) {
			describe( 'when the request fails', () => {
				itShowsRequestErrorInSnackbar( {
					request: () => triggerer(),
					snackbarServiceMock: snackbarService,
					expectedMessage: 'Connection error. Please try again.',
					beforeRequest: () => mockActionForFailure(),
					afterRequest: () => flushPromises()
				} );

				itClosesTheConfirmationModal();
			} );
		}

		additionalExamples( { triggerAndConfirm: triggerer, flushPromises } );
	} );
};
