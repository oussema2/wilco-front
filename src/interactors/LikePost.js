export default class LikePost {
	constructor( { postStore, postService } ) {
		this.postStore = postStore;
		this.postService = postService;
	}

	async execute( postId ) {
		const likedPost = await this.postService.likePost( postId );
		this.postStore.update( likedPost );
	}
}
