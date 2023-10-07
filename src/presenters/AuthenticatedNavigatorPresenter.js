export default class AuthenticatedNavigatorPresenter {
	constructor( {
		getCurrentPilotFromStore,
		helpCenterService,
		makeAutoObservable
	} = {} ) {
		this._getCurrentPilotFromStore = getCurrentPilotFromStore;
		this._helpCenterService = helpCenterService;
		makeAutoObservable( this );
	}

	get _currentPilot() {
		return this._getCurrentPilotFromStore.execute();
	}

	initialize() {
		if ( this._currentPilot ) {
			this._helpCenterService
				.registerIdentifiedUser( this._currentPilot );
		}
	}
}
