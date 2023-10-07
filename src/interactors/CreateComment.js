export default class CreateComment {
	constructor( { commentService, commentStore } ) {
		this.commentService = commentService;
		this.commentStore = commentStore;
	}

	async execute( { postId, text } ) {
		const comment = await this.commentService.create( { postId, text } );
		this.commentStore.update( comment );
	}
}
