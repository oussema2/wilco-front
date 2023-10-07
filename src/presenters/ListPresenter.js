import RefreshPresenter from './RefreshPresenter';
import displayErrorInSnackbar from './Helpers/displayErrorInSnackbar';

export default class ListPresenter {
	loading = false;

	constructor( {
		makeAutoObservable,
		fetchFromRemote,
		fetchFromRemoteCallback,
		snackbarService
	} = {} ) {
		this.fetchFromRemote = fetchFromRemote;
		this.snackbarService = snackbarService;
		this.fetchFromRemoteCallback = fetchFromRemoteCallback;

		this.refreshPresenter = new RefreshPresenter( {
			fetchFromRemote,
			onRefreshCallback: fetchFromRemoteCallback,
			snackbarService,
			makeAutoObservable
		} );

		makeAutoObservable( this );
	}

	onRefresh() {
		this.refreshPresenter.onRefresh();
	}

	get isRefreshing() {
		return this.refreshPresenter.refreshing;
	}

	get isLoading() {
		return this.loading;
	}

	handleLoadMore() {
		if ( this.pagination?.hasMorePages && !this.isLoading ) {
			this.fetchData();
		}
	}

	async fetchData() {
		try {
			this._setLoading( true );
			if ( this.fetchFromRemoteCallback ) await this.fetchFromRemoteCallback();
			else await this.fetchFromRemote.execute();
		} catch ( error ) {
			displayErrorInSnackbar( error, this.snackbarService );
		} finally {
			this._setLoading( false );
		}
	}

	get pagination() {
		return this.fetchFromRemote.pagination;
	}

	_setLoading( loading ) {
		this.loading = loading;
	}
}
