import CreateComment from '../../interactors/CreateComment';
import CommentFactory from '../factories/CommentFactory';

describe( 'CreateComment', () => {
	const comment = CommentFactory.build();
	const commentService = {
		create: jest.fn( () => comment )
	};
	const commentStore = {
		update: jest.fn()
	};
	let createComment;

	beforeEach( () => {
		jest.clearAllMocks();
		createComment = new CreateComment( { commentService, commentStore } );
	} );

	describe( '@execute()', () => {
		const params = { postId: 12, text: 'Comment text' };

		it( 'creates the comment', async () => {
			await createComment.execute( params );

			expect( commentService.create ).toHaveBeenCalledWith( params );
			expect( commentStore.update ).toHaveBeenCalledWith( comment );
		} );
	} );
} );
