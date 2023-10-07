import Comment from '../entities/Comment';

export default class CommentBuilder {
	constructor( { pilotStore, postStore } ) {
		this.pilotStore = pilotStore;
		this.postStore = postStore;
	}

	getStoredPilot( pilot ) {
		return this.pilotStore.update( pilot );
	}

	getStoredPost( post ) {
		return this.postStore.update( post );
	}

	build = ( commentJson ) => {
		const comment = Comment.fromJSON( commentJson );
		comment.pilot = this.getStoredPilot( comment.pilot );
		comment.post = comment.post && this.getStoredPost( comment.post );
		return comment;
	}
}
