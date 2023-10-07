import WilcoError from '../../errors/WilcoError';

describe( 'WilcoError', () => {
	const name = 'test name';
	const stringDescription = 'test description';
	const objectDescription = { value: 'test description' };

	describe( 'constructor()', () => {
		describe( 'when no description is provided', () => {
			it( 'creates an error with an empty message', () => {
				const error = new WilcoError( { name } );

				expect( error.name ).toBe( 'WilcoError' );
				expect( error.message ).toBe( '' );
				expect( error.errorName ).toBe( name );
				expect( error.errorDescription ).toBeNull();
			} );
		} );

		describe( 'when a string description is provided', () => {
			it( 'sets the message as the description', () => {
				const error = new WilcoError( { name, description: stringDescription } );

				expect( error.name ).toBe( 'WilcoError' );
				expect( error.message ).toBe( stringDescription );
				expect( error.errorName ).toBe( name );
				expect( error.errorDescription ).toBe( stringDescription );
			} );
		} );

		describe( 'when an object description is provided', () => {
			it( 'creates an error with an empty message', () => {
				const error = new WilcoError( { name, description: objectDescription } );

				expect( error.name ).toBe( 'WilcoError' );
				expect( error.message ).toBe( '' );
				expect( error.errorName ).toBe( name );
				expect( error.errorDescription ).toBe( objectDescription );
			} );
		} );
	} );

	describe( 'get isWilcoError', () => {
		it( 'returns true', () => {
			const error = new WilcoError();
			expect( error.isWilcoError ).toBe( true );
		} );
	} );

	describe( 'get isAvailabilityError', () => {
		it( 'returns false', () => {
			const error = new WilcoError();
			expect( error.isAvailabilityError ).toBe( false );
		} );
	} );

	describe( 'get isInputError', () => {
		it( 'returns false', () => {
			const error = new WilcoError();
			expect( error.isInputError ).toBe( false );
		} );
	} );

	describe( 'get isUnknownError', () => {
		it( 'returns false', () => {
			const error = new WilcoError();
			expect( error.isUnknownError ).toBe( false );
		} );
	} );
} );
