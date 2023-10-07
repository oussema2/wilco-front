import ConfirmableActionPresenter from './ConfirmableActionPresenter';
import { DISCARD_POST_FILTER_CHANGES_CONFIRMATION_MODAL } from '../constants/modals';

export default class FilterPostsPresenter {
	isFilterModalVisible = false;

	constructor( {
		snackbarService,
		makeAutoObservable,
		modalService,
		fetchCommunityTagsFromRemote,
		getCommunityTagsFromStore,
		onRefresh,
		analyticsService
	} = {} ) {
		this._modalService = modalService;
		this._selectedItems = [];
		this._snackbarService = snackbarService;
		this._fetchCommunityTagsFromRemote = fetchCommunityTagsFromRemote;
		this._getCommunityTagsFromStore = getCommunityTagsFromStore;
		this._isLoadingTags = false;
		this._items = [];
		this._onRefresh = onRefresh;
		this._analyticsService = analyticsService;

		makeAutoObservable( this );

		this._fetchCommunityTags();
	}

	setIsFilterModalVisible = ( value ) => {
		this.isFilterModalVisible = value;
		if ( value ) this._fetchCommunityTags();
	}

	onSelectionsChange = ( selectedItems ) => {
		this._selectedItems = selectedItems;
	};

	selectAll = () => {
		this._selectedItems = this.tagsFromStore;
	}

	clearSelection = () => {
		this._selectedItems = [];
	}

	get backArrowHeaderButton() {
		return () => this._backArrowButtonPressed();
	}

	_backArrowButtonPressed() {
		if ( !this._areSelectedItemsTheSameAsItems() ) {
			return this._openDiscardChangesModal();
		}
		return this.navigationBack();
	}

	_openDiscardChangesModal() {
		new ConfirmableActionPresenter( {
			action: () => this.navigationBack(),
			confirmationModal: DISCARD_POST_FILTER_CHANGES_CONFIRMATION_MODAL,
			modalService: this._modalService
		} ).trigger();
	}

	navigationBack() {
		this.setIsFilterModalVisible( false );
		this._resetSelection();
	}

	_areSelectedItemsTheSameAsItems() {
		return this._selectedItems.sort().toString() === this._items.sort().toString();
	}

	_resetSelection = () => {
		this._selectedItems = this._items;
	}

	applySelection = () => {
		this._items = this._selectedItems;
		this.setIsFilterModalVisible( false );
		this._onRefresh();
		this._analyticsService.logApplyFilter();
	}

	get selectedItems() {
		return this._selectedItems;
	}

	removeTag = ( _tag ) => {
		this.onSelectionsChange( this._items.filter( ( e ) => e.label !== _tag ) );
		this.applySelection();
	}

	get items() {
		return this._items;
	}

	get itemsLabels() {
		return this.items?.map( ( item ) => item.label );
	}

	get hasAnyTag() {
		return this.items.length > 0;
	}

	get tagsFromStore() {
		const tags = this._getCommunityTagsFromStore.execute()
			?.map( ( item ) => ( { value: item.id, label: item.name } ) );
		return this._sortListByLabel( tags );
	}

	_sortListByLabel( list ) {
		return list?.slice().sort( ( a, b ) => a.label.localeCompare( b.label ) );
	}

	async _fetchCommunityTags() {
		this._setIsLoadingTags( true );
		try {
			await this._fetchCommunityTagsFromRemote.execute();
		} finally {
			this._setIsLoadingTags( false );
		}
	}

	get isLoading() {
		return this._isLoadingTags;
	}

	_setIsLoadingTags( isLoadingTags ) {
		this._isLoadingTags = isLoadingTags;
	}
}
