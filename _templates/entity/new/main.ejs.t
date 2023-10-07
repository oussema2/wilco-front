---
to: src/entities/<%=Name%>.js
---
import { makeAutoObservable } from 'mobx';

export default class <%= Name %> {
	constructor( {
		id
	} ) {
		this.id = id;

		makeAutoObservable( this );
	}

	toJSON() {
		return {
			id: this.id
		};
	}

	static fromJSON( data ) {
		return new <%= Name %>( {
			id: data.id
		} );
	}
}
