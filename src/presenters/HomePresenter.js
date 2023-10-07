import _ from 'lodash';
import { reaction } from 'mobx';
import FilterPostsPresenter from './FilterPostsPresenter';
import AUTHENTICATED_ROUTES from '../navigation/AuthenticatedRoutes';
import HomePostListPresenter from './HomePostListPresenter';
import { HOME_TABS } from '../constants/HomeTabs';

export default class HomePresenter {
	loading = false;

	constructor( {
		initialIndex,
		makeAutoObservable,
		fetchPostsFromRemote,
		fetchMyFeedPostsFromRemote,
		getPostsFromStore,
		getMyFeedPostsFromStore,
		getCurrentPilotFromStore,
		navigation,
		modalService,
		rootStore,
		actionSheetService,
		snackbarService,
		fetchCommunityTagsFromRemote,
		getCommunityTagsFromStore,
		tooltipManager,
		analyticsService
	} = {} ) {
		this.tabIndex = initialIndex || HOME_TABS.allPosts.index;
		this.fetchPostsFromRemote = fetchPostsFromRemote;
		this.fetchMyFeedPostsFromRemote = fetchMyFeedPostsFromRemote;
		this.getPostsFromStore = getPostsFromStore;
		this.getMyFeedPostsFromStore = getMyFeedPostsFromStore;
		this.getCurrentPilotFromStore = getCurrentPilotFromStore;
		this.navigation = navigation;
		this.modalService = modalService;
		this.rootStore = rootStore;
		this.actionSheetService = actionSheetService;
		this.snackbarService = snackbarService;
		this.analyticsService = analyticsService;
		this.tooltipManager = tooltipManager;
		this.makeAutoObservable = makeAutoObservable;
		this.hashtags = [];

		this.filterPostsPresenter = new FilterPostsPresenter( {
			snackbarService,
			makeAutoObservable,
			modalService,
			fetchCommunityTagsFromRemote,
			getCommunityTagsFromStore,
			onRefresh: this._resetPaginationAndFetch,
			analyticsService
		} );

		reaction(
			() => this.hashtags,
			this._resetPaginationAndFetch
		);

		makeAutoObservable( this );

		this._fetchData();
	}

	get homePostListPresenter() {
		return new HomePostListPresenter( {
			makeAutoObservable: this.makeAutoObservable,
			fetchPostsFromRemote: this.fetchPostsFromRemote,
			getPostsFromStore: this.getPostsFromStore,
			getCurrentPilotFromStore: this.getCurrentPilotFromStore,
			navigation: this.navigation,
			modalService: this.modalService,
			rootStore: this.rootStore,
			actionSheetService: this.actionSheetService,
			snackbarService: this.snackbarService,
			analyticsService: this.analyticsService,
			tags: this.filterPostsPresenter.itemsLabels,
			hashtags: this.hashtags
		} );
	}

	get myFeedListPresenter() {
		return new HomePostListPresenter( {
			makeAutoObservable: this.makeAutoObservable,
			fetchPostsFromRemote: this.fetchMyFeedPostsFromRemote,
			getPostsFromStore: this.getMyFeedPostsFromStore,
			getCurrentPilotFromStore: this.getCurrentPilotFromStore,
			navigation: this.navigation,
			modalService: this.modalService,
			rootStore: this.rootStore,
			actionSheetService: this.actionSheetService,
			snackbarService: this.snackbarService,
			analyticsService: this.analyticsService,
			tags: this.filterPostsPresenter.itemsLabels,
			hashtags: this.hashtags
		} );
	}

	setTabIndex( index ) {
		this.tabIndex = index;
	}

	onTooltipClosed = () => {
		this.tooltipManager.setHomePreferencesTooltipAsSeen();
	};

	get isHomePreferencesTooltipWasSeen() {
		return this.tooltipManager.isHomePreferencesTooltipWasSeen;
	}

	get hasAnyTag() {
		return this.filterPostsPresenter.hasAnyTag;
	}

	get hasAnyHashtag() {
		return this.hashtags.length > 0;
	}

	get isFilterApplied() {
		return this.hasAnyHashtag || this.hasAnyTag;
	}

	onPreferencesButtonPressed = () => {
		this.navigation.navigate( AUTHENTICATED_ROUTES.preferences.name );
	};

	onTooltipButtonPressed = () => {
		this.navigation.navigate( AUTHENTICATED_ROUTES.preferences.name );
	}

	_resetPaginationAndFetch = async () => {
		this.homePostListPresenter.resetPaginationAndFetch();
		this.myFeedListPresenter.resetPaginationAndFetch();
	};

	_fetchData() {
		this.homePostListPresenter.fetchData();
		this.myFeedListPresenter.fetchData();
	}

	onHashtagLinkPressed = ( hashtag ) => {
		this.hashtags = _.union( this.hashtags.slice(), [ hashtag ] );
	}

	onRemoveHashtagPressed = ( hashtag ) => {
		this.hashtags = _.pull( this.hashtags.slice(), hashtag.replace( '#', '' ) );
	}
}
