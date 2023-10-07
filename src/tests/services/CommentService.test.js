import CommentBuilder from '../../builders/CommentBuilder';
import CommentService from '../../services/CommentService';
import CommentFactory from '../factories/CommentFactory';
import MockRootStore from '../mocks/MockRootStore';

describe( 'CommentService', () => {
	let service;
	const comment = CommentFactory.build();
	const rootStore = new MockRootStore();
	const commentBuilder = new CommentBuilder( { pilotStore: rootStore.pilotStore } );
	const buildEntity = commentBuilder.build;
	const api = {
		post: jest.fn( () => Promise.resolve( comment.toJSON ) )
	};
	const dependencies = { api, buildEntity };

	beforeEach( () => {
		jest.clearAllMocks();
		service = new CommentService( dependencies );
	} );

	describe( '@create()', () => {
		const postId = 3;
		const text = 'Comment text';
		const commentParams = { text };
		const expectedUrl = `1/posts/${postId}/comments`;
		const expectedParams = { comment: commentParams };

		it( 'creates the comment', async () => {
			await service.create( { postId, text } );
			expect( api.post ).toHaveBeenCalledWith( expectedUrl, expectedParams );
		} );
	} );

	describe( '@report()', () => {
		it( 'creates a report for the comment', () => {
			const commentId = 4;
			const expectedUrl = '1/comments/4/reports';
			service.report( commentId );
			expect( api.post ).toHaveBeenCalledWith( expectedUrl );
		} );
	} );
} );
