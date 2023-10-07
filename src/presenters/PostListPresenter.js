import PostPresenterBuilder from './Builders/PostPresenterBuilder';

export default class PostListPresenter {
	constructor( {
		posts,
		modalService,
		rootStore,
		actionSheetService,
		navigation,
		snackbarService,
		analyticsService,
		tags,
		hashtags
	} ) {
		this._posts = posts;
		this._modalService = modalService;
		this._rootStore = rootStore;
		this._actionSheetService = actionSheetService;
		this._navigation = navigation;
		this._snackbarService = snackbarService;
		this._analyticsService = analyticsService;
		this._tags = tags;
		this._hashtags = hashtags;
	}

	get hasAnyPost() {
		return this.filteredPosts.length > 0;
	}

	get postPresenters() {
		return this.filteredPosts.map( ( post ) => (
			PostPresenterBuilder.build( {
				post,
				modalService: this._modalService,
				rootStore: this._rootStore,
				actionSheetService: this._actionSheetService,
				navigation: this._navigation,
				snackbarService: this._snackbarService,
				analyticsService: this._analyticsService
			} )
		) );
	}

	get filteredPosts() {
		if ( this._tags?.length > 0 || this._hashtags?.length > 0 ) {
			return this._posts.filter( ( post ) => this._postIncludeCommunityTagsOrHashtags( post ) );
		}
		return this._posts;
	}

	_postIncludeCommunityTagsOrHashtags( post ) {
		return ( this._postIncludeCommunityTags( post ) || this._postIncludeHashtags( post ) );
	}

	_postIncludeCommunityTags( post ) {
		return post.communityTags.some( ( tag ) => this._tags.includes( tag ) );
	}

	_postIncludeHashtags( post ) {
		return post.hashtags.some( ( hashtag ) => this._hashtags.includes( hashtag ) );
	}

	contentWasPressed( postId ) {
		this._goToPostDetail( postId, false );
	}

	commentButtonWasPressed( postId ) {
		this._goToPostDetail( postId, true );
	}

	_goToPostDetail( postId, scrollToFirstComment ) {
		this._navigation.push( 'PostDetail', { postId, scrollToFirstComment } );
	}
}
