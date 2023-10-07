import { runInAction } from 'mobx';
import Pagination from '../entities/Pagination';

export default class FetchEntitiesFromRemote {
	constructor( { store, service, clearStoreOnPullToRefresh = false } ) {
		this.store = store;
		this.service = service;
		this.pagination = new Pagination( { perPage: 15 } );
		this.clearStoreOnPullToRefresh = clearStoreOnPullToRefresh;
	}

	setPagination( pagination ) {
		this.pagination = pagination;
	}

	resetPagination( ) {
		this.pagination.reset();
	}

	async execute( params ) {
		const response = await this._fetchFromService( params );

		runInAction( () => {
			this._deleteFromStore();
			this._putInStore( response.entities );
			this.setPagination( response.pagination );
		} );

		return response.entities;
	}

	_fetchFromService( params ) {
		return this.service.fetchAll( this.pagination, params );
	}

	_putInStore( entities ) {
		this.store.updateAll( entities );
	}

	_deleteFromStore() {
		if ( this.pagination.page === 0 && this.clearStoreOnPullToRefresh ) {
			this.store.deleteAll();
		}
	}
}
