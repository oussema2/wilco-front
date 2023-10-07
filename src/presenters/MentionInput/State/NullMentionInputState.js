import { debounce } from 'lodash';
import { makeAutoObservable, reaction } from 'mobx';

export default class NullMentionInputState {
	constructor() {
		this.keyword = undefined;
		this._isLoading = false;
		this._debounceSearch = debounce( this.search, 300 );

		reaction(
			() => this.keyword,
			() => this._debounceSearch()
		);

		makeAutoObservable( this );
	}

	get suggestions() {
		return [];
	}

	search() {}

	get hasKeyword() {
		return false;
	}

	get isLoadingSuggestions() {
		return false;
	}

	onKeywordChanged = () => {};

	_setIsLoading() {}

	// Private
	_copyAndSortAlphabetically = () => {};

	_subclassResponsibility = () => {};

	_handleLoadingWhenDoing = () => {};
}
