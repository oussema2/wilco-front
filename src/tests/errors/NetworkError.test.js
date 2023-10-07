import NetworkError from '../../errors/NetworkError';

describe( 'NetworkError', () => {
	describe( 'constructor()', () => {
		it( 'sets NetworkError as the name', () => {
			const error = new NetworkError();
			expect( error.name ).toBe( 'NetworkError' );
		} );
	} );

	describe( 'get isWilcoError', () => {
		it( 'returns true', () => {
			const error = new NetworkError();
			expect( error.isWilcoError ).toBe( true );
		} );
	} );

	describe( 'get isAvailabilityError', () => {
		it( 'returns true', () => {
			const error = new NetworkError();
			expect( error.isNetworkError ).toBe( true );
		} );
	} );

	describe( 'get isInputError', () => {
		it( 'returns false', () => {
			const error = new NetworkError();
			expect( error.isInputError ).toBe( false );
		} );
	} );

	describe( 'get isUnknownError', () => {
		it( 'returns false', () => {
			const error = new NetworkError();
			expect( error.isUnknownError ).toBe( false );
		} );
	} );

	describe( 'get isNetworkError', () => {
		it( 'returns true', () => {
			const error = new NetworkError();
			expect( error.isNetworkError ).toBe( true );
		} );
	} );
} );
