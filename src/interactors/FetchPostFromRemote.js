import { runInAction } from 'mobx';
import FetchEntityFromRemote from './FetchEntityFromRemote';

export default class FetchPostFromRemote extends FetchEntityFromRemote {
	_putInStore( post ) {
		runInAction( () => {
			this.store.updateItemSorted( post, ( item ) => -item.createdAt.getTime() );
		} );
	}
}
