import { makeAutoObservable } from 'mobx';

export default class CommunityTag {
	constructor( {
		id,
		name
	} ) {
		this.id = id;
		this.name = name;

		makeAutoObservable( this );
	}

	toJSON() {
		return {
			id: this.id,
			name: this.name
		};
	}

	static fromJSON( data ) {
		return new CommunityTag( {
			id: data.id,
			name: data.name
		} );
	}
}
