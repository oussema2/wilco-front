import { createRef } from 'react';

class RefNavigation {
	constructor() {
		this.ref = createRef();
	}

	get current() {
		return this.ref.current;
	}

	get isReady() {
		return !!this.current.getRootState();
	}

	navigate = async ( name, params ) => {
		await this.waitUntilNavigationIsReady();
		this.current?.navigate( name, params );
	}

	dispatch = async ( name, params ) => {
		await this.waitUntilNavigationIsReady();
		this.current?.dispatch( name, params );
	}

	async waitUntilNavigationIsReady() {
		return new Promise( ( resolve ) => {
			this._loopUntilReady( resolve );
		} );
	}

	_loopUntilReady( onReady ) {
		if ( this.isReady ) {
			onReady();
		} else {
			setTimeout( () => this._loopUntilReady( onReady ), 100 );
		}
	}
}

const navigation = new RefNavigation();
export default navigation;
