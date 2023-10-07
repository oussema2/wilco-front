import { makeAutoObservable } from 'mobx';

export default class ModalService {
	constructor() {
		this.modals = {};
		makeAutoObservable( this );
	}

	open( key, data = {} ) {
		this.modals[ key ] = {
			open: true,
			data
		};
	}

	close( key ) {
		delete this.modals[ key ];
	}

	getData( key ) {
		const modal = this.modals[ key ];
		return modal && modal.data;
	}
}
