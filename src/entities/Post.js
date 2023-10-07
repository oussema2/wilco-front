import { makeAutoObservable } from 'mobx';
import Pilot from './Pilot';
import PostFlight from './PostFlight';
import { PrivacyTypeFactory } from '../factories/VisibilityTypeFactory';
// eslint-disable-next-line import/no-cycle
import Comment from './Comment';

export default class Post {
	constructor( {
		id,
		title = null,
		text,
		createdAt,
		editedAt,
		numberOfLikes,
		numberOfComments,
		visibility,
		liked,
		pilot,
		flight,
		photoUrls,
		photoPreviewUrls,
		photoIds,
		communityTags,
		previewComments,
		airports,
		hashtags,
		favorite
	} ) {
		this.id = id;
		this.title = title;
		this.text = text;
		this.createdAt = createdAt;
		this.editedAt = editedAt;
		this.numberOfLikes = numberOfLikes;
		this.numberOfComments = numberOfComments;
		this.visibility = visibility;
		this.liked = liked;
		this.pilot = pilot;
		this.flight = flight;
		this.photoUrls = photoUrls;
		this.photoPreviewUrls = photoPreviewUrls;
		this.photoIds = photoIds;
		this.comments = [];
		this.communityTags = communityTags;
		this.previewComments = previewComments;
		this.airports = airports;
		this.hashtags = hashtags;
		this.favorite = favorite;

		makeAutoObservable( this );
	}

	get edited() {
		return !!this.editedAt;
	}

	get hasPhotos() {
		return this.photoPreviewUrls?.length > 0;
	}

	get hasFlight() {
		return !!this.flight;
	}

	get photoPreviewSources() {
		return this._sourcesFromUrls( this.photoPreviewUrls );
	}

	get photoSources() {
		return this._sourcesFromUrls( this.photoUrls );
	}

	get trackSource() {
		return ( this.flight?.trackUrl && { uri: this.flight.trackUrl } ) || null;
	}

	addComment( comment ) {
		const oldCommentIndex = this.comments.findIndex( ( oldComment ) => (
			oldComment.id === comment.id
		) );

		if ( oldCommentIndex >= 0 ) this.comments.splice( oldCommentIndex, 1 );

		this.comments.push( comment );
	}

	toJSON() {
		const pilot = this.pilot.toJSON();
		const flight = this.flight.toJSON();

		return {
			id: this.id,
			title: this.title,
			text: this.text,
			created_at: this.createdAt,
			edited_at: this.editedAt,
			number_of_likes: this.numberOfLikes,
			number_of_comments: this.numberOfComments,
			visibility: this.visibility.id,
			liked: this.liked,
			pilot,
			flight,
			photo_urls: this.photoUrls,
			photo_preview_urls: this.photoPreviewUrls,
			photo_ids: this.photoIds,
			community_tags: this.communityTags,
			first_comments: this.previewComments?.map( ( comment ) => comment.toJSON() ),
			airports: this.airports,
			hashtags: this.hashtags,
			favorite: this.favorite
		};
	}

	static fromJSON( data ) {
		const pilot = data.pilot && Pilot.fromJSON( data.pilot );
		const flight = data.flight && PostFlight.fromJSON( data.flight );
		const visibility = PrivacyTypeFactory.build( data.visibility );
		const editedAt = data.edited_at ? new Date( data.edited_at ) : null;

		const previewComments =	data.first_comments
				&& data.first_comments.map( ( commentJSON ) => ( Comment.fromJSON( commentJSON ) ) );

		return new Post( {
			id: data.id,
			title: data.title,
			text: data.text,
			createdAt: new Date( data.created_at ),
			editedAt,
			numberOfLikes: data.number_of_likes,
			numberOfComments: data.number_of_comments,
			visibility,
			liked: data.liked,
			pilot,
			flight,
			photoUrls: data.photo_urls,
			photoPreviewUrls: data.photo_preview_urls,
			photoIds: data.photo_ids,
			communityTags: data.community_tags,
			previewComments,
			airports: data.airports,
			hashtags: data.hashtags,
			favorite: data.favorite
		} );
	}

	_sourcesFromUrls( urls ) {
		return urls?.map( ( url ) => ( { uri: url } ) ) || [];
	}
}
