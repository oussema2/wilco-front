import FetchEntitiesFromRemote from './FetchEntitiesFromRemote';

export default class FetchPostsFromRemote extends FetchEntitiesFromRemote {
	_putInStore( posts ) {
		this.store.updateSorted( posts, ( post ) => -post.createdAt.getTime() );
	}
}
