import CommentPresenter from '../../presenters/CommentPresenter';
import DateToDisplay from '../../presenters/ToDisplay/DateToDisplay';
import GetCurrentPilotFromStore from '../../interactors/GetCurrentPilotFromStore';
import CommentFactory from '../factories/CommentFactory';
import PilotFactory from '../factories/PilotFactory';
import PilotStore from '../../stores/PilotStore';
import MockModalService from '../mocks/MockModalService';
import { DELETE_COMMENT_CONFIRMATION_MODAL, REPORT_CONFIRMATION_MODAL } from '../../constants/modals';
import AUTHENTICATED_ROUTES from '../../navigation/AuthenticatedRoutes';
import NetworkError from '../../errors/NetworkError';
import { itOpensConfirmationModalForExecutingAction } from '../sharedExamples/confirmableAction';

describe( 'CommentPresenter', () => {
	const comment = CommentFactory.build();
	const pilotStore = new PilotStore();
	const actionSheetService = { open: jest.fn() };
	const deleteComment = { execute: jest.fn() };
	const getCurrentPilotFromStore = new GetCurrentPilotFromStore( { store: pilotStore } );
	const createReport = { execute: jest.fn() };
	const modalService = new MockModalService();
	const navigation = { push: jest.fn(), navigate: jest.fn() };
	const snackbarService = { showError: jest.fn(), showInfo: jest.fn() };
	const analyticsService = { logReportComment: jest.fn() };
	let presenter;

	beforeEach( () => {
		jest.clearAllMocks();
		presenter = new CommentPresenter( {
			comment,
			deleteComment,
			getCurrentPilotFromStore,
			createReport,
			actionSheetService,
			modalService,
			navigation,
			snackbarService,
			analyticsService
		} );
	} );

	describe( 'constructor()', () => {
		it( 'initializes with the correct data', () => {
			expect( presenter.comment ).toEqual( comment );
			expect( presenter.getCurrentPilotFromStore ).toEqual( getCurrentPilotFromStore );
		} );
	} );

	describe( '@commentOptionsWasPressed()', () => {
		describe( 'when the comment is from the current pilot', () => {
			beforeEach( () => {
				pilotStore.entities = [ comment.pilot ];
				pilotStore.currentPilotId = comment.pilot.id;
			} );

			it( 'opens the action sheet with the delete option', () => {
				presenter.commentOptionsWasPressed();
				expect( actionSheetService.open ).toHaveBeenCalledWith( {
					actions: [
						{ title: 'Delete', type: 'destructive', onPress: expect.any( Function ) }
					]
				} );
			} );

			describe( 'action sheet onPress callback', () => {
				beforeEach( () => {
					actionSheetService.open.mockImplementationOnce( ( { actions } ) => {
						actions[ 0 ].onPress();
					} );
				} );

				itOpensConfirmationModalForExecutingAction( {
					triggerer: () => presenter.commentOptionsWasPressed(),
					modal: DELETE_COMMENT_CONFIRMATION_MODAL,
					modalProps: {
						confirmationButtonOptions: {
							title: 'Delete',
							type: 'destructive'
						}
					},
					actionExpect: () => expect( deleteComment.execute ).toHaveBeenCalledWith( comment.id ),
					successMessage: 'Comment deleted.',
					mockActionForFailure: () => {
						deleteComment.execute.mockRejectedValueOnce( new NetworkError() );
					},
					modalService,
					snackbarService
				} );
			} );
		} );

		describe( 'when the post is not from the current pilot', () => {
			beforeEach( () => {
				const pilot = PilotFactory.build();
				pilotStore.entities = [ pilot ];
				pilotStore.currentPilotId = pilot.id;
			} );

			it( 'opens the action sheet with the report option', () => {
				presenter.commentOptionsWasPressed();
				expect( actionSheetService.open ).toHaveBeenCalledWith( {
					actions: [
						{ title: 'Report', type: 'destructive', onPress: expect.any( Function ) }
					]
				} );
			} );

			describe( 'action sheet onPress callback', () => {
				beforeEach( () => {
					actionSheetService.open.mockImplementationOnce( ( { actions } ) => {
						actions[ 0 ].onPress();
					} );
				} );

				itOpensConfirmationModalForExecutingAction( {
					triggerer: () => presenter.commentOptionsWasPressed(),
					modal: REPORT_CONFIRMATION_MODAL,
					modalProps: {
						reportableName: 'Comment'
					},
					actionExpect: () => {
						expect( createReport.execute ).toHaveBeenCalledWith( { reportableId: comment.id } );
					},
					successMessage: 'Comment reported.',
					mockActionForFailure: () => {
						createReport.execute.mockRejectedValueOnce( new NetworkError() );
					},
					modalService,
					snackbarService
				} );
			} );
		} );
	} );

	describe( '@commentPilotWasPressed', () => {
		describe( 'when the comment is from the current pilot', () => {
			beforeEach( () => {
				pilotStore.entities = [ comment.pilot ];
				pilotStore.currentPilotId = comment.pilot.id;
			} );
			it( 'navigates to my profile screen', () => {
				presenter.commentPilotWasPressed();

				expect( navigation.push ).toHaveBeenCalledWith(
					AUTHENTICATED_ROUTES.pilotProfile.name,
					{ enableBackButton: true }
				);
			} );
		} );

		describe( 'when the comment is not from the current pilot', () => {
			beforeEach( () => {
				const pilot = PilotFactory.build();
				pilotStore.entities = [ pilot ];
				pilotStore.currentPilotId = pilot.id;
			} );

			it( 'navigates to the pilot profile screen with the comment\'s pilot ID', () => {
				presenter.commentPilotWasPressed();
				expect( navigation.push ).toHaveBeenCalledWith(
					AUTHENTICATED_ROUTES.pilotProfile.name,
					{ enableBackButton: true, pilotId: comment.pilot.id }
				);
			} );
		} );
	} );

	describe( '@pilotProfilePictureThumbnailSource', () => {
		it( 'returns thumbnail of pilot', () => {
			expect( presenter.pilotProfilePictureThumbnailSource )
				.toEqual( comment.pilot.profilePictureThumbnailSource );
		} );
	} );

	describe( '@dateToDisplay()', () => {
		const expectedDate = new DateToDisplay( { date: comment.createdAt } ).displayShort;
		it( 'returns the comment dateToDisplay', () => {
			expect( presenter.dateToDisplay ).toEqual( expectedDate );
		} );
	} );

	describe( '@pilotName', () => {
		it( 'returns pilot name', () => {
			expect( presenter.pilotName ).toEqual( comment.pilot.name );
		} );
	} );

	describe( '@text()', () => {
		it( 'returns the text', () => {
			expect( presenter.text ).toEqual( comment.text );
		} );
	} );
} );
