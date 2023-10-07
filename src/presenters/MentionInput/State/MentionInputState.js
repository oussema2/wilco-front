import { debounce } from 'lodash';
import { makeAutoObservable, reaction } from 'mobx';
import { DEBOUNCE_TIME_DEFAULT } from '../../../constants/theme';

export default class MentionInputState {
	constructor( {
		fetchEntitiesFromRemote,
		getEntitiesFromStore,
		searchKey
	} ) {
		this.keyword = undefined;
		this._isLoading = false;
		this.fetchEntitiesFromRemote = fetchEntitiesFromRemote;
		this.getEntitiesFromStore = getEntitiesFromStore;
		this.searchKey = searchKey;
		this._debounceSearch = debounce( this.search, DEBOUNCE_TIME_DEFAULT );

		reaction(
			() => this.keyword,
			() => this._debounceSearch()
		);

		makeAutoObservable( this );
	}

	get suggestions() {
		return this._copyAndSortAlphabetically( this.getEntitiesFromStore.execute() );
	}

	get hasKeyword() {
		return !!this.keyword;
	}

	get isLoadingSuggestions() {
		return !!this._isLoading;
	}

	onKeywordChanged = ( keyword ) => {
		this.keyword = keyword;
	};

	async search() {
		this._handleLoadingWhenDoing( async () => {
			this.fetchEntitiesFromRemote.resetPagination();
			await this.fetchEntitiesFromRemote.execute( this._params );
		} );
	}

	// Private
	_copyAndSortAlphabetically = ( array ) => array
		.slice()
		.sort( ( a, b ) => a.name.localeCompare( b.name ) );

	_handleLoadingWhenDoing = async ( callback ) => {
		try {
			this._setIsLoading( true );
			await callback();
		} finally {
			this._setIsLoading( false );
		}
	};

	_setIsLoading( isLoading ) {
		this._isLoading = isLoading;
	}

	get _params() {
		let params = {};
		params[ this.searchKey ] = this.keyword;
		return params;
	}
}
