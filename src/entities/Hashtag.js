import { makeAutoObservable } from 'mobx';

export default class Hashtag {
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
			text: this.name
		};
	}

	static fromJSON( data ) {
		return new Hashtag( {
			id: data.id,
			name: data.text
		} );
	}
}
