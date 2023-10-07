import AvailabilityError from '../../errors/AvailabilityError';

describe( 'AvailabilityError', () => {
	describe( 'constructor()', () => {
		it( 'sets AvailabilityError as the name', () => {
			const error = new AvailabilityError();
			expect( error.name ).toBe( 'AvailabilityError' );
		} );
	} );

	describe( 'get isWilcoError', () => {
		it( 'returns true', () => {
			const error = new AvailabilityError();
			expect( error.isWilcoError ).toBe( true );
		} );
	} );

	describe( 'get isAvailabilityError', () => {
		it( 'returns true', () => {
			const error = new AvailabilityError();
			expect( error.isAvailabilityError ).toBe( true );
		} );
	} );

	describe( 'get isInputError', () => {
		it( 'returns false', () => {
			const error = new AvailabilityError();
			expect( error.isInputError ).toBe( false );
		} );
	} );

	describe( 'get isUnknownError', () => {
		it( 'returns false', () => {
			const error = new AvailabilityError();
			expect( error.isUnknownError ).toBe( false );
		} );
	} );

	describe( 'get isNetworkError', () => {
		it( 'returns false', () => {
			const error = new AvailabilityError();
			expect( error.isNetworkError ).toBe( false );
		} );
	} );
} );
