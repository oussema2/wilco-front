import displayErrorInSnackbar from './Helpers/displayErrorInSnackbar';
import Pagination from '../entities/Pagination';
import PostListPresenter from './PostListPresenter';

export default class PilotPostsPresenter {
	loading = false;

	constructor( {
		pilot,
		makeAutoObservable,
		fetchPostsFromRemote,
		getPostsFromStore,
		navigation,
		modalService,
		rootStore,
		actionSheetService,
		snackbarService,
		analyticsService
	} = {} ) {
		this.pilot = pilot;
		this.fetchPostsFromRemote = fetchPostsFromRemote;
		this.getPostsFromStore = getPostsFromStore;

		this.navigation = navigation;
		this.modalService = modalService;
		this.rootStore = rootStore;
		this.actionSheetService = actionSheetService;
		this.snackbarService = snackbarService;
		this.analyticsService = analyticsService;

		makeAutoObservable( this );

		const pagination = new Pagination( { perPage: 15 } );
		this.fetchPostsFromRemote.setPagination( pagination );
	}

	contentWasPressed = ( postId ) => {
		this._postListPresenter.contentWasPressed( postId );
	};

	commentButtonWasPressed = ( postId ) => {
		this._postListPresenter.commentButtonWasPressed( postId );
	};

	get hasAnyPost() {
		return this._postListPresenter.hasAnyPost;
	}

	get postPresenters() {
		return this._postListPresenter.postPresenters;
	}

	get isLoading() {
		return this.loading;
	}

	handleLoadMore = () => {
		if ( this._pagination?.hasMorePages && !this.isLoading ) {
			this._fetchData();
		}
	}

	get _postListPresenter() {
		return new PostListPresenter( {
			posts: this.getPostsFromStore.execute( this.pilot?.id ),
			modalService: this.modalService,
			rootStore: this.rootStore,
			actionSheetService: this.actionSheetService,
			navigation: this.navigation,
			snackbarService: this.snackbarService,
			analyticsService: this.analyticsService,
			tags: []
		} );
	}

	async _fetchData() {
		try {
			this._setLoading( true );
			await this.fetchPostsFromRemote.execute( this.pilot );
		} catch ( error ) {
			displayErrorInSnackbar( error, this.snackbarService );
		} finally {
			this._setLoading( false );
		}
	}

	get _pagination() {
		return this.fetchPostsFromRemote.pagination;
	}

	_setLoading( loading ) {
		this.loading = loading;
	}
}
