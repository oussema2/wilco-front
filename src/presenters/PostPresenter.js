import PostFlightPresenter from './PostFlightPresenter';
import PostActionBarPresenter from './PostActionBarPresenter';
import ConfirmableActionPresenterBuilder from './Builders/ConfirmableActionPresenterBuilder';
import DateToDisplay from './ToDisplay/DateToDisplay';
import navigateToPilotProfile from './Helpers/navigateToPilotProfile';
import AUTHENTICATED_ROUTES from '../navigation/AuthenticatedRoutes';
import CommentPresenterBuilder from './Builders/CommentPresenterBuilder';

export default class PostPresenter {
	constructor( {
		post,
		getCurrentPilotFromStore,
		likePost,
		unlikePost,
		deletePost,
		createReport,
		actionSheetService,
		modalService,
		navigation,
		onDeleteSuccess,
		snackbarService,
		analyticsService,
		rootStore,
		getCommentsFromStore,
		makeAutoObservable
	} = {} ) {
		this.post = post;
		this.rootStore = rootStore;
		this.getCurrentPilotFromStore = getCurrentPilotFromStore;
		this.deletePost = deletePost;
		this.createReport = createReport;

		this.actionSheetService = actionSheetService;
		this.modalService = modalService;
		this.onDeleteSuccess = onDeleteSuccess;
		this.navigation = navigation;
		this.snackbarService = snackbarService;
		this.analyticsService = analyticsService;
		this.getCommentsFromStore = getCommentsFromStore;

		makeAutoObservable( this );

		this.flightPresenter = post.flight ? this._buildFlightPresenter() : null;
		this.actionBarPresenter = new PostActionBarPresenter( {
			post, likePost, unlikePost, snackbarService, analyticsService, makeAutoObservable
		} );
	}

	likeButtonWasPressed = () => {
		this.actionBarPresenter.onLikePressed();
	}

	postOptionsWasPressed = () => {
		this.actionSheetService.open( {
			actions: this._availablePostOptions
		} );
	}

	pilotWasPressed = () => {
		navigateToPilotProfile( {
			navigation: this.navigation,
			getCurrentPilotFromStore: this.getCurrentPilotFromStore,
			pilotId: this.post.pilot.id
		} );
	}

	onMentionPressed = ( id ) => {
		navigateToPilotProfile( {
			navigation: this.navigation,
			getCurrentPilotFromStore: this.getCurrentPilotFromStore,
			// eslint-disable-next-line radix
			pilotId: parseInt( id )
		} );
	}

	get dateToDisplay() {
		return new DateToDisplay( { date: this.post.createdAt } ).displayShort;
	}

	get numberOfLikes() {
		return this.actionBarPresenter.numberOfLikes;
	}

	get numberOfComments() {
		return this.post.numberOfComments;
	}

	get pilotName() {
		return this.post.pilot.name;
	}

	get privacy() {
		return this.post.visibility;
	}

	get isEdited() {
		return this.post.edited;
	}

	get pilotProfilePictureSource() {
		return this.post.pilot.profilePictureSource;
	}

	get text() {
		return this.post.text;
	}

	get title() {
		return this.post.title;
	}

	get liked() {
		return this.actionBarPresenter.liked;
	}

	get likeOrUnlikeInProgress() {
		return this.actionBarPresenter.likeOrUnlikeInProgress;
	}

	get hasImages() {
		return !!this.post.photoUrls || !!this.post.trackSource;
	}

	get imagePreviewSources() {
		return [ ...this.post.photoPreviewSources, this.post.trackSource ].filter( Boolean );
	}

	get imageSources() {
		return [ ...this.post.photoSources, this.post.trackSource ].filter( Boolean );
	}

	get hasAnyCommunityTag() {
		return this.communityTags?.length > 0;
	}

	get previewCommentPresenters() {
		return this.getCommentsFromStore.execute( this.post.id ).map( ( comment ) => (
			CommentPresenterBuilder.build( {
				comment,
				modalService: this.modalService,
				rootStore: this.rootStore,
				actionSheetService: this.actionSheetService,
				navigation: this.navigation,
				snackbarService: this.snackbarService,
				analyticsService: this.analyticsService
			} )
		) ).slice( 0, 2 );
	}

	get showSeeAllCommentsButton() {
		return this.previewCommentPresenters.length > 1
		&& this.numberOfComments > 2;
	}

	get communityTags() {
		return this.post.communityTags;
	}

	get airports() {
		return this.post.airports;
	}

	_buildFlightPresenter() {
		return new PostFlightPresenter( { postFlight: this.post.flight } );
	}

	get _availablePostOptions() {
		return this._isOwnPost ? this._ownPostOptions : this._otherPostOptions;
	}

	get _isOwnPost() {
		return this.post.pilot.id === this.getCurrentPilotFromStore.execute().id;
	}

	get _ownPostOptions() {
		return [
			{
				title: 'Delete',
				type: 'destructive',
				onPress: this._deletePostButtonWasPressed
			},
			{
				title: 'Edit',
				type: 'default',
				onPress: this._editPostButtonWasPressed
			}
		];
	}

	get _otherPostOptions() {
		return [
			{
				title: 'Report',
				type: 'destructive',
				onPress: this._reportPostButtonWasPressed
			}
		];
	}

	_deletePostButtonWasPressed = () => {
		ConfirmableActionPresenterBuilder.forDeletePost( {
			postId: this.post.id,
			deletePost: this.deletePost,
			onSuccess: () => {
				this.analyticsService.logDeletePost();
				if ( this.onDeleteSuccess ) this.onDeleteSuccess();
			},
			modalService: this.modalService,
			snackbarService: this.snackbarService
		} ).trigger();
	}

	_editPostButtonWasPressed = () => {
		this.navigation.navigate(
			AUTHENTICATED_ROUTES.editPostStack.name,
			{ screen: AUTHENTICATED_ROUTES.editPost.name, params: { postId: this.post.id } }
		);
	}

	_reportPostButtonWasPressed = () => {
		ConfirmableActionPresenterBuilder.forReportPost( {
			postId: this.post.id,
			createReport: this.createReport,
			onSuccess: () => this.analyticsService.logReportPost( { postId: this.post.id } ),
			modalService: this.modalService,
			snackbarService: this.snackbarService
		} ).trigger();
	}
}
