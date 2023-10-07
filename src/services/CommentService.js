import EntityService from './EntityService';

export default class CommentService extends EntityService {
	async create( { postId, text } ) {
		const commentResponse = await this.api.post(
			`${this.apiVersion}/posts/${postId}/comments`,
			{ comment: { text } }
		);
		return this.buildEntity( commentResponse );
	}

	async report( commentId ) {
		await this.api.post( `1/comments/${commentId}/reports` );
	}
}
