import { DELETE_AIRCRAFT_CONFIRMATION_MODAL } from '../../constants/modals';
import NetworkError from '../../errors/NetworkError';
import { itOpensConfirmationModalForExecutingAction } from './confirmableAction';

/* eslint-disable jest/no-export */

export const aircraftOptionsExamples = ( {
	onAircraftOptionsPressed,
	aircraftId,
	deleteAircraft,
	onAircraftDeleted,
	modalService,
	actionSheetService,
	snackbarService,
	analyticsService
} ) => {
	describe( '@onAircraftOptionsPressed', () => {
		it( 'opens an action sheet with options for deleting and editing the given aircraft', () => {
			onAircraftOptionsPressed( aircraftId );
			expect( actionSheetService.open ).toHaveBeenCalledWith( {
				actions: [
					{
						title: 'Delete aircraft',
						type: 'destructive',
						onPress: expect.any( Function )
					},
					{
						title: 'Edit aircraft',
						type: 'default',
						onPress: expect.any( Function )
					}
				]
			} );
		} );

		describe( 'action sheet\'s delete onPress callback', () => {
			beforeEach( () => {
				actionSheetService.open.mockImplementationOnce( ( { actions } ) => {
					actions[ 0 ].onPress();
				} );
			} );

			itOpensConfirmationModalForExecutingAction( {
				triggerer: () => onAircraftOptionsPressed( aircraftId ),
				modal: DELETE_AIRCRAFT_CONFIRMATION_MODAL,
				modalProps: {
					confirmationButtonOptions: {
						title: 'Delete',
						type: 'destructive'
					}
				},
				actionExpect: () => {
					expect( deleteAircraft.execute ).toHaveBeenCalledWith( aircraftId );
					expect( analyticsService.logDeleteAircraft ).toHaveBeenCalledTimes( 1 );
				},
				successMessage: 'Aircraft deleted.',
				mockActionForFailure: () => {
					deleteAircraft.execute.mockRejectedValueOnce( new NetworkError() );
				},
				modalService,
				snackbarService,
				additionalExamples: ( { triggerAndConfirm, flushPromises } ) => {
					if ( onAircraftDeleted ) {
						it( 'calls the onAircraftDeleted callback with the deleted aircraft ID', async () => {
							triggerAndConfirm();
							await flushPromises();
							expect( onAircraftDeleted ).toHaveBeenCalledWith( aircraftId );
						} );
					}
				}
			} );
		} );
	} );
};
