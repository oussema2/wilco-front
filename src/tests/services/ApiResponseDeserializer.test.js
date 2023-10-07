/* eslint-disable camelcase */
import ApiResponseDeserializer from '../../services/ApiResponseDeserializer';
import ErrorResponse from '../../services/ErrorResponse';

describe( 'ApiResponseDeserializer', () => {
	describe( '@deserializeResponse()', () => {
		describe( 'when is a successful response', () => {
			const responseBody = 'responseBody';
			const response = { status: 200, data: { response: responseBody } };
			const deserializer = new ApiResponseDeserializer( { response } );

			it( 'returns the response body', () => {
				expect( deserializer.deserializeResponse() ).toBe( responseBody );
			} );
		} );

		describe( 'when is not a successful response', () => {
			const error_name = 'error_name';
			const error_message = 'error_message';
			const responseBody = { error_name, error_message };

			describe( 'when the status code is below 200', () => {
				const status = 100;
				const response = { status, data: { response: responseBody } };
				const deserializer = new ApiResponseDeserializer( { response } );
				const expectedResponse = new ErrorResponse( {
					statusCode: status,
					name: error_name,
					description: error_message
				} );

				it( 'returns the error response', () => {
					expect( deserializer.deserializeResponse() ).toEqual( expectedResponse );
				} );
			} );

			describe( 'when the status code is above 300', () => {
				const status = 400;
				const response = { status, data: { response: responseBody } };
				const deserializer = new ApiResponseDeserializer( { response } );
				const expectedResponse = new ErrorResponse( {
					statusCode: status,
					name: error_name,
					description: error_message
				} );

				it( 'returns the error response', () => {
					expect( deserializer.deserializeResponse() ).toEqual( expectedResponse );
				} );
			} );
		} );
	} );
} );
