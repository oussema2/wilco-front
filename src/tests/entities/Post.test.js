import Pilot from '../../entities/Pilot';
import Post from '../../entities/Post';
import PostFlight from '../../entities/PostFlight';
import CommentFactory from '../factories/CommentFactory';
import PostFactory from '../factories/PostFactory';
import PostFlightFactory from '../factories/PostFlightFactory';
import Comment from '../../entities/Comment';

describe( 'Post entity', () => {
	describe( '@constructor', () => {
		describe( 'when does not receive a title', () => {
			it( 'returns an entity with null title value', () => {
				const post = new Post( { id: 1 } );
				expect( post.title ).toBe( null );
			} );
		} );
	} );

	describe( '@edited', () => {
		describe( 'when it has null editedAt timestamp', () => {
			it( 'returns false', () => {
				const post = PostFactory.build( { editedAt: null } );
				expect( post.edited ).toBe( false );
			} );
		} );

		describe( 'when it has an editedAt timestamp', () => {
			it( 'returns true', () => {
				const post = PostFactory.build( { editedAt: new Date( '2021-17-12' ) } );
				expect( post.edited ).toBe( true );
			} );
		} );
	} );

	describe( '@hasPhotos', () => {
		describe( 'when it has photo urls', () => {
			it( 'returns true', () => {
				const photoUrl = 'some/url';
				const post = PostFactory.build( { photoPreviewUrls: [ photoUrl ] } );
				expect( post.hasPhotos ).toBe( true );
			} );
		} );

		describe( 'when it does not have photo urls', () => {
			it( 'returns false', () => {
				const post = PostFactory.build( { photoPreviewUrls: null } );
				expect( post.hasPhotos ).toBe( false );
			} );
		} );
	} );

	describe( '@hasFlight', () => {
		describe( 'when the post was built with a flight', () => {
			it( 'returns true', () => {
				const post = PostFactory.build( { flight: PostFlightFactory.build() } );
				expect( post.hasFlight ).toBe( true );
			} );
		} );

		describe( 'when the post was built without a flight', () => {
			it( 'returns false', () => {
				const post = PostFactory.build( { flight: null } );
				expect( post.hasFlight ).toBe( false );
			} );
		} );
	} );

	describe( '@photoPreviewSources', () => {
		describe( 'when it has photo preview urls', () => {
			it( 'returns the photo preview sources', () => {
				const photoUrl = 'some/url';
				const post = PostFactory.build( { photoPreviewUrls: [ photoUrl ] } );
				expect( post.photoPreviewSources ).toEqual( [ { uri: photoUrl } ] );
			} );
		} );

		describe( 'when it does not have photo preview urls', () => {
			it( 'returns an empty array', () => {
				const post = PostFactory.build( { photoPreviewUrls: null } );
				expect( post.photoPreviewSources ).toEqual( [] );
			} );
		} );
	} );

	describe( '@photoSources', () => {
		describe( 'when it has photo urls', () => {
			it( 'returns the photo sources', () => {
				const photoUrl = 'some/url';
				const post = PostFactory.build( { photoUrls: [ photoUrl ] } );
				expect( post.photoSources ).toEqual( [ { uri: photoUrl } ] );
			} );
		} );

		describe( 'when it does not have photo urls', () => {
			it( 'returns an empty array', () => {
				const post = PostFactory.build( { photoUrls: null } );
				expect( post.photoSources ).toEqual( [] );
			} );
		} );
	} );

	describe( '@trackSource', () => {
		describe( 'when it has a track', () => {
			it( 'returns the track source', () => {
				const post = PostFactory.build();
				expect( post.trackSource ).toEqual( { uri: post.flight.trackUrl } );
			} );
		} );

		describe( 'when it does not have a track', () => {
			it( 'returns null', () => {
				const post = PostFactory.build( { flight: null } );
				expect( post.trackSource ).toBeNull();
			} );
		} );
	} );

	describe( '@addComment', () => {
		describe( 'when the comments wasn`t already added', () => {
			it( 'adds the comment', () => {
				const [ newComment, ...comments ] = CommentFactory.buildList( 5 );
				const post = PostFactory.build( { comments } );

				post.addComment( newComment );

				expect( post.comments ).toHaveLength( 5 );
				expect( post.comments[ 4 ] ).toBe( newComment );
			} );
		} );

		describe( 'when the comments was already added', () => {
			it( 'deletes the previous version and adds it at the last place', () => {
				const comments = CommentFactory.buildList( 5 );
				const newComment = comments[ 0 ];
				const post = PostFactory.build( { comments } );

				post.addComment( newComment );

				expect( post.comments ).toHaveLength( 5 );
				expect( post.comments[ 4 ] ).toBe( newComment );
			} );
		} );
	} );

	describe( 'fromJSON', () => {
		const pilotJSON = { id: 1, first_name: 'Wilco', last_name: 'Test' };
		const postFlightJSON = {
			id: 63,
			from: 'ABC',
			to: 'DEF',
			departure_time: '2021-06-02T20:05:22.230Z',
			arrival_time: '2021-06-02T20:17:53.480Z',
			duration: 258,
			max_speed: 23245,
			max_altitude: 11234,
			distance: 946294,
			aircraft: {
				id: 4,
				make_and_model: 'Piper 111',
				tail_number: 'TN1234',
				picture_url: 'https://fake.pic/ture'
			}
		};

		const commentJSON = {
			id: 1, text: 'A comment text', created_at: '02-13-2021', pilot: pilotJSON
		};

		const postJSON = {
			id: 1,
			title: 'A title',
			text: 'A text',
			number_of_likes: 2,
			number_of_comments: 3,
			visibility: 'public',
			liked: true,
			created_at: '2021-06-02T20:05:22.230Z',
			edited_at: '2021-08-02T16:31:25.230Z',
			pilot: pilotJSON,
			flight: postFlightJSON,
			photo_urls: [ 'some/photo/url', 'another/photo/url' ],
			photo_preview_urls: [ 'some/photo/preview/url', 'another/photo/preview/url' ],
			photo_ids: [ 15, 30 ],
			community_tags: [ 'tag 1', 'tag 2' ],
			airports: [ 'airport 1', 'airport 2' ],
			hashtags: [ 'hashtag 1', 'hashtag 2' ],
			first_comments: [ commentJSON ],
			favorite: true
		};

		const post = Post.fromJSON( postJSON );
		const pilot = Pilot.fromJSON( pilotJSON );
		const postFlight = PostFlight.fromJSON( postFlightJSON );
		const comment = Comment.fromJSON( commentJSON );

		it( 'creates the post with the correct properties', () => {
			expect( post.id ).toEqual( 1 );
			expect( post.title ).toEqual( 'A title' );
			expect( post.text ).toEqual( 'A text' );
			expect( post.numberOfLikes ).toEqual( 2 );
			expect( post.numberOfComments ).toEqual( 3 );
			expect( post.liked ).toEqual( true );
			expect( post.createdAt ).toEqual( new Date( '2021-06-02T20:05:22.230Z' ) );
			expect( post.editedAt ).toEqual( new Date( '2021-08-02T16:31:25.230Z' ) );

			expect( post.pilot ).toEqual( pilot );
			expect( post.pilot ).toBeInstanceOf( Pilot );

			expect( post.flight ).toEqual( postFlight );
			expect( post.flight ).toBeInstanceOf( PostFlight );

			expect( post.previewComments ).toEqual( [ comment ] );
			expect( post.previewComments[ 0 ] ).toBeInstanceOf( Comment );

			expect( post.photoUrls ).toEqual( [ 'some/photo/url', 'another/photo/url' ] );
			expect( post.photoPreviewUrls ).toEqual( [ 'some/photo/preview/url', 'another/photo/preview/url' ] );
			expect( post.photoIds ).toEqual( [ 15, 30 ] );
			expect( post.communityTags ).toEqual( [ 'tag 1', 'tag 2' ] );
			expect( post.airports ).toEqual( [ 'airport 1', 'airport 2' ] );
			expect( post.hashtags ).toEqual( [ 'hashtag 1', 'hashtag 2' ] );
			expect( post.favorite ).toEqual( true );
		} );

		describe( 'when the post JSON has no pilot', () => {
			const postJSONWithoutPilot = { ...postJSON, pilot: undefined };

			it( 'creates the post with the correct properties and without pilot', () => {
				const postWithoutPilot = Post.fromJSON( postJSONWithoutPilot );
				expect( postWithoutPilot.pilot ).toBeUndefined();
			} );
		} );

		describe( 'when the post JSON has no flight', () => {
			const postJSONWithoutFlight = { ...postJSON, flight: undefined };

			it( 'creates the post with the correct properties and without flight', () => {
				const postWithoutFlight = Post.fromJSON( postJSONWithoutFlight );
				expect( postWithoutFlight.flight ).toBeUndefined();
			} );
		} );

		describe( 'when the post JSON has no edited_at timestamp', () => {
			const postJSONWithoutEditedAt = { ...postJSON, edited_at: null };

			it( 'creates the post with the correct properties and without editedAt timestamp', () => {
				const postWithoutEditedAt = Post.fromJSON( postJSONWithoutEditedAt );
				expect( postWithoutEditedAt.editedAt ).toBeNull();
			} );
		} );
	} );

	describe( 'toJSON', () => {
		const previewComments = [
			CommentFactory.build(),
			CommentFactory.build()
		];

		const post = PostFactory.build( { previewComments } );
		const json = post.toJSON();

		it( 'returns the post\'s json', () => {
			expect( json ).toEqual( {
				id: post.id,
				title: post.title,
				text: post.text,
				number_of_likes: post.numberOfLikes,
				number_of_comments: post.numberOfComments,
				visibility: post.visibility.id,
				liked: post.liked,
				created_at: post.createdAt,
				edited_at: post.editedAt,
				pilot: post.pilot.toJSON(),
				flight: post.flight.toJSON(),
				photo_urls: post.photoUrls,
				photo_preview_urls: post.photoPreviewUrls,
				photo_ids: post.photoIds,
				community_tags: post.communityTags,
				first_comments: [ post.previewComments[ 0 ].toJSON(), post.previewComments[ 1 ].toJSON() ],
				airports: post.airports,
				hashtags: post.hashtags,
				favorite: post.favorite
			} );
		} );
	} );
} );
