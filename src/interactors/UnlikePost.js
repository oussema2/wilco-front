export default class UnlikePost {
	constructor( { postStore, postService } ) {
		this.postStore = postStore;
		this.postService = postService;
	}

	async execute( postId ) {
		const unlikedPost = await this.postService.unlikePost( postId );
		this.postStore.update( unlikedPost );
	}
}
