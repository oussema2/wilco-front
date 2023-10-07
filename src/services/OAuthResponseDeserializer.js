import ResponseDeserializer from './ResponseDeserializer';
import ErrorResponse from './ErrorResponse';

export default class OAuthResponseDeserializer extends ResponseDeserializer {
	get responseBody() {
		return this.response.data;
	}

	get errorResponse() {
		return new ErrorResponse( {
			statusCode: this.statusCode,
			name: this.responseBody.error,
			description: this.responseBody.error_description
		} );
	}
}
