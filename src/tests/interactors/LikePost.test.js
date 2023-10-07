import LikePost from '../../interactors/LikePost';
import PostFactory from '../factories/PostFactory';

describe( 'LikePost', () => {
	const postService = {
		likePost: jest.fn()
	};
	const postStore = {
		update: jest.fn()
	};
	let likePost;

	beforeEach( () => {
		jest.clearAllMocks();

		likePost = new LikePost( { postService, postStore } );
	} );

	describe( '@execute()', () => {
		const postId = 1;

		it( 'likes the post', async () => {
			const post = PostFactory.build();
			postService.likePost.mockReturnValueOnce( post );
			await likePost.execute( postId );
			expect( postService.likePost ).toHaveBeenCalledWith( postId );
			expect( postStore.update ).toHaveBeenCalledWith( post );
		} );
	} );
} );
