export default class DeletePost {
	constructor( { postService, postStore, pilotStore } ) {
		this.postService = postService;
		this.postStore = postStore;
		this.pilotStore = pilotStore;
	}

	async execute( postId ) {
		const post = await this.postService.delete( postId );
		this.postStore.delete( postId );
		this.pilotStore.currentPilot.setLatestFlights( post.pilot.latestFlights );
	}
}
