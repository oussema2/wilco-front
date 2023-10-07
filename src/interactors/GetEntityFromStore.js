import { makeAutoObservable } from 'mobx';

export default class GetEntityFromStore {
	constructor( { store } ) {
		this.store = store;

		makeAutoObservable( this );
	}

	execute( entityId ) {
		return this.store.find( entityId );
	}
}
