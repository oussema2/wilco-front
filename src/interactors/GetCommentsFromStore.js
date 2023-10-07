import GetEntitiesFromStore from './GetEntitiesFromStore';

export default class GetCommentsFromStore extends GetEntitiesFromStore {
	execute( id ) {
		return this.entities.filter( ( entity ) => entity.postId === id );
	}
}
