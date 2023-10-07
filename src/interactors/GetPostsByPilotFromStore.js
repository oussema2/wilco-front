export default class GetPostsByPilotFromStore {
	constructor( { store } ) {
		this.store = store;
	}

	execute( id ) {
		return this.entities.filter( ( entity ) => entity.pilot?.id === id );
	}

	pagination() {
		return this.pagination;
	}

	get entities() {
		return this.store.all;
	}
}
