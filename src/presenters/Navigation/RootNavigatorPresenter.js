export default class RootNavigatorPresenter {
	constructor( {
		authenticationStore,
		fetchPilot,
		getCurrentPilotFromStore,
		pushNotificationsService,
		deepLinkService,
		makeAutoObservable
	} ) {
		this.isLoading = false;
		this.authenticationStore = authenticationStore;
		this.fetchPilot = fetchPilot;
		this.getCurrentPilotFromStore = getCurrentPilotFromStore;
		this.pushNotificationsService = pushNotificationsService;
		this.deepLinkService = deepLinkService;

		makeAutoObservable( this );

		this._initialize();
	}

	get isUserAuthenticated() {
		return this.authenticationStore.isAuthenticated && this._currentPilot;
	}

	_initialize() {
		this.pushNotificationsService.initialize();
		this.deepLinkService.initialize();
		this._fetchCurrentUser();
	}

	async _fetchCurrentUser() {
		this._setIsLoading( true );
		try {
			await this.fetchPilot.execute();
		} catch ( e ) {
			this._resetSession();
		}
		this._setIsLoading( false );
	}

	_setIsLoading( value ) {
		this.isLoading = value;
	}

	_resetSession() {
		this.authenticationStore.deleteUserToken();
	}

	get _currentPilot() {
		return this.getCurrentPilotFromStore.execute();
	}
}
