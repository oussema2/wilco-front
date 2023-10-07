import AvailabilityError from '../../errors/AvailabilityError';
import InputError from '../../errors/InputError';

describe( 'InputError', () => {
	describe( 'constructor()', () => {
		it( 'sets InputError as the name', () => {
			const error = new InputError();
			expect( error.name ).toBe( 'InputError' );
		} );
	} );

	describe( 'get isWilcoError', () => {
		it( 'returns true', () => {
			const error = new AvailabilityError();
			expect( error.isWilcoError ).toBe( true );
		} );
	} );

	describe( 'get isAvailabilityError', () => {
		it( 'returns false', () => {
			const error = new InputError();
			expect( error.isAvailabilityError ).toBe( false );
		} );
	} );

	describe( 'get isInputError', () => {
		it( 'returns true', () => {
			const error = new InputError();
			expect( error.isInputError ).toBe( true );
		} );
	} );

	describe( 'get isUnknownError', () => {
		it( 'returns false', () => {
			const error = new InputError();
			expect( error.isUnknownError ).toBe( false );
		} );
	} );
} );
