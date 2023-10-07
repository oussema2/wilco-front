import { makeAutoObservable } from 'mobx';
import CurrentPilotProfilePresenter from './CurrentPilotProfilePresenter';
import OtherPilotProfilePresenter from './OtherPilotProfilePresenter';
import PostFlightPresenterBuilder from './Builders/PostFlightPresenterBuilder';
import PilotPostsPresenter from './PilotPostsPresenter';
import RefreshPresenter from './RefreshPresenter';

export default class PilotProfilePresenter {
	constructor( {
		pilotId,
		navigation,
		analyticsService,
		getCurrentPilotFromStore,
		getPilotFromStore,
		fetchPilotFromRemote,
		fetchPostsFromRemote,
		getPostsFromStore,
		modalService,
		rootStore,
		actionSheetService,
		snackbarService,
		blockUser
	} ) {
		this._pilotId = pilotId;
		this.navigation = navigation;
		this.analyticsService = analyticsService;
		this.getPilotFromStore = getPilotFromStore;
		this.getCurrentPilotFromStore = getCurrentPilotFromStore;
		this.fetchPilotFromRemote = fetchPilotFromRemote;
		this.fetchPostsFromRemote = fetchPostsFromRemote;
		this.actionSheetService = actionSheetService;
		this.modalService = modalService;
		this.snackbarService = snackbarService;
		this.blockUser = blockUser;
		this.makeAutoObservable = makeAutoObservable;

		this.state = this._getState();

		this.refreshPresenter = new RefreshPresenter( {
			fetchFromRemote: fetchPostsFromRemote,
			onRefreshCallback: this._onRefreshCallback,
			snackbarService,
			makeAutoObservable
		} );

		this._pilotPostsPresenter = new PilotPostsPresenter( {
			pilot: this.state.pilot,
			fetchPostsFromRemote,
			getPostsFromStore,
			navigation,
			modalService,
			rootStore,
			actionSheetService,
			snackbarService,
			analyticsService,
			makeAutoObservable
		} );

		makeAutoObservable( this );
	}

	onRefresh = () => {
		this.refreshPresenter.onRefresh();
	}

	get isRefreshing() {
		return this.refreshPresenter.refreshing;
	}

	get pilotPostsPresenter() {
		return this._pilotPostsPresenter;
	}

	get navigationBarTitle() {
		return this.state.navigationBarTitle;
	}

	get pilot() {
		return this.state.pilot;
	}

	get hasCommunityTags() {
		return this.communityTags?.length > 0;
	}

	get hasAnyCredential() {
		return this.certificates?.length > 0 || this.ratings?.length > 0;
	}

	get hasAnyRole() {
		return this.roles?.length > 0;
	}

	get hasTotalHours() {
		return this.pilot.hasTotalHours;
	}

	get certificates() {
		return this.pilot.certificates?.slice().sort( this._byName );
	}

	get ratings() {
		return this.pilot.ratings?.slice().sort( this._byName );
	}

	_sortByTagName = ( a, b ) => a.localeCompare( b );

	get communityTags() {
		return this.pilot.communityTags?.slice().sort( this._sortByTagName );
	}

	get roles() {
		return this.pilot.roles?.slice().sort( this._byNameThenCustom );
	}

	get totalHours() {
		return this.pilot.totalHours;
	}

	get latestFlightsPresenters() {
		return this.pilot.latestFlights?.map( ( postFlight ) => PostFlightPresenterBuilder.build( {
			postFlight
		} ) );
	}

	get hasLatestFlights() {
		return this.pilot.latestFlights?.length > 0;
	}

	get emptyLatestFlightsText() {
		return this.state.emptyLatestFlightsText;
	}

	get emptyCredentialsText() {
		return this.state.emptyCredentialsText;
	}

	get emptyCommunitiesText() {
		return this.state.emptyCommunitiesText;
	}

	get emptyRolesText() {
		return this.state.emptyRolesText;
	}

	get emptyPostsText() {
		return this.state.emptyPostsText;
	}

	get emptyTotalHoursText() {
		return this.state.emptyTotalHoursText;
	}

	get shareFlightButtonTitle() {
		return 'Share a flight';
	}

	get hasBasicInfo() {
		return !!this.pilot.description
				|| !!this.pilot.homeAirport
				|| !!this.pilot.primaryAircraft;
	}

	get noBasicInfoText() {
		return this.state.noBasicInfoText;
	}

	get backButtonWasPressed() {
		return () => this.navigation.goBack();
	}

	get editProfileButtonWasPressed() {
		return this.state.editProfileButtonWasPressed;
	}

	get headerRightButtonWasPressed() {
		return this.state.headerRightButtonWasPressed;
	}

	get headerRightImageSource() {
		return this.state.headerRightImageSource;
	}

	get shareFlightButtonWasPressed() {
		return this.state.shareFlightButtonWasPressed;
	}

	get isLoading() {
		return this.state.isLoading;
	}

	get sharePostsButtonWasPressed() {
		return this.state.sharePostsButtonWasPressed;
	}

	get onSendMessageButtonPressed() {
		return this.state.onSendMessageButtonPressed;
	}

	get _isOwnProfile() {
		return !this._pilotId;
	}

	_byName = ( a, b ) => a.name.localeCompare( b.name );

	_byCustom = ( a ) => {
		if ( a.custom ) return 1;
		return -1;
	}

	_byNameThenCustom = ( a, b ) => {
		if ( a.custom === b.custom ) {
			return this._byName( a, b );
		}
		return this._byCustom( a );
	}

	_getState() {
		if ( this._isOwnProfile ) {
			this.analyticsService.logViewOwnProfile();
			return new CurrentPilotProfilePresenter( {
				navigation: this.navigation,
				getCurrentPilotFromStore: this.getCurrentPilotFromStore
			} );
		}

		this.analyticsService.logViewAnotherUserProfile();
		return new OtherPilotProfilePresenter( {
			pilotId: this._pilotId,
			navigation: this.navigation,
			getPilotFromStore: this.getPilotFromStore,
			fetchPilotFromRemote: this.fetchPilotFromRemote,
			actionSheetService: this.actionSheetService,
			modalService: this.modalService,
			snackbarService: this.snackbarService,
			blockUser: this.blockUser,
			getCurrentPilotFromStore: this.getCurrentPilotFromStore,
			makeAutoObservable: this.makeAutoObservable
		} );
	}

	_onRefreshCallback = async () => {
		if ( this.pilot ) {
			await this.fetchPostsFromRemote.execute( this.pilot );
			await this.fetchPilotFromRemote.execute( this.pilot.id );
		}
	};
}
