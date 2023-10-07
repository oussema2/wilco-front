import UnknownError from '../../errors/UnknownError';

describe( 'UnknownError', () => {
	describe( 'constructor()', () => {
		it( 'sets UnknownError as the name', () => {
			const error = new UnknownError();
			expect( error.name ).toBe( 'UnknownError' );
		} );
	} );

	describe( 'get isWilcoError', () => {
		it( 'returns true', () => {
			const error = new UnknownError();
			expect( error.isWilcoError ).toBe( true );
		} );
	} );

	describe( 'get isAvailabilityError', () => {
		it( 'returns false', () => {
			const error = new UnknownError();
			expect( error.isAvailabilityError ).toBe( false );
		} );
	} );

	describe( 'get isInputError', () => {
		it( 'returns false', () => {
			const error = new UnknownError();
			expect( error.isInputError ).toBe( false );
		} );
	} );

	describe( 'get isUnknownError', () => {
		it( 'returns true', () => {
			const error = new UnknownError();
			expect( error.isUnknownError ).toBe( true );
		} );
	} );
} );
