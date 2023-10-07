import { makeAutoObservable } from 'mobx';

export default class ActionSheetService {
	constructor() {
		this.isOpen = false;
		this.actions = [];

		makeAutoObservable( this );
	}

	open( config ) {
		this.isOpen = true;
		this.actions = config.actions;
	}

	close() {
		this.isOpen = false;
		this.actions = [];
	}
}
