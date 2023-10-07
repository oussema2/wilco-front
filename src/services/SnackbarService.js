import { makeAutoObservable } from 'mobx';

export default class SnackbarService {
	constructor() {
		this.isVisible = false;
		this.message = '';

		makeAutoObservable( this );
	}

	_show( config ) {
		this.isVisible = true;
		this.message = config.message;
	}

	showInfo( config ) {
		this.type = 'info';
		this._show( config );
	}

	showSuccess( config ) {
		this.type = 'success';
		this._show( config );
	}

	showError( config ) {
		this.type = 'error';
		this._show( config );
	}

	hide() {
		this.isVisible = false;
	}
}
