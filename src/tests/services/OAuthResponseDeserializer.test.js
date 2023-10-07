/* eslint-disable camelcase */
import OAuthResponseDeserializer from '../../services/OAuthResponseDeserializer';
import ErrorResponse from '../../services/ErrorResponse';

describe( 'OAuthResponseDeserializer', () => {
	describe( '@deserializeResponse()', () => {
		describe( 'when is a successful response', () => {
			const responseBody = 'responseBody';
			const response = { status: 200, data: responseBody };
			const deserializer = new OAuthResponseDeserializer( { response } );

			it( 'returns the response body', () => {
				expect( deserializer.deserializeResponse() ).toBe( responseBody );
			} );
		} );

		describe( 'when is not a successful response', () => {
			const error = 'error';
			const error_description = 'error_description';
			const responseBody = { error, error_description };

			describe( 'when the status code is below 200', () => {
				const status = 100;
				const response = { status, data: responseBody };
				const deserializer = new OAuthResponseDeserializer( { response } );
				const expectedResponse = new ErrorResponse( {
					statusCode: status,
					name: error,
					description: error_description
				} );

				it( 'returns the error response', () => {
					expect( deserializer.deserializeResponse() ).toEqual( expectedResponse );
				} );
			} );

			describe( 'when the status code is above 300', () => {
				const status = 400;
				const response = { status, data: responseBody };
				const deserializer = new OAuthResponseDeserializer( { response } );
				const expectedResponse = new ErrorResponse( {
					statusCode: status,
					name: error,
					description: error_description
				} );

				it( 'returns the error response', () => {
					expect( deserializer.deserializeResponse() ).toEqual( expectedResponse );
				} );
			} );
		} );
	} );
} );
