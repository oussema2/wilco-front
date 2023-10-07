import { runInAction } from 'mobx';
import CommentPresenterBuilder from './Builders/CommentPresenterBuilder';
import PostPresenterBuilder from './Builders/PostPresenterBuilder';
import Form from '../forms/Form';
import noop from '../helpers/noop';
import fields from '../forms/commentFields';
import displayErrorInSnackbar from './Helpers/displayErrorInSnackbar';
import { ROUTES } from '../navigation/MainTabNavigator/routes';
import Pagination from '../entities/Pagination';

export default class PostDetailPresenter {
	isCommenting = false;

	loadingComments = false;

	loadingPost = false;

	refreshing = false;

	constructor( {
		postId,
		getPostFromStore,
		getCommentsFromStore,
		fetchCommentsFromRemote,
		createComment,
		navigation,
		modalService,
		analyticsService,
		rootStore,
		actionSheetService,
		snackbarService,
		makeAutoObservable,
		fetchPostFromRemote,
		keyboard,
		scrollToEnd,
		scrollToFirstCommentCallback
	} = {} ) {
		this.scrollToEnd = scrollToEnd;
		this.postId = postId;
		this.postPresenter = null;
		this.getPostFromStore = getPostFromStore;
		this.getCommentsFromStore = getCommentsFromStore;
		this.fetchCommentsFromRemote = fetchCommentsFromRemote;
		this.fetchPostFromRemote = fetchPostFromRemote;
		this.createComment = createComment;
		this.keyboard = keyboard;
		this.scrollToFirstCommentCallback = scrollToFirstCommentCallback;
		this.navigation = navigation;
		this.modalService = modalService;
		this.analyticsService = analyticsService;
		this.rootStore = rootStore;
		this.actionSheetService = actionSheetService;
		this.snackbarService = snackbarService;

		this.formHooks = {
			onSuccess: this.onSubmitSuccess
		};
		this.form = new Form( { fields }, { hooks: this.formHooks } );

		makeAutoObservable( this );

		const pagination = new Pagination( { perPage: 15 } );
		this.fetchCommentsFromRemote.setPagination( pagination );

		this._checkPost();
	}

	_checkPost() {
		if ( !this.post ) {
			this._fetchPost( ( loading ) => this._setLoadingPost( loading ) );
		} else {
			this._createPostPresenter( this.post );
			this._fetchPost( noop );
		}
	}

	_displayPostDeletedError( ) {
		this.snackbarService.showError( { message: 'The post was deleted.' } );
	}

	onSubmitSuccess = async ( form ) => {
		if ( !this.isCommenting ) {
			this.setIsCommenting( true );
			const { text } = form.values();
			try {
				await this.onCreateComment( text );
				this._dismissKeyboard();
				this.setScrollToEnd( true );
			} catch ( error ) {
				displayErrorInSnackbar( error, this.snackbarService );
			} finally {
				runInAction( this.clear );
				this.setIsCommenting( false );
			}
		}
	};

	async onCreateComment( text ) {
		await this.createComment.execute( { postId: this.postId, text } );
		this.analyticsService.logNewComment( { postId: this.postId, text } );
	}

	onRefresh() {
		this._pagination.resetLastPage();
		this._fetchPost( ( refreshing ) => this._setRefreshing( refreshing ) );
	}

	get isRefreshing() {
		return this.refreshing;
	}

	backButtonWasPressed = () => {
		this._goBack();
	}

	setIsCommenting( isCommenting ) {
		this.isCommenting = isCommenting;
	}

	setScrollToEnd( scrollToEnd ) {
		this.scrollToEnd = scrollToEnd;
	}

	get commentPresenters() {
		return this.getCommentsFromStore.execute( this.postId ).map( ( comment ) => (
			CommentPresenterBuilder.build( {
				comment,
				modalService: this.modalService,
				rootStore: this.rootStore,
				actionSheetService: this.actionSheetService,
				navigation: this.navigation,
				snackbarService: this.snackbarService,
				analyticsService: this.analyticsService
			} )
		) );
	}

	get post() {
		return this.getPostFromStore.execute( this.postId );
	}

	get title() {
		return `${this.postPresenter?.post.pilot.firstName}'s post`;
	}

	handleLoadMore() {
		if ( this._pagination?.hasMorePages && !this.isLoadingComments ) {
			this._fetchComments();
		}
	}

	async _fetchComments() {
		try {
			this._setLoadingComments( true );
			await this.fetchCommentsFromRemote.execute( this.postPresenter.post );
		} catch ( error ) {
			displayErrorInSnackbar( error, this.snackbarService );
		} finally {
			this._setLoadingComments( false );
			this._scrollToFirstComment();
		}
	}

	_scrollToFirstComment() {
		if ( this._pagination?.page === 1 && this._hasAnyComment ) this.scrollToFirstCommentCallback();
	}

	get _hasAnyComment() {
		return this.commentPresenters.length > 0;
	}

	_createPostPresenter( post ) {
		this.postPresenter = PostPresenterBuilder.build( {
			post,
			modalService: this.modalService,
			rootStore: this.rootStore,
			actionSheetService: this.actionSheetService,
			analyticsService: this.analyticsService,
			navigation: this.navigation,
			onDeleteSuccess: () => this._goBack(),
			snackbarService: this.snackbarService
		} );
	}

	get isLoadingComments() {
		return this.loadingComments;
	}

	get isLoadingPost() {
		return this.loadingPost;
	}

	clear = () => {
		this.form.clear();
	};

	get _pagination() {
		return this.fetchCommentsFromRemote.pagination;
	}

	_dismissKeyboard() {
		this.keyboard.dismiss();
	}

	_setLoadingComments = ( loadingComments ) => {
		this.loadingComments = loadingComments;
	}

	_setLoadingPost = ( loadingPost ) => {
		this.loadingPost = loadingPost;
	}

	_setRefreshing( refreshing ) {
		this.refreshing = refreshing;
	}

	_goBack() {
		this.navigation.goBack();
	}

	async _fetchPost( setIsLoading ) {
		try {
			setIsLoading( true );
			await this.fetchPostFromRemote.execute( this.postId );

			const storePost = this.getPostFromStore.execute( this.postId );
			this._createPostPresenter( storePost );

			this._fetchComments();
		} catch ( error ) {
			displayErrorInSnackbar( error, this.snackbarService );
			this.navigation.navigate( ROUTES.Home.name );
		} finally {
			setIsLoading( false );
		}
	}
}
