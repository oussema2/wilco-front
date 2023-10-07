export default class ErrorPresenter {
	constructor( error, customMessages = {} ) {
		this.error = error;
		this.customMessages = customMessages;
	}

	presentError() {
		const { errorName } = this.error;
		if ( errorName && this.customMessages[ errorName ] ) {
			return this.customMessages[ errorName ];
		}
		return this._presentErrorByType();
	}

	_presentErrorByType() {
		// eslint-disable-next-line no-console
		console.error( this.error );
		return 'An unexpected error has occurred.';
	}

	get errorDescription() {
		return this.error.errorDescription;
	}
}
