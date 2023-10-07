import FetchNestedEntitiesFromRemote from './FetchNestedEntitiesFromRemote';

export default class FetchNestedCommentsFromRemote extends FetchNestedEntitiesFromRemote {
	_putInStore( comments, post ) {
		comments.map( ( comment ) => {
			post.addComment( comment );
			return comment.setPost( post );
		} );

		this._putInStoreSorted( comments, post );
	}

	_putInStoreSorted( comments ) {
		this.store.updateSorted( comments, ( comment ) => comment.createdAt.getTime() );
	}
}
