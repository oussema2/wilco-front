import displayErrorInSnackbar from './Helpers/displayErrorInSnackbar';

export default class RefreshPresenter {
	refreshing = false;

	constructor( {
		makeAutoObservable,
		snackbarService,
		fetchFromRemote,
		onRefreshCallback
	} = {} ) {
		this.fetchFromRemote = fetchFromRemote;
		this.snackbarService = snackbarService;
		this.onRefreshCallback = onRefreshCallback;
		makeAutoObservable( this );
	}

	onRefresh( { showLoader = true } = {} ) {
		this.fetchFromRemote.resetPagination();
		this._fetchData( { showLoader } );
	}

	get isRefreshing() {
		return this.refreshing;
	}

	async _fetchData( { showLoader = true } ) {
		try {
			this._setRefreshing( showLoader && true );
			if ( this.onRefreshCallback ) await this.onRefreshCallback();
			else await this.fetchFromRemote.execute();
		} catch ( error ) {
			displayErrorInSnackbar( error, this.snackbarService );
		} finally {
			this._setRefreshing( false );
		}
	}

	_setRefreshing( refreshing ) {
		this.refreshing = refreshing;
	}
}
