import ConfirmableActionPresenter from '../ConfirmableActionPresenter';
import {
	DELETE_POST_CONFIRMATION_MODAL,
	DELETE_COMMENT_CONFIRMATION_MODAL,
	REPORT_CONFIRMATION_MODAL,
	DELETE_AIRCRAFT_CONFIRMATION_MODAL
} from '../../constants/modals';

export default class ConfirmableActionPresenterBuilder {
	static forDeleteAircraft( {
		aircraftId, deleteAircraft, onSuccess, modalService, snackbarService
	} ) {
		return this._forDeleteEntity( {
			entityId: aircraftId,
			deleteEntity: deleteAircraft,
			confirmationModal: DELETE_AIRCRAFT_CONFIRMATION_MODAL,
			successMessage: 'Aircraft deleted.',
			onSuccess,
			modalService,
			snackbarService
		} );
	}

	static forDeletePost( {
		postId, deletePost, onSuccess, modalService, snackbarService
	} ) {
		return this._forDeleteEntity( {
			entityId: postId,
			deleteEntity: deletePost,
			confirmationModal: DELETE_POST_CONFIRMATION_MODAL,
			successMessage: 'Post deleted.',
			onSuccess,
			modalService,
			snackbarService
		} );
	}

	static forDeleteComment( {
		commentId, deleteComment, modalService, snackbarService
	} ) {
		return this._forDeleteEntity( {
			entityId: commentId,
			deleteEntity: deleteComment,
			confirmationModal: DELETE_COMMENT_CONFIRMATION_MODAL,
			successMessage: 'Comment deleted.',
			modalService,
			snackbarService
		} );
	}

	static forReportPost( {
		postId, createReport, modalService, snackbarService
	} ) {
		return this._forReportEntity( {
			entityId: postId,
			createReport,
			reportableName: 'Post',
			successMessage: 'Post reported.',
			modalService,
			snackbarService
		} );
	}

	static forReportComment( {
		commentId, createReport, onSuccess, modalService, snackbarService
	} ) {
		return this._forReportEntity( {
			entityId: commentId,
			createReport,
			reportableName: 'Comment',
			successMessage: 'Comment reported.',
			onSuccess,
			modalService,
			snackbarService
		} );
	}

	static _forDeleteEntity( {
		entityId,
		deleteEntity,
		confirmationModal,
		successMessage,
		onSuccess,
		modalService,
		snackbarService
	} ) {
		return new ConfirmableActionPresenter( {
			action: () => deleteEntity.execute( entityId ),
			confirmationModal,
			confirmationModalProps: {
				confirmationButtonOptions: {
					title: 'Delete',
					type: 'destructive'
				}
			},
			successMessage,
			onSuccess,
			modalService,
			snackbarService
		} );
	}

	static _forReportEntity( {
		entityId, createReport, reportableName, successMessage, modalService, snackbarService
	} ) {
		return new ConfirmableActionPresenter( {
			action: () => createReport.execute( { reportableId: entityId } ),
			confirmationModal: REPORT_CONFIRMATION_MODAL,
			confirmationModalProps: { reportableName },
			successMessage,
			modalService,
			snackbarService
		} );
	}
}
