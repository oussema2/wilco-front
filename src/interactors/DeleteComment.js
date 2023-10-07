export default class DeleteComment {
	constructor( { commentService, commentStore } ) {
		this.commentService = commentService;
		this.commentStore = commentStore;
	}

	async execute( commentId ) {
		await this.commentService.delete( commentId );
		this.commentStore.delete( commentId );
	}
}
