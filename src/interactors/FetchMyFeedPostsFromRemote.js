import { runInAction } from 'mobx';
import FetchEntitiesFromRemote from './FetchEntitiesFromRemote';

export default class FetchMyFeedPostsFromRemote extends FetchEntitiesFromRemote {
	_putInStore( posts ) {
		this.store.updateSorted( posts, ( post ) => -post.createdAt.getTime() );
	}

	async execute( params ) {
		const _params = { ...params, feed: true };
		const response = await this._fetchFromService( _params );

		runInAction( () => {
			this._deleteFromStore();
			this._putInStore( response.entities );
			this.setPagination( response.pagination );
		} );
	}

	_deleteFromStore() {
		if ( this.pagination.page === 0 ) {
			this.store.deleteAll();
		}
	}
}
