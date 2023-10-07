export default class GetEntitiesFromStore {
	constructor( { store } ) {
		this.store = store;
	}

	execute() {
		return this.entities;
	}

	get entities() {
		return this.store.all;
	}
}
