import EntityStore from './EntityStore';

export default class PostStore extends EntityStore {
	constructor( rootStore ) {
		super();
		this.rootStore = rootStore;
	}

	deletePostsByPilotId( pilotId ) {
		this.entities = this.entities.filter( ( entity ) => entity.pilot.id !== pilotId );
	}

	updateNumberOfComments( postId ) {
		const post = this.find( postId );
		if ( post ) this._decrementNumberOfComments( post );
	}

	_decrementNumberOfComments( post ) {
		if ( post.numberOfComments > 0 ) post.numberOfComments -= 1;
		this.update( post );
	}

	update( updatedEntity ) {
		this.rootStore.myFeedPostStore.updateIfExists( updatedEntity );
		return super.update( updatedEntity );
	}

	delete( entityId ) {
		this.rootStore.myFeedPostStore.delete( entityId );
		super.delete( entityId );
	}
}
