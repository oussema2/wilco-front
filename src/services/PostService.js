import querystring from 'query-string';
import Api from './Api';
import Post from '../entities/Post';
import Pagination from '../entities/Pagination';

export default class PostService {
	constructor( { api = new Api(), buildItem = Post.fromJSON } = { } ) {
		this.api = api;
		this.buildItem = buildItem;
	}

	createPost = async ( postParams ) => {
		const createPostResponse = await this.api.post( '1/posts', {
			post: this._buildPostCreationBody( postParams )
		} );
		return this.buildItem( createPostResponse );
	}

	async patch( postId, postParams ) {
		const postResponse = await this.api.patch( `1/posts/${postId}`, {
			post: this._buildPostPatchBody( postParams )
		} );
		return this.buildItem( postResponse );
	}

	async delete( postId ) {
		const postsResponse = await this.api.delete( `1/posts/${postId}` );
		return this.buildItem( postsResponse );
	}

	async fetch( postId ) {
		const postsResponse = await this.api.get( `1/posts/${postId}` );
		return this.buildItem( postsResponse );
	}

	async fetchAll( pagination, params = {} ) {
		const queryParams = this._getQueryParam( pagination, params );
		const postsResponse = await this.api.get( `1/posts?${queryParams}` );
		return {
			entities: postsResponse.map( ( entityJSON ) => this.buildItem( entityJSON ) ),
			pagination: Pagination.fromJSON(
				{
					...postsResponse.pagination,
					per_page: this._perPage( pagination )
				} )
		};
	}

	_getQueryParam( pagination, params = {} ) {
		const queryParams = {
			page: this._page( pagination ),
			per_page: this._perPage( pagination ),
			...params
		};
		return querystring.stringify( queryParams, { arrayFormat: 'bracket' } );
	}

	_page( pagination ) {
		return ( pagination ) ? pagination.nextPage : 1;
	}

	_perPage( pagination ) {
		return ( pagination ) ? pagination.perPage : 999999;
	}

	async likePost( postId ) {
		const likeResponse = await this.api.post( `1/posts/${postId}/like` );
		return this.buildItem( likeResponse );
	}

	async unlikePost( postId ) {
		const unlikeResponse = await this.api.post( `1/posts/${postId}/unlike` );
		return this.buildItem( unlikeResponse );
	}

	async report( postId ) {
		await this.api.post( `1/posts/${postId}/reports` );
	}

	_buildPostCreationBody( {
		title, message, visibility, communityTags, flightParams,
		mentionsIds, airports, hashtags, base64Photos
	} ) {
		let body = {
			title,
			text: message,
			visibility,
			community_tags: communityTags,
			mentions_ids: mentionsIds,
			airports,
			hashtags
		};
		if ( base64Photos?.length > 0 ) {
			body = { ...body, photos: base64Photos };
		}
		if ( flightParams ) {
			body = {
				...body,
				flight: this._buildPostFlightBody( flightParams )
			};
		}
		return body;
	}

	_buildPostPatchBody( {
		title, message, visibility, communityTags, base64AddPhotos, deletePhotos, airports, hashtags,
		mentionsIDs, flightParams, deleteFlight
	} ) {
		return {
			title,
			text: message,
			visibility,
			community_tags: communityTags,
			mentions_ids: mentionsIDs,
			airports,
			hashtags,
			photos: {
				add_photos: base64AddPhotos,
				delete_photos: deletePhotos
			},
			...( flightParams && {
				flight: this._buildPostFlightBody( flightParams )
			} ),
			delete_flight: deleteFlight
		};
	}

	_buildPostFlightBody( flightParams ) {
		return {
			aircraft_id: flightParams.aircraftId,
			from: flightParams.from,
			to: flightParams.to,
			departure_time: flightParams.departureTime,
			arrival_time: flightParams.arrivalTime,
			max_speed: flightParams.maxSpeed,
			max_altitude: flightParams.maxAltitude,
			distance: flightParams.distance,
			track: flightParams.track
		};
	}
}
