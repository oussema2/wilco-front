import CommentBuilder from '../../builders/CommentBuilder';
import CommentFactory from '../factories/CommentFactory';
import Comment from '../../entities/Comment';
import PilotFactory from '../factories/PilotFactory';
import PostFactory from '../factories/PostFactory';

describe( 'CommentBuilder', () => {
	let builder;
	const comment = CommentFactory.build();
	const commentJSON = comment.toJSON();
	const pilotStore = { update: jest.fn() };
	const postStore = { update: jest.fn() };

	beforeEach( () => {
		jest.clearAllMocks();
		builder = new CommentBuilder( { pilotStore, postStore } );
	} );

	describe( 'build', () => {
		const buildComment = () => builder.build( commentJSON );

		it( 'returns a comment instance', () => {
			expect( buildComment() ).toBeInstanceOf( Comment );
		} );

		it( 'makes the comment\'s pilot reference their store', () => {
			const storedPilot = PilotFactory.build();
			pilotStore.update.mockReturnValueOnce( storedPilot );

			const result = buildComment();

			expect( result.pilot ).toEqual( storedPilot );
			expect( pilotStore.update ).toHaveBeenCalledWith( comment.pilot );
		} );

		describe( 'when the comment JSON has no post', () => {
			it( 'leaves the comment\'s post reference as undefined', () => {
				expect( buildComment().post ).toBeUndefined();
			} );
		} );

		describe( 'when the comment JSON has a post', () => {
			it( 'makes the comment\'s post reference their store', () => {
				const commentWithPost = CommentFactory.build( { post: PostFactory.build() } );
				const storedPost = PostFactory.build();
				postStore.update.mockReturnValueOnce( storedPost );

				const result = builder.build( commentWithPost.toJSON() );

				expect( result.post ).toEqual( storedPost );
				expect( postStore.update ).toHaveBeenCalledWith( commentWithPost.post );
			} );
		} );
	} );
} );
