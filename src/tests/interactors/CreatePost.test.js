import CreatePost from '../../interactors/CreatePost';
import PostFactory from '../factories/PostFactory';

describe( 'CreatePost', () => {
	const postService = {
		createPost: jest.fn()
	};
	const postStore = {
		addToFront: jest.fn()
	};
	const pilotStore = {
		currentPilot: {
			setLatestFlights: jest.fn()
		}
	};
	const createdPost = PostFactory.build();
	const defaultPostParams = {
		title: 'title',
		message: 'message',
		visibility: 'public',
		mentionsIds: [],
		airports: [],
		hashtags: []
	};

	let createPost;

	beforeEach( () => {
		jest.clearAllMocks();
		postService.createPost.mockReturnValueOnce( createdPost );
		createPost = new CreatePost( { postService, postStore, pilotStore } );
	} );

	describe( '@execute()', () => {
		const executeCreatePost = async ( params ) => { await createPost.execute( params ); };
		const itSavesCreatedPostInStore = ( postParams ) => {
			it( 'saves the created post in the post store', async () => {
				await executeCreatePost( postParams );
				expect( postStore.addToFront ).toHaveBeenCalledWith( createdPost );
			} );

			it( 'updates the latest flights from the store\'s current pilot', async () => {
				await executeCreatePost( postParams );
				expect( pilotStore.currentPilot.setLatestFlights )
					.toHaveBeenCalledWith( createdPost.pilot.latestFlights );
			} );
		};

		describe( 'without flight parameters', () => {
			const params = { title: 'title', message: 'message', visibility: 'public' };
			const createPostParams = {
				...defaultPostParams
			};

			it( 'creates the post', async () => {
				await executeCreatePost( params );
				expect( postService.createPost ).toHaveBeenCalledWith( createPostParams );
			} );

			itSavesCreatedPostInStore( createPostParams );
		} );

		describe( 'with flight parameters', () => {
			const flightParams = {
				aircraftId: 23,
				from: 'LHR',
				to: 'EZE',
				departureTime: '2021/06/25 17:42:32',
				arrivalTime: '2021/06/25 22:37:14',
				maxSpeed: 24153,
				maxAltitude: 7432,
				distance: 36325
			};
			const params = {
				title: 'title', message: 'message', visibility: 'public', flightParams
			};
			const createPostParams = {
				...defaultPostParams, flightParams
			};

			it( 'creates the post with the given flight parameters', async () => {
				await executeCreatePost( params );
				expect( postService.createPost ).toHaveBeenCalledWith( createPostParams );
			} );

			itSavesCreatedPostInStore( createPostParams );
		} );

		describe( 'with photos', () => {
			const base64Photos = [ 'photo1Base64', 'photo2Base64', 'photo3Base64' ];
			const params = {
				title: 'title', message: 'message', visibility: 'public', base64Photos
			};
			const createPostParams = {
				...defaultPostParams, base64Photos
			};

			it( 'creates the post with the given photos', async () => {
				await executeCreatePost( params );
				expect( postService.createPost ).toHaveBeenCalledWith( createPostParams );
			} );

			itSavesCreatedPostInStore( createPostParams );
		} );

		describe( 'with airport', () => {
			let message = '+DDDD';
			const params = {
				title: 'title', message, visibility: 'public'
			};
			const createPostParams = {
				...defaultPostParams, message, airports: [ 'DDDD' ]
			};

			it( 'creates the post with the extracted location from message', async () => {
				await executeCreatePost( params );
				expect( postService.createPost ).toHaveBeenCalledWith( createPostParams );
			} );

			itSavesCreatedPostInStore( createPostParams );
		} );

		describe( 'with mention', () => {
			let message = [ '@[Den Bevi](29)' ];
			const params = {
				title: 'title', message, visibility: 'public'
			};
			const createPostParams = {
				...defaultPostParams, message, mentionsIds: [ 29 ]
			};

			it( 'creates the post with the extracted mention id from message', async () => {
				await executeCreatePost( params );
				expect( postService.createPost ).toHaveBeenCalledWith( createPostParams );
			} );

			itSavesCreatedPostInStore( createPostParams );
		} );

		describe( 'with hashtag', () => {
			const message = 'This is a message with a #topic';
			const params = {
				title: 'title', message, visibility: 'public'
			};
			const createPostParams = {
				...defaultPostParams, message, hashtags: [ 'topic' ]
			};

			it( 'creates the post with the extracted hashtag from the message', async () => {
				await executeCreatePost( params );
				expect( postService.createPost ).toHaveBeenCalledWith( createPostParams );
			} );

			itSavesCreatedPostInStore( createPostParams );
		} );
	} );
} );
