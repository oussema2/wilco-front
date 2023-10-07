import PilotInfoPresenterBuilder from './Builders/PilotInfoPresenterBuilder';
import displayErrorInSnackbar from './Helpers/displayErrorInSnackbar';
import RefreshPresenter from './RefreshPresenter';
import Pagination from '../entities/Pagination';
import { MEMBERS_TABS } from '../constants/MembersTabs';

export default class MembersPresenter {
	constructor( {
		makeAutoObservable,
		fetchPilotsFromRemote,
		getPilotsFromStore,
		getCurrentPilotFromStore,
		navigation,
		snackbarService,
		rootStore
	} = {} ) {
		this.tabIndex = MEMBERS_TABS.allMembers.index;
		this.fetchPilotsFromRemote = fetchPilotsFromRemote;
		this.getPilotsFromStore = getPilotsFromStore;
		this.getCurrentPilotFromStore = getCurrentPilotFromStore;
		this.navigation = navigation;
		this.snackbarService = snackbarService;
		this.rootStore = rootStore;
		this.membersIds = [];

		this._showMembers = false;
		this._isLoading = false;

		this.refreshPresenter = new RefreshPresenter( {
			fetchFromRemote: fetchPilotsFromRemote,
			snackbarService,
			onRefreshCallback: this._onRefreshCallback,
			makeAutoObservable
		} );

		makeAutoObservable( this );

		const pagination = new Pagination( { perPage: 15 } );
		this.fetchPilotsFromRemote.setPagination( pagination );
		this._fetchData();
	}

	setTabIndex( index ) {
		this.tabIndex = index;
	}

	onRefresh() {
		this.refreshPresenter.onRefresh();
	}

	get isRefreshing() {
		return this.refreshPresenter.refreshing;
	}

	get isLoading() {
		return this._isLoading;
	}

	get showMembers() {
		return this._showMembers;
	}

	get pilotsPresenters() {
		return this._pilots.map( ( pilot ) => (
			this._buildPilotPresenter( pilot )
		) );
	}

	handleLoadMore() {
		if ( this._pagination?.hasMorePages && !this.isLoading ) {
			this._fetchData();
		}
	}

	get _pagination() {
		return this.fetchPilotsFromRemote.pagination;
	}

	async _fetchData() {
		this._setIsLoading( true );
		try {
			let newMembers = await this.fetchPilotsFromRemote.execute();
			let newMembersIds = newMembers.map( ( member ) => ( member.id ) );
			this._setMembersIds( this.membersIds.concat( newMembersIds ) );
			this._setShowMembers( true );
		} catch ( error ) {
			displayErrorInSnackbar( error, this.snackbarService );
		} finally {
			this._setIsLoading( false );
		}
	}

	_setIsLoading( isLoading ) {
		this._isLoading = isLoading;
	}

	_setShowMembers( value ) {
		this._showMembers = value;
	}

	_setMembersIds( membersIds ) {
		this.membersIds = membersIds;
	}

	get _pilots() {
		return this.getPilotsFromStore.execute()
			.filter( ( ( pilot ) => this.membersIds.find( ( memberId ) => ( memberId === pilot.id ) ) ) )
			.slice()
			.sort( ( a, b ) => a.name.localeCompare( b.name ) );
	}

	_buildPilotPresenter( pilot ) {
		return PilotInfoPresenterBuilder.build( {
			pilot,
			getCurrentPilotFromStore: this.getCurrentPilotFromStore,
			navigation: this.navigation
		} );
	}

	_onRefreshCallback = async () => {
		let newMembersIds = ( await this.fetchPilotsFromRemote
			.execute() ).map( ( member ) => ( member.id ) );
		this._setMembersIds( newMembersIds );
	}
}
