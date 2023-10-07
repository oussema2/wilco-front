import { compareArrays } from '../helpers/arrays';
import { reduceSpaces } from '../helpers/strings';

export default class CommunityTagsPresenter {
	constructor( {
		initialCommunityTags,
		placeholder,
		snackbarService,
		makeAutoObservable,
		fetchCommunityTagsFromRemote,
		getCommunityTagsFromStore,
		maxTags
	} = {} ) {
		this._initialCommunityTags = initialCommunityTags;
		this._placeholder = placeholder;
		this._snackbarService = snackbarService;
		this._fetchCommunityTagsFromRemote = fetchCommunityTagsFromRemote;
		this._getCommunityTagsFromStore = getCommunityTagsFromStore;
		this._tags = [];
		this._maxTags = maxTags;
		this._isLoadingTags = false;
		this._hasError = false;

		makeAutoObservable( this );

		this._autofillForm();

		this._fetchCommunityTags();
	}

	get tags() {
		return this._tags;
	}

	get hasAnyTag() {
		return this.tags.length > 0;
	}

	addNewTag = ( _tag ) => {
		if ( this._validateMaxTags() ) return;

		const tag = reduceSpaces( _tag.trim( ) );
		const isTagOnArray = this._isTagOnArray( this.tags, tag );
		const isTagEmpty = tag === '';

		if ( !isTagOnArray && !isTagEmpty ) this._addNewTag( tag );
		else {
			this._showErrorWhenAddNewTag( isTagOnArray, isTagEmpty, tag );
		}
	}

	_validateMaxTags() {
		if ( this.tags.length === this._maxTags ) {
			this._setHasError( true );
			return true;
		}
		return false;
	}

	_addNewTag( tag ) {
		const findTag = this._findTagOnStore( tag );
		if ( findTag ) this._tags.push( findTag.name );
		else this._tags.push( tag );
	}

	_isTagOnArray( array, tag ) {
		return array?.some( ( _tag ) => _tag.toUpperCase() === tag.toUpperCase() );
	}

	_findTagOnStore( tag ) {
		return this
			.tagsFromStore?.find( ( _tag ) => _tag.name.toUpperCase() === tag.toUpperCase() );
	}

	get titleText() {
		return 'Communities';
	}

	get placeholderText() {
		return this._placeholder;
	}

	get communityTagsHaveChanged() {
		return !compareArrays( this.tags.slice(), this._initialCommunityTags?.slice() );
	}

	_showErrorWhenAddNewTag( isTagOnArray, isTagEmpty, tag ) {
		if ( isTagOnArray ) this._snackbarService.showInfo( { message: `${tag} was already added.` } );
		if ( isTagEmpty ) this._snackbarService.showInfo( { message: 'The label shouldn\'t be empty.' } );
	}

	get isInputDisabled() {
		return this.tags.length >= this._maxTags;
	}

	removeTag = ( _tag ) => {
		this._setHasError( false );
		this._setTags( this._tags.filter( ( e ) => e !== _tag ) );
	}

	get helperText() {
		return `Add up to ${this._maxTags} communities.`;
	}

	_setTags( tags ) {
		this._tags = tags;
	}

	_setHasError( hasError ) {
		this._hasError = hasError;
	}

	_autofillForm() {
		this._setTags( this._initialCommunityTags?.slice() || [] );
	}

	get tagsFromStore() {
		return this._getCommunityTagsFromStore.execute();
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
		return this._isLoadingTags && !this.tagsFromStore?.length;
	}

	get hasError() {
		return this._hasError;
	}

	_setIsLoadingTags( isLoadingTags ) {
		this._isLoadingTags = isLoadingTags;
	}
}
