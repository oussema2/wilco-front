import FetchNestedEntitiesFromRemote from './FetchNestedEntitiesFromRemote';

export default class FetchNestedPostsFromRemote extends FetchNestedEntitiesFromRemote {
	_putInStore( posts ) {
		this.store.updateSorted( posts, ( post ) => -post.createdAt.getTime() );
	}
}
