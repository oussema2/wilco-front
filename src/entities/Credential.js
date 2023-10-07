import { makeAutoObservable } from 'mobx';

export default class Credential {
	constructor( {
		id,
		name,
		custom
	} ) {
		this.id = id;
		this.name = name;
		this.custom = custom;

		makeAutoObservable( this );
	}

	toJSON() {
		return {
			id: this.id,
			name: this.name,
			custom: this.custom
		};
	}

	static fromJSON( data ) {
		return new Credential( {
			id: data.id,
			name: data.name,
			custom: data.custom
		} );
	}
}
