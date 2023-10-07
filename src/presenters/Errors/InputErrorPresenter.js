import ErrorPresenter from './ErrorPresenter';

export default class InputErrorPresenter extends ErrorPresenter {
	_presentErrorByType() {
		if ( typeof this.errorDescription === 'string' ) return this.errorDescription;
		return this._presentFirstFieldError();
	}

	_presentFirstFieldError() {
		const [ key, [ message ] ] = Object.entries( this.errorDescription )[ 0 ];
		return `${key} ${message}`;
	}
}
