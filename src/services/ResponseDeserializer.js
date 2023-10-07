import SubclassResponsibilityError from '../errors/SubclassResponsibilityError';

export default class ResponseDeserializer {
	constructor( {
		response
	} ) {
		this.response = response;
	}

	get isResponseSuccessful() {
		return this.statusCode >= 200 && this.statusCode < 400;
	}

	get responseBody() {
		throw new SubclassResponsibilityError();
	}

	get statusCode() {
		return this.response.status;
	}

	get errorResponse() {
		throw new SubclassResponsibilityError();
	}

	deserializeResponse() {
		if ( this.isResponseSuccessful ) { return this.responseBody; }

		return this.errorResponse;
	}
}
