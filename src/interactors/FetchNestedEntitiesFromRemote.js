import { runInAction } from 'mobx';

export default class FetchNestedEntitiesFromRemote {
	constructor( { store, service, nestedEntityName } ) {
		this.store = store;
		this.service = service;
		this.nestedEntityName = nestedEntityName;
		this.pagination = null;
	}

	setPagination( pagination ) {
		this.pagination = pagination;
	}

	resetPagination( ) {
		this.pagination.reset();
	}

	async execute( nestedEntity ) {
		const response = await this._fetchFromService( nestedEntity.id );
		runInAction( () => {
			this._putInStore( response.entities, nestedEntity );
			this.setPagination( response.pagination );
		} );
	}

	_fetchFromService( nestedEntityId ) {
		// eslint-disable-next-line max-len
		return this.service.fetchAllNested( this.nestedEntityName, nestedEntityId, this.pagination );
	}

	// eslint-disable-next-line no-unused-vars
	_putInStore( entities, nestedEntity ) {
		this.store.updateAll( entities );
	}
}
