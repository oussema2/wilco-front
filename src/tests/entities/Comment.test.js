import Comment from '../../entities/Comment';
import Pilot from '../../entities/Pilot';
import Post from '../../entities/Post';
import CommentFactory from '../factories/CommentFactory';
import PostFactory from '../factories/PostFactory';

describe( 'Comment entity', () => {
	describe( 'fromJSON', () => {
		const pilotJSON = { id: 1, first_name: 'Wilco', last_name: 'Test' };
		const commentJSON = {
			id: 1, text: 'A comment text', created_at: '02-13-2021', pilot: pilotJSON
		};

		const comment = Comment.fromJSON( commentJSON );
		const pilot = Pilot.fromJSON( pilotJSON );

		it( 'creates the comment with the correct properties', () => {
			expect( comment.id ).toEqual( 1 );
			expect( comment.text ).toEqual( 'A comment text' );
			expect( comment.createdAt ).toEqual( new Date( '02-13-2021' ) );

			expect( comment.pilot ).toEqual( pilot );
			expect( comment.pilot ).toBeInstanceOf( Pilot );
		} );

		describe( 'when the comment JSON contains a post JSON', () => {
			it( 'creates the comment with the post', () => {
				const postJSON = PostFactory.build().toJSON();
				const commentJSONWithPost = { ...commentJSON, post: postJSON };
				const commentWithPost = Comment.fromJSON( commentJSONWithPost );
				const post = Post.fromJSON( postJSON );
				expect( commentWithPost.post ).toEqual( post );
			} );
		} );
	} );

	describe( 'toJSON', () => {
		const comment = CommentFactory.build( { post: PostFactory.build() } );
		const json = comment.toJSON();

		it( 'returns the comment\'s json', () => {
			expect( json ).toEqual( {
				id: comment.id,
				text: comment.text,
				created_at: comment.createdAt,
				pilot: comment.pilot.toJSON(),
				post_id: comment.postId,
				post: comment.post.toJSON()
			} );
		} );
	} );
} );
