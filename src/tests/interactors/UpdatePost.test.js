import PostFactory from '../factories/PostFactory';
import UpdatePost from '../../interactors/UpdatePost';
import pilotFactory from '../factories/PilotFactory';

describe( 'CreatePost', () => {
	const postService = {
		patch: jest.fn()
	};
	const postStore = {
		update: jest.fn()
	};
	const pilotStore = {
		currentPilot: pilotFactory.build()
	};
	const updatedPost = PostFactory.build();

	const postID = 1;
	const defaultPostParams = {
		title: 'Post title',
		message: 'Post message',
		visibility: 'public',
		mentionsIds: [],
		airports: [],
		hashtags: []
	};

	let updatePost;

	beforeEach( () => {
		jest.clearAllMocks();
		postService.patch.mockReturnValueOnce( updatedPost );
		updatePost = new UpdatePost( { service: postService, postStore, pilotStore } );
	} );

	describe( '@execute()', () => {
		it( 'updates post in the post store', async () => {
			await updatePost.execute( postID, defaultPostParams );
			expect( postStore.update ).toHaveBeenCalledWith( updatedPost );
			expect( postService.patch ).toHaveBeenCalled();
		} );
	} );
} );
