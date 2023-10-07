import ErrorResponse from '../../services/ErrorResponse';

describe( 'ErrorResponse', () => {
	let errorResponse;
	const statusCode = 400;
	const name = 'name';
	const description = 'description';
	const params = { statusCode, name, description };

	beforeEach( () => {
		errorResponse = new ErrorResponse( params );
	} );

	describe( 'constructor()', () => {
		it( 'initializes with the provided values', () => {
			expect( errorResponse.statusCode ).toBe( statusCode );
			expect( errorResponse.name ).toBe( name );
			expect( errorResponse.description ).toBe( description );
		} );
	} );
} );
