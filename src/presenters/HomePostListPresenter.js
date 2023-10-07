import displayErrorInSnackbar from './Helpers/displayErrorInSnackbar';
import PostListPresenter from './PostListPresenter';
import RefreshPresenter from './RefreshPresenter';
import AUTHENTICATED_ROUTES from '../navigation/AuthenticatedRoutes';

export default class HomePostListPresenter {
	loading = false;

	constructor( {
		makeAutoObservable,
		fetchPostsFromRemote,
		getPostsFromStore,
		getCurrentPilotFromStore,
		navigation,
		modalService,
		rootStore,
		actionSheetService,
		snackbarService,
		analyticsService,
		tags,
		hashtags
	} = {} ) {
		this.fetchPostsFromRemote = fetchPostsFromRemote;
		this.getPostsFromStore = getPostsFromStore;
		this.getCurrentPilotFromStore = getCurrentPilotFromStore;
		this.navigation = navigation;
		this.modalService = modalService;
		this.rootStore = rootStore;
		this.actionSheetService = actionSheetService;
		this.snackbarService = snackbarService;
		this.analyticsService = analyticsService;
		this.tags = tags;
		this.hashtags = hashtags;

		this.refreshPresenter = new RefreshPresenter( {
			fetchFromRemote: fetchPostsFromRemote,
			onRefreshCallback: this._onRefreshCallback,
			snackbarService,
			makeAutoObservable
		} );

		makeAutoObservable( this );
	}

	onRefresh = () => {
		this.refreshPresenter.onRefresh();
	}

	get isRefreshing() {
		return this.refreshPresenter.isRefreshing;
	}

	contentWasPressed = ( postId ) => {
		this._postListPresenter.contentWasPressed( postId );
	};

	commentButtonWasPressed = ( postId ) => {
		this._postListPresenter.commentButtonWasPressed( postId );
	};

	get postPresenters() {
		return this._postListPresenter.postPresenters;
	}

	get isLoading() {
		return this.loading;
	}

	handleLoadMore = () => {
		if ( this._pagination?.hasMorePages && !this.isLoading ) {
			this.fetchData();
		}
	}

	get showPlaceholder() {
		return ( this.postPresenters?.length === 0
				&& !this.isLoading
				&& !this.refreshPresenter.isRefreshing );
	}

	get placeholderText() {
		return ( this.pilot?.airports.length > 0
			? "For now, we didn't find any post that matches your preferences."
			: 'Posts from your preferred airports will appear here. Please set them up via your preferences.' );
	}

	get pilot() {
		return this.getCurrentPilotFromStore?.execute();
	}

	onPreferencesButtonPressed = () => {
		this.navigation.navigate( AUTHENTICATED_ROUTES.preferences.name );
	};

	onTooltipButtonPressed = () => {
		this.navigation.navigate( AUTHENTICATED_ROUTES.preferences.name );
	}

	get _postListPresenter() {
		return new PostListPresenter( {
			posts: this.getPostsFromStore.execute(),
			modalService: this.modalService,
			rootStore: this.rootStore,
			actionSheetService: this.actionSheetService,
			navigation: this.navigation,
			snackbarService: this.snackbarService,
			analyticsService: this.analyticsService,
			tags: this.tags,
			hashtags: this.hashtags
		} );
	}

	async fetchData() {
		try {
			this._setLoading( true );
			await this.fetchPostsFromRemote.execute(
				{
					community_tags: this.tags,
					hashtags: this.hashtags
				} );
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

	resetPaginationAndFetch = async () => {
		this.fetchPostsFromRemote.resetPagination();
		this.fetchData();
	};

	_onRefreshCallback = async () => {
		await this.fetchPostsFromRemote.execute(
			{
				community_tags: this.tags,
				hashtags: this.hashtags
			}
		);
	};
}
