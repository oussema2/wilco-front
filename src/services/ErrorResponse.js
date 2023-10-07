export default class ErrorResponse {
	constructor( {
		statusCode,
		name,
		description
	} ) {
		this.statusCode = statusCode;
		this.name = name;
		this.description = description;
	}
}
