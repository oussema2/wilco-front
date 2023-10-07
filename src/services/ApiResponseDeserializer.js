import ResponseDeserializer from './ResponseDeserializer';
import ErrorResponse from './ErrorResponse';

export default class ApiResponseDeserializer extends ResponseDeserializer {
	get responseBody() {
		this.setPagination();
		return this.response.data.response;
	}

	get errorResponse() {
		return new ErrorResponse( {
			statusCode: this.statusCode,
			name: this.responseBody.error_name,
			description: this.responseBody.error_message
		} );
	}

	setPagination() {
		this.response.data.response.pagination = this.response.data.pagination;
	}
}
