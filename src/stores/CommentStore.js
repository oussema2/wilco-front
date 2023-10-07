import EntityStore from './EntityStore';

export default class CommentStore extends EntityStore {
	deleteCommentsByPilotId( pilotId ) {
		this.entities = this.entities.filter( ( entity ) => entity.pilot.id !== pilotId );
	}

	getCommentsByPilotId( pilotId ) {
		return this.entities.filter( ( entity ) => entity.pilot.id === pilotId );
	}
}
