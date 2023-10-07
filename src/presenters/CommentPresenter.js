import { makeAutoObservable } from 'mobx';
import DateToDisplay from './ToDisplay/DateToDisplay';
import ConfirmableActionPresenterBuilder from './Builders/ConfirmableActionPresenterBuilder';
import navigateToPilotProfile from './Helpers/navigateToPilotProfile';

export default class CommentPresenter {
	constructor( {
		comment,
		deleteComment,
		getCurrentPilotFromStore,
		createReport,
		actionSheetService,
		modalService,
		navigation,
		snackbarService,
		analyticsService
	} = {} ) {
		this.comment = comment;

		this.deleteComment = deleteComment;
		this.getCurrentPilotFromStore = getCurrentPilotFromStore;
		this.createReport = createReport;

		this.actionSheetService = actionSheetService;
		this.modalService = modalService;
		this.navigation = navigation;
		this.snackbarService = snackbarService;
		this.analyticsService = analyticsService;

		makeAutoObservable( this );
	}

	commentOptionsWasPressed = () => {
		this.actionSheetService.open( {
			actions: this._availableCommentOptions
		} );
	}

	commentPilotWasPressed = () => {
		navigateToPilotProfile( {
			navigation: this.navigation,
			getCurrentPilotFromStore: this.getCurrentPilotFromStore,
			pilotId: this.comment.pilot.id
		} );
	}

	get pilotProfilePictureThumbnailSource() {
		return this.comment.pilot.profilePictureThumbnailSource;
	}

	get dateToDisplay() {
		return new DateToDisplay( { date: this.comment.createdAt } ).displayShort;
	}

	get pilotName() {
		return this.comment.pilot.name;
	}

	get text() {
		return this.comment.text;
	}

	get _availableCommentOptions() {
		return this._isOwnComment ? this._ownCommentOptions : this._otherCommentOptions;
	}

	get _isOwnComment() {
		return this.comment.pilot.id === this.getCurrentPilotFromStore.execute().id;
	}

	get _ownCommentOptions() {
		return [
			{
				title: 'Delete',
				type: 'destructive',
				onPress: this._deleteCommentButtonWasPressed
			}
		];
	}

	get _otherCommentOptions() {
		return [
			{
				title: 'Report',
				type: 'destructive',
				onPress: this._reportCommentButtonWasPressed
			}
		];
	}

	_deleteCommentButtonWasPressed = () => {
		ConfirmableActionPresenterBuilder.forDeleteComment( {
			commentId: this.comment.id,
			deleteComment: this.deleteComment,
			modalService: this.modalService,
			snackbarService: this.snackbarService
		} ).trigger();
	}

	_reportCommentButtonWasPressed = () => {
		ConfirmableActionPresenterBuilder.forReportComment( {
			commentId: this.comment.id,
			createReport: this.createReport,
			onSuccess: () => this.analyticsService.logReportComment( { commentId: this.comment.id } ),
			modalService: this.modalService,
			snackbarService: this.snackbarService
		} ).trigger();
	}
}
