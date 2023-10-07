import PostBuilder from '../../builders/PostBuilder';
import PostService from '../../services/PostService';
import PostFactory from '../factories/PostFactory';
import Pagination from '../../entities/Pagination';

describe( 'PostService', () => {
	let service;
	const api = {
		delete: jest.fn(),
		get: jest.fn(),
		patch: jest.fn(),
		post: jest.fn()
	};
	const dependencies = { api };

	beforeEach( () => {
		jest.clearAllMocks();
		service = new PostService( dependencies );
	} );

	describe( 'constructor()', () => {
		it( 'initializes with the provided values', () => {
			expect( service.api ).toBe( dependencies.api );
		} );
	} );

	describe( '@createPost()', () => {
		const title = 'A title';
		const message = 'A message';
		const visibility = 'only_me';
		const communityTags = [ 'tag 1', 'tag 2' ];
		const mentionsIds = [ '1', '2' ];
		const airports = [ 'EZE', 'ROM' ];
		const hashtags = [ 'hello1', 'bye2' ];
		const flightParams = {
			aircraftId: 23,
			from: 'LHR',
			to: 'EZE',
			departureTime: '2021/06/25 17:42:32',
			arrivalTime: '2021/06/25 22:37:14',
			maxSpeed: 24153,
			maxAltitude: 7432,
			distance: 36325,
			track: 'track-base64'
		};
		const base64Photos = [
			'photo1Base64',
			'photo2Base64'
		];
		const expectedUrl = '1/posts';
		const createdPost = PostFactory.build();
		let postParams;
		let expectedParams;

		const setUp = ( postParamsOverwrite, expectedParamsOverwrite ) => {
			postParams = {
				title,
				message,
				visibility,
				communityTags,
				mentionsIds,
				airports,
				hashtags,
				flightParams,
				base64Photos,
				...postParamsOverwrite
			};
			expectedParams = {
				post: {
					title,
					text: message,
					visibility,
					community_tags: communityTags,
					mentions_ids: mentionsIds,
					airports,
					hashtags,
					flight: {
						aircraft_id: flightParams.aircraftId,
						from: flightParams.from,
						to: flightParams.to,
						departure_time: flightParams.departureTime,
						arrival_time: flightParams.arrivalTime,
						max_speed: flightParams.maxSpeed,
						max_altitude: flightParams.maxAltitude,
						distance: flightParams.distance,
						track: flightParams.track
					},
					photos: base64Photos,
					...expectedParamsOverwrite
				}
			};
		};

		beforeEach( () => {
			setUp();
			api.post.mockReturnValueOnce( createdPost.toJSON() );
		} );

		describe( 'with all parameters', () => {
			it( 'creates the post', async () => {
				await service.createPost( postParams );
				expect( api.post ).toHaveBeenCalledWith( expectedUrl, expectedParams );
			} );

			it( 'returns the created post', async () => {
				const createPostResult = await service.createPost( postParams );
				expect( createPostResult ).toEqual( createdPost );
			} );
		} );

		describe( 'without flight parameters', () => {
			it( 'creates the post excluding the flight parameter', async () => {
				setUp( { flightParams: undefined }, { flight: undefined } );
				await service.createPost( postParams );
				expect( api.post ).toHaveBeenCalledWith( expectedUrl, expectedParams );
			} );
		} );

		describe( 'without photos', () => {
			it( 'creates the post excluding the photos parameter', async () => {
				setUp( { base64Photos: undefined }, { photos: undefined } );
				await service.createPost( postParams );
				expect( api.post ).toHaveBeenCalledWith( expectedUrl, expectedParams );
			} );

			describe( 'when the base64Photos param is given but is an empty array', () => {
				it( 'creates the post excluding the photos parameter', async () => {
					setUp( { base64Photos: [] }, { photos: undefined } );
					await service.createPost( postParams );
					expect( api.post ).toHaveBeenCalledWith( expectedUrl, expectedParams );
				} );
			} );
		} );
	} );

	describe( '@fetchAll()', () => {
		describe( 'with pagination', () => {
			describe( 'when user does`t select any community tag for filter posts', () => {
				service = new PostService( { api, buildItem: PostBuilder.build } );
				const pagination = new Pagination();
				const expectedUrl = '1/posts?page=1&per_page=15';

				it( 'fetches all the post', async () => {
					service.fetchAll( pagination );
					expect( api.get ).toHaveBeenCalledWith( expectedUrl );
				} );

				it( 'returns the all the posts', async () => {
					const posts = PostFactory.buildList( 2 );
					api.get.mockReturnValueOnce( posts.map( ( post ) => post.toJSON() ) );
					const postsResponse = await service.fetchAll( pagination );
					expect( postsResponse.entities ).toEqual( posts );
				} );
			} );

			describe( 'when user select any community tag for filter posts', () => {
				service = new PostService( { api, buildItem: PostBuilder.build } );
				const pagination = new Pagination();
				const tags = [ 'label 1', 'label 2' ];
				const expectedUrl = '1/posts?community_tags[]=label%201&community_tags[]=label%202&page=1&per_page=15';

				it( 'fetches filtered posts', async () => {
					service.fetchAll( pagination, { community_tags: tags } );
					expect( api.get ).toHaveBeenCalledWith( expectedUrl );
				} );

				it( 'returns the filtered posts', async () => {
					const posts = PostFactory.buildList( 2 );
					api.get.mockReturnValueOnce( posts.map( ( post ) => post.toJSON() ) );
					const postsResponse = await service.fetchAll( pagination, { community_tags: tags } );
					expect( postsResponse.entities ).toEqual( posts );
				} );
			} );
		} );

		describe( 'without pagination', () => {
			service = new PostService( { api, buildItem: PostBuilder.build } );
			const expectedUrl = '1/posts?page=1&per_page=999999';

			it( 'fetches all the post', async () => {
				service.fetchAll( );
				expect( api.get ).toHaveBeenCalledWith( expectedUrl );
			} );

			it( 'returns the all the posts', async () => {
				const posts = PostFactory.buildList( 2 );
				api.get.mockReturnValueOnce( posts.map( ( post ) => post.toJSON() ) );
				const postsResponse = await service.fetchAll( );
				expect( postsResponse.entities ).toEqual( posts );
			} );
		} );
	} );

	describe( '@fetch()', () => {
		const postId = 2;
		service = new PostService( { api, buildItem: PostBuilder.build } );
		const expectedUrl = '1/posts/2';

		it( 'fetches the post', async () => {
			service.fetch( postId );
			expect( api.get ).toHaveBeenCalledWith( expectedUrl );
		} );
	} );

	describe( '@patch()', () => {
		const base64AddPhotos = [
			'photo1Base64',
			'photo2Base64'
		];

		const deletePhotos = [
			1,
			5
		];

		const communityTags = [ 'tag 1', 'tag 2', 'tag 3' ];
		const airports = [ 'DDDD', 'LLLL', 'TEST' ];
		const hashtags = [ 'hashtag1', 'hashtag2' ];
		const mentionsIDs = [ '1', '2' ];

		const flightParams = {
			aircraftId: 24,
			from: 'FCO',
			to: 'BCN',
			departureTime: '2021/06/25 17:42:32',
			arrivalTime: '2021/06/25 22:37:14',
			maxSpeed: 24153,
			maxAltitude: 7432,
			distance: 36325,
			track: 'track-base64'
		};

		const postParams = {
			title: 'Title',
			message: 'Message',
			visibility: 'only_me',
			base64AddPhotos,
			deletePhotos,
			communityTags,
			airports,
			hashtags,
			mentionsIDs,
			flightParams
		};

		it( 'updates the post', () => {
			const postId = 2;
			const expectedUrl = '1/posts/2';
			const expectedBody = {
				post: {
					title: 'Title',
					text: 'Message',
					visibility: 'only_me',
					community_tags: communityTags,
					airports,
					hashtags,
					photos: {
						add_photos: base64AddPhotos,
						delete_photos: deletePhotos
					},
					flight: {
						aircraft_id: flightParams.aircraftId,
						from: flightParams.from,
						to: flightParams.to,
						departure_time: flightParams.departureTime,
						arrival_time: flightParams.arrivalTime,
						max_speed: flightParams.maxSpeed,
						max_altitude: flightParams.maxAltitude,
						distance: flightParams.distance,
						track: flightParams.track
					},
					mentions_ids: mentionsIDs
				}
			};
			service.patch( postId, postParams );
			expect( api.patch ).toHaveBeenCalledWith( expectedUrl, expectedBody );
		} );

		it( 'returns the post', async () => {
			const post = PostFactory.build();
			api.patch.mockReturnValueOnce( post.toJSON() );
			const postResponse = await service.patch( post.id, postParams );
			expect( postResponse ).toEqual( post );
		} );
	} );

	describe( '@delete()', () => {
		service = new PostService( { api, buildItem: PostBuilder.build } );

		it( 'deletes the post', () => {
			const postId = 1;
			const expectedUrl = '1/posts/1';
			service.delete( postId );
			expect( api.delete ).toHaveBeenCalledWith( expectedUrl );
		} );

		it( 'returns the post', async () => {
			const post = PostFactory.build();
			api.delete.mockReturnValueOnce( post.toJSON() );
			const postsResponse = await service.delete( post.id );
			expect( postsResponse ).toEqual( post );
		} );
	} );

	describe( '@likePost()', () => {
		it( 'likes the post', () => {
			const postId = 1;
			const expectedUrl = '1/posts/1/like';
			service.likePost( postId );
			expect( api.post ).toHaveBeenCalledWith( expectedUrl );
		} );

		it( 'returns the liked post', async () => {
			const post = PostFactory.build();
			api.post.mockReturnValueOnce( post.toJSON() );
			const likeResponse = await service.likePost( post.id );
			expect( likeResponse ).toEqual( post );
		} );
	} );

	describe( '@unlikePost()', () => {
		it( 'unlikes the post', () => {
			const postId = 1;
			const expectedUrl = '1/posts/1/unlike';
			service.unlikePost( postId );
			expect( api.post ).toHaveBeenCalledWith( expectedUrl );
		} );

		it( 'returns the unliked post', async () => {
			const post = PostFactory.build();
			api.post.mockReturnValueOnce( post.toJSON() );
			const unlikeResponse = await service.unlikePost( post.id );
			expect( unlikeResponse ).toEqual( post );
		} );
	} );

	describe( '@report()', () => {
		it( 'creates a report for the post', () => {
			const postId = 1;
			const expectedUrl = '1/posts/1/reports';
			service.report( postId );
			expect( api.post ).toHaveBeenCalledWith( expectedUrl );
		} );
	} );
} );
