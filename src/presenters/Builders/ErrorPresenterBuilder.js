import AvailabilityErrorPresenter from '../Errors/AvailabilityErrorPresenter';
import InputErrorPresenter from '../Errors/InputErrorPresenter';
import UnknownErrorPresenter from '../Errors/UnknownErrorPresenter';
import NetworkErrorPresenter from '../Errors/NetworkErrorPresenter';
import WilcoErrorPresenter from '../Errors/WilcoErrorPresenter';
import ErrorPresenter from '../Errors/ErrorPresenter';

export default class ErrorPresenterBuilder {
	constructor( { customMessages } = {} ) {
		this.customMessages = customMessages;
	}

	forError( error ) {
		if ( error.isAvailabilityError ) return this.buildAvailabilityErrorPresenter( error );
		if ( error.isInputError ) return this.buildInputErrorPresenter( error );
		if ( error.isUnknownError ) return this.buildUnknownErrorPresenter( error );
		if ( error.isWilcoError ) return this.buildWilcoErrorPresenter( error );
		return this.buildErrorPresenter( error );
	}

	buildAvailabilityErrorPresenter( error ) {
		if ( error.isNetworkError ) return new NetworkErrorPresenter( error, this.customMessages );
		return new AvailabilityErrorPresenter( error, this.customMessages );
	}

	buildInputErrorPresenter( error ) {
		return new InputErrorPresenter( error, this.customMessages );
	}

	buildUnknownErrorPresenter( error ) {
		return new UnknownErrorPresenter( error, this.customMessages );
	}

	buildWilcoErrorPresenter( error ) {
		return new WilcoErrorPresenter( error, this.customMessages );
	}

	buildErrorPresenter( error ) {
		return new ErrorPresenter( error, this.customMessages );
	}
}
