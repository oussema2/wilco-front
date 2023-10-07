import UnlikePost from '../../interactors/UnlikePost';
import PostFactory from '../factories/PostFactory';

describe( 'UnlikePost', () => {
	const postService = {
		unlikePost: jest.fn()
	};
	const postStore = {
		update: jest.fn()
	};
	let unlikePost;

	beforeEach( () => {
		jest.clearAllMocks();

		unlikePost = new UnlikePost( { postService, postStore } );
	} );

	describe( '@execute()', () => {
		const postId = 1;

		it( 'unlikes the post', async () => {
			const post = PostFactory.build();
			postService.unlikePost.mockReturnValueOnce( post );
			await unlikePost.execute( postId );
			expect( postService.unlikePost ).toHaveBeenCalledWith( postId );
			expect( postStore.update ).toHaveBeenCalledWith( post );
		} );
	} );
} );
