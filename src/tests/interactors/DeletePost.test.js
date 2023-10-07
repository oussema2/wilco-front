import DeletePost from '../../interactors/DeletePost';
import PostFactory from '../factories/PostFactory';

describe( 'DeletePost', () => {
	const postService = {
		delete: jest.fn()
	};
	const postStore = {
		delete: jest.fn()
	};
	const pilotStore = {
		currentPilot: {
			setLatestFlights: jest.fn()
		}
	};

	const deletedPost = PostFactory.build();
	let deletePost;

	beforeEach( () => {
		jest.clearAllMocks();
		postService.delete.mockReturnValueOnce( deletedPost );
		deletePost = new DeletePost( { postService, postStore, pilotStore } );
	} );

	describe( '@execute()', () => {
		const postId = 1;

		it( 'deletes the post', async () => {
			await deletePost.execute( postId );

			expect( postService.delete ).toHaveBeenCalledWith( postId );
			expect( postStore.delete ).toHaveBeenCalledWith( postId );
		} );

		it( 'updates the latest flights from the store\'s current pilot', async () => {
			await deletePost.execute( postId );

			expect( pilotStore.currentPilot.setLatestFlights )
				.toHaveBeenCalledWith( deletedPost.pilot.latestFlights );
		} );
	} );
} );
